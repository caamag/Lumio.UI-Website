import styled from "styled-components";
import { type ButtonProps } from "./button.types";
import { Colors } from "../../global/colors";

/**
 * Réplica do Button do @cainho_dev/lumio-ui, usada nas prévias ao vivo.
 * Lê as cores do ThemeProvider (como a biblioteca) com fallback para a paleta padrão.
 */
type ThemeColors = Partial<typeof Colors>;

const c = (theme: unknown, key: keyof typeof Colors) =>
  ((theme as { colors?: ThemeColors })?.colors?.[key] ?? Colors[key]) as string;

export const Button = styled.button<ButtonProps>`
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
  font-size: ${(p) => (p.size ? p.size + "px" : "14px")};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 250ms;
  width: ${(p) => (p.width ? p.width + "px" : "auto")};

  color: ${(p) => (p.variant === "isEmpty" ? c(p.theme, "primary") : "white")};

  background-color: ${(p) =>
    p.variant === "isPrimary"
      ? c(p.theme, "primary")
      : p.variant === "isEmpty"
        ? "transparent"
        : c(p.theme, "red")};

  border: 1px solid
    ${(p) => (p.variant === "isEmpty" ? c(p.theme, "primary") : "transparent")};

  &:hover {
    background-color: ${(p) =>
      p.variant === "isPrimary"
        ? c(p.theme, "primaryHover")
        : p.variant === "isEmpty"
          ? c(p.theme, "primary")
          : c(p.theme, "redHover")};
    color: white;
  }

  &:disabled {
    background-color: ${(p) => c(p.theme, "whiteGrey")};
    border-color: transparent;
    color: white;
    cursor: not-allowed;
  }
`;
