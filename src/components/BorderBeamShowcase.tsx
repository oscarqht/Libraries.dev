import React, { useState } from 'react';
import { BorderBeam, type BorderBeamSize, type BorderBeamColorVariant } from 'border-beam';
import { CodeBlock } from './CodeBlock';
import { Send, Search, CheckCircle2, Sparkles, Layers, Sliders, Play, Pause } from 'lucide-react';

interface Props {
  currentTheme: 'dark' | 'light';
}

export function BorderBeamShowcase({ currentTheme }: Props) {
  const [size, setSize] = useState<BorderBeamSize>('md');
  const [variant, setVariant] = useState<BorderBeamColorVariant>('colorful');
  const [active, setActive] = useState(true);
  const [staticColors, setStaticColors] = useState(false);
  const [duration, setDuration] = useState(8);
  const [radius, setRadius] = useState(20);
  const [activeDemo, setActiveDemo] = useState<'chat' | 'tasks' | 'search' | 'button'>('chat');

  const jsxCode = `import { BorderBeam } from 'border-beam';

export function ExampleCard() {
  return (
    <BorderBeam
      size="${size}"
      colorVariant="${variant}"
      theme="${currentTheme}"
      active={${active}}
      duration={${duration}}
      borderRadius={${radius}}
    >
      <div className="p-6 rounded-[${radius}px] bg-[#141414] border border-white/10">
        <h3>AI Agent Task</h3>
        <p>Glow follows the card's boundary continuously.</p>
      </div>
    </BorderBeam>
  );
}`;

  const promptText = `Use the 'border-beam' package to create an animated border glow around this container:
- Size preset: "${size}" (options: md, sm, line, pulse-outside, pulse-inner)
- Color variant: "${variant}" (options: colorful, ocean, sunset, mono)
- Theme: "${currentTheme}"
- Corner radius: ${radius}px
- Duration: ${duration}s`;

  return (
    <div className="space-y-10">
      {/* Intro hero banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-zinc-200/80 dark:border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-mono mb-2">
            npm install border-beam
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Border Beam
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2 max-w-2xl text-sm leading-relaxed">
            A soft glow that rides the border of a card, button or input. Rotating light sweeps, inward/outward pulses, and razor-sharp travelling hairlines.
          </p>
        </div>

        {/* Quick status badges */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActive(!active)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              active
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                : 'bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400'
            }`}
          >
            {active ? <Play size={13} /> : <Pause size={13} />}
            <span>{active ? 'Active' : 'Paused'}</span>
          </button>
        </div>
      </div>

      {/* Interactive Controls & Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Knobs / Control Panel */}
        <div className="lg:col-span-4 rounded-2xl border border-zinc-200/90 dark:border-white/10 bg-white dark:bg-[#111113] p-5 space-y-6 shadow-sm dark:shadow-none">
          <div className="flex items-center gap-2 pb-3 border-b border-zinc-100 dark:border-white/10 text-zinc-900 dark:text-white font-medium text-sm">
            <Sliders size={16} className="text-blue-500 dark:text-blue-400" />
            <span>Interactive Controls</span>
          </div>

          {/* Size / Preset */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
              Beam Style Preset
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {(['md', 'sm', 'line', 'pulse-outside', 'pulse-inner'] as BorderBeamSize[]).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all text-left ${
                    size === s
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold shadow-sm'
                      : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 dark:bg-white/5 dark:text-zinc-300 dark:hover:bg-white/10'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Color Variant */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
              Color Variant
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {(['colorful', 'ocean', 'sunset', 'mono'] as BorderBeamColorVariant[]).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setVariant(v)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                    variant === v
                      ? 'bg-blue-600 text-white shadow-sm font-semibold'
                      : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 dark:bg-white/5 dark:text-zinc-300 dark:hover:bg-white/10'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Duration slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">Speed / Duration</span>
              <span className="font-mono text-zinc-700 dark:text-zinc-300">{duration}s</span>
            </div>
            <input
              type="range"
              min="2"
              max="20"
              step="1"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full accent-blue-500 bg-zinc-200 dark:bg-white/10 rounded-lg h-1.5 cursor-pointer"
            />
          </div>

          {/* Border radius */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">Corner Radius</span>
              <span className="font-mono text-zinc-700 dark:text-zinc-300">{radius}px</span>
            </div>
            <input
              type="range"
              min="8"
              max="32"
              step="2"
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="w-full accent-blue-500 bg-zinc-200 dark:bg-white/10 rounded-lg h-1.5 cursor-pointer"
            />
          </div>

          {/* Static colors toggle */}
          <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-white/5">
            <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Static Colors</span>
            <button
              type="button"
              onClick={() => setStaticColors(!staticColors)}
              className={`w-9 h-5 rounded-full transition-colors relative ${
                staticColors ? 'bg-blue-600' : 'bg-zinc-300 dark:bg-zinc-700'
              }`}
            >
              <div
                className={`w-3.5 h-3.5 rounded-full bg-white absolute top-0.5 transition-transform ${
                  staticColors ? 'left-4.5' : 'left-0.5'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Live Stage */}
        <div className="lg:col-span-8 space-y-6">
          {/* Demo UI selector tabs */}
          <div className="flex items-center gap-2 p-1 rounded-xl bg-zinc-100 dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/10 w-fit">
            <button
              type="button"
              onClick={() => setActiveDemo('chat')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                activeDemo === 'chat' ? 'bg-white text-zinc-950 shadow-sm dark:bg-white/10 dark:text-white' : 'text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white'
              }`}
            >
              Chat Input
            </button>
            <button
              type="button"
              onClick={() => setActiveDemo('tasks')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                activeDemo === 'tasks' ? 'bg-white text-zinc-950 shadow-sm dark:bg-white/10 dark:text-white' : 'text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white'
              }`}
            >
              Agent Task Card
            </button>
            <button
              type="button"
              onClick={() => setActiveDemo('search')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                activeDemo === 'search' ? 'bg-white text-zinc-950 shadow-sm dark:bg-white/10 dark:text-white' : 'text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white'
              }`}
            >
              Search Pill
            </button>
            <button
              type="button"
              onClick={() => setActiveDemo('button')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                activeDemo === 'button' ? 'bg-white text-zinc-950 shadow-sm dark:bg-white/10 dark:text-white' : 'text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white'
              }`}
            >
              Action Button
            </button>
          </div>

          {/* Interactive Preview Canvas */}
          <div className="relative rounded-2xl border border-zinc-200/90 dark:border-white/10 bg-zinc-100/90 dark:bg-[#0c0c0e] min-h-[380px] p-8 flex items-center justify-center overflow-hidden">
            {/* Background ambient grid */}
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: currentTheme === 'dark' ? 'radial-gradient(circle, #fff 1px, transparent 1px)' : 'radial-gradient(circle, #000 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />

            {activeDemo === 'chat' && (
              <BorderBeam
                size={size}
                colorVariant={variant}
                theme={currentTheme}
                active={active}
                staticColors={staticColors}
                duration={duration}
                borderRadius={radius}
                className="w-full max-w-lg shadow-2xl"
              >
                <div
                  className="w-full bg-white dark:bg-[#161618] border border-zinc-200/90 dark:border-white/10 p-4 transition-all shadow-md dark:shadow-none"
                  style={{ borderRadius: `${radius}px` }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Claude 3.7 Sonnet thinking...</span>
                  </div>
                  <div className="text-sm text-zinc-900 dark:text-zinc-200 min-h-[48px]">
                    Design me a high-performance vector graphics canvas with Skia and Metal shaders.
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-white/5">
                    <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono">
                      <span>Shift + Enter for new line</span>
                    </div>
                    <button
                      type="button"
                      className="w-8 h-8 rounded-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-black flex items-center justify-center dark:hover:bg-zinc-200 transition-colors"
                    >
                      <Send size={14} />
                    </button>
                  </div>
                </div>
              </BorderBeam>
            )}

            {activeDemo === 'tasks' && (
              <BorderBeam
                size={size}
                colorVariant={variant}
                theme={currentTheme}
                active={active}
                staticColors={staticColors}
                duration={duration}
                borderRadius={radius}
                className="w-full max-w-md shadow-2xl"
              >
                <div
                  className="w-full bg-white dark:bg-[#161618] border border-zinc-200/90 dark:border-white/10 p-5 space-y-3 shadow-md dark:shadow-none"
                  style={{ borderRadius: `${radius}px` }}
                >
                  <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-white/5">
                    <span className="text-xs font-semibold text-zinc-900 dark:text-white tracking-wide uppercase">
                      Execution Queue
                    </span>
                    <span className="text-[11px] font-mono text-blue-600 dark:text-blue-400 font-medium">3 of 5 done</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                      <CheckCircle2 size={14} className="text-emerald-500 dark:text-emerald-400" />
                      <span>Synthesize sound envelope</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                      <CheckCircle2 size={14} className="text-emerald-500 dark:text-emerald-400" />
                      <span>Bake SVG contour matrix</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-300 font-medium animate-pulse">
                      <Sparkles size={14} className="text-blue-500 dark:text-blue-400" />
                      <span>Compiling WebGL fragment shaders...</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-400 dark:text-zinc-500">
                      <div className="w-3.5 h-3.5 rounded-full border border-dashed border-zinc-300 dark:border-zinc-600" />
                      <span>Stream vector payload</span>
                    </div>
                  </div>
                </div>
              </BorderBeam>
            )}

            {activeDemo === 'search' && (
              <BorderBeam
                size={size}
                colorVariant={variant}
                theme={currentTheme}
                active={active}
                staticColors={staticColors}
                duration={duration}
                borderRadius={radius}
                className="w-full max-w-sm shadow-xl"
              >
                <div
                  className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-[#161618] border border-zinc-200/90 dark:border-white/10 text-sm text-zinc-600 dark:text-zinc-400 shadow-md dark:shadow-none"
                  style={{ borderRadius: `${radius}px` }}
                >
                  <Search size={16} className="text-zinc-400 dark:text-zinc-500" />
                  <span>Search components, tokens, shaders...</span>
                  <kbd className="ml-auto text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-white/10 text-zinc-600 dark:text-zinc-400">
                    ⌘K
                  </kbd>
                </div>
              </BorderBeam>
            )}

            {activeDemo === 'button' && (
              <BorderBeam
                size={size}
                colorVariant={variant}
                theme={currentTheme}
                active={active}
                staticColors={staticColors}
                duration={duration}
                borderRadius={radius}
              >
                <button
                  type="button"
                  className="px-6 py-3 bg-white dark:bg-[#161618] border border-zinc-200/90 dark:border-white/10 text-zinc-900 dark:text-white font-medium text-sm flex items-center gap-2 hover:bg-zinc-50 dark:hover:bg-[#202022] transition-colors shadow-md dark:shadow-none"
                  style={{ borderRadius: `${radius}px` }}
                >
                  <Sparkles size={15} className="text-amber-500 dark:text-amber-400" />
                  <span>Upgrade to Pro Plan</span>
                </button>
              </BorderBeam>
            )}
          </div>

          {/* Ready-to-use Code & Prompt */}
          <CodeBlock
            npmCmd="npm install border-beam"
            code={jsxCode}
            prompt={promptText}
            filename="BorderBeamCard.tsx"
          />
        </div>
      </div>
    </div>
  );
}
