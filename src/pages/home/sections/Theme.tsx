import { useMemo, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { FiArrowRight, FiCheck, FiDroplet } from "react-icons/fi";
import { SiStorybook } from "react-icons/si";
import Reveal from "../../../components/ui/Reveal";
import Cta from "../../../components/ui/Cta";
import CodeWindow from "../../../components/ui/CodeWindow";
import {
  Container,
  Eyebrow,
  GradientText,
  Section,
  SectionLead,
  SectionTitle,
} from "../../../components/ui/layout";
import { Button } from "../../../components/Button/button";
import { Colors } from "../../../global/colors";
import { LINKS, PACKAGE_NAME } from "../../../global/links";

const PRESETS = [
  { name: "Lumio", primary: "#5b4dac", red: "#ca0f34" },
  { name: "Oceano", primary: "#0e7cc4", red: "#e5484d" },
  { name: "Floresta", primary: "#16865a", red: "#d64545" },
  { name: "Pôr do sol", primary: "#e0672b", red: "#c8102e" },
  { name: "Grafite", primary: "#27272a", red: "#dc2626" },
];

/** escurece uma cor hex em `amount` (0–1) para gerar o hover */
const darken = (hex: string, amount = 0.18) => {
  const n = parseInt(hex.slice(1), 16);
  const ch = (shift: number) =>
    Math.round(((n >> shift) & 255) * (1 - amount))
      .toString(16)
      .padStart(2, "0");
  return `#${ch(16)}${ch(8)}${ch(0)}`;
};

const Theme = () => {
  const [primary, setPrimary] = useState(PRESETS[0].primary);
  const [red, setRed] = useState(PRESETS[0].red);

  const colors = useMemo(
    () => ({
      primary,
      primaryHover: darken(primary),
      red,
      redHover: darken(red),
      whiteGrey: Colors.whiteGrey,
    }),
    [primary, red],
  );

  const code = `import { ThemeProvider } from "${PACKAGE_NAME}";

const App = () => {
  return (
    <ThemeProvider
      theme={{
        colors: {
          primary: "${colors.primary}",
          primaryHover: "${colors.primaryHover}",
          red: "${colors.red}",
          whiteGrey: "${colors.whiteGrey}",
          link: "${colors.primary}",
        },
      }}
    >
      {/* sua aplicação */}
    </ThemeProvider>
  );
};`;

  return (
    <Section id="temas">
      <Container>
        <Layout>
          <Reveal from="left">
            <Text>
              <Eyebrow>
                <FiDroplet /> Temas
              </Eyebrow>
              <SectionTitle>
                A sua marca, em <GradientText>todos os componentes</GradientText>
              </SectionTitle>
              <SectionLead>
                Envolva sua aplicação com o <code>ThemeProvider</code> e defina as
                cores globais uma única vez. Escolha uma paleta abaixo e veja o
                resultado aplicado na hora.
              </SectionLead>

              <Swatches role="radiogroup" aria-label="Paleta de cores">
                {PRESETS.map((p) => {
                  const active = p.primary === primary && p.red === red;
                  return (
                    <Swatch
                      key={p.name}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      $active={active}
                      onClick={() => {
                        setPrimary(p.primary);
                        setRed(p.red);
                      }}
                    >
                      <span className="dot" style={{ background: p.primary }}>
                        {active && <FiCheck />}
                      </span>
                      {p.name}
                    </Swatch>
                  );
                })}
                <Picker title="Cor personalizada">
                  <input
                    type="color"
                    value={primary}
                    onChange={(e) => setPrimary(e.target.value)}
                    aria-label="Escolher cor primária personalizada"
                  />
                  <span
                    className="dot"
                    style={{
                      background: `conic-gradient(${Colors.cyan}, ${Colors.primary}, ${Colors.magenta}, #f5b700, ${Colors.cyan})`,
                    }}
                  />
                  Custom
                </Picker>
              </Swatches>

              <ThemeProvider theme={{ colors }}>
                <Mock>
                  <div className="head">
                    <span className="avatar" style={{ background: primary }} />
                    <div>
                      <strong>Plano Pro</strong>
                      <small>Renovação mensal</small>
                    </div>
                    <span className="tag" style={{ color: primary }}>
                      Ativo
                    </span>
                  </div>
                  <div className="actions">
                    <Button variant="isPrimary">Fazer upgrade</Button>
                    <Button variant="isEmpty">Detalhes</Button>
                    <Button variant="isDanger">Cancelar</Button>
                  </div>
                </Mock>
              </ThemeProvider>
            </Text>
          </Reveal>

          <Reveal from="right" delay={120}>
            <CodeWindow code={code} filename="App.tsx" />
            <Aside>
              <Cta href={LINKS.storybook} variant="ghost">
                <SiStorybook />
                Ver componentes no Storybook
                <FiArrowRight />
              </Cta>
            </Aside>
          </Reveal>
        </Layout>
      </Container>
    </Section>
  );
};

export default Theme;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;

  > div {
    min-width: 0;
  }

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
    gap: 48px;
  }
`;

const Text = styled.div`
  code {
    font-family: "JetBrains Mono", monospace;
    font-size: 0.9em;
    padding: 2px 6px;
    border-radius: 6px;
    color: ${Colors.primary};
    background: rgba(91, 77, 172, 0.08);
  }
`;

const Swatches = styled.div`
  margin-top: 32px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const swatchBase = `
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 38px;
  padding: 0 14px 0 6px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  background: #fff;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;

  .dot {
    display: grid;
    place-items: center;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    color: #fff;
    font-size: 14px;
  }

  &:hover {
    transform: translateY(-1px);
  }
`;

const Swatch = styled.button<{ $active: boolean }>`
  ${swatchBase}
  color: ${(p) => (p.$active ? Colors.ink : Colors.muted)};
  border: 1px solid ${(p) => (p.$active ? "rgba(91,77,172,0.45)" : Colors.border)};
  box-shadow: ${(p) => (p.$active ? "0 6px 16px -8px rgba(91,77,172,0.5)" : "none")};
`;

const Picker = styled.label`
  ${swatchBase}
  position: relative;
  color: ${Colors.muted};
  border: 1px dashed ${Colors.border};

  input {
    position: absolute;
    inset: 0;
    opacity: 0;
    cursor: pointer;
  }
`;

const Mock = styled.div`
  margin-top: 28px;
  padding: 22px;
  border-radius: 18px;
  background: #fff;
  border: 1px solid ${Colors.border};
  box-shadow: 0 30px 60px -40px rgba(17, 15, 31, 0.4);

  .head {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    transition: background 0.4s;
  }

  strong {
    display: block;
    font-size: 15px;
    color: ${Colors.ink};
  }

  small {
    font-size: 13px;
    color: ${Colors.muted};
  }

  .tag {
    margin-left: auto;
    padding: 4px 10px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 600;
    background: transparent;
    border: 1px solid currentColor;
    transition: color 0.4s;
  }

  .actions {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .actions button {
    transition:
      background-color 0.4s,
      color 0.25s,
      border-color 0.4s;
  }
`;

const Aside = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;

  @media (max-width: 1000px) {
    justify-content: center;
  }
`;
