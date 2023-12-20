import { createGlobalStyle } from "styled-components"

export const GlobalStyles = createGlobalStyle`
*,
*::after,
*::before {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html {
  scroll-behavior: smooth;
  font-size: 62.5%;
  font-family: sans-serif;
}

body{
  /* font-size: 1.6rem; */
  /* font-family: 'Source Sans 3', sans-serif; */
  /* line-height: 1.5; */
  /* background-color: #3e373d; */
  /* color: #eee5ec; */
}

/* img, picture, video, canvas, svg { */
img, picture, video, canvas {
  display: block;
  max-width: 100%;
}

input,
button,
textarea,
select {
  font: inherit;
}

ol, ul {
	list-style: none;
}

@media (prefers-reduced-motion: reduce) {
  html:focus-within {
   scroll-behavior: auto;
  }
  
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
`
