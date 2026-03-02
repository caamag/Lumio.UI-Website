import Router from "./router";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
      padding: 0px;
      margin: 0px;
      border: none;
  }

  html {
      font-size: 62.5%;
      font-family: 'Inter', sans-serif;
  }

  html, body {
    scroll-behavior: smooth;
  }
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
};

export default App;
