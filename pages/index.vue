<template>
  <div class="my-10">

    <Container>
      <div class="prose lg:prose-xl">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem cumque nostrum nihil pariatur et provident
          quibusdam corporis laboriosam temporibus, perferendis reprehenderit deleniti maxime facere impedit optio
          voluptatum sint, ratione rem!</p>
        <h1>Garlic bread with cheese: What the science tells us</h1>
        <p>
          For years parents have espoused the health benefits of eating garlic bread with cheese to their
          children, with the food earning such an iconic status in our culture that kids will often dress
          up as warm, cheesy loaf for Halloween.
        </p>
        <blockquote>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod dolorum, a aut, adipisci veniam maxime animi
          odio
          labore deleniti totam doloribus suscipit? Impedit nobis ipsum eos, iure dignissimos voluptas commodi.
        </blockquote>
        <ul>
          <li>Garlic bread with cheese: A retrospective</li>
          <li>Garlic bread with cheese: A comprehensive review</li>
          <li>Garlic bread with cheese: A new hope</li>
        </ul>
        <p>Klik deze knoppen:</p>
      </div>
    </Container>




    <ContentButtonGroup :buttons="[
      { label: 'Klik mij!', url: '', to: '', color: 'primary', style: 'default', width: 'default', size: 'lg' },
      { label: 'Klik mij ook!', url: '', to: '', color: 'primary', style: 'outline', width: 'default', size: 'lg' },
      { label: 'Klik mij ook!', url: '', to: '', color: 'primary', style: 'dash', width: 'default', size: 'lg' },
      { label: 'Klik mij ook!', url: '', to: '', color: 'primary', style: 'soft', width: 'default', size: 'lg' },


    ]" />


    <ContentTestemonial />

    <ContentCards :columns="'1'" :cards="[{
      title: 'Lorem ipsum', reverse: true, content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem cumque nostrum nihil pariatur et provident quibusdam corporis laboriosam temporibus, perferendis reprehenderit deleniti maxime facere impedit optio.', buttons: [{ label: 'Click me', url: '', to: '', color: 'secondary', style: 'default', width: 'default', size: 'lg' }]
    },]" />

    <ContentImage caption="Lorem ipsum" imageURL="/fabriek.jpeg" alt="Fabriek" />

    <Container>
      <div class="prose lg:prose-xl">
        <h2>Lorem ipsum</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem cumque nostrum nihil pariatur et provident
          quibusdam corporis laboriosam temporibus, perferendis reprehenderit deleniti maxime facere impedit optio
          voluptatum sint, ratione rem!</p>
        <h2>Lorem ipsum</h2>
        <ul>
          <li>Garlic bread with cheese: A retrospective</li>
          <li>Garlic bread with cheese: A comprehensive review</li>
          <li>Garlic bread with cheese: A new hope</li>
        </ul>
      </div>
    </Container>

    <ContentButtonGroup
      :buttons="[{ label: 'Klik mij!', url: '', to: '', color: 'accent', style: 'default', width: 'default', size: 'lg' }, { label: 'Klik mij ook!', url: '', to: '', color: 'accent', style: 'soft', width: 'default', size: 'lg' }]" />


    <ContentCountdown title="We starten om 19:00 met onze online introductie. Ben jij er bij?"
      :countToDate="new Date('2025-05-26T08:59:59')"
      :buttons="[{ label: 'Open Zoom video call', url: '', to: '', color: 'primary', style: 'default', width: 'default', size: 'lg' }]"
      :finishedButtons="[{ label: 'Open Zoom', url: '', to: '', color: 'primary', style: 'default', width: 'default', size: 'lg' }]"
      finished-title="🔴 We zijn live! Sluit nu aan bij onze online introductie." />


    <ContentAccordion :items="[
      {
        title: 'Wat is het plan om grote vervuilende bedrijven in beweging te krijgen?', content: 'Wij gaan een heel grote beweging bouwen. Want met hoe meer mensen we zijn, hoe sterker we staan. Dat doen we door leuke activiteiten te organiseren, zodat mensen kennis met ons kunnen maken.We doen ook opvallende acties, zodat we het nieuws halen.Zo komt er meer aandacht voor ons verhaal.En we trainen elkaar zodat we beter leren samenwerken en effectief het gesprek kunnen aangaan over de klimaatcrisis. Iedere woensdag 20:00 organiseren we een online introductie.Daar leer je meer over onze plannen en wat jij kan doen!'
      },
      { title: 'Accordion Item 2', content: 'Content for accordion item 2' },
      { title: 'Accordion Item 3', content: 'Content for accordion item 3' }
    ]" />


    <ContentCards :columns="'1'"
      :cards="[{
        title: '1. Maak kennis 👋', reverse: false, content: 'Iedere woensdag 20:00 hebben we een online introductie voor nieuwe mensen. Hier vertellen we over ons plan om vervuilende bedrijven in beweging te krijgen.', buttons: [{ label: 'Online introductie avond', url: '', to: '', color: 'primary', style: 'default', width: 'default', size: 'lg' }, { label: 'Alle evenementen', url: '', to: '', color: 'primary', style: 'outline', width: 'default', size: 'lg' }]
      }, { title: 'Lorem ipsum', content: 'test', reverse: false, buttons: [{ label: 'Lorem ipsum', url: '', to: '', color: 'primary', style: 'default', width: 'default', size: 'md' }, { label: 'Lorem ipsum', url: '', to: '', color: 'primary', style: 'outline', width: 'default', size: 'md' }] }]" />




    <Container>
      <div class="prose lg:prose-xl">
        <h1>Lorem ipsum</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem cumque nostrum nihil pariatur et provident
          quibusdam corporis laboriosam temporibus, perferendis reprehenderit deleniti maxime facere impedit optio
          voluptatum sint, ratione rem!</p>
        <ul>
          <li>Garlic bread with cheese: A retrospective</li>
          <li>Garlic bread with cheese: A comprehensive review</li>
          <li>Garlic bread with cheese: A new hope</li>
        </ul>
      </div>
    </Container>


    <ContentButtonGroup
      :buttons="[{ label: 'Klik mij!!', url: '', to: '', color: 'secondary', style: 'default', width: 'default', size: 'md' }, { label: 'Klik mij ook!', url: '', to: '', color: 'secondary', style: 'ghost', width: 'default', size: 'md' }]" />



    <ContentCards :columns="'automatic'"
      :cards="[{
        title: '1. Maak kennis 👋', content: 'Iedere woensdag 20:00 hebben we een online introductie voor nieuwe mensen. Hier vertellen we over ons plan om vervuilende bedrijven in beweging te krijgen.', buttons: [{ label: 'Lorem ipsum', url: '', to: '', color: 'primary', style: 'default', width: 'default', size: 'md' }], reverse: false
      }, { title: 'Lorem ipsum', content: 'test', buttons: [{ label: 'Lorem ipsum', url: '', to: '', color: 'primary', style: 'default', width: 'default', size: 'md' }], reverse: false }, { title: 'Lorem ipsum', content: 'test', buttons: [{ label: 'Lorem ipsum', url: '', to: '', color: 'primary', style: 'default', width: 'default', size: 'md' }], reverse: false }]" />



    <Container>
      <div class="prose lg:prose-xl">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem cumque nostrum nihil pariatur et provident
          quibusdam corporis laboriosam temporibus, perferendis reprehenderit deleniti maxime facere impedit optio
          voluptatum sint, ratione rem!</p>
        <h1>Garlic bread with cheese: What the science tells us</h1>
        <p>
          For years parents have espoused the health benefits of eating garlic bread with cheese to their
          children, with the food earning such an iconic status in our culture that kids will often dress
          up as warm, cheesy loaf for Halloween.
        </p>
        <blockquote>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod dolorum, a aut, adipisci veniam maxime animi
          odio
          labore deleniti totam doloribus suscipit? Impedit nobis ipsum eos, iure dignissimos voluptas commodi.
        </blockquote>
        <ul>
          <li>Garlic bread with cheese: A retrospective</li>
          <li>Garlic bread with cheese: A comprehensive review</li>
          <li>Garlic bread with cheese: A new hope</li>
        </ul>
      </div>
    </Container>

    <ContentCards :columns="'automatic'"
      :cards="[{ title: 'Lorem ipsum', content: 'test', reverse: true, buttons: [{ label: 'Lorem ipsum', url: '', to: '', color: 'primary', style: 'default', width: 'default', size: 'md' }, { label: 'Lorem ipsum', url: '', to: '', color: 'primary', style: 'outline', width: 'default', size: 'md' }] }, { title: 'Lorem ipsum', content: 'test', reverse: true, buttons: [{ label: 'Lorem ipsum', url: '', to: '', color: 'primary', style: 'default', width: 'default', size: 'md' }, { label: 'Lorem ipsum', url: '', to: '', color: 'primary', style: 'outline', width: 'default', size: 'md' }] }]" />


    <ContentSteps />

  </div>
</template>