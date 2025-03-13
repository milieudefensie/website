<template>
  <Navigation />

  <slot />
  <BottomFooter :columns="[
    { title: 'Column 1', links: [{ label: 'Link 1', link: '#' }, { label: 'Link 2', link: '#' }, { label: 'Link 3', link: '#' }, { label: 'Link 4', link: '#' }] },
    { title: 'Column 2', links: [{ label: 'Link 3', link: '#' }, { label: 'Link 4', link: '#' }] },
    { title: 'Column 3', links: [{ label: 'Link 5', link: '#' }, { label: 'Link 6', link: '#' }] }
  ]" />
</template>