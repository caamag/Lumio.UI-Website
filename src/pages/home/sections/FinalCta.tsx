import { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import { SiGithub, SiStorybook } from "react-icons/si";
import Reveal from "../../../components/ui/Reveal";
import Cta from "../../../components/ui/Cta";
import { Container, GradientText } from "../../../components/ui/layout";
import LogoIcon from "../../../assets/logo.png";
import { Colors, Gradient } from "../../../global/colors";
import { LINKS, PACKAGE_NAME, PACKAGE_VERSION } from "../../../global/links";
import { useInView } from "../../../hooks/useInView";

const COMMAND = `npm i ${PACKAGE_NAME}`;

const PERKS = [
  "Instalação com um único comando",
  "Tipos TypeScript inclusos",
  "Documentação interativa no Storybook",
];

const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/** terminal que digita o comando quando entra na tela */
const TypingTerminal = () => {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.4, rootMargin: "0px" });
  const [chars, setChars] = useState(() => (reducedMotion() ? COMMAND.length : 0));
  const [stage, setStage] = useState(() => (reducedMotion() ? 3 : 0));

  useEffect(() => {
    if (!inView || reducedMotion()) return;
    let i = 0;
    const timers: number[] = [];
    const typer = window.setInterval(() => {
      i += 1;
      setChars(i);
      if (i >= COMMAND.length) {
        window.clearInterval(typer);
        timers.push(window.setTimeout(() => setStage(1), 350));
        timers.push(window.setTimeout(() => setStage(2), 900));
        timers.push(window.setTimeout(() => setStage(3), 1400));
      }
    }, 55);
    return () => {
      window.clearInterval(typer);
      timers.forEach(window.clearTimeout);
    };
  }, [inView]);

  const typing = chars < COMMAND.length;

  return (
    <Terminal ref={ref} aria-label={`Terminal: ${COMMAND}`}>
      <TermBar>
        <i />
        <i />
        <i />
        <span>~/meu-app — zsh</span>
      </TermBar>
      <TermBody>
        <p>
          <Prompt>~/meu-app</Prompt> <Dollar>$</Dollar> {COMMAND.slice(0, chars)}
          {stage === 0 && <Caret $blink={!typing} />}
        </p>
        <Out $show={stage >= 1}>
          <Muted>+</Muted> {PACKAGE_NAME}@{PACKAGE_VERSION}
        </Out>
        <Out $show={stage >= 2}>
          <Ok>✓</Ok> Pronto! Importe e comece a construir.
        </Out>
        <Out $show={stage >= 3}>
          <Prompt>~/meu-app</Prompt> <Dollar>$</Dollar> <Caret $blink />
        </Out>
      </TermBody>
    </Terminal>
  );
};

const FinalCta = () => (
  <Wrapper>
    <Container>
      <Reveal from="scale">
        <Card>
          <Glow aria-hidden />
          <Grid aria-hidden />

          <Content>
            <Brand>
              <img src={LogoIcon} alt="" />
              <span>Comece agora</span>
            </Brand>

            <h2>
              Pronto para construir <GradientText>mais rápido?</GradientText>
            </h2>
            <p className="lead">
              Abra o Storybook, explore os componentes e leve o Lumio.UI para o seu
              próximo projeto em menos de um minuto.
            </p>

            <Perks>
              {PERKS.map((perk) => (
                <li key={perk}>
                  <span>
                    <FiCheck />
                  </span>
                  {perk}
                </li>
              ))}
            </Perks>

            <Actions>
              <Cta href={LINKS.storybook} size="lg">
                <SiStorybook />
                Ver Storybook
                <FiArrowRight />
              </Cta>
              <Cta href={LINKS.github} variant="outlineLight" size="lg">
                <SiGithub />
                Ver no GitHub
              </Cta>
            </Actions>
          </Content>

          <Side>
            <TypingTerminal />
          </Side>
        </Card>
      </Reveal>
    </Container>
  </Wrapper>
);

export default FinalCta;

/* ---------- estilos ---------- */

const blink = keyframes`
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
`;

const Wrapper = styled.section`
  padding: 40px 0 120px;

  @media (max-width: 768px) {
    padding: 20px 0 80px;
  }
`;

const Card = styled.div`
  position: relative;
  overflow: hidden;
  isolation: isolate;
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  align-items: center;
  gap: 56px;
  padding: 72px 64px;
  border-radius: 32px;
  background: #0f0c1d;
  color: #fff;
  box-shadow: 0 50px 100px -50px rgba(17, 15, 31, 0.7);

  /* filete de gradiente da marca no topo */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 10%;
    right: 10%;
    height: 1px;
    background: ${Gradient};
    opacity: 0.9;
  }

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
    gap: 48px;
    padding: 56px 40px;
  }

  @media (max-width: 600px) {
    padding: 44px 20px 20px;
    border-radius: 24px;
  }
`;

