/*
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import * as uuid from 'uuid'

import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import {
  doc as modularDoc,
  setDoc as modularSetDoc,
  onSnapshot as modularOnSnapshot,
  Firestore as ModularFirestore,
  DocumentReference as ModularDocumentReference,
  getDoc as modularGetDoc,
  getFirestore,
} from 'firebase/firestore'

const SHARD_COLLECTION_ID = '_counter_shards_'
const COOKIE_NAME = 'FIRESTORE_COUNTER_SHARD_ID'

export interface CounterSnapshot {
  exists: boolean
  data: () => number
}

// Helper type to allow both compat and modular DocumentReference
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyDocRef =
  | firebase.firestore.DocumentReference
  | ModularDocumentReference<any>

export class Counter {
  private db: firebase.firestore.Firestore | ModularFirestore
  private doc: AnyDocRef
  private field: string
  private shardId = ''
  private shards: { [key: string]: number } = {}
  private notifyPromise: Promise<void> | undefined = undefined

  /**
   * Constructs a sharded counter object that references to a field
   * in a document that is a counter.
   *
   * @param doc A reference to a document with a counter field.
   * @param field A path to a counter field in the above document.
   */
  constructor(doc: AnyDocRef, field: string) {
    this.doc = doc
    this.field = field
    // Detect compat or modular
    if ('firestore' in doc) {
      // compat
      this.db = (doc as firebase.firestore.DocumentReference).firestore
      firebase.initializeApp(this.db.app.options)
    } else {
      // modular
      this.db = (doc as ModularDocumentReference<any>).firestore
    }
    this.shardId = getShardId(COOKIE_NAME)

    // Shard paths
    let docPath: string
    if ('path' in doc) {
      docPath = (doc as any).path
    } else if ('_key' in doc && 'path' in (doc as any)._key) {
      docPath = (doc as any)._key.path.segments.join('/')
    } else {
      throw new Error('Unsupported DocumentReference type')
    }
    const shardsRefPath = docPath + '/' + SHARD_COLLECTION_ID
    this.shards[docPath] = 0
    this.shards[shardsRefPath + '/' + this.shardId] = 0
    this.shards[shardsRefPath + '/' + '\t' + this.shardId.slice(0, 4)] = 0
    this.shards[shardsRefPath + '/' + '\t\t' + this.shardId.slice(0, 3)] = 0
    this.shards[shardsRefPath + '/' + '\t\t\t' + this.shardId.slice(0, 2)] = 0
    this.shards[shardsRefPath + '/' + '\t\t\t' + this.shardId.slice(0, 1)] = 0
  }

  /**
   * Get latency compensated view of the counter.
   *
   * All local increments will be reflected in the counter even if the main
   * counter hasn't been updated yet.
   */
  public async get(options?: any): Promise<number> {
    const valuePromises = Object.keys(this.shards).map(async (path) => {
      if ('firestore' in this.doc) {
        // compat
        const shard = await (this.db as firebase.firestore.Firestore)
          .doc(path)
          .get(options)
        return <number>shard.get(this.field) || 0
      } else {
        // modular
        const shardRef = modularDoc(this.db as ModularFirestore, path)
        const shard = await modularGetDoc(shardRef)
        const data = shard.data?.()
        return (data && data[this.field]) || 0
      }
    })
    const values = await Promise.all(valuePromises)
    return values.reduce((a, b) => a + b, 0)
  }

  /**
   * Listen to latency compensated view of the counter.
   *
   * All local increments to this counter will be immediately visible in the
   * snapshot.
   */
  public onSnapshot(observable: (next: CounterSnapshot) => void) {
    Object.keys(this.shards).forEach((path) => {
      if ('firestore' in this.doc) {
        // compat
        const document = firebase.firestore().doc(path)
        firebase
          .firestore()
          .doc(path)
          .onSnapshot((snap: firebase.firestore.DocumentData) => {
            this.shards[snap.ref.path] = snap.get(this.field) || 0
            if (this.notifyPromise !== null) return
            this.notifyPromise = schedule(() => {
              const sum = Object.values(this.shards).reduce((a, b) => a + b, 0)
              observable({ exists: true, data: () => sum })
              this.notifyPromise = undefined
            })
          })
      } else {
        // modular
        const document = modularDoc(this.db as ModularFirestore, path)
        modularOnSnapshot(document, (snap) => {
          const data = snap.data?.()
          this.shards[path] = (data && data[this.field]) || 0
          if (this.notifyPromise !== null) return
          this.notifyPromise = schedule(() => {
            const sum = Object.values(this.shards).reduce((a, b) => a + b, 0)
            observable({ exists: true, data: () => sum })
            this.notifyPromise = undefined
          })
        })
      }
    })
  }

  /**
   * Increment the counter by a given value.
   *
   * e.g.
   * const counter = new sharded.Counter(db.doc("path/document"), "counter");
   * counter.incrementBy(1);
   */
  public incrementBy(val: number): Promise<void> {
    if ('firestore' in this.doc) {
      // compat
      // @ts-ignore
      const increment: any = firebase.firestore.FieldValue.increment(val)
      const update: { [key: string]: any } = this.field
        .split('.')
        .reverse()
        .reduce((value, name) => ({ [name]: value }), increment)
      const shardRef = (
        this.doc as firebase.firestore.DocumentReference
      ).collection(SHARD_COLLECTION_ID)
      return shardRef.doc(this.shardId).set(update, { merge: true })
    } else {
      // modular
      // @ts-ignore
      const increment: any = firebase.firestore.FieldValue.increment(val)
      const update: { [key: string]: any } = this.field
        .split('.')
        .reverse()
        .reduce((value, name) => ({ [name]: value }), increment)
      const docPath = (this.doc as any)._key.path.segments.join('/')
      const shardRef = modularDoc(
        this.db as ModularFirestore,
        docPath + '/' + SHARD_COLLECTION_ID,
        this.shardId
      )
      return modularSetDoc(shardRef, update, { merge: true })
    }
  }

  /**
   * Access the assigned shard directly. Useful to update multiple counters
   * at the same time, batches or transactions.
   *
   * e.g.
   * const counter = new sharded.Counter(db.doc("path/counter"), "");
   * const shardRef = counter.shard();
   * shardRef.set({"counter1", firestore.FieldValue.Increment(1),
   *               "counter2", firestore.FieldValue.Increment(1));
   */
  public shard(): AnyDocRef {
    if ('firestore' in this.doc) {
      return (this.doc as firebase.firestore.DocumentReference)
        .collection(SHARD_COLLECTION_ID)
        .doc(this.shardId)
    } else {
      const docPath = (this.doc as any)._key.path.segments.join('/')
      return modularDoc(
        this.db as ModularFirestore,
        docPath + '/' + SHARD_COLLECTION_ID,
        this.shardId
      )
    }
  }
}

async function schedule<T>(func: () => T): Promise<T> {
  return new Promise<T>(async (resolve) => {
    setTimeout(async () => {
      const result = func()
      resolve(result)
    }, 0)
  })
}

function getShardId(cookie: string): string {
  const result = new RegExp(
    '(?:^|; )' + encodeURIComponent(cookie) + '=([^;]*)'
  ).exec(document.cookie)
  if (result) return result[1]

  const shardId = uuid.v4()

  const date = new Date()
  date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000)
  const expires = '; expires=' + date.toUTCString()

  document.cookie =
    encodeURIComponent(cookie) + '=' + shardId + expires + '; path=/'
  return shardId
}
