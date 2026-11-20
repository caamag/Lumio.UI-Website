import { useState, type CSSProperties, type ReactNode } from "react";
import styled from "styled-components";
import { useInView } from "../../hooks/useInView";

/*
 * Classe estática: só um atributo muda quando o elemento aparece, então o
 * styled-components não gera classes novas no meio da transição. Anima apenas
 * opacity e transform (compostas na GPU) com easing "expo-out" bem suave.
 */
const Wrapper = styled.div`
  opacity: 0;
  transform: var(--reveal-from);
  transition:
    opacity 1s cubic-bezier(0.16, 1, 0.3, 1) var(--reveal-delay),
    transform 1.3s cubic-bezier(0.16, 1, 0.3, 1) var(--reveal-delay);
  will-change: opacity, transform;

  &[data-visible="true"] {
    opacity: 1;
    transform: none;
  }

  &[data-done="true"] {
    will-change: auto;
  }

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    transform: none;
  }
`;

const directions = {
  up: "translate3d(0, 56px, 0)",
  left: "translate3d(-56px, 0, 0)",
  right: "translate3d(56px, 0, 0)",
  scale: "translate3d(0, 40px, 0) scale(0.94)",
};

interface RevealProps {
  children: ReactNode;
  delay?: number;
  from?: keyof typeof directions;
  className?: string;
}

const Reveal = ({ children, delay = 0, from = "up", className }: RevealProps) => {
  const [ref, visible] = useInView<HTMLDivElement>();
  const [done, setDone] = useState(false);

  return (
    <Wrapper
      ref={ref}
      className={className}
      data-visible={visible}
      data-done={done}
      onTransitionEnd={(e) => {
        if (e.target === e.currentTarget && e.propertyName === "transform") setDone(true);
      }}
      style={
        {
          "--reveal-from": directions[from],
          "--reveal-delay": `${delay}ms`,
        } as CSSProperties
      }
    >
      {children}
    </Wrapper>
  );
};

export default Reveal;
