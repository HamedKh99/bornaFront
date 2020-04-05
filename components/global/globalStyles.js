import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }
  h1,h2,h3,h4,h5,p,a,button,li,ol,ul,span,label,input,textarea, div {
    font-family : IRANSans !important;
  }
  form {
    direction : rtl
  }
  label {
    direction : rtl !important;
    text-align : right;
  }
  .modalHeader {
    direction : rtl !important;
    text-align : right !important;
  }
  body {
    margin: 0;
    min-height: 100%;
  }
`;

export default GlobalStyle;
