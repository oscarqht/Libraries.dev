import React, { useState } from 'react';
import { Copy, Check, Terminal, Code2, Sparkles } from 'lucide-react';

interface CodeBlockProps {
  npmCmd: string;
  code: string;
  prompt: string;
  filename?: string;
}

export function CodeBlock({ npmCmd, code, prompt, filename = 'Component.tsx' }: CodeBlockProps) {
  const [tab, setTab] = useState<'jsx' | 'install' | 'prompt'>('jsx');
  const [copied, setCopied] = useState(false);

  const activeContent = tab === 'jsx' ? code : tab === 'install' ? npmCmd : prompt;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-xl border border-zinc-300/80 dark:border-white/10 bg-[#0d0d0f] overflow-hidden shadow-lg dark:shadow-2xl">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setTab('jsx')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              tab === 'jsx'
                ? 'bg-white/10 text-white'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
            }`}
          >
            <Code2 size={13} />
            {filename}
          </button>
          <button
            type="button"
            onClick={() => setTab('install')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              tab === 'install'
                ? 'bg-white/10 text-white'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
            }`}
          >
            <Terminal size={13} />
            Install
          </button>
          <button
            type="button"
            onClick={() => setTab('prompt')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              tab === 'prompt'
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
            }`}
          >
            <Sparkles size={13} />
            Agent Prompt
          </button>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-md transition-all active:scale-95"
          title="Copy to clipboard"
        >
          {copied ? (
            <>
              <Check size={13} className="text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy size={13} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code body */}
      <div className="p-4 overflow-x-auto text-xs leading-relaxed font-mono">
        <pre className="text-zinc-300 whitespace-pre">
          <code>{activeContent}</code>
        </pre>
      </div>
    </div>
  );
}
