import React, { useState } from 'react';
import { ThinkingOrb, type OrbState, type OrbSize } from 'thinking-orbs';
import { CodeBlock } from './CodeBlock';
import { Sparkles, Sliders, Play, Pause, Layers, ChevronRight, X } from 'lucide-react';

interface Props {
  currentTheme: 'dark' | 'light';
}

const STATES: { state: OrbState; label: string; desc: string }[] = [
  { state: 'breathing', label: 'Breathing / Thinking', desc: 'Slow, calm pulsation while pondering next action' },
  { state: 'working', label: 'Working', desc: 'Standard orbital rotation during LLM generation' },
  { state: 'searching', label: 'Searching', desc: 'Active scanning beams sweeping the knowledge base' },
  { state: 'solving', label: 'Solving', desc: 'Interlocking mathematical lattice resolving paths' },
  { state: 'listening', label: 'Listening', desc: 'Sound-reactive spherical acoustic ripple' },
  { state: 'connecting', label: 'Connecting', desc: 'Nodes linking and handshake synchronization' },
  { state: 'weaving', label: 'Weaving', desc: 'Braided helix strands interlacing code logic' },
  { state: 'composing', label: 'Composing', desc: 'Harmonic wave clusters generating responses' },
  { state: 'shaping', label: 'Shaping', desc: 'Fluid geometric deformation sculpting artifacts' },
];

