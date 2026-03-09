import * as _ from "./style";
import { useState } from "react";
import { Button } from "../../components/Button/button";
import Notebook from "../../assets/notebook.png";
import { MdContentCopy } from "react-icons/md";
import { MdContentPaste } from "react-icons/md";

const Home = () => {
  const [copied, setCopied] = useState<"" | "npm" | "yarn">("");

  const copyTextToClipboard = (text: string, type: "npm" | "yarn") => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(type);
      setTimeout(() => {
        setCopied("");
      }, 5000);
    });
  };

  return (
    <_.HomeContainer>
      <_.HomeSection>
        <_.Content>
          <_.Title>
            Ilumine sua interface <br /> com Lumio<span>.UI</span>
          </_.Title>
          <_.Description>
            Um Design System robusto, construído em React, focado em <br />
            acessibilidade, performance e uma experiência de desenvolvimento
            fluida.
          </_.Description>
          <_.BtnContainer>
            <Button
              variant="isPrimary"
              onClick={() => {
                window.open("https://github.com/caamag/Lumio.UI");
              }}
            >
              Comece agora
            </Button>
            <Button
              variant="isEmpty"
              onClick={() => {
                window.open(
                  "https://lumio-ui.vercel.app/?path=/docs/components-button--docs",
                );
              }}
            >
              Ver Storybook
            </Button>
          </_.BtnContainer>
        </_.Content>

        <img src={Notebook} alt="" />
      </_.HomeSection>

      <_.HomeSection bgColor="rgb(245, 245, 245)" id="installation">
        <_.Subtitle>Instalação</_.Subtitle>
        <_.Description
          style={{ textAlign: "center", width: "100%", marginTop: "0px" }}
        >
          Para instalar o Lumio.UI, basta rodar o seguinte comando no seu
          terminal:
        </_.Description>
        <_.CodeBox>
          <_.CopyCodeContainer
            onClick={() => {
              copyTextToClipboard("npm install @cainho_dev/lumio-ui", "npm");
            }}
            isCopied={copied === "npm"}
          >
            npm install @cainho_dev/lumio-ui
            {copied === "npm" ? <MdContentPaste /> : <MdContentCopy />}
          </_.CopyCodeContainer>
          <_.OrText>ou</_.OrText>
          <_.CopyCodeContainer
            onClick={() => {
              copyTextToClipboard("yarn add @cainho_dev/lumio-ui", "yarn");
            }}
            isCopied={copied === "yarn"}
          >
            yarn add @cainho_dev/lumio-ui
            {copied === "yarn" ? <MdContentPaste /> : <MdContentCopy />}
          </_.CopyCodeContainer>
        </_.CodeBox>
      </_.HomeSection>

      <_.HomeSection>
        <_.Subtitle>Exemplo de utilização</_.Subtitle>
        <_.Description
          style={{ textAlign: "center", width: "100%", marginTop: "0px" }}
        >
          Aqui está um exemplo simples de como usar o Lumio.UI para criar um
          botão:
        </_.Description>
        <_.CodeBox style={{ maxWidth: "1200px", padding: "0px" }}>
          <pre>
            <code>
              {`import { Button } from "@cainho_dev/lumio-ui";

const ExamplePage = () => {
  return (
    <Button variant="isPrimary">
      Clique aqui
    </Button>
  );
}`}
            </code>
          </pre>
        </_.CodeBox>
      </_.HomeSection>

      <_.HomeSection>
        <_.Subtitle>Definição de cores globais</_.Subtitle>
        <_.Description
          style={{ textAlign: "center", width: "100%", marginTop: "0px" }}
        >
          Lumio UI possui um sistema de tema que permite personalizar cores
          globais da biblioteca. Para isso, basta envolver sua aplicação com o
          ThemeProvider. Aqui está um exemplo de como definir as cores globais
          usando o ThemeProvider:
        </_.Description>
        <_.CodeBox style={{ maxWidth: "1200px", padding: "0px" }}>
          <pre>
            <code>
              {`
import { ThemeProvider } from "@cainho_dev/lumio-ui";

const App = () => {
  return (
    <ThemeProvider
      theme={{
        colors: {
          primary: "your-custom-primary-color",
          primaryHover: "your-custom-primary-hover-color",
          red: "your-custom-red-color",
          whiteGrey: "your-custom-white-grey-color",
          link: "your-custom-link-color",
        }
      }}
    >
      {/* sua aplicação */}
    </ThemeProvider>
  );
}`}
            </code>
          </pre>
        </_.CodeBox>
      </_.HomeSection>
    </_.HomeContainer>
  );
};

export default Home;
