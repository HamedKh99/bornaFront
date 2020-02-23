import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }
  h1,h2,h3,h4,h5,p,a,button,li,ol,ul,span {
    font-family : IRANSans !important;
  }
  body {
    margin: 0;
    min-height: 100%;
  }
`;

export default GlobalStyle;
