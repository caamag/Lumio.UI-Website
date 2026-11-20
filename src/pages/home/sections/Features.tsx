import type { MouseEvent, ReactNode } from "react";
import styled from "styled-components";
import { FiArrowRight, FiDroplet, FiEye, FiFeather, FiPackage } from "react-icons/fi";
import { SiStorybook, SiTypescript } from "react-icons/si";
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
import { Colors } from "../../../global/colors";
import { LINKS } from "../../../global/links";

const FEATURES: { icon: ReactNode; title: string; text: string }[] = [
  {
    icon: <FiPackage />,
    title: "Pronto para usar",
    text: "Um único npm install e os componentes já estão disponíveis. Nada de copiar e colar código entre projetos.",
  },
  {
    icon: <SiStorybook />,
    title: "Documentado no Storybook",
    text: "Cada componente com props, variantes e exemplos interativos para você testar antes de escrever uma linha.",
  },
  {
    icon: <FiDroplet />,
    title: "Temas personalizáveis",
    text: "Envolva sua aplicação no ThemeProvider e aplique as cores da sua marca em todos os componentes de uma vez.",
  },
  {
    icon: <SiTypescript />,
    title: "Tipado com TypeScript",
    text: "Tipos inclusos no pacote: autocomplete das props e erros pegos no editor, não em produção.",
  },
  {
    icon: <FiEye />,
    title: "Acessibilidade em foco",
    text: "Construído sobre elementos HTML nativos, preservando foco, teclado e semântica por padrão.",
  },
  {
    icon: <FiFeather />,
    title: "Leve e sem atrito",
    text: "Feito com React e styled-components, funciona com React 18+ e se encaixa na stack que você já usa.",
  },
];

const spotlight = (e: MouseEvent<HTMLElement>) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
};

const Features = () => (
  <Section id="recursos">
    <Container>
      <Reveal>
        <SectionHeader>
          <Eyebrow>Por que Lumio.UI</Eyebrow>
          <SectionTitle>
            Tudo que você precisa para <GradientText>entregar mais rápido</GradientText>
          </SectionTitle>
          <SectionLead>
            Pare de reconstruir os mesmos botões a cada projeto. O Lumio.UI reúne
            componentes consistentes e documentados para você focar no que importa.
          </SectionLead>
        </SectionHeader>
      </Reveal>

      <GridList>
        {FEATURES.map((f, i) => (
          <Reveal key={f.title} delay={(i % 3) * 90}>
            <Card onMouseMove={spotlight}>
              <IconBox>{f.icon}</IconBox>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </Card>
          </Reveal>
        ))}
      </GridList>

      <Reveal>
        <MoreLink href={LINKS.storybook} target="_blank" rel="noopener noreferrer">
          <SiStorybook />
          Explore cada componente no Storybook
          <FiArrowRight className="arrow" />
        </MoreLink>
      </Reveal>
    </Container>
  </Section>
);

export default Features;

const GridList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  > div {
    height: 100%;
  }

  @media (max-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 620px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.article`
  --x: 50%;
  --y: 50%;
  position: relative;
  height: 100%;
  padding: 28px;
  border-radius: 20px;
  background: #fff;
  border: 1px solid ${Colors.border};
  overflow: hidden;
  isolation: isolate;
  transition:
    transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.35s ease,
    border-color 0.35s ease;

  /* spotlight que segue o cursor */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    background: radial-gradient(
      380px circle at var(--x) var(--y),
      rgba(91, 77, 172, 0.1),
      transparent 45%
    );
    opacity: 0;
    transition: opacity 0.3s;
  }

  h3 {
    margin-top: 20px;
    font-size: 18px;
    font-weight: 650;
    letter-spacing: -0.01em;
    color: ${Colors.ink};
  }

  p {
    margin-top: 10px;
    font-size: 15px;
    line-height: 1.65;
    color: ${Colors.muted};
  }

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(91, 77, 172, 0.28);
    box-shadow: 0 24px 50px -28px rgba(91, 77, 172, 0.45);
  }

  &:hover::before {
    opacity: 1;
  }
`;

const IconBox = styled.div`
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border-radius: 14px;
  font-size: 22px;
  color: #fff;
  background: linear-gradient(135deg, ${Colors.blue}, ${Colors.primary} 55%, ${Colors.magenta});
  box-shadow: 0 10px 24px -10px rgba(91, 77, 172, 0.7);
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);

  ${Card}:hover & {
    transform: rotate(-8deg) scale(1.06);
  }
`;

const MoreLink = styled.a`
  margin: 48px auto 0;
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  border-radius: 999px;
  font-size: 15px;
  font-weight: 600;
  color: ${Colors.primary};
  text-decoration: none;
  background: rgba(91, 77, 172, 0.07);
  transition: background 0.2s;

  .arrow {
    transition: transform 0.2s;
  }

  &:hover {
    background: rgba(91, 77, 172, 0.13);
  }

  &:hover .arrow {
    transform: translateX(4px);
  }

  @media (max-width: 480px) {
    font-size: 14px;
    text-align: center;
  }
`;
