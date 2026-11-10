import React, { useState, useRef } from 'react';
import {
  ImageGeneration,
  type ImageGenerationPreset,
  type ImageGenerationHandle,
} from 'img-fx';
import { CodeBlock } from './CodeBlock';
import { Sliders, RefreshCw, Play, Pause, Image as ImageIcon, Sparkles } from 'lucide-react';

interface Props {
  currentTheme: 'dark' | 'light';
}

const SAMPLE_IMAGES = [
  { url: '/images/Untitled.jpg', title: 'Architecture / Minimal' },
  { url: '/images/Untitled2.jpg', title: 'Studio Still Life' },
  { url: '/images/Untitled4.jpg', title: 'Graphic Geometry' },
  { url: '/images/photo-1773236759289-251d9687b6e3.avif', title: 'High Desert Panorama' },
  { url: '/images/Screenshot 2026-05-13 at 17.22.03.png', title: 'Generative UI Spec' },
];

export function ImageFxShowcase({ currentTheme }: Props) {
  const [preset, setPreset] = useState<ImageGenerationPreset>('pixels-mechanic');
  const [selectedImg, setSelectedImg] = useState<string>(SAMPLE_IMAGES[0].url);
  const [speed, setSpeed] = useState<number>(1);
  const [paused, setPaused] = useState<boolean>(false);
  const [key, setKey] = useState<number>(0);

  const handleRestart = () => {
    setKey((prev) => prev + 1);
  };

  const jsxCode = `import { ImageGeneration } from 'img-fx';

export function GeneratedImageCard() {
  return (
    <div className="w-[360px] h-[360px] rounded-2xl overflow-hidden">
      <ImageGeneration
        src="${selectedImg}"
        preset="${preset}"
        theme="${currentTheme}"
        speed={${speed}}
        loop={true}
        paused={${paused}}
      />
    </div>
  );
}`;

  const promptText = `Use 'img-fx' to create an animated WebGL pixel mosaic image loader & reveal:
- Preset: "${preset}" (pixels-mechanic, pixels-organic, sweep-gradient)
- Theme: "${currentTheme}"
- Speed: ${speed}x
- Loop: true
- Three.js WebGL shader mosaic settling into full-resolution photograph`;

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-zinc-200/80 dark:border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-600 dark:text-violet-400 text-xs font-mono mb-2">
            npm install img-fx three
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Image FX
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2 max-w-2xl text-sm leading-relaxed">
            A loader that becomes the image. A real-time WebGL pixel mosaic that settles and dissolves into high-resolution photography with chromatic palette sampling.
          </p>
        </div>

        {/* Quick Restart Action */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleRestart}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-900 dark:bg-white/10 dark:hover:bg-white/15 dark:text-white text-xs font-semibold border border-zinc-200 dark:border-white/10 shadow-sm dark:shadow-none transition-colors"
          >
            <RefreshCw size={13} />
            <span>Replay Reveal</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls */}
        <div className="lg:col-span-4 rounded-2xl border border-zinc-200/90 dark:border-white/10 bg-white dark:bg-[#111113] p-5 space-y-6 shadow-sm dark:shadow-none">
          <div className="flex items-center gap-2 pb-3 border-b border-zinc-100 dark:border-white/10 text-zinc-900 dark:text-white font-medium text-sm">
            <Sliders size={16} className="text-violet-500 dark:text-violet-400" />
            <span>Mosaic Controls</span>
          </div>

          {/* Presets */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
              Shader Reveal Preset
            </label>
            <div className="flex flex-col gap-1.5">
              {(['pixels-mechanic', 'pixels-organic', 'sweep-gradient'] as ImageGenerationPreset[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPreset(p)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium text-left transition-all ${
                    preset === p
                      ? 'bg-violet-600 text-white font-semibold shadow-md'
                      : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 dark:bg-white/5 dark:text-zinc-300 dark:hover:bg-white/10'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Speed slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">Cycle Speed</span>
              <span className="font-mono text-zinc-700 dark:text-zinc-300">{speed}x</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2.5"
              step="0.25"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-full accent-violet-500 bg-zinc-200 dark:bg-white/10 rounded-lg h-1.5 cursor-pointer"
            />
          </div>

          {/* Sample Image Thumbnails */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
              Source Photograph
            </label>
            <div className="space-y-1.5">
              {SAMPLE_IMAGES.map((img) => (
                <button
                  key={img.url}
                  type="button"
                  onClick={() => {
                    setSelectedImg(img.url);
                    handleRestart();
                  }}
                  className={`w-full px-3 py-2 rounded-lg text-xs flex items-center justify-between border transition-all text-left ${
                    selectedImg === img.url
                      ? 'border-violet-500 bg-violet-50 text-violet-900 font-medium dark:bg-violet-500/10 dark:text-white'
                      : 'border-zinc-200/80 dark:border-white/5 bg-zinc-50 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  <span className="truncate">{img.title}</span>
                  {selectedImg === img.url && (
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-600 dark:bg-violet-400 shrink-0 ml-2" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Pause Loop Toggle */}
          <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-white/5">
            <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Continuous Loop</span>
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
              <span>{!paused ? 'Looping' : 'Paused'}</span>
            </button>
          </div>
        </div>

        {/* Interactive Stage */}
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-2xl border border-zinc-200/90 dark:border-white/10 bg-zinc-100/90 dark:bg-[#0c0c0e] min-h-[440px] p-8 flex flex-col items-center justify-center relative overflow-hidden shadow-2xl">
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: currentTheme === 'dark' ? 'radial-gradient(circle, #fff 1px, transparent 1px)' : 'radial-gradient(circle, #000 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />

            <div className="relative z-10 w-full max-w-sm aspect-square rounded-2xl overflow-hidden shadow-2xl border border-zinc-300 dark:border-white/10">
              <ImageGeneration
                key={key}
                images={[selectedImg]}
                autoReveal={!paused}
                preset={preset}
                theme={currentTheme}
                speed={speed}
                className="w-full h-full"
              >
                <div className="w-full h-full" />
              </ImageGeneration>
            </div>

            <div className="mt-4 text-xs text-zinc-600 dark:text-zinc-400 flex items-center gap-2">
              <Sparkles size={13} className="text-violet-500 dark:text-violet-400" />
              <span>Shader analyzes image pixel array and derives dynamic chromatic mosaic</span>
            </div>
          </div>

          {/* Code Block */}
          <CodeBlock
            npmCmd="npm install img-fx three"
            code={jsxCode}
            prompt={promptText}
            filename="ImageGenerationCard.tsx"
          />
        </div>
      </div>
    </div>
  );
}
