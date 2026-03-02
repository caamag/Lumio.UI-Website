import styled from "styled-components";
import { Colors } from "../../global/colors";

export const HomeContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 120px;
`;

export const HomeSection = styled.section<{ bgColor?: string }>`
  width: 100%;
  margin: 100px 0px 50px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  border-radius: 8px;
  background-color: ${(props) => props.bgColor || "white"};

  img {
    width: 50%;
  }
`;

export const Content = styled.div`
  width: 50%;
  min-width: 400px;
`;

export const Title = styled.h1`
  font-size: 48px;
  line-height: 1;
  font-weight: 500;

  span {
    color: #bebebe;
  }
`;

export const Description = styled.p`
  font-size: 18px;
  color: gray;
  margin-top: 20px;
  font-weight: 500;
  line-height: 25px;
  margin-bottom: 10px;
`;

export const BtnContainer = styled.div`
  display: flex;
  gap: 15px;
`;

export const Subtitle = styled.h2`
  text-align: center;
  font-size: 32px;
  font-weight: 400;
  width: 100%;
  margin-top: 40px;
`;

export const CodeBox = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 20px 40px;
  box-sizing: border-box;
  margin: 0 auto;
  margin-bottom: 40px;
  margin-top: 20px;
  background-color: white;
  border-radius: 8px;

  pre {
    width: 100%;
    box-sizing: border-box;
    padding: 40px;
    background-color: rgb(40, 40, 40);
    border-radius: 8px;
  }

  code {
    font-size: 16px;
    color: white;
    font-family: "Fira Code", monospace;
    font-size: 1.4rem;
    line-height: 1.6;
    color: #f8f8f2;
    white-space: pre-wrap;
    word-break: break-word;
  }
`;

export const CopyCodeContainer = styled.p<{ isCopied?: boolean }>`
  font-size: 18px;
  margin: 30px 0px;
  color: ${Colors.primary};
  font-weight: 400;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid
    ${(props) => (props.isCopied ? Colors.primary : "rgb(220, 220, 220)")};
  box-sizing: border-box;
  border-radius: 4px;

  &:hover {
    border-color: ${Colors.primary};
    cursor: pointer;
  }

  svg {
    cursor: pointer;
    color: ${Colors.primary};
  }
`;

export const OrText = styled.p`
  text-align: center;
  width: 100%;
  font-size: 18px;
  color: ${Colors.primary};
`;