export function ThinkingOrbsShowcase({ currentTheme }: Props) {
  const [selectedState, setSelectedState] = useState<OrbState>('working');
  const [orbSize, setOrbSize] = useState<OrbSize>(64);
  const [speed, setSpeed] = useState<number>(1);
  const [tintColor, setTintColor] = useState<string>('');
  const [paused, setPaused] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'single' | 'grid' | 'pill-sheet'>('single');
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);

  const jsxCode = `import { ThinkingOrb } from 'thinking-orbs';

export function AgentOrb() {
  return (
    <ThinkingOrb
      state="${selectedState}"
      size={${orbSize}}
      speed={${speed}}${tintColor ? `\n      color="${tintColor}"` : ''}
      theme="${currentTheme}"
      paused={${paused}}
    />
  );
}`;

  const promptText = `Integrate 'thinking-orbs' to show AI thinking states:
- State: "${selectedState}" (options: breathing, working, searching, solving, listening, connecting, weaving, composing, shaping)
- Size: ${orbSize} (64, 32, 20)
- Speed: ${speed}x
- Theme: "${currentTheme}"`;

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-zinc-200/80 dark:border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-mono mb-2">
            npm install thinking-orbs
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Thinking Orbs
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2 max-w-2xl text-sm leading-relaxed">
            Orbs that think while you wait. Nine distinctive mathematical geometry states for AI interfaces, rendered with canvas particle projections and zero runtime dependencies.
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-2">
          <div className="flex items-center p-1 rounded-xl bg-zinc-100 dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/10">
            <button
              type="button"
              onClick={() => setViewMode('single')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                viewMode === 'single' ? 'bg-white text-zinc-950 shadow-sm dark:bg-white/10 dark:text-white' : 'text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white'
              }`}
            >
              Interactive Lab
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                viewMode === 'grid' ? 'bg-white text-zinc-950 shadow-sm dark:bg-white/10 dark:text-white' : 'text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white'
              }`}
            >
              All 9 States
            </button>
            <button
              type="button"
              onClick={() => setViewMode('pill-sheet')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                viewMode === 'pill-sheet' ? 'bg-white text-zinc-950 shadow-sm dark:bg-white/10 dark:text-white' : 'text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white'
              }`}
            >
              Modal Sheet Morph
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'grid' ? (
        /* 9 States Gallery */
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {STATES.map((item) => (
              <div
                key={item.state}
                onClick={() => {
                  setSelectedState(item.state);
                  setViewMode('single');
                }}
                className={`group p-6 rounded-2xl border transition-all cursor-pointer flex flex-col items-center justify-between text-center ${
                  selectedState === item.state
                    ? 'border-indigo-500/50 bg-indigo-50/50 dark:bg-indigo-500/[0.03]'
                    : 'border-zinc-200/90 dark:border-white/10 bg-white dark:bg-[#101012] hover:border-zinc-300 dark:hover:border-white/20 hover:bg-zinc-50 dark:hover:bg-[#141418] shadow-sm dark:shadow-none'
                }`}
              >
                <div className="my-4 flex items-center justify-center min-h-[110px]">
                  <ThinkingOrb
                    state={item.state}
                    size={64}
                    speed={speed}
                    theme={currentTheme}
                    color={tintColor || undefined}
                  />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-white capitalize group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {item.state}
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 line-clamp-2">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : viewMode === 'pill-sheet' ? (
        /* Figma Mobile Pill -> Sheet Morph Experience */
        <div className="relative rounded-2xl border border-zinc-200/90 dark:border-white/10 bg-zinc-100/90 dark:bg-[#0a0a0c] p-8 min-h-[500px] flex flex-col items-center justify-center overflow-hidden">
          <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-6 text-center max-w-md">
            Click the front floating pill below to morph it into the expanded AI status modal with staggered reveal.
          </p>

          {!sheetOpen ? (
            /* Glass Pill */
            <div
              onClick={() => setSheetOpen(true)}
              className="cursor-pointer group flex items-center gap-4 px-5 py-3 rounded-full bg-white/90 hover:bg-white text-zinc-900 dark:bg-black/80 dark:hover:bg-black/90 dark:text-white border border-zinc-300/80 dark:border-white/20 shadow-xl dark:shadow-2xl backdrop-blur-2xl transition-all hover:scale-105 active:scale-95"
            >
              <ThinkingOrb state={selectedState} size={32} theme={currentTheme} speed={1.2} />
              <div className="text-left">
                <div className="text-xs font-semibold text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                  Claude is working
                </div>
                <div className="text-[11px] text-zinc-600 dark:text-zinc-400">Synthesizing solution...</div>
              </div>
              <ChevronRight size={14} className="text-zinc-400 dark:text-zinc-500 group-hover:translate-x-1 transition-transform" />
            </div>
          ) : (
            /* Expanded Sheet Modal */
            <div className="w-full max-w-sm rounded-3xl bg-white/95 dark:bg-[#141418]/95 border border-zinc-300/90 dark:border-white/20 p-6 shadow-2xl backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-white/10">
                <span className="text-xs font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-medium">
                  Agent Status
                </span>
                <button
                  type="button"
                  onClick={() => setSheetOpen(false)}
                  className="p-1 rounded-full text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/10"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="flex flex-col items-center text-center my-6">
                <ThinkingOrb state={selectedState} size={64} theme={currentTheme} speed={1} />
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mt-4">Synthesizing Structure</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2 max-w-xs">
                  Running multi-phase cognitive evaluation and compiling response tree.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSheetOpen(false)}
                className="w-full py-2.5 rounded-xl bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-black font-semibold text-xs dark:hover:bg-zinc-200 transition-colors shadow-sm"
              >
                Dismiss to Pill
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Interactive Lab */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls */}
          <div className="lg:col-span-4 rounded-2xl border border-zinc-200/90 dark:border-white/10 bg-white dark:bg-[#111113] p-5 space-y-6 shadow-sm dark:shadow-none">
            <div className="flex items-center gap-2 pb-3 border-b border-zinc-100 dark:border-white/10 text-zinc-900 dark:text-white font-medium text-sm">
              <Sliders size={16} className="text-indigo-500 dark:text-indigo-400" />
              <span>Orb Tuning</span>
            </div>

            {/* State Picker */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                Cognitive State
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {STATES.map((s) => (
                  <button
                    key={s.state}
                    type="button"
                    onClick={() => setSelectedState(s.state)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-medium capitalize text-center transition-all ${
                      selectedState === s.state
                        ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                        : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 dark:bg-white/5 dark:text-zinc-300 dark:hover:bg-white/10'
                    }`}
                  >
                    {s.state}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Options */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                Orb Scale
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {([64, 32, 20] as OrbSize[]).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setOrbSize(s)}
                    className={`px-2 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                      orbSize === s
                        ? 'bg-indigo-600 text-white font-semibold'
                        : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 dark:bg-white/5 dark:text-zinc-300 dark:hover:bg-white/10'
                    }`}
                  >
                    {s}px
                  </button>
                ))}
              </div>
            </div>

            {/* Speed Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">Clock Multiplier</span>
                <span className="font-mono text-zinc-700 dark:text-zinc-300">{speed}x</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="2.5"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-full accent-indigo-500 bg-zinc-200 dark:bg-white/10 rounded-lg h-1.5 cursor-pointer"
              />
            </div>

            {/* Tint Color Swatches */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                Tint Color
              </label>
              <div className="flex items-center gap-2">
                {[
                  { label: 'Auto', hex: '' },
                  { label: 'Cyan', hex: '#00d2ff' },
                  { label: 'Amber', hex: '#ff9800' },
                  { label: 'Emerald', hex: '#10b981' },
                  { label: 'Violet', hex: '#a855f7' },
                ].map((sw) => (
                  <button
                    key={sw.label}
                    type="button"
                    onClick={() => setTintColor(sw.hex)}
                    className={`px-2.5 py-1 rounded-md text-xs font-mono transition-all border ${
                      tintColor === sw.hex
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:border-indigo-400 dark:bg-indigo-500/20 dark:text-white'
                        : 'border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                    }`}
                  >
                    {sw.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Pause toggle */}
            <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-white/5">
              <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Animation Loop</span>
              <button
                type="button"
                onClick={() => setPaused(!paused)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                  !paused
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                    : 'bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400'
                }`}
              >
                {!paused ? <Play size={11} /> : <Pause size={11} />}
                <span>{!paused ? 'Running' : 'Paused'}</span>
              </button>
            </div>
          </div>

          {/* Interactive Stage */}
          <div className="lg:col-span-8 space-y-6">
            <div className="rounded-2xl border border-zinc-200/90 dark:border-white/10 bg-zinc-100/90 dark:bg-[#0a0a0c] min-h-[380px] p-8 flex flex-col items-center justify-center relative overflow-hidden shadow-2xl">
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage: currentTheme === 'dark' ? 'radial-gradient(circle, #fff 1px, transparent 1px)' : 'radial-gradient(circle, #000 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />

              <div className="relative z-10 flex flex-col items-center">
                <ThinkingOrb
                  state={selectedState}
                  size={orbSize}
                  speed={speed}
                  theme={currentTheme}
                  color={tintColor || undefined}
                  paused={paused}
                />
                <div className="mt-6 text-center">
                  <div className="text-sm font-semibold text-zinc-900 dark:text-white capitalize">{selectedState}</div>
                  <div className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 max-w-sm">
                    {STATES.find((s) => s.state === selectedState)?.desc}
                  </div>
                </div>
              </div>
            </div>

            {/* Code Block */}
            <CodeBlock
              npmCmd="npm install thinking-orbs"
              code={jsxCode}
              prompt={promptText}
              filename="AgentThinkingOrb.tsx"
            />
          </div>
        </div>
      )}
    </div>
  );
}
