import type { ReactNode } from "react";
import styled from "styled-components";
import { FiCheck, FiCopy } from "react-icons/fi";
import { useCopy } from "../../hooks/useCopy";

const TOKEN =
  /(\{?\/\*[\s\S]*?\*\/\}?|\/\/.*)|("[^"\n]*"|'[^'\n]*')|(\b(?:import|from|const|return|export|default|true|false)\b)|(<\/?[A-Za-z][\w.]*|\/?>)|(\b[a-zA-Z]+(?==))|(\b[A-Z][A-Za-z]*\b)/g;

const classes = ["cm", "st", "kw", "tg", "at", "cp"];

const highlight = (code: string): ReactNode[] => {
  const out: ReactNode[] = [];
  let last = 0;
  let i = 0;
  for (const m of code.matchAll(TOKEN)) {
    const idx = m.index ?? 0;
    if (idx > last) out.push(code.slice(last, idx));
    const group = m.slice(1).findIndex((g) => g !== undefined);
    out.push(
      <span key={i++} className={classes[group]}>
        {m[0]}
      </span>,
    );
    last = idx + m[0].length;
  }
  if (last < code.length) out.push(code.slice(last));
  return out;
};

const Window = styled.div`
  position: relative;
  border-radius: 16px;
  background: #15121f;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow:
    0 30px 60px -30px rgba(17, 15, 31, 0.6),
    0 0 0 1px rgba(91, 77, 172, 0.08);
  overflow: hidden;
  text-align: left;
  min-width: 0;
`;

const Bar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 44px;
  padding: 0 12px 0 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(255, 255, 255, 0.02);

  i {
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: #ff5f57;
    flex-shrink: 0;
  }
  i:nth-child(2) {
    background: #febc2e;
  }
  i:nth-child(3) {
    background: #28c840;
  }

  span {
    margin-left: 10px;
    font-family: "JetBrains Mono", monospace;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.45);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const CopyBtn = styled.button<{ $done: boolean }>`
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 28px;
  padding: 0 10px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  flex-shrink: 0;
  color: ${(p) => (p.$done ? "#7ee2a8" : "rgba(255,255,255,0.65)")};
  background: rgba(255, 255, 255, 0.06);
  transition:
    background 0.2s,
    color 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
    color: ${(p) => (p.$done ? "#7ee2a8" : "#fff")};
  }
`;

const Pre = styled.pre`
  margin: 0;
  padding: 22px 24px 26px;
  overflow-x: auto;
  font-family: "JetBrains Mono", "Fira Code", monospace;
  font-size: 13.5px;
  line-height: 1.75;
  color: #e6e3f5;
  tab-size: 2;

  .cm {
    color: #7a7596;
    font-style: italic;
  }
  .st {
    color: #a5e8a0;
  }
  .kw {
    color: #c792ea;
  }
  .tg {
    color: #7fc8ff;
  }
  .at {
    color: #ffcb8b;
  }
  .cp {
    color: #f78fb3;
  }

  @media (max-width: 600px) {
    padding: 18px 16px 20px;
    font-size: 12.5px;
  }
`;

interface CodeWindowProps {
  code: string;
  filename?: string;
  className?: string;
}

const CodeWindow = ({ code, filename = "App.tsx", className }: CodeWindowProps) => {
  const { copied, copy } = useCopy();
  return (
    <Window className={className}>
      <Bar>
        <i />
        <i />
        <i />
        <span>{filename}</span>
        <CopyBtn
          type="button"
          $done={copied !== null}
          onClick={() => copy(code)}
          aria-label="Copiar código"
        >
          {copied ? <FiCheck /> : <FiCopy />}
          {copied ? "Copiado" : "Copiar"}
        </CopyBtn>
      </Bar>
      <Pre>
        <code>{highlight(code)}</code>
      </Pre>
    </Window>
  );
};

export default CodeWindow;
