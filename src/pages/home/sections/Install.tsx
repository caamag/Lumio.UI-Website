import { useState } from "react";
import styled from "styled-components";
import { FiArrowRight, FiCheck, FiCopy } from "react-icons/fi";
import { SiStorybook } from "react-icons/si";
import Reveal from "../../../components/ui/Reveal";
import {
  Container,
  Eyebrow,
  GradientText,
  Section,
  SectionHeader,
  SectionLead,
  SectionTitle,
} from "../../../components/ui/layout";
import { Colors, Gradient } from "../../../global/colors";
import { LINKS, PACKAGE_NAME } from "../../../global/links";
import { useCopy } from "../../../hooks/useCopy";

const MANAGERS = {
  npm: `npm install ${PACKAGE_NAME}`,
  yarn: `yarn add ${PACKAGE_NAME}`,
  pnpm: `pnpm add ${PACKAGE_NAME}`,
} as const;
type Manager = keyof typeof MANAGERS;

const IMPORT_LINE = `import { Button } from "${PACKAGE_NAME}";`;

const Install = () => {
  const [pm, setPm] = useState<Manager>("npm");
  const { copied, copy } = useCopy();

  return (
    <Section id="instalacao">
      <Container>
        <Reveal>
          <SectionHeader>
            <Eyebrow>Comece em minutos</Eyebrow>
            <SectionTitle>
              Do terminal à tela em <GradientText>3 passos</GradientText>
            </SectionTitle>
            <SectionLead>
              Sem configuração extra. Se o seu projeto usa React e
              styled-components, você já está pronto.
            </SectionLead>
          </SectionHeader>
        </Reveal>

        <Steps>
          <Reveal delay={0}>
            <Step>
              <Num>01</Num>
              <h3>Instale o pacote</h3>
              <p>Use o gerenciador de pacotes que preferir.</p>
              <Terminal>
                <Tabs role="tablist" aria-label="Gerenciador de pacotes">
                  {(Object.keys(MANAGERS) as Manager[]).map((m) => (
                    <button
                      key={m}
                      type="button"
                      role="tab"
                      aria-selected={pm === m}
                      className={pm === m ? "active" : ""}
                      onClick={() => setPm(m)}
                    >
                      {m}
                    </button>
                  ))}
                </Tabs>
                <Line
                  type="button"
                  onClick={() => copy(MANAGERS[pm], "install")}
                  aria-label={`Copiar: ${MANAGERS[pm]}`}
                >
                  <code>
                    <span className="dollar">$</span> {MANAGERS[pm]}
                  </code>
                  {copied === "install" ? <FiCheck className="ok" /> : <FiCopy />}
                </Line>
              </Terminal>
            </Step>
          </Reveal>

          <Reveal delay={120}>
            <Step>
              <Num>02</Num>
              <h3>Importe o componente</h3>
              <p>Importe direto do pacote, com tipos inclusos.</p>
              <Terminal>
                <Line
                  type="button"
                  onClick={() => copy(IMPORT_LINE, "import")}
                  aria-label="Copiar import"
                  $wrap
                >
                  <code>
                    <span className="kw">import</span> {"{ "}
                    <span className="cp">Button</span>
                    {" }"} <span className="kw">from</span>{" "}
                    <span className="st">"{PACKAGE_NAME}"</span>;
                  </code>
                  {copied === "import" ? <FiCheck className="ok" /> : <FiCopy />}
                </Line>
              </Terminal>
            </Step>
          </Reveal>

          <Reveal delay={240}>
            <Step>
              <Num>03</Num>
              <h3>Explore e construa</h3>
              <p>
                Consulte props, variantes e exemplos no Storybook e monte sua
                interface.
              </p>
              <StoryLink href={LINKS.storybook} target="_blank" rel="noopener noreferrer">
                <span className="logo">
                  <SiStorybook />
                </span>
                <span className="txt">
                  <strong>Storybook do Lumio.UI</strong>
                  <small>lumio-ui.vercel.app</small>
                </span>
                <FiArrowRight className="arrow" />
              </StoryLink>
            </Step>
          </Reveal>
        </Steps>
      </Container>
    </Section>
  );
};

