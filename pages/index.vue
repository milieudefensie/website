<template>
  <Container>
    <ContentCardCollection :columns="'automatic'" :carousel="false" :cards="[{
      title: 'Card Title',
      subtitle: 'Card Subtitle',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus sunt optio pariatur architecto porro earum animi, in dignissimos.',
      badges: ['Badge 1'],
      image: {
        src: '/jong.jpg',
        alt: 'Card Image',
      },
      buttons: {
        buttons: [
          { label: 'Button 1', link: 'primary', color: 'primary', style: 'default', width: 'default' },
          { label: 'Button 2', link: 'secondary', color: 'primary', style: 'outline', width: 'default' },
        ],
      },
      list: {
        items: [{
          title: 'string',
          subtitle: 'test',
          description: 'string',
          type: 'event',
          link: 'test',
        }],
        color: 'primary'
      },
      variant: 'shadow',
      reverse: false,
    },
    {
      title: 'Card Title',
      subtitle: 'Card Subtitle',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus sunt optio pariatur architecto porro earum animi, in dignissimos.',
      image: {
        src: '/jong.jpg',
        alt: 'Card Image',
      },
      buttons: {
        buttons: [
          { label: 'Button 1', link: 'primary', color: 'primary', style: 'default', width: 'default' },
          { label: 'Button 2', link: 'secondary', color: 'primary', style: 'outline', width: 'default' },
        ],
      },
      variant: 'shadow',
      reverse: false,
    },
    {
      title: 'Card Title',
      subtitle: 'Card Subtitle',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
      badges: ['Badge 1'],
      image: {
        src: '/jong.jpg',
        alt: 'Card Image',
      },
      buttons: {
        buttons: [
          { label: 'Button 1', link: 'primary', color: 'primary', style: 'default', width: 'default' },
          { label: 'Button 2', link: 'secondary', color: 'primary', style: 'outline', width: 'default' },
        ],
      },
      variant: 'shadow',
      reverse: false,
    },
    {
      title: 'Card Title',
      subtitle: 'Card Subtitle',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
      badges: ['Badge 1'],
      image: {
        src: '/jong.jpg',
        alt: 'Card Image',
      },
      buttons: {
        buttons: [
          { label: 'Button 1', link: 'primary', color: 'primary', style: 'default', width: 'default' },
          { label: 'Button 2', link: 'secondary', color: 'primary', style: 'outline', width: 'default' },
        ],
      },
      variant: 'shadow',
      reverse: false,
    }, {
      title: 'Card Title',
      subtitle: 'Card Subtitle',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
      badges: ['Badge 1'],
      image: {
        src: '/jong.jpg',
        alt: 'Card Image',
      },
      buttons: {
        buttons: [
          { label: 'Button 1', link: 'primary', color: 'primary', style: 'default', width: 'default' },
          { label: 'Button 2', link: 'secondary', color: 'primary', style: 'outline', width: 'default' },
        ],
      },
      variant: 'shadow',
      reverse: false,
    }]" />

    Lorem

    <ContentCardCollection :columns="'automatic'" :carousel="false" :cards="[{
      title: 'Card Title',
      subtitle: 'Card Subtitle',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus sunt optio pariatur architecto porro earum animi, in dignissimos.',
      image: {
        src: '/jong.jpg',
        alt: 'Card Image',
      },
      buttons: {
        buttons: [
          { label: 'Button 1', link: 'primary', color: 'primary', style: 'default', width: 'default' },
          { label: 'Button 2', link: 'secondary', color: 'primary', style: 'outline', width: 'default' },
        ],
      },
      variant: 'shadow',
      reverse: false,
    },
    ]" />

  </Container>

</template>