/* brilhos estáticos (sem animação contínua → scroll leve) */
const Glow = styled.div`
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    radial-gradient(600px circle at 0% 0%, rgba(34, 179, 230, 0.18), transparent 60%),
    radial-gradient(700px circle at 100% 100%, rgba(208, 24, 111, 0.22), transparent 60%),
    radial-gradient(500px circle at 70% 20%, rgba(91, 77, 172, 0.35), transparent 60%);
`;

const Grid = styled.div`
  position: absolute;
  inset: 0;
  z-index: -1;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
  background-size: 44px 44px;
  mask-image: radial-gradient(ellipse 80% 70% at 30% 40%, #000 20%, transparent 75%);
  -webkit-mask-image: radial-gradient(ellipse 80% 70% at 30% 40%, #000 20%, transparent 75%);
`;

const Content = styled.div`
  h2 {
    margin-top: 22px;
    font-size: clamp(32px, 4.4vw, 50px);
    font-weight: 800;
    line-height: 1.06;
    letter-spacing: -0.04em;
  }

  .lead {
    margin-top: 18px;
    max-width: 460px;
    font-size: clamp(16px, 1.6vw, 18px);
    line-height: 1.65;
    color: rgba(255, 255, 255, 0.68);
  }
`;

const Brand = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 6px 14px 6px 6px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);

  img {
    width: 26px;
    height: 26px;
    padding: 3px;
    border-radius: 50%;
    background: #fff;
  }

  span {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.8);
  }
`;

const Perks = styled.ul`
  margin-top: 28px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  list-style: none;

  li {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 15px;
    color: rgba(255, 255, 255, 0.85);
  }

  span {
    display: grid;
    place-items: center;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    font-size: 12px;
    color: #fff;
    background: linear-gradient(135deg, ${Colors.blue}, ${Colors.primary}, ${Colors.magenta});
    flex-shrink: 0;
  }
`;

const Actions = styled.div`
  margin-top: 36px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const Side = styled.div`
  min-width: 0;
`;

const Terminal = styled.div`
  border-radius: 18px;
  background: rgba(10, 8, 20, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow:
    0 40px 80px -30px rgba(0, 0, 0, 0.7),
    0 0 0 1px rgba(91, 77, 172, 0.2),
    0 0 80px -20px rgba(91, 77, 172, 0.5);
  overflow: hidden;
  transform: perspective(1200px) rotateY(-6deg) rotateX(3deg);
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    transform: perspective(1200px) rotateY(0) rotateX(0);
  }

  @media (max-width: 1000px) {
    transform: none;
  }
`;

const TermBar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 42px;
  padding: 0 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);

  i {
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: #ff5f57;
  }
  i:nth-child(2) {
    background: #febc2e;
  }
  i:nth-child(3) {
    background: #28c840;
  }

  span {
    margin: 0 auto;
    padding-right: 50px;
    font-family: "JetBrains Mono", monospace;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.4);
  }
`;

const TermBody = styled.div`
  min-height: 190px;
  padding: 22px 22px 26px;
  font-family: "JetBrains Mono", monospace;
  font-size: 14px;
  line-height: 2;
  color: #e6e3f5;

  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (max-width: 600px) {
    min-height: 152px;
    padding: 18px 16px 22px;
    font-size: 12px;
  }
`;

const Prompt = styled.span`
  color: #7fc8ff;
`;

const Dollar = styled.span`
  color: #a08cf0;
`;

const Muted = styled.span`
  color: rgba(255, 255, 255, 0.4);
`;

const Ok = styled.span`
  color: #7ee2a8;
`;

const Caret = styled.span<{ $blink: boolean }>`
  display: inline-block;
  width: 8px;
  height: 1.1em;
  margin-left: 2px;
  vertical-align: -0.2em;
  background: #e6e3f5;
  ${(p) =>
    p.$blink &&
    css`
      animation: ${blink} 1s step-end infinite;
    `}
`;

const Out = styled.p<{ $show: boolean }>`
  opacity: ${(p) => (p.$show ? 1 : 0)};
  transform: ${(p) => (p.$show ? "none" : "translate3d(0, 6px, 0)")};
  transition:
    opacity 0.5s ease,
    transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
`;