export default Install;

const Steps = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  /* linha que conecta os passos */
  &::before {
    content: "";
    position: absolute;
    top: 52px;
    left: 8%;
    right: 8%;
    height: 1px;
    background: ${Gradient};
    opacity: 0.35;
  }

  > div {
    height: 100%;
  }

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    max-width: 560px;
    margin: 0 auto;

    &::before {
      display: none;
    }
  }
`;

const Step = styled.article`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 28px;
  border-radius: 20px;
  background: #fff;
  border: 1px solid ${Colors.border};
  transition:
    box-shadow 0.3s,
    border-color 0.3s;

  h3 {
    margin-top: 20px;
    font-size: 18px;
    font-weight: 650;
    color: ${Colors.ink};
  }

  p {
    margin-top: 8px;
    margin-bottom: 20px;
    font-size: 15px;
    line-height: 1.6;
    color: ${Colors.muted};
  }

  &:hover {
    border-color: rgba(91, 77, 172, 0.28);
    box-shadow: 0 24px 50px -30px rgba(91, 77, 172, 0.45);
  }

  @media (max-width: 600px) {
    padding: 22px 18px;
  }
`;

const Num = styled.span`
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border-radius: 14px;
  font-family: "JetBrains Mono", monospace;
  font-size: 15px;
  font-weight: 500;
  color: #fff;
  background: ${Colors.ink};
  box-shadow: 0 0 0 6px #fff;
`;

const Terminal = styled.div`
  margin-top: auto;
  border-radius: 14px;
  background: #15121f;
  overflow: hidden;
`;

const Tabs = styled.div`
  display: flex;
  gap: 2px;
  padding: 6px 6px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);

  button {
    padding: 8px 12px;
    font-family: "JetBrains Mono", monospace;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.45);
    background: transparent;
    border-bottom: 2px solid transparent;
    cursor: pointer;
    transition:
      color 0.2s,
      border-color 0.2s;
  }

  button:hover {
    color: rgba(255, 255, 255, 0.8);
  }

  button.active {
    color: #fff;
    border-color: #a08cf0;
  }
`;

const Line = styled.button<{ $wrap?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px;
  background: transparent;
  cursor: pointer;
  text-align: left;
  color: rgba(255, 255, 255, 0.5);

  code {
    font-family: "JetBrains Mono", monospace;
    font-size: 13px;
    line-height: 1.6;
    color: #e6e3f5;
    white-space: ${(p) => (p.$wrap ? "normal" : "nowrap")};
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .dollar {
    color: #a08cf0;
  }
  .kw {
    color: #c792ea;
  }
  .cp {
    color: #f78fb3;
  }
  .st {
    color: #a5e8a0;
  }

  svg {
    flex-shrink: 0;
    transition: color 0.2s;
  }

  .ok {
    color: #7ee2a8;
  }

  &:hover svg:not(.ok) {
    color: #fff;
  }
`;

const StoryLink = styled.a`
  margin-top: auto;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  border-radius: 14px;
  text-decoration: none;
  background: linear-gradient(135deg, rgba(91, 77, 172, 0.08), rgba(208, 24, 111, 0.06));
  border: 1px solid rgba(91, 77, 172, 0.18);
  transition:
    transform 0.25s,
    border-color 0.25s;

  .logo {
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: #ff4785;
    color: #fff;
    font-size: 18px;
    flex-shrink: 0;
  }

  .txt {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  strong {
    font-size: 14px;
    color: ${Colors.ink};
  }

  small {
    font-size: 12px;
    color: ${Colors.muted};
  }

  .arrow {
    margin-left: auto;
    color: ${Colors.primary};
    transition: transform 0.25s;
  }

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(91, 77, 172, 0.4);
  }

  &:hover .arrow {
    transform: translateX(4px);
  }
`;
