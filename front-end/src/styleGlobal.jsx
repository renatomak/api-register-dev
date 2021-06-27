import styled, { createGlobalStyle } from 'styled-components';
 
const GlobalStyle = createGlobalStyle`
  *, html {
    margin: 0;
    padding: 0;
  }
  body {
    background-color: var(--background1);
    font-family: "Montserrat", sans-serif;
    font-size: 18px;
  }
`;

 
export default GlobalStyle;