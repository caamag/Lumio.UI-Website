import { useMemo, useState } from "react";
import styled from "styled-components";
import { FiArrowRight, FiMousePointer } from "react-icons/fi";
import { SiStorybook } from "react-icons/si";
import Reveal from "../../../components/ui/Reveal";
import Cta from "../../../components/ui/Cta";
import CodeWindow from "../../../components/ui/CodeWindow";
import {
  Container,
  Eyebrow,
  GradientText,
  Section,
  SectionHeader,
  SectionLead,
  SectionTitle,
} from "../../../components/ui/layout";
import { Button } from "../../../components/Button/button";
import { Colors } from "../../../global/colors";
import { LINKS, PACKAGE_NAME } from "../../../global/links";

type Variant = "isPrimary" | "isEmpty" | "isDanger";
const VARIANTS: Variant[] = ["isPrimary", "isEmpty", "isDanger"];

const Playground = () => {
  const [variant, setVariant] = useState<Variant>("isPrimary");
  const [size, setSize] = useState(16);
  const [disabled, setDisabled] = useState(false);
  const [label, setLabel] = useState("Clique aqui");
  const [clicks, setClicks] = useState(0);

  const code = useMemo(() => {
    const props = [`variant="${variant}"`];
    if (size !== 14) props.push(`size={${size}}`);
    if (disabled) props.push("disabled");
    return `import { Button } from "${PACKAGE_NAME}";

const Example = () => {
  return (
    <Button ${props.join(" ")}>
      ${label || "Botão"}
    </Button>
  );
};`;
  }, [variant, size, disabled, label]);

  return (
    <Section id="playground" style={{ background: Colors.surface }}>
      <Container>
        <Reveal>
          <SectionHeader>
            <Eyebrow>
              <FiMousePointer /> Playground
            </Eyebrow>
            <SectionTitle>
              Mexa nas props, <GradientText>veja na hora</GradientText>
            </SectionTitle>
            <SectionLead>
              Este é o componente Button do Lumio.UI funcionando de verdade. Ajuste
              as propriedades e copie o código pronto para o seu projeto.
            </SectionLead>
          </SectionHeader>
        </Reveal>

        <Reveal from="scale">
          <Board>
            <Controls>
              <Field>
                <span>variant</span>
                <Segmented role="radiogroup" aria-label="Variante">
                  {VARIANTS.map((v) => (
                    <button
                      key={v}
                      type="button"
                      role="radio"
                      aria-checked={variant === v}
                      className={variant === v ? "active" : ""}
                      onClick={() => setVariant(v)}
                    >
                      {v}
                    </button>
                  ))}
                </Segmented>
              </Field>

              <Field>
                <span>
                  size <em>{size}px</em>
                </span>
                <Range
                  type="range"
                  min={12}
                  max={22}
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  aria-label="Tamanho da fonte"
                  style={{ ["--p" as string]: `${((size - 12) / 10) * 100}%` }}
                />
              </Field>

              <Field>
                <span>children</span>
                <TextInput
                  value={label}
                  maxLength={24}
                  onChange={(e) => setLabel(e.target.value)}
                  aria-label="Texto do botão"
                />
              </Field>

              <Toggle>
                <span>disabled</span>
                <input
                  type="checkbox"
                  checked={disabled}
                  onChange={(e) => setDisabled(e.target.checked)}
                />
                <i aria-hidden />
              </Toggle>
            </Controls>

            <Stage>
              <Preview>
                <Button
                  key={variant}
                  variant={variant}
                  size={size}
                  disabled={disabled}
                  onClick={() => setClicks((c) => c + 1)}
                >
                  {label || "Botão"}
                </Button>
                <Counter key={clicks} $show={clicks > 0}>
                  {clicks} {clicks === 1 ? "clique" : "cliques"}
                </Counter>
              </Preview>
              <CodeWindow code={code} filename="Example.tsx" />
            </Stage>
          </Board>
        </Reveal>

        <Reveal>
          <Footer>
            <p>Quer ver todas as props, estados e histórias do componente?</p>
            <Cta href={LINKS.storybook}>
              <SiStorybook />
              Abrir no Storybook
              <FiArrowRight />
            </Cta>
          </Footer>
        </Reveal>
      </Container>
    </Section>
  );
};

export default Playground;

