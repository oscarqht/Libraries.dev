import React, { useState } from 'react';
import { Liquid } from 'liquid-gooey';
import { CodeBlock } from './CodeBlock';
import { Plus, Sliders, Droplets, Sparkles, MessageSquare, Heart, Bookmark, Search } from 'lucide-react';

interface Props {
  currentTheme: 'dark' | 'light';
}

export function LiquidGooeyShowcase({ currentTheme }: Props) {
  const [blur, setBlur] = useState<number>(6);
  const [contrast, setContrast] = useState<number>(18);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [cardExpanded, setCardExpanded] = useState<boolean>(false);
  const [pillGap, setPillGap] = useState<number>(12);

  const isDark = currentTheme === 'dark';
  const liquidFill = isDark ? '#222226' : '#ffffff';
  const liquidShadow = isDark
    ? '0 8px 24px rgba(0,0,0,0.5)'
    : '0 8px 24px rgba(0,0,0,0.08)';

  const jsxCode = `import { Liquid } from 'liquid-gooey';

export function LiquidMenu() {
  const [open, setOpen] = useState(${menuOpen});

  return (
    <Liquid
      blur={${blur}}
      contrast={${contrast}}
      fill="${liquidFill}"
      shadow="${liquidShadow}"
      style={{ position: 'relative', width: 320, height: 200 }}
    >
      {/* Satellites */}
      <Liquid.Item x={open ? -64 : 0} y={open ? -48 : 0} transition="bouncy">
        <button className="w-10 h-10 rounded-full bg-white/10 text-white">A</button>
      </Liquid.Item>
      <Liquid.Item x={open ? 64 : 0} y={open ? -48 : 0} transition="bouncy" delay={30}>
        <button className="w-10 h-10 rounded-full bg-white/10 text-white">B</button>
      </Liquid.Item>

      {/* Main trigger */}
      <Liquid.Item>
        <button onClick={() => setOpen(!open)} className="w-12 h-12 rounded-full bg-blue-600 text-white">
          +
        </button>
      </Liquid.Item>
    </Liquid>
  );
}`;

  const promptText = `Use 'liquid-gooey' to create an SVG liquid merging UI component:
- Blur: ${blur}px
- Contrast: ${contrast}
- Morph & Move physics with crisp top-layer text and icons
- Real unified drop shadows behind the merged liquid silhouette`;

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-zinc-200/80 dark:border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-mono mb-2">
            npm install liquid-gooey
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Liquid Gooey
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2 max-w-2xl text-sm leading-relaxed">
            Pieces that merge like goo and morph like jelly while text and icons stay razor crisp. Real SVG filter pipelines with accurate multi-layer silhouettes and drop shadows.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls */}
        <div className="lg:col-span-4 rounded-2xl border border-zinc-200/90 dark:border-white/10 bg-white dark:bg-[#111113] p-5 space-y-6 shadow-sm dark:shadow-none">
          <div className="flex items-center gap-2 pb-3 border-b border-zinc-100 dark:border-white/10 text-zinc-900 dark:text-white font-medium text-sm">
            <Sliders size={16} className="text-cyan-500 dark:text-cyan-400" />
            <span>Fluid Parameters</span>
          </div>

          {/* Goo Blur */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">Goo Blur (Sigma)</span>
              <span className="font-mono text-zinc-700 dark:text-zinc-300">{blur}px</span>
            </div>
            <input
              type="range"
              min="2"
              max="16"
              step="0.5"
              value={blur}
              onChange={(e) => setBlur(Number(e.target.value))}
              className="w-full accent-cyan-500 bg-zinc-200 dark:bg-white/10 rounded-lg h-1.5 cursor-pointer"
            />
            <p className="text-[11px] text-zinc-500">
              Determines proximity distance where elements neck into each other.
            </p>
          </div>

          {/* Contrast */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">Alpha Contrast</span>
              <span className="font-mono text-zinc-700 dark:text-zinc-300">{contrast}</span>
            </div>
            <input
              type="range"
              min="8"
              max="36"
              step="1"
              value={contrast}
              onChange={(e) => setContrast(Number(e.target.value))}
              className="w-full accent-cyan-500 bg-zinc-200 dark:bg-white/10 rounded-lg h-1.5 cursor-pointer"
            />
            <p className="text-[11px] text-zinc-500">
              Higher slope produces sharper liquid edges; lower yields organic softness.
            </p>
          </div>

          {/* Pill Gap for Merging Demo */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">Pill Proximity</span>
              <span className="font-mono text-zinc-700 dark:text-zinc-300">{pillGap}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="32"
              step="2"
              value={pillGap}
              onChange={(e) => setPillGap(Number(e.target.value))}
              className="w-full accent-cyan-500 bg-zinc-200 dark:bg-white/10 rounded-lg h-1.5 cursor-pointer"
            />
          </div>
        </div>

        {/* Demos */}
        <div className="lg:col-span-8 space-y-8">
          {/* Demo 1: Plus Menu */}
          <div className="rounded-2xl border border-zinc-200/90 dark:border-white/10 bg-zinc-100/90 dark:bg-[#0c0c0e] p-6 space-y-4 shadow-sm dark:shadow-none">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">1. Morph Satellite Menu</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">Click the central circle to detach gooey action droplets</p>
              </div>
              <button
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
                className="px-3 py-1 rounded-md bg-white dark:bg-white/10 hover:bg-zinc-200 dark:hover:bg-white/15 text-xs text-zinc-900 dark:text-white border border-zinc-300/80 dark:border-transparent shadow-sm dark:shadow-none"
              >
                {menuOpen ? 'Collapse' : 'Expand'}
              </button>
            </div>

            <div className="min-h-[180px] flex items-center justify-center p-4">
              <Liquid
                blur={blur}
                contrast={contrast}
                fill={liquidFill}
                shadow={liquidShadow}
                style={{ width: 280, height: 120, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                {/* Satellite 1 */}
                <Liquid.Item
                  x={menuOpen ? -68 : 0}
                  y={menuOpen ? -20 : 0}
                  transition="bouncy"
                  style={{ position: 'absolute' }}
                >
                  <button
                    type="button"
                    className="w-10 h-10 rounded-full flex items-center justify-center text-cyan-600 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-white"
                  >
                    <Heart size={16} />
                  </button>
                </Liquid.Item>

                {/* Satellite 2 */}
                <Liquid.Item
                  x={menuOpen ? 68 : 0}
                  y={menuOpen ? -20 : 0}
                  transition="bouncy"
                  delay={40}
                  style={{ position: 'absolute' }}
                >
                  <button
                    type="button"
                    className="w-10 h-10 rounded-full flex items-center justify-center text-cyan-600 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-white"
                  >
                    <Bookmark size={16} />
                  </button>
                </Liquid.Item>

                {/* Main Action */}
                <Liquid.Item style={{ position: 'relative', zIndex: 10 }}>
                  <button
                    type="button"
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="w-12 h-12 rounded-full flex items-center justify-center bg-cyan-600 text-white shadow-lg transition-transform active:scale-95"
                  >
                    <Plus
                      size={20}
                      className={`transition-transform duration-300 ${menuOpen ? 'rotate-45' : ''}`}
                    />
                  </button>
                </Liquid.Item>
              </Liquid>
            </div>
          </div>

          {/* Demo 2: Gooey Tabs (Move Effect) */}
          <div className="rounded-2xl border border-zinc-200/90 dark:border-white/10 bg-zinc-100/90 dark:bg-[#0c0c0e] p-6 space-y-4 shadow-sm dark:shadow-none">
            <div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">2. Move Effect — Liquid Rubber Tabs</h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">Switch tabs to see the liquid trail and rubber stretch</p>
            </div>

            <div className="flex justify-center p-4">
              <Liquid
                blur={4}
                contrast={20}
                fill="#3b82f6"
                shadow="0 4px 14px rgba(59,130,246,0.35)"
                style={{
                  position: 'relative',
                  width: 320,
                  height: 48,
                  backgroundColor: isDark ? '#19191d' : '#e4e4e7',
                  borderRadius: 24,
                  padding: 4,
                  display: 'flex',
                }}
              >
                {/* Rubber Sliding Indicator */}
                <Liquid.Item effect="move" move={{ springiness: 0.5, trail: 0.6 }}>
                  <div
                    style={{
                      position: 'absolute',
                      left: 4,
                      top: 4,
                      width: 100,
                      height: 40,
                      borderRadius: 20,
                      transform: `translateX(${activeTab * 104}px)`,
                      transition: 'transform 340ms cubic-bezier(.3,1.15,.4,1)',
                    }}
                  />
                </Liquid.Item>

                {/* Tab labels */}
                <div className="relative z-10 flex w-full">
                  {['Explore', 'Artifacts', 'Settings'].map((t, idx) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setActiveTab(idx)}
                      className={`flex-1 h-10 text-xs font-semibold rounded-full transition-colors ${
                        activeTab === idx ? 'text-white' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </Liquid>
            </div>
          </div>

          {/* Demo 3: Proximity Merging Cluster */}
          <div className="rounded-2xl border border-zinc-200/90 dark:border-white/10 bg-zinc-100/90 dark:bg-[#0c0c0e] p-6 space-y-4 shadow-sm dark:shadow-none">
            <div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">3. Cluster Threshold Merge</h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">Pills coalesce into a continuous droplet when proximity &lt; blur threshold</p>
            </div>

            <div className="flex justify-center p-4">
              <Liquid
                blur={blur}
                contrast={contrast}
                fill={liquidFill}
                shadow={liquidShadow}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: pillGap,
                  padding: 24,
                  transition: 'gap 200ms ease',
                }}
              >
                <Liquid.Item observe>
                  <div className="px-5 py-2.5 rounded-2xl bg-zinc-100/80 dark:bg-white/5 border border-zinc-200/90 dark:border-white/10 text-xs font-medium text-zinc-900 dark:text-white select-none">
                    Component A
                  </div>
                </Liquid.Item>
                <Liquid.Item observe>
                  <div className="px-5 py-2.5 rounded-2xl bg-zinc-100/80 dark:bg-white/5 border border-zinc-200/90 dark:border-white/10 text-xs font-medium text-zinc-900 dark:text-white select-none">
                    Component B
                  </div>
                </Liquid.Item>
                <Liquid.Item observe>
                  <div className="px-5 py-2.5 rounded-2xl bg-zinc-100/80 dark:bg-white/5 border border-zinc-200/90 dark:border-white/10 text-xs font-medium text-zinc-900 dark:text-white select-none">
                    Component C
                  </div>
                </Liquid.Item>
              </Liquid>
            </div>
          </div>

          {/* Code Block */}
          <CodeBlock
            npmCmd="npm install liquid-gooey"
            code={jsxCode}
            prompt={promptText}
            filename="LiquidComponents.tsx"
          />
        </div>
      </div>
    </div>
  );
}
