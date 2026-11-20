import styled from "styled-components";
import { Colors, Gradient } from "../../global/colors";

export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;

  @media (max-width: 600px) {
    padding: 0 16px;
  }
`;

export const Section = styled.section`
  position: relative;
  padding: 120px 0;

  @media (max-width: 768px) {
    padding: 80px 0;
  }
`;

export const GradientText = styled.span`
  background: ${Gradient};
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: lumioShift 8s ease-in-out infinite;

  @keyframes lumioShift {
    0%,
    100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }
`;

export const SectionHeader = styled.div<{ $align?: "center" | "left" }>`
  max-width: 680px;
  margin: 0 ${(p) => (p.$align === "left" ? "0" : "auto")} 56px;
  text-align: ${(p) => p.$align ?? "center"};
`;

export const Eyebrow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${Colors.primary};
  background: rgba(91, 77, 172, 0.08);
  border: 1px solid rgba(91, 77, 172, 0.16);
  margin-bottom: 20px;
`;

export const SectionTitle = styled.h2`
  font-size: clamp(30px, 4.2vw, 46px);
  line-height: 1.1;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: ${Colors.ink};
`;

export const SectionLead = styled.p`
  margin-top: 18px;
  font-size: clamp(16px, 1.6vw, 18px);
  line-height: 1.65;
  color: ${Colors.muted};
`;
