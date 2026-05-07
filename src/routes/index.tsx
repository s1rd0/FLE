import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

function extractInitials(text: string): string {
  return text
    .split(/\s+/)
    .map((w) => w.replace(/[^\p{L}\p{N}]/gu, ""))
    .filter(Boolean)
    .map((w) => w[0])
    .join("");
}

function Index() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const result = useMemo(() => extractInitials(text), [text]);

  const copy = async () => {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <main>
      <h1>First Letter Extractor</h1>
      <p>Paste text below. Punctuation is ignored.</p>

      <form>
        <fieldset>
          <legend>Input</legend>
          <textarea
            rows={10}
            cols={80}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste text here..."
          />
        </fieldset>

        <fieldset>
          <legend>Output</legend>
          <textarea rows={4} cols={80} value={result} readOnly />
          <br />
          <button
            type="button"
            onClick={copy}
            disabled={!result}
            style={{ background: "#0a0", color: "#fff", padding: "4px 12px", marginRight: 8 }}
          >
            {copied ? "Copied" : "Copy"}
          </button>
          <button
            type="button"
            onClick={() => setText("")}
            style={{ background: "#a00", color: "#fff", padding: "4px 12px" }}
          >
            Clear
          </button>
        </fieldset>
      </form>
    </main>
  );
}
