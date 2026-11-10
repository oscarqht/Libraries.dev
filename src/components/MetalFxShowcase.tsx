import React, { useState } from 'react';
import {
  MetalFx,
  MetalText,
  MetalBadge,
  type MetalFxPreset,
} from 'metal-fx';
import { CodeBlock } from './CodeBlock';
import { ArrowUp, Sliders, Sparkles, ShieldCheck, Zap } from 'lucide-react';

interface Props {
  currentTheme: 'dark' | 'light';
}

export function MetalFxShowcase({ currentTheme }: Props) {
  const [preset, setPreset] = useState<MetalFxPreset>('chromatic');
  const [strength, setStrength] = useState<number>(90);

  const normalizedStrength = strength / 100;

  const jsxCode = `import { MetalFx, MetalBadge, MetalText } from 'metal-fx';

export function MetalUi() {
  return (
    <div className="flex flex-col gap-4">
      {/* Liquid Metal Button */}
      <MetalFx preset="${preset}" strength={${normalizedStrength}} theme="${currentTheme}" variant="button">
        <button className="px-5 py-2.5 font-medium text-sm">
          Upgrade to Pro
        </button>
      </MetalFx>

      {/* Metal Pro Badge */}
      <div className="flex items-center gap-2">
        <span>Plan</span>
        <MetalBadge preset="${preset}" strength={${normalizedStrength}}>
          Pro
        </MetalBadge>
      </div>

      {/* Chrome Masked Text */}
      <MetalText preset="${preset}" strength={${normalizedStrength}}>
        Next Gen AI
      </MetalText>
    </div>
  );
}`;

  const promptText = `Use 'metal-fx' to apply real-time liquid metal shader effects:
- Preset: "${preset}" (chromatic, silver, gold)
- Strength: ${normalizedStrength}
- Theme: "${currentTheme}"
- Support interactive pointer catch-light and liquid reflection`;

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-zinc-200/80 dark:border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-mono mb-2">
            npm install metal-fx
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Liquid Metal
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2 max-w-2xl text-sm leading-relaxed">
            Real-time WebGL liquid metal shader effects for buttons, badges, text, and icons. Three metallic presets, chromatic reflections, and interactive cursor light catch-glints.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls */}
        <div className="lg:col-span-4 rounded-2xl border border-zinc-200/90 dark:border-white/10 bg-white dark:bg-[#111113] p-5 space-y-6 shadow-sm dark:shadow-none">
          <div className="flex items-center gap-2 pb-3 border-b border-zinc-100 dark:border-white/10 text-zinc-900 dark:text-white font-medium text-sm">
            <Sliders size={16} className="text-amber-500 dark:text-amber-400" />
            <span>Shader Tuning</span>
          </div>

          {/* Preset */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
              Metal Shader Preset
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {(['chromatic', 'silver', 'gold'] as MetalFxPreset[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPreset(p)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                    preset === p
                      ? 'bg-amber-500 text-black font-semibold shadow-md'
                      : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 dark:bg-white/5 dark:text-zinc-300 dark:hover:bg-white/10'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Strength Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">Chrome Intensity</span>
              <span className="font-mono text-zinc-700 dark:text-zinc-300">{strength}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              step="5"
              value={strength}
              onChange={(e) => setStrength(Number(e.target.value))}
              className="w-full accent-amber-500 bg-zinc-200 dark:bg-white/10 rounded-lg h-1.5 cursor-pointer"
            />
            <p className="text-[11px] text-zinc-500">
              Balances the metallic reflection gain against diffuse material base.
            </p>
          </div>
        </div>

        {/* Interactive Showcase */}
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 1. Composer Card */}
            <div className="sm:col-span-2 rounded-2xl border border-zinc-200/90 dark:border-white/10 bg-white dark:bg-[#121214] p-6 space-y-4 shadow-sm dark:shadow-xl">
              <div className="text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                1. AI Composer Send Button
              </div>
              <div className="rounded-xl bg-zinc-50 dark:bg-[#1a1a1e] border border-zinc-200/80 dark:border-white/5 p-4 flex flex-col justify-between min-h-[130px]">
                <div className="text-xs text-zinc-600 dark:text-zinc-400">Synthesize neural shader pass...</div>
                <div className="flex items-center justify-between pt-3 border-t border-zinc-200/70 dark:border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] px-2 py-0.5 rounded bg-zinc-200/60 dark:bg-white/5 text-zinc-600 dark:text-zinc-400">Agent</span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-zinc-200 dark:bg-white/10 text-zinc-900 dark:text-white font-medium">Auto</span>
                  </div>
                  <MetalFx
                    variant="circle"
                    preset={preset}
                    strength={normalizedStrength}
                    theme={currentTheme}
                  >
                    <button
                      type="button"
                      className="w-9 h-9 rounded-full flex items-center justify-center text-white"
                    >
                      <ArrowUp size={16} />
                    </button>
                  </MetalFx>
                </div>
              </div>
            </div>

            {/* 2. Plan Pro Card */}
            <div className="rounded-2xl border border-zinc-200/90 dark:border-white/10 bg-white dark:bg-[#121214] p-6 flex flex-col justify-between shadow-sm dark:shadow-xl min-h-[170px]">
              <div className="text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                2. Metal Text Treatment
              </div>
              <div className="flex items-baseline gap-3 my-auto">
                <span className="text-2xl font-semibold text-zinc-900 dark:text-white">Plan</span>
                <div className="text-2xl font-bold tracking-tight">
                  <MetalText
                    font="600 24px Inter, sans-serif"
                    color={currentTheme === 'dark' ? '#ffffff' : '#0f172a'}
                    strength={normalizedStrength}
                    theme={currentTheme}
                  >
                    Pro
                  </MetalText>
                </div>
              </div>
              <div className="text-xs text-zinc-500">Hairline top highlight on glyph paths</div>
            </div>

            {/* 3. Live Mode Badge */}
            <div className="rounded-2xl border border-zinc-200/90 dark:border-white/10 bg-white dark:bg-[#121214] p-6 flex flex-col justify-between shadow-sm dark:shadow-xl min-h-[170px]">
              <div className="text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                3. Metal Badge Pill
              </div>
              <div className="flex items-center gap-3 my-auto">
                <span className="text-base text-zinc-800 dark:text-zinc-300 font-medium">Live mode</span>
                <MetalBadge
                  strength={normalizedStrength}
                  theme={currentTheme}
                >
                  New
                </MetalBadge>
              </div>
              <div className="text-xs text-zinc-500">Real-time edge highlights</div>
            </div>

            {/* 4. Action Button */}
            <div className="sm:col-span-2 rounded-2xl border border-zinc-200/90 dark:border-white/10 bg-white dark:bg-[#121214] p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm dark:shadow-xl">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                  4. Chrome Action Button
                </div>
                <div className="text-xs text-zinc-500 mt-1">Instant liquid metal button wrapper</div>
              </div>
              <MetalFx
                variant="button"
                preset={preset}
                strength={normalizedStrength}
                theme={currentTheme}
              >
                <button
                  type="button"
                  className="px-6 py-2.5 rounded-full text-sm font-semibold text-white flex items-center gap-2"
                >
                  <Sparkles size={14} className="text-amber-400" />
                  <span>Upgrade to Studio Pro</span>
                </button>
              </MetalFx>
            </div>
          </div>

          {/* Code Block */}
          <CodeBlock
            npmCmd="npm install metal-fx"
            code={jsxCode}
            prompt={promptText}
            filename="MetalComponents.tsx"
          />
        </div>
      </div>
    </div>
  );
}
