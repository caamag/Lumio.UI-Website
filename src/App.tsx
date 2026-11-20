import Router from "./router";
import { createGlobalStyle } from "styled-components";
import { Colors } from "./global/colors";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: none;
  }

  html {
    scroll-behavior: smooth;
    scroll-padding-top: 88px;
    -webkit-text-size-adjust: 100%;
  }

  body {
    font-family: "Inter", system-ui, -apple-system, "Segoe UI", sans-serif;
    background: #ffffff;
    color: ${Colors.text};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
    line-height: 1.5;
  }

  img { display: block; max-width: 100%; }
  a { color: inherit; }
  button { font-family: inherit; }

  ::selection {
    background: ${Colors.primary};
    color: #fff;
  }

  :focus-visible {
    outline: 2px solid ${Colors.primary};
    outline-offset: 3px;
    border-radius: 6px;
  }

  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    *, *::before, *::after {
      animation-duration: 0.001ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.001ms !important;
    }
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
