import React from 'react';
import { Sun, Moon, Sparkles, Layers, Box, Cpu, Droplets, Mic, Flame, Image as ImageIcon, type LucideIcon } from 'lucide-react';

export type LibraryKey = 'overview' | 'beam' | 'orbs' | 'avatars' | 'gooey' | 'voice' | 'metal' | 'image';

interface HeaderProps {
  activeLib: LibraryKey;
  onSelectLib: (key: LibraryKey) => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const LIBRARIES: { key: LibraryKey; name: string; tag: string; icon: LucideIcon }[] = [
  { key: 'overview', name: 'Overview', tag: 'All 7 Libraries', icon: Layers },
  { key: 'beam', name: 'Border Beam', tag: 'border-beam', icon: Box },
  { key: 'orbs', name: 'Thinking Orbs', tag: 'thinking-orbs', icon: Sparkles },
  { key: 'avatars', name: 'Bot Avatars', tag: 'bot-avatars', icon: Cpu },
  { key: 'gooey', name: 'Liquid Gooey', tag: 'liquid-gooey', icon: Droplets },
  { key: 'voice', name: 'Voice Glow', tag: 'voice-glow', icon: Mic },
  { key: 'metal', name: 'Liquid Metal', tag: 'metal-fx', icon: Flame },
  { key: 'image', name: 'Image FX', tag: 'img-fx', icon: ImageIcon },
];

export function Header({ activeLib, onSelectLib, theme, onToggleTheme }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-zinc-200/80 dark:border-white/[0.08] bg-white/80 dark:bg-[#070707]/80 px-4 lg:px-8 py-3 transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Brand & tag */}
        <div className="flex items-center justify-between">
          <div
            className="flex items-center gap-2.5 cursor-pointer select-none group"
            onClick={() => onSelectLib('overview')}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-400 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
              L
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-base tracking-tight text-zinc-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                  Libraries.dev
                </span>
                <span className="text-[10px] uppercase tracking-wider font-mono font-medium px-1.5 py-0.5 rounded bg-zinc-200/80 dark:bg-white/10 text-zinc-700 dark:text-white/70">
                  v2.0
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 hidden sm:block">
                High-crafted UI components for AI agents
              </p>
            </div>
          </div>

          {/* Theme switcher on mobile */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={onToggleTheme}
              className="p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-white/5 dark:hover:bg-white/10 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-white/10 transition-colors"
              title="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={15} className="text-amber-400" /> : <Moon size={15} className="text-indigo-600" />}
            </button>
          </div>
        </div>

        {/* Library Navigation Pills */}
        <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
          {LIBRARIES.map((lib) => {
            const Icon = lib.icon;
            const isActive = activeLib === lib.key;
            return (
              <button
                key={lib.key}
                type="button"
                onClick={() => onSelectLib(lib.key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-150 ${
                  isActive
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-semibold shadow-md shadow-zinc-900/10 dark:shadow-white/10 scale-[1.02]'
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:bg-white/5'
                }`}
              >
                <Icon size={13} className={isActive ? 'text-white dark:text-zinc-950' : 'text-zinc-500 dark:text-zinc-400'} />
                <span>{lib.name}</span>
              </button>
            );
          })}
        </nav>

        {/* Desktop Theme toggle & prompt button */}
        <div className="hidden md:flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-white/5 dark:hover:bg-white/10 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-white/10 text-xs font-medium transition-colors"
            title="Toggle theme"
          >
            {theme === 'dark' ? (
              <>
                <Sun size={13} className="text-amber-400" />
                <span>Light</span>
              </>
            ) : (
              <>
                <Moon size={13} className="text-indigo-600" />
                <span>Dark</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
