import { useCallback, useEffect, useRef, useState } from "react";

export const useCopy = (resetAfter = 2000) => {
  const [copied, setCopied] = useState<string | null>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = useCallback(
    (text: string, key: string = text) => {
      navigator.clipboard?.writeText(text).then(() => {
        setCopied(key);
        window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => setCopied(null), resetAfter);
      });
    },
    [resetAfter],
  );

  return { copied, copy };
};
