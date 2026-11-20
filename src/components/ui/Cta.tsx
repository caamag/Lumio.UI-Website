import type { ReactNode } from "react";
import styled, { css } from "styled-components";
import { Colors } from "../../global/colors";

type Variant = "primary" | "ghost" | "light" | "outlineLight";
type Size = "sm" | "md" | "lg";

const sizes = {
  sm: css`
    height: 38px;
    padding: 0 16px;
    font-size: 14px;
    border-radius: 10px;
  `,
  md: css`
    height: 46px;
    padding: 0 22px;
    font-size: 15px;
    border-radius: 12px;
  `,
  lg: css`
    height: 54px;
    padding: 0 28px;
    font-size: 16px;
    border-radius: 14px;
  `,
};

const variants = {
  primary: css`
    color: #fff;
    background: linear-gradient(
      135deg,
      ${Colors.primary} 0%,
      #7a4fc4 55%,
      ${Colors.magenta} 130%
    );
    box-shadow:
      0 1px 0 rgba(255, 255, 255, 0.25) inset,
      0 10px 30px -10px rgba(91, 77, 172, 0.7);

    &:hover {
      box-shadow:
        0 1px 0 rgba(255, 255, 255, 0.25) inset,
        0 18px 40px -12px rgba(91, 77, 172, 0.85);
    }
  `,
  ghost: css`
    color: ${Colors.ink};
    background: rgba(255, 255, 255, 0.7);
    border: 1px solid ${Colors.border};
    backdrop-filter: blur(8px);

    &:hover {
      border-color: rgba(91, 77, 172, 0.4);
      color: ${Colors.primary};
    }
  `,
  light: css`
    color: ${Colors.primary};
    background: #fff;
    box-shadow: 0 12px 30px -12px rgba(17, 15, 31, 0.5);
  `,
  outlineLight: css`
    color: #fff;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.35);

    &:hover {
      background: rgba(255, 255, 255, 0.16);
    }
  `,
};

const Anchor = styled.a<{ $variant: Variant; $size: Size }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  isolation: isolate;
  transition:
    transform 0.25s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.25s ease,
    background 0.25s ease,
    border-color 0.25s ease,
    color 0.25s ease;

  ${(p) => sizes[p.$size]}
  ${(p) => variants[p.$variant]}

  /* brilho que atravessa o botão no hover */
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    background: linear-gradient(
      110deg,
      transparent 30%,
      rgba(255, 255, 255, 0.35) 50%,
      transparent 70%
    );
    transform: translateX(-120%);
    transition: transform 0.7s ease;
    pointer-events: none;
  }

  svg {
    flex-shrink: 0;
    transition: transform 0.25s ease;
  }

  &:hover {
    transform: translateY(-2px);
  }

  &:hover::after {
    transform: translateX(120%);
  }

  &:hover svg:last-child:not(:first-child) {
    transform: translateX(3px);
  }

  &:active {
    transform: translateY(0);
  }
`;

interface CtaProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  external?: boolean;
  className?: string;
}

const Cta = ({
  href,
  children,
  variant = "primary",
  size = "md",
  external = true,
  className,
}: CtaProps) => (
  <Anchor
    href={href}
    $variant={variant}
    $size={size}
    className={className}
    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
  >
    {children}
  </Anchor>
);

export default Cta;