const Board = styled.div`
  display: grid;
  grid-template-columns: 320px 1fr;
  border-radius: 24px;
  background: #fff;
  border: 1px solid ${Colors.border};
  box-shadow: 0 40px 80px -50px rgba(17, 15, 31, 0.35);
  overflow: hidden;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Controls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 26px;
  padding: 32px 28px;
  border-right: 1px solid ${Colors.border};

  @media (max-width: 900px) {
    border-right: none;
    border-bottom: 1px solid ${Colors.border};
    padding: 24px 20px;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  > span {
    display: flex;
    justify-content: space-between;
    font-family: "JetBrains Mono", monospace;
    font-size: 12px;
    font-weight: 500;
    color: ${Colors.muted};
  }

  em {
    font-style: normal;
    color: ${Colors.primary};
  }
`;

const Segmented = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 4px;
  gap: 4px;
  border-radius: 12px;
  background: ${Colors.surface};
  border: 1px solid ${Colors.border};

  button {
    height: 34px;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 600;
    color: ${Colors.muted};
    background: transparent;
    cursor: pointer;
    transition: all 0.2s;
  }

  button:hover {
    color: ${Colors.ink};
  }

  button.active {
    color: ${Colors.primary};
    background: #fff;
    box-shadow: 0 2px 8px -2px rgba(17, 15, 31, 0.15);
  }
`;

const Range = styled.input`
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 6px;
  border-radius: 99px;
  background: linear-gradient(
    90deg,
    ${Colors.primary} var(--p),
    ${Colors.border} var(--p)
  );
  cursor: pointer;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #fff;
    border: 2px solid ${Colors.primary};
    box-shadow: 0 2px 8px rgba(91, 77, 172, 0.35);
    transition: transform 0.15s;
  }

  &::-webkit-slider-thumb:hover {
    transform: scale(1.15);
  }

  &::-moz-range-thumb {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #fff;
    border: 2px solid ${Colors.primary};
  }
`;

const TextInput = styled.input`
  height: 42px;
  padding: 0 14px;
  border-radius: 10px;
  border: 1px solid ${Colors.border};
  font-family: inherit;
  font-size: 14px;
  color: ${Colors.ink};
  background: #fff;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;

  &:focus {
    outline: none;
    border-color: ${Colors.primary};
    box-shadow: 0 0 0 4px rgba(91, 77, 172, 0.12);
  }
`;

const Toggle = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  span {
    font-family: "JetBrains Mono", monospace;
    font-size: 12px;
    font-weight: 500;
    color: ${Colors.muted};
  }

  input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }

  i {
    position: relative;
    width: 44px;
    height: 26px;
    border-radius: 99px;
    background: ${Colors.border};
    transition: background 0.25s;
  }

  i::after {
    content: "";
    position: absolute;
    top: 3px;
    left: 3px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 2px 6px rgba(17, 15, 31, 0.2);
    transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
  }

  input:checked + i {
    background: ${Colors.primary};
  }

  input:checked + i::after {
    transform: translateX(18px);
  }

  input:focus-visible + i {
    outline: 2px solid ${Colors.primary};
    outline-offset: 3px;
  }
`;

const Stage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 28px;
  min-width: 0;

  @media (max-width: 600px) {
    padding: 16px;
  }
`;

const Preview = styled.div`
  position: relative;
  display: grid;
  place-items: center;
  min-height: 220px;
  border-radius: 16px;
  border: 1px dashed rgba(91, 77, 172, 0.25);
  background-color: #fcfbff;
  background-image: radial-gradient(rgba(91, 77, 172, 0.18) 1px, transparent 1px);
  background-size: 18px 18px;

  > button {
    animation: pop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  @keyframes pop {
    from {
      transform: scale(0.85);
      opacity: 0;
    }
    to {
      transform: none;
      opacity: 1;
    }
  }
`;

const Counter = styled.span<{ $show: boolean }>`
  position: absolute;
  right: 14px;
  bottom: 12px;
  font-family: "JetBrains Mono", monospace;
  font-size: 11px;
  color: ${Colors.primary};
  opacity: ${(p) => (p.$show ? 1 : 0)};
  animation: ${(p) => (p.$show ? "bump 0.4s ease" : "none")};

  @keyframes bump {
    0% {
      transform: translateY(6px);
      opacity: 0;
    }
    100% {
      transform: none;
      opacity: 1;
    }
  }
`;

const Footer = styled.div`
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  text-align: center;

  p {
    font-size: 16px;
    color: ${Colors.muted};
  }
`;
