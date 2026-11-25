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

  /*
   * Em alguns navegadores mobile (iOS Safari, Android WebView) o
   * overflow-x: hidden só no body não impede o arraste lateral. "clip"
   * corta o excesso sem criar contêiner de rolagem (não quebra sticky);
   * "hidden" fica como fallback para navegadores antigos.
   */
  html,
  body {
    max-width: 100%;
    overflow-x: hidden;
    overflow-x: clip;
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
