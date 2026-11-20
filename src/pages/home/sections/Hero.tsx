import styled, { css, keyframes } from "styled-components";
import { FiArrowRight, FiCheck, FiCopy, FiTerminal } from "react-icons/fi";
import { SiReact, SiStorybook, SiStyledcomponents, SiTypescript } from "react-icons/si";
import Notebook from "../../../assets/notebook.png";
import Cta from "../../../components/ui/Cta";
import { Container, GradientText } from "../../../components/ui/layout";
import { Button } from "../../../components/Button/button";
import { Colors } from "../../../global/colors";
import { LINKS, PACKAGE_NAME, PACKAGE_VERSION } from "../../../global/links";
import { useCopy } from "../../../hooks/useCopy";

const INSTALL = `npm i ${PACKAGE_NAME}`;

const Hero = () => {
  const { copied, copy } = useCopy();

  return (
    <Wrapper id="topo">
      <Backdrop aria-hidden>
        <Grid />
        <Blob $c={Colors.cyan} $x="8%" $y="-10%" $d="0s" />
        <Blob $c={Colors.primary} $x="55%" $y="0%" $d="-6s" />
        <Blob $c={Colors.magenta} $x="80%" $y="35%" $d="-12s" />
      </Backdrop>

      <Inner>
        <Copy>
          <Badge href={LINKS.npm} target="_blank" rel="noopener noreferrer" style={{ animationDelay: "0ms" }}>
            <span className="dot" />
            <span>v{PACKAGE_VERSION} disponível no npm</span>
            <FiArrowRight />
          </Badge>

          <Title>
            <span style={{ animationDelay: "80ms" }}>Ilumine sua</span>{" "}
            <span style={{ animationDelay: "160ms" }}>interface com</span>{" "}
            <span style={{ animationDelay: "240ms" }}>
              Lumio<GradientText>.UI</GradientText>
            </span>
          </Title>

          <Lead style={{ animationDelay: "340ms" }}>
            Uma biblioteca de componentes React pronta para produção, documentada
            no Storybook. Instale via npm, importe e entregue interfaces
            consistentes, acessíveis e com a cara da sua marca.
          </Lead>

          <Actions style={{ animationDelay: "440ms" }}>
            <Cta href={LINKS.storybook} size="lg">
              <SiStorybook />
              Ver Storybook
              <FiArrowRight />
            </Cta>

            <Install
              type="button"
              onClick={() => copy(INSTALL)}
              $done={copied !== null}
              aria-label={`Copiar comando: ${INSTALL}`}
            >
              <FiTerminal className="prompt" />
              <code>{INSTALL}</code>
              <span className="icon">{copied ? <FiCheck /> : <FiCopy />}</span>
            </Install>
          </Actions>

          <Stack style={{ animationDelay: "540ms" }}>
            <span>Feito com</span>
            <ul>
              <li title="React">
                <SiReact /> React
              </li>
              <li title="TypeScript">
                <SiTypescript /> TypeScript
              </li>
              <li title="styled-components">
                <SiStyledcomponents /> styled-components
              </li>
            </ul>
          </Stack>
        </Copy>

        <Visual>
          <Halo aria-hidden />
          <Device>
            <img
              src={Notebook}
              alt="Storybook do Lumio.UI mostrando a documentação do componente Button"
            />
          </Device>

          <FloatCard $pos="left" aria-hidden>
            <small>{"<Button />"}</small>
            <div className="row">
              <Button variant="isPrimary" tabIndex={-1}>Primary</Button>
              <Button variant="isEmpty" tabIndex={-1}>Empty</Button>
            </div>
          </FloatCard>

          <FloatCard $pos="right" aria-hidden>
            <div className="ok">
              <FiCheck />
            </div>
            <div>
              <strong>Instalado</strong>
              <small>{PACKAGE_NAME}</small>
            </div>
          </FloatCard>
        </Visual>
      </Inner>
    </Wrapper>
  );
};

