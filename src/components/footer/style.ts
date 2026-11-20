import styled from "styled-components";
import { Colors } from "../../global/colors";

export const Footer = styled.footer`
  border-top: 1px solid ${Colors.border};
  background: ${Colors.surface};
`;

export const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 64px 24px 48px;
  display: flex;
  justify-content: space-between;
  gap: 48px;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    padding: 48px 16px 32px;
  }
`;

export const Brand = styled.div`
  max-width: 360px;

  p {
    margin-top: 16px;
    font-size: 14px;
    line-height: 1.7;
    color: ${Colors.muted};
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  .icon {
    width: 28px;
    height: 28px;
  }

  .word {
    height: 38px;
    width: auto;
  }
`;

export const Socials = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 20px;

  a {
    display: grid;
    place-items: center;
    width: 38px;
    height: 38px;
    border-radius: 10px;
    border: 1px solid ${Colors.border};
    background: #fff;
    color: ${Colors.muted};
    font-size: 16px;
    transition:
      color 0.2s,
      border-color 0.2s,
      transform 0.2s;

    &:hover {
      color: ${Colors.primary};
      border-color: rgba(91, 77, 172, 0.35);
      transform: translateY(-2px);
    }
  }
`;

export const Columns = styled.div`
  display: flex;
  gap: 80px;

  div {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  h4 {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: ${Colors.ink};
    margin-bottom: 4px;
  }

  a {
    font-size: 14px;
    color: ${Colors.muted};
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: ${Colors.primary};
    }
  }

  @media (max-width: 600px) {
    gap: 48px;
  }
`;

export const Bottom = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  border-top: 1px solid ${Colors.border};
  display: flex;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  font-size: 13px;
  color: ${Colors.muted};

  @media (max-width: 600px) {
    padding: 20px 16px 28px;
  }
`;
