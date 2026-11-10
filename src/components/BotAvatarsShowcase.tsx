import React, { useState, useRef } from 'react';
import {
  BotAvatar,
  botAvatarTypes,
  type BotAvatarType,
  type BotAvatarState,
  type BotAvatarFace,
  type BotAvatarShading,
} from 'bot-avatars';
import { CodeBlock } from './CodeBlock';
import { Sliders, Sparkles, Hand, Eye, Layers } from 'lucide-react';

interface Props {
  currentTheme: 'dark' | 'light';
}

export function BotAvatarsShowcase({ currentTheme }: Props) {
  const [selectedType, setSelectedType] = useState<BotAvatarType>('clover');
  const [state, setState] = useState<BotAvatarState>('default');
  const [face, setFace] = useState<BotAvatarFace>('mouth');
  const [shading, setShading] = useState<BotAvatarShading>('plastic');
  const [size, setSize] = useState<number>(140);
  const [speed, setSpeed] = useState<number>(1);
  const [whirl, setWhirl] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'single' | 'gallery'>('single');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleHop = () => {
    if (canvasRef.current) {
      canvasRef.current.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    }
  };

  const jsxCode = `import { BotAvatar } from 'bot-avatars';

export function AgentAvatar() {
  return (
    <BotAvatar
      type="${selectedType}"
      state="${state}"
      face="${face}"
      shading="${shading}"
      size={${size}}
      speed={${speed}}
      whirl={${whirl ? 1 : 0}}
      onClick={(e) => {
        // Automatically hops and bounces!
      }}
    />
  );
}`;

  const promptText = `Use 'bot-avatars' to render an interactive glossy AI companion avatar:
- Type: "${selectedType}" (options: ${botAvatarTypes.slice(0, 8).join(', ')}...)
- State: "${state}" (default, working, sleeping)
- Face: "${face}" (eyes, mouth)
- Shading: "${shading}" (plastic, crisp, smooth, flat)
- Size: ${size}px`;

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-zinc-200/80 dark:border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono mb-2">
            npm install bot-avatars
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Bot Avatars
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2 max-w-2xl text-sm leading-relaxed">
            Animated bot avatars with living faces. Eighteen glossy extruded shapes, responsive gazes that track user pointer movement, and 3D raymarched plastic matcap shaders.
          </p>
        </div>

        {/* View mode */}
        <div className="flex items-center gap-2">
          <div className="flex items-center p-1 rounded-xl bg-zinc-100 dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/10">
            <button
              type="button"
              onClick={() => setViewMode('single')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                viewMode === 'single' ? 'bg-white text-zinc-950 shadow-sm dark:bg-white/10 dark:text-white' : 'text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white'
              }`}
            >
              Interactive Studio
            </button>
            <button
              type="button"
              onClick={() => setViewMode('gallery')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                viewMode === 'gallery' ? 'bg-white text-zinc-950 shadow-sm dark:bg-white/10 dark:text-white' : 'text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white'
              }`}
            >
              All 18 Shapes
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'gallery' ? (
        /* 18 Shapes Gallery */
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {botAvatarTypes.map((t) => (
              <div
                key={t}
                onClick={() => {
                  setSelectedType(t);
                  setViewMode('single');
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col items-center justify-center text-center ${
                  selectedType === t
                    ? 'border-emerald-500/50 bg-emerald-50/50 dark:bg-emerald-500/[0.05]'
                    : 'border-zinc-200/90 dark:border-white/10 bg-white dark:bg-[#101012] hover:border-zinc-300 dark:hover:border-white/20 hover:bg-zinc-50 dark:hover:bg-[#141418] shadow-sm dark:shadow-none'
                }`}
              >
                <div className="my-2">
                  <BotAvatar
                    type={t}
                    state={state}
                    face={face}
                    shading={shading}
                    size={84}
                    whirl={whirl ? 1 : 0}
                  />
                </div>
                <span className="text-xs font-semibold text-zinc-900 dark:text-white capitalize mt-2">{t}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Studio */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls */}
          <div className="lg:col-span-4 rounded-2xl border border-zinc-200/90 dark:border-white/10 bg-white dark:bg-[#111113] p-5 space-y-6 shadow-sm dark:shadow-none">
            <div className="flex items-center gap-2 pb-3 border-b border-zinc-100 dark:border-white/10 text-zinc-900 dark:text-white font-medium text-sm">
              <Sliders size={16} className="text-emerald-500 dark:text-emerald-400" />
              <span>Avatar Configuration</span>
            </div>

            {/* Shape selection */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                Shape Character ({botAvatarTypes.length})
              </label>
              <div className="grid grid-cols-3 gap-1.5 max-h-40 overflow-y-auto pr-1">
                {botAvatarTypes.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSelectedType(t)}
                    className={`px-2 py-1.5 rounded-lg text-xs font-medium capitalize text-center transition-all ${
                      selectedType === t
                        ? 'bg-emerald-600 text-white font-semibold'
                        : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 dark:bg-white/5 dark:text-zinc-300 dark:hover:bg-white/10'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* State selection */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                Animation State
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {(['default', 'working', 'sleeping'] as BotAvatarState[]).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setState(s)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                      state === s
                        ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold shadow-sm'
                        : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 dark:bg-white/5 dark:text-zinc-300 dark:hover:bg-white/10'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Face and Shading */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                  Face Expression
                </label>
                <div className="flex gap-1">
                  {(['mouth', 'eyes'] as BotAvatarFace[]).map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFace(f)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                        face === f
                          ? 'bg-emerald-600 text-white font-semibold'
                          : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 dark:bg-white/5 dark:text-zinc-300 dark:hover:bg-white/10'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                  Shading
                </label>
                <div className="flex gap-1">
                  {(['plastic', 'crisp', 'smooth'] as BotAvatarShading[]).map((sh) => (
                    <button
                      key={sh}
                      type="button"
                      onClick={() => setShading(sh)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                        shading === sh
                          ? 'bg-emerald-600 text-white font-semibold'
                          : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 dark:bg-white/5 dark:text-zinc-300 dark:hover:bg-white/10'
                      }`}
                    >
                      {sh}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Size Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">Render Size</span>
                <span className="font-mono text-zinc-700 dark:text-zinc-300">{size}px</span>
              </div>
              <input
                type="range"
                min="64"
                max="180"
                step="4"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full accent-emerald-500 bg-zinc-200 dark:bg-white/10 rounded-lg h-1.5 cursor-pointer"
              />
            </div>

            {/* Whirl & Poke Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-white/5">
              <button
                type="button"
                onClick={handleHop}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition-all active:scale-95"
              >
                <Hand size={13} />
                <span>Poke / Hop!</span>
              </button>

              <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-700 dark:text-zinc-300">
                <input
                  type="checkbox"
                  checked={whirl}
                  onChange={(e) => setWhirl(e.target.checked)}
                  className="rounded border-zinc-300 dark:border-white/20 bg-zinc-100 dark:bg-white/10 text-emerald-500"
                />
                <span>Spin Whirl</span>
              </label>
            </div>
          </div>

          {/* Interactive Stage */}
          <div className="lg:col-span-8 space-y-6">
            <div
              className="rounded-2xl border border-zinc-200/90 dark:border-white/10 bg-zinc-100/90 dark:bg-[#0c0c0e] min-h-[380px] p-8 flex flex-col items-center justify-center relative overflow-hidden shadow-2xl cursor-pointer group"
              onClick={handleHop}
              title="Click anywhere to poke the avatar!"
            >
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage: currentTheme === 'dark' ? 'radial-gradient(circle, #fff 1px, transparent 1px)' : 'radial-gradient(circle, #000 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />

              <div className="relative z-10 flex flex-col items-center select-none">
                <BotAvatar
                  ref={canvasRef}
                  type={selectedType}
                  state={state}
                  face={face}
                  shading={shading}
                  size={size}
                  speed={speed}
                  whirl={whirl ? 1 : 0}
                />
                <div className="mt-6 text-center">
                  <div className="text-sm font-semibold text-zinc-900 dark:text-white capitalize">{selectedType}</div>
                  <div className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 flex items-center justify-center gap-1.5">
                    <Eye size={12} className="text-emerald-500 dark:text-emerald-400" />
                    <span>Move cursor to guide gaze · Click to jump</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Code Block */}
            <CodeBlock
              npmCmd="npm install bot-avatars"
              code={jsxCode}
              prompt={promptText}
              filename="AgentAvatar.tsx"
            />
          </div>
        </div>
      )}
    </div>
  );
}
