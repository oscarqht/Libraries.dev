import React, { useState, useEffect } from 'react';
import {
  VoiceBeam,
  useMicrophone,
  type VoiceBeamType,
  type VoiceBeamColorVariant,
} from 'voice-glow';
import { CodeBlock } from './CodeBlock';
import { Mic, MicOff, Sliders, Volume2, Sparkles, Radio } from 'lucide-react';

interface Props {
  currentTheme: 'dark' | 'light';
}

const PALETTES: VoiceBeamColorVariant[] = [
  'colorful',
  'ocean',
  'sunset',
  'forest',
  'candy',
  'ice',
  'gold',
  'mono',
];

const BEAM_TYPES: { type: VoiceBeamType; label: string }[] = [
  { type: 'pill', label: 'Pill' },
  { type: 'default', label: 'Chat Input' },
  { type: 'mobile', label: 'Screen Edge' },
];

export function VoiceGlowShowcase({ currentTheme }: Props) {
  const [beamType, setBeamType] = useState<VoiceBeamType>('pill');
  const [variant, setVariant] = useState<VoiceBeamColorVariant>('colorful');
  const [simLevel, setSimLevel] = useState<number>(0.65);
  const [simMotion, setSimMotion] = useState<number>(0.8);
  const [useSim, setUseSim] = useState<boolean>(true);

  const mic = useMicrophone();

  // Synthetic voice oscillation when simulated
  const [activeLevel, setActiveLevel] = useState<number>(0.5);

  useEffect(() => {
    if (!useSim) return;
    let frame: number;
    let t = 0;
    const loop = () => {
      t += 0.05;
      // Speech modulation: bursts of vocal syllables
      const cadence = Math.sin(t * 1.5) * Math.sin(t * 3.8);
      const val = Math.max(0.1, Math.min(1, simLevel * (0.4 + 0.6 * Math.abs(cadence))));
      setActiveLevel(val);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [useSim, simLevel]);

  const toggleMic = async () => {
    if (mic.state === 'live') {
      mic.stop();
      setUseSim(true);
    } else {
      setUseSim(false);
      try {
        await mic.start();
      } catch (e) {
        setUseSim(true);
      }
    }
  };

  const jsxCode = `import { VoiceBeam, useMicrophone } from 'voice-glow';

export function VoiceAssistant() {
  const mic = useMicrophone();

  return (
    <VoiceBeam
      type="${beamType}"
      colorVariant="${variant}"
      theme="${currentTheme}"
      stream={mic.stream}
      level={${activeLevel.toFixed(2)}}
      motion={${simMotion}}
    >
      <div className="p-5 rounded-2xl bg-[#141416] text-white">
        <button onClick={mic.start}>
          {mic.state === 'live' ? 'Listening...' : 'Tap to speak'}
        </button>
      </div>
    </VoiceBeam>
  );
}`;

  const promptText = `Use 'voice-glow' to render a reactive voice radiation beam:
- Type: "${beamType}" (pill, default, mobile)
- Color variant: "${variant}" (colorful, ocean, sunset, forest, candy, ice, gold, mono)
- Theme: "${currentTheme}"
- Motion: ${simMotion}
- Support both live microphone stream and synthetic fallback levels`;

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-zinc-200/80 dark:border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-mono mb-2">
            npm install voice-glow
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Voice Glow
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2 max-w-2xl text-sm leading-relaxed">
            A luminous acoustic glow that radiates with your voice from the bottom of chat inputs, assistant buttons, or full screens. Built-in Web Audio API analyser with multi-chromatic frequency displacement.
          </p>
        </div>

        {/* Live mic toggle */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleMic}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
              mic.state === 'live'
                ? 'bg-rose-600 text-white border-rose-500 shadow-lg shadow-rose-600/30 animate-pulse'
                : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 dark:bg-white/5 dark:hover:bg-white/10 dark:text-zinc-300 border border-zinc-200 dark:border-white/10'
            }`}
          >
            {mic.state === 'live' ? <Mic size={14} /> : <MicOff size={14} />}
            <span>{mic.state === 'live' ? 'Mic Live (Listening)' : 'Use Real Microphone'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls */}
        <div className="lg:col-span-4 rounded-2xl border border-zinc-200/90 dark:border-white/10 bg-white dark:bg-[#111113] p-5 space-y-6 shadow-sm dark:shadow-none">
          <div className="flex items-center gap-2 pb-3 border-b border-zinc-100 dark:border-white/10 text-zinc-900 dark:text-white font-medium text-sm">
            <Sliders size={16} className="text-rose-500 dark:text-rose-400" />
            <span>Acoustic Envelope</span>
          </div>

          {/* Beam Type */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
              Container Geometry
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {BEAM_TYPES.map((item) => (
                <button
                  key={item.type}
                  type="button"
                  onClick={() => setBeamType(item.type)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    beamType === item.type
                      ? 'bg-rose-600 text-white font-semibold shadow-sm'
                      : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 dark:bg-white/5 dark:text-zinc-300 dark:hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Color Palettes */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
              Chromatic Palette
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {PALETTES.map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setVariant(v)}
                  className={`px-2 py-1.5 rounded-lg text-xs font-medium capitalize text-center transition-all ${
                    variant === v
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold shadow-sm'
                      : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 dark:bg-white/5 dark:text-zinc-300 dark:hover:bg-white/10'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Simulated Level Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">Voice Amplitude</span>
              <span className="font-mono text-zinc-700 dark:text-zinc-300">{(activeLevel * 100).toFixed(0)}%</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.05"
              value={simLevel}
              onChange={(e) => {
                setSimLevel(Number(e.target.value));
                setUseSim(true);
              }}
              className="w-full accent-rose-500 bg-zinc-200 dark:bg-white/10 rounded-lg h-1.5 cursor-pointer"
            />
          </div>

          {/* Motion multiplier */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">Displacement Warp</span>
              <span className="font-mono text-zinc-700 dark:text-zinc-300">{(simMotion * 100).toFixed(0)}%</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1.5"
              step="0.05"
              value={simMotion}
              onChange={(e) => setSimMotion(Number(e.target.value))}
              className="w-full accent-rose-500 bg-zinc-200 dark:bg-white/10 rounded-lg h-1.5 cursor-pointer"
            />
          </div>

          {/* Active input readout */}
          <div className="pt-2 border-t border-zinc-100 dark:border-white/5 flex items-center justify-between text-xs">
            <span className="text-zinc-600 dark:text-zinc-400">Audio Source</span>
            <span className="font-mono text-rose-600 dark:text-rose-400 font-medium">
              {mic.state === 'live' ? 'Live Microphone Stream' : 'Synthetic Vocal Cadence'}
            </span>
          </div>
        </div>

        {/* Interactive Stage */}
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-2xl border border-zinc-200/90 dark:border-white/10 bg-zinc-100/90 dark:bg-[#0c0c0e] min-h-[380px] p-8 flex flex-col items-center justify-center relative overflow-hidden shadow-2xl">
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: currentTheme === 'dark' ? 'radial-gradient(circle, #fff 1px, transparent 1px)' : 'radial-gradient(circle, #000 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />

            {beamType === 'pill' && (
              <VoiceBeam
                type="pill"
                colorVariant={variant}
                theme={currentTheme}
                level={activeLevel}
                motion={{ gather: simMotion, stretch: 0.2 }}
                stream={mic.stream}
                className="w-full max-w-sm"
              >
                <div className="flex items-center justify-between px-5 py-4 bg-white dark:bg-[#141418] border border-zinc-200/90 dark:border-white/10 rounded-full select-none shadow-md dark:shadow-none">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
                    <div>
                      <div className="text-xs font-semibold text-zinc-900 dark:text-white">Voice Agent Ready</div>
                      <div className="text-[11px] text-zinc-600 dark:text-zinc-400">Speak naturally...</div>
                    </div>
                  </div>
                  <Volume2 size={18} className="text-rose-500 dark:text-rose-400" />
                </div>
              </VoiceBeam>
            )}

            {beamType === 'default' && (
              <VoiceBeam
                type="default"
                colorVariant={variant}
                theme={currentTheme}
                level={activeLevel}
                motion={{ gather: simMotion, stretch: 0.2 }}
                stream={mic.stream}
                className="w-full max-w-md"
              >
                <div className="p-6 bg-white dark:bg-[#141418] border border-zinc-200/90 dark:border-white/10 rounded-2xl select-none space-y-3 shadow-md dark:shadow-none">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-white">
                      Live Voice Session
                    </span>
                    <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-medium">01:42</span>
                  </div>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300">
                    "I am synthesizing the neural acoustic waveform across all multi-band frequency lobes."
                  </p>
                </div>
              </VoiceBeam>
            )}

            {beamType === 'mobile' && (
              <VoiceBeam
                type="mobile"
                colorVariant={variant}
                theme={currentTheme}
                level={activeLevel}
                motion={{ gather: simMotion, stretch: 0.2 }}
                stream={mic.stream}
                className="w-full max-w-xs"
              >
                <div className="p-8 bg-white dark:bg-[#141418] border border-zinc-200/90 dark:border-white/10 rounded-3xl select-none text-center space-y-4 shadow-md dark:shadow-none">
                  <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400 mx-auto flex items-center justify-center">
                    <Mic size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-zinc-900 dark:text-white">Screen Edge Assistant</div>
                    <div className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">Full-span bottom wave</div>
                  </div>
                </div>
              </VoiceBeam>
            )}
          </div>

          {/* Code Block */}
          <CodeBlock
            npmCmd="npm install voice-glow"
            code={jsxCode}
            prompt={promptText}
            filename="VoiceGlowAssistant.tsx"
          />
        </div>
      </div>
    </div>
  );
}
