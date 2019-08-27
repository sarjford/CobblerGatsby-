const keyframes = {
  show: `@keyframes show {
    to {
      opacity: 1;
      transform: none;
    }
  }`
}

const animations = {
  show: `
    animation: show 500ms ease-out forwards;
    ${keyframes.show}
  `
}
