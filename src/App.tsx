import React, { useState, useEffect } from 'react';
import { Header, type LibraryKey } from './components/Header';
import { OverviewShowcase } from './components/OverviewShowcase';
import { BorderBeamShowcase } from './components/BorderBeamShowcase';
import { ThinkingOrbsShowcase } from './components/ThinkingOrbsShowcase';
import { BotAvatarsShowcase } from './components/BotAvatarsShowcase';
import { LiquidGooeyShowcase } from './components/LiquidGooeyShowcase';
import { VoiceGlowShowcase } from './components/VoiceGlowShowcase';
import { MetalFxShowcase } from './components/MetalFxShowcase';
import { ImageFxShowcase } from './components/ImageFxShowcase';

export default function App() {
  const [activeLib, setActiveLib] = useState<LibraryKey>('overview');
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('libraries-theme');
      if (stored === 'light' || stored === 'dark') return stored;
      return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('libraries-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fb] dark:bg-[#070707] text-zinc-900 dark:text-[#ededed] selection:bg-blue-500/20 transition-colors duration-200">
      {/* Top sticky navigation */}
      <Header
        activeLib={activeLib}
        onSelectLib={setActiveLib}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {activeLib === 'overview' && (
          <OverviewShowcase currentTheme={theme} onSelectLib={setActiveLib} />
        )}
        {activeLib === 'beam' && <BorderBeamShowcase currentTheme={theme} />}
        {activeLib === 'orbs' && <ThinkingOrbsShowcase currentTheme={theme} />}
        {activeLib === 'avatars' && <BotAvatarsShowcase currentTheme={theme} />}
        {activeLib === 'gooey' && <LiquidGooeyShowcase currentTheme={theme} />}
        {activeLib === 'voice' && <VoiceGlowShowcase currentTheme={theme} />}
        {activeLib === 'metal' && <MetalFxShowcase currentTheme={theme} />}
        {activeLib === 'image' && <ImageFxShowcase currentTheme={theme} />}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200/80 dark:border-white/5 py-8 px-4 text-center text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-zinc-800 dark:text-zinc-400">Libraries.dev</span>
            <span>·</span>
            <span>Created by Jakub Antalik</span>
          </div>
          <div className="flex items-center gap-4 text-zinc-500 dark:text-zinc-400">
            <span>React 18+</span>
            <span>·</span>
            <span>MIT License</span>
            <span>·</span>
            <span>Agent-Ready Prompts</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