export default Hero;

/* ---------- animações ---------- */

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(24px); filter: blur(6px); }
  to   { opacity: 1; transform: none; filter: blur(0); }
`;

const drift = keyframes`
  0%   { transform: translate(0, 0) scale(1); }
  33%  { transform: translate(40px, -30px) scale(1.08); }
  66%  { transform: translate(-30px, 20px) scale(0.95); }
  100% { transform: translate(0, 0) scale(1); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-12px); }
`;

const pulse = keyframes`
  0%   { box-shadow: 0 0 0 0 rgba(40, 200, 120, 0.55); }
  100% { box-shadow: 0 0 0 8px rgba(40, 200, 120, 0); }
`;

const enter = css`
  animation: ${fadeUp} 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
`;

/* ---------- estilos ---------- */

const Wrapper = styled.section`
  position: relative;
  overflow: hidden;
  padding: 150px 0 110px;

  @media (max-width: 900px) {
    padding: 120px 0 80px;
  }
`;

const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
`;

const Grid = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(91, 77, 172, 0.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(91, 77, 172, 0.07) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: radial-gradient(ellipse 70% 60% at 50% 30%, #000 30%, transparent 80%);
  -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 30%, #000 30%, transparent 80%);
`;

const Blob = styled.div<{ $c: string; $x: string; $y: string; $d: string }>`
  position: absolute;
  left: ${(p) => p.$x};
  top: ${(p) => p.$y};
  width: 640px;
  height: 640px;
  margin: -90px 0 0 -90px;
  border-radius: 50%;
  /* gradiente radial no lugar de filter: blur — não força repaint a cada frame */
  background: radial-gradient(circle, ${(p) => p.$c} 0%, transparent 62%);
  opacity: 0.2;
  animation: ${drift} 22s ease-in-out infinite;
  animation-delay: ${(p) => p.$d};
  will-change: transform;

  @media (max-width: 600px) {
    width: 400px;
    height: 400px;
  }
`;

const Inner = styled(Container)`
  display: grid;
  grid-template-columns: 1fr 1.05fr;
  align-items: center;
  gap: 48px;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
    gap: 72px;
  }
`;

const Copy = styled.div`
  > * {
    ${enter}
  }

  @media (max-width: 1000px) {
    text-align: center;
  }
`;

const Badge = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 6px 12px 6px 10px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 500;
  color: ${Colors.text};
  text-decoration: none;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid ${Colors.border};
  box-shadow: 0 4px 14px -6px rgba(91, 77, 172, 0.25);
  transition:
    border-color 0.2s,
    transform 0.2s;

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #28c878;
    animation: ${pulse} 1.6s ease-out infinite;
  }

  svg {
    color: ${Colors.primary};
    transition: transform 0.2s;
  }

  &:hover {
    border-color: rgba(91, 77, 172, 0.4);
  }

  &:hover svg {
    transform: translateX(3px);
  }
`;

const Title = styled.h1`
  margin-top: 24px;
  font-size: clamp(40px, 6vw, 72px);
  line-height: 1.02;
  font-weight: 800;
  letter-spacing: -0.045em;
  color: ${Colors.ink};
  animation: none !important;

  > span {
    display: inline-block;
    ${enter}
  }
`;

const Lead = styled.p`
  margin-top: 24px;
  max-width: 520px;
  font-size: clamp(16px, 1.7vw, 19px);
  line-height: 1.65;
  color: ${Colors.muted};

  @media (max-width: 1000px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

const Actions = styled.div`
  margin-top: 36px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;

  @media (max-width: 1000px) {
    justify-content: center;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const Install = styled.button<{ $done: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  height: 54px;
  padding: 0 14px 0 18px;
  border-radius: 14px;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.85);
  border: 1px solid ${(p) => (p.$done ? "rgba(40,200,120,0.5)" : Colors.border)};
  backdrop-filter: blur(8px);
  transition:
    border-color 0.2s,
    box-shadow 0.2s;

  .prompt {
    color: ${Colors.primary};
  }

  code {
    font-family: "JetBrains Mono", monospace;
    font-size: 14px;
    color: ${Colors.text};
    white-space: nowrap;
  }

  .icon {
    display: grid;
    place-items: center;
    width: 30px;
    height: 30px;
    border-radius: 8px;
    color: ${(p) => (p.$done ? "#1f9d5c" : Colors.muted)};
    background: ${(p) => (p.$done ? "rgba(40,200,120,0.12)" : Colors.surface)};
    transition: all 0.2s;
  }

  &:hover {
    border-color: rgba(91, 77, 172, 0.4);
    box-shadow: 0 8px 24px -12px rgba(91, 77, 172, 0.4);
  }

  @media (max-width: 480px) {
    justify-content: center;

    code {
      font-size: 13px;
    }
  }
`;

const Stack = styled.div`
  margin-top: 40px;
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  font-size: 13px;
  color: ${Colors.muted};

  ul {
    display: flex;
    gap: 18px;
    flex-wrap: wrap;
    list-style: none;
  }

  li {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-weight: 500;
    color: ${Colors.text};
    opacity: 0.75;
  }

  @media (max-width: 1000px) {
    justify-content: center;
  }
`;

const Visual = styled.div`
  position: relative;
  animation: ${fadeUp} 1.1s cubic-bezier(0.22, 1, 0.36, 1) 0.35s both;
`;

const Halo = styled.div`
  position: absolute;
  inset: 12% 8%;
  border-radius: 50%;
  background: conic-gradient(
    from 180deg,
    ${Colors.cyan},
    ${Colors.primary},
    ${Colors.magenta},
    ${Colors.cyan}
  );
  filter: blur(70px);
  opacity: 0.35;
  animation: spin 18s linear infinite;
  /* camada própria: o blur é rasterizado uma vez e só a rotação é animada */
  will-change: transform;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const Device = styled.div`
  position: relative;
  animation: ${float} 7s ease-in-out infinite;

  img {
    width: 100%;
    height: auto;
    filter: drop-shadow(0 40px 50px rgba(17, 15, 31, 0.25));
  }
`;

const FloatCard = styled.div<{ $pos: "left" | "right" }>`
  position: absolute;
  ${(p) => (p.$pos === "left" ? "left: -4%; top: 14%;" : "right: -2%; bottom: 10%;")}
  display: flex;
  flex-direction: ${(p) => (p.$pos === "left" ? "column" : "row")};
  align-items: ${(p) => (p.$pos === "left" ? "flex-start" : "center")};
  gap: 10px;
  padding: 14px 16px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.86);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.9);
  box-shadow:
    0 20px 40px -18px rgba(17, 15, 31, 0.35),
    0 0 0 1px rgba(91, 77, 172, 0.06);
  animation: ${float} ${(p) => (p.$pos === "left" ? "6s" : "8s")} ease-in-out infinite;
  animation-delay: ${(p) => (p.$pos === "left" ? "-2s" : "-4s")};
  pointer-events: none;

  small {
    font-family: "JetBrains Mono", monospace;
    font-size: 11px;
    color: ${Colors.muted};
  }

  strong {
    display: block;
    font-size: 13px;
    color: ${Colors.ink};
  }

  .row {
    display: flex;
    gap: 8px;
  }

  .row button {
    padding: 8px 14px;
    font-size: 12px;
  }

  .ok {
    display: grid;
    place-items: center;
    width: 32px;
    height: 32px;
    border-radius: 10px;
    background: rgba(40, 200, 120, 0.14);
    color: #1f9d5c;
  }

  @media (max-width: 600px) {
    padding: 10px 12px;
    border-radius: 12px;
    ${(p) => (p.$pos === "left" ? "left: 0; top: -4%;" : "right: 0; bottom: 0;")}

    .row button {
      padding: 6px 10px;
      font-size: 11px;
    }
  }
`;
