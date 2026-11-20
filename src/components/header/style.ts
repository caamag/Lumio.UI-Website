import styled from "styled-components";
import { Colors, Gradient } from "../../global/colors";

export const Header = styled.header<{ $scrolled: boolean }>`
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 1000;
  transition:
    background 0.3s ease,
    box-shadow 0.3s ease,
    border-color 0.3s ease;
  background: ${(p) => (p.$scrolled ? "rgba(255, 255, 255, 0.78)" : "transparent")};
  backdrop-filter: ${(p) => (p.$scrolled ? "saturate(180%) blur(16px)" : "none")};
  -webkit-backdrop-filter: ${(p) =>
    p.$scrolled ? "saturate(180%) blur(16px)" : "none"};
  border-bottom: 1px solid
    ${(p) => (p.$scrolled ? "rgba(17, 15, 31, 0.06)" : "transparent")};
`;

export const Inner = styled.div`
  max-width: 1200px;
  height: 72px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;

  @media (max-width: 600px) {
    height: 64px;
    padding: 0 16px;
  }
`;

export const Brand = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;

  .icon {
    height: 30px;
    width: 30px;
    transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .word {
    height: 40px;
    width: auto;
  }

  &:hover .icon {
    transform: rotate(-30deg) scale(1.05);
  }
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px;
  border-radius: 999px;

  a {
    position: relative;
    padding: 8px 14px;
    border-radius: 999px;
    font-size: 14px;
    font-weight: 500;
    color: ${Colors.muted};
    text-decoration: none;
    transition:
      color 0.2s,
      background 0.2s;

    &:hover {
      color: ${Colors.ink};
      background: rgba(91, 77, 172, 0.07);
    }
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const DesktopOnly = styled.div`
  @media (max-width: 900px) {
    display: none;
  }
`;

export const IconLink = styled.a`
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  color: ${Colors.text};
  font-size: 18px;
  transition:
    background 0.2s,
    color 0.2s;

  &:hover {
    background: rgba(91, 77, 172, 0.08);
    color: ${Colors.primary};
  }
`;

export const MenuButton = styled.button`
  display: none;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(91, 77, 172, 0.08);
  color: ${Colors.ink};
  font-size: 20px;
  cursor: pointer;

  @media (max-width: 900px) {
    display: grid;
  }
`;

export const Progress = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  height: 2px;
  background: ${Gradient};
  transform-origin: 0 50%;
  transform: scaleX(0);
  transition: transform 0.15s linear;
  will-change: transform;
  pointer-events: none;
`;

export const MobileMenu = styled.div<{ $open: boolean }>`
  display: none;

  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 64px;
    left: 0;
    right: 0;
    height: calc(100dvh - 64px);
    padding: 24px 16px 32px;
    background: rgba(255, 255, 255, 0.97);
    backdrop-filter: blur(16px);
    opacity: ${(p) => (p.$open ? 1 : 0)};
    visibility: ${(p) => (p.$open ? "visible" : "hidden")};
    transition:
      opacity 0.3s ease,
      visibility 0.3s;

    > a {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 16px 4px;
      font-size: 22px;
      font-weight: 600;
      letter-spacing: -0.02em;
      color: ${Colors.ink};
      text-decoration: none;
      border-bottom: 1px solid ${Colors.border};
      opacity: ${(p) => (p.$open ? 1 : 0)};
      transform: ${(p) => (p.$open ? "none" : "translateY(10px)")};
      transition:
        opacity 0.4s ease,
        transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
    }
  }
`;

export const MobileCta = styled.div`
  margin-top: auto;

  a {
    width: 100%;
  }
`;
