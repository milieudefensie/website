# Copilot instructions

## Vue files

- Always use the `setup` function and the Composition API.
- Always use Typescript.
- We're using Nuxt 3, so components are auto-imported. If a component is in a folder within the 'components' directory, make sure to use the full path to the component as the name. For example, if the component is in `components/Content/Button.vue`, use `ContentButton` as the name of the component.
- When reusing components, make sure the right attributes are used (based on the component's props).
- Always use Tailwind CSS 4 and DaisyUI 5 for styling.
