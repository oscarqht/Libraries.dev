import React from 'react';
import { BorderBeam } from 'border-beam';
import { ThinkingOrb } from 'thinking-orbs';
import { BotAvatar } from 'bot-avatars';
import { Liquid } from 'liquid-gooey';
import { VoiceBeam } from 'voice-glow';
import { MetalFx, MetalBadge, MetalText } from 'metal-fx';
import { ImageGeneration } from 'img-fx';
import type { LibraryKey } from './Header';
import {
  ArrowRight,
  Box,
  Sparkles,
  Cpu,
  Droplets,
  Mic,
  Flame,
  Image as ImageIcon,
  Check,
  Terminal,
} from 'lucide-react';

interface Props {
  currentTheme: 'dark' | 'light';
  onSelectLib: (key: LibraryKey) => void;
}

export function OverviewShowcase({ currentTheme, onSelectLib }: Props) {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-4 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-200/60 dark:bg-white/5 border border-zinc-300/80 dark:border-white/10 text-xs font-mono text-zinc-700 dark:text-zinc-300">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          7 Production-Grade React Libraries for AI Agents
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-tight">
          The Living Interface Stack
        </h1>
        <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Effects that make an interface feel alive. A beam of light travelling a card's border, orbs that think while a model works, bot avatars with living faces, shapes that merge like liquid, acoustic voice radiation, real liquid metal, and a WebGL pixel mosaic that settles into photographs.
        </p>

        {/* Global install pill */}
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-white dark:bg-[#121214] border border-zinc-200/90 dark:border-white/10 text-xs font-mono text-zinc-700 dark:text-zinc-300 shadow-sm dark:shadow-none">
          <Terminal size={14} className="text-zinc-500" />
          <span>npm install border-beam thinking-orbs bot-avatars liquid-gooey voice-glow metal-fx img-fx</span>
        </div>
      </div>

      {/* 7 Interactive Live Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 1. Border Beam */}
        <div
          onClick={() => onSelectLib('beam')}
          className="group rounded-2xl border border-zinc-200/90 dark:border-white/10 bg-white dark:bg-[#101012] hover:border-blue-500/50 p-6 flex flex-col justify-between cursor-pointer transition-all hover:bg-zinc-50/80 dark:hover:bg-[#141418] shadow-sm hover:shadow-xl dark:shadow-none hover:shadow-blue-500/5 dark:hover:shadow-blue-500/10"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                border-beam
              </span>
              <ArrowRight size={14} className="text-zinc-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
              Border Beam
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
              Soft glowing beam travelling container edges with rotate & pulse families.
            </p>
          </div>

          <div className="my-6 flex items-center justify-center p-2">
            <BorderBeam size="md" colorVariant="colorful" theme={currentTheme} borderRadius={16} className="w-full">
              <div className="w-full p-4 rounded-2xl bg-zinc-50 dark:bg-[#16161a] border border-zinc-200/90 dark:border-white/10 text-xs text-zinc-700 dark:text-zinc-300 text-center font-medium">
                AI Agent Task Card
              </div>
            </BorderBeam>
          </div>

          <div className="text-[11px] font-mono text-zinc-500 pt-3 border-t border-zinc-100 dark:border-white/5 flex justify-between">
            <span>5 presets · 4 palettes</span>
            <span className="text-blue-600 dark:text-blue-400 font-sans font-medium">Open Studio →</span>
          </div>
        </div>

        {/* 2. Thinking Orbs */}
        <div
          onClick={() => onSelectLib('orbs')}
          className="group rounded-2xl border border-zinc-200/90 dark:border-white/10 bg-white dark:bg-[#101012] hover:border-indigo-500/50 p-6 flex flex-col justify-between cursor-pointer transition-all hover:bg-zinc-50/80 dark:hover:bg-[#141418] shadow-sm hover:shadow-xl dark:shadow-none hover:shadow-indigo-500/5 dark:hover:shadow-indigo-500/10"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                thinking-orbs
              </span>
              <ArrowRight size={14} className="text-zinc-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
              Thinking Orbs
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
              Orbs that think while models work. 9 mathematical states with 3D projection.
            </p>
          </div>

          <div className="my-6 flex items-center justify-center min-h-[96px]">
            <ThinkingOrb state="weaving" size={64} theme={currentTheme} speed={1.2} />
          </div>

          <div className="text-[11px] font-mono text-zinc-500 pt-3 border-t border-zinc-100 dark:border-white/5 flex justify-between">
            <span>9 states · 0 dependencies</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-sans font-medium">Open Studio →</span>
          </div>
        </div>

        {/* 3. Bot Avatars */}
        <div
          onClick={() => onSelectLib('avatars')}
          className="group rounded-2xl border border-zinc-200/90 dark:border-white/10 bg-white dark:bg-[#101012] hover:border-emerald-500/50 p-6 flex flex-col justify-between cursor-pointer transition-all hover:bg-zinc-50/80 dark:hover:bg-[#141418] shadow-sm hover:shadow-xl dark:shadow-none hover:shadow-emerald-500/5 dark:hover:shadow-emerald-500/10"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                bot-avatars
              </span>
              <ArrowRight size={14} className="text-zinc-400 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">
              Bot Avatars
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
              Eighteen glossy shapes with living faces that track pointer coordinates.
            </p>
          </div>

          <div className="my-6 flex items-center justify-center min-h-[96px]">
            <BotAvatar type="clover" face="mouth" shading="plastic" size={90} />
          </div>

          <div className="text-[11px] font-mono text-zinc-500 pt-3 border-t border-zinc-100 dark:border-white/5 flex justify-between">
            <span>18 shapes · Gaze tracking</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-sans font-medium">Open Studio →</span>
          </div>
        </div>

        {/* 4. Liquid Gooey */}
        <div
          onClick={() => onSelectLib('gooey')}
          className="group rounded-2xl border border-zinc-200/90 dark:border-white/10 bg-white dark:bg-[#101012] hover:border-cyan-500/50 p-6 flex flex-col justify-between cursor-pointer transition-all hover:bg-zinc-50/80 dark:hover:bg-[#141418] shadow-sm hover:shadow-xl dark:shadow-none hover:shadow-cyan-500/5 dark:hover:shadow-cyan-500/10"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                liquid-gooey
              </span>
              <ArrowRight size={14} className="text-zinc-400 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
              Liquid Gooey
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
              Morph & Move effects that merge and stretch touching elements as fluid.
            </p>
          </div>

          <div className="my-6 flex items-center justify-center min-h-[96px]">
            <Liquid
              blur={6}
              contrast={18}
              fill={currentTheme === 'dark' ? '#26262a' : '#ffffff'}
              shadow={currentTheme === 'dark' ? '0 4px 16px rgba(0,0,0,0.3)' : '0 4px 16px rgba(0,0,0,0.08)'}
              style={{ display: 'flex', gap: 6, alignItems: 'center' }}
            >
              <Liquid.Item observe><div className="px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-white/5 border border-zinc-200/70 dark:border-transparent text-[11px] text-zinc-800 dark:text-white font-medium">Item A</div></Liquid.Item>
              <Liquid.Item observe><div className="px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-white/5 border border-zinc-200/70 dark:border-transparent text-[11px] text-zinc-800 dark:text-white font-medium">Item B</div></Liquid.Item>
            </Liquid>
          </div>

          <div className="text-[11px] font-mono text-zinc-500 pt-3 border-t border-zinc-100 dark:border-white/5 flex justify-between">
            <span>SVG filters · Crisp typography</span>
            <span className="text-cyan-600 dark:text-cyan-400 font-sans font-medium">Open Studio →</span>
          </div>
        </div>

        {/* 5. Voice Glow */}
        <div
          onClick={() => onSelectLib('voice')}
          className="group rounded-2xl border border-zinc-200/90 dark:border-white/10 bg-white dark:bg-[#101012] hover:border-rose-500/50 p-6 flex flex-col justify-between cursor-pointer transition-all hover:bg-zinc-50/80 dark:hover:bg-[#141418] shadow-sm hover:shadow-xl dark:shadow-none hover:shadow-rose-500/5 dark:hover:shadow-rose-500/10"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                voice-glow
              </span>
              <ArrowRight size={14} className="text-zinc-400 group-hover:text-rose-500 dark:group-hover:text-rose-400 group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-300 transition-colors">
              Voice Glow
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
              Luminous sound glow rising with voice amplitude from buttons or chat inputs.
            </p>
          </div>

          <div className="my-6 flex items-center justify-center min-h-[96px]">
            <VoiceBeam type="pill" colorVariant="colorful" theme={currentTheme} level={0.8} className="w-full">
              <div className="p-3 bg-white dark:bg-[#18181c] border border-zinc-200/90 dark:border-white/10 rounded-full text-xs text-center text-zinc-900 dark:text-white font-medium flex items-center justify-center gap-2 shadow-sm dark:shadow-none">
                <Mic size={14} className="text-rose-500 dark:text-rose-400" />
                <span>Voice Active</span>
              </div>
            </VoiceBeam>
          </div>

          <div className="text-[11px] font-mono text-zinc-500 pt-3 border-t border-zinc-100 dark:border-white/5 flex justify-between">
            <span>Web Audio API · Real microphone</span>
            <span className="text-rose-600 dark:text-rose-400 font-sans font-medium">Open Studio →</span>
          </div>
        </div>

        {/* 6. Liquid Metal */}
        <div
          onClick={() => onSelectLib('metal')}
          className="group rounded-2xl border border-zinc-200/90 dark:border-white/10 bg-white dark:bg-[#101012] hover:border-amber-500/50 p-6 flex flex-col justify-between cursor-pointer transition-all hover:bg-zinc-50/80 dark:hover:bg-[#141418] shadow-sm hover:shadow-xl dark:shadow-none hover:shadow-amber-500/5 dark:hover:shadow-amber-500/10"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                metal-fx
              </span>
              <ArrowRight size={14} className="text-zinc-400 group-hover:text-amber-500 dark:group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors">
              Liquid Metal
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
              Real-time WebGL metal shader effect for chrome buttons, text, and badges.
            </p>
          </div>

          <div className="my-6 flex items-center justify-center min-h-[96px]">
            <MetalFx variant="button" preset="chromatic" strength={0.9} theme={currentTheme}>
              <button className="px-5 py-2.5 text-xs font-semibold text-zinc-900 dark:text-white">
                Liquid Metal Button
              </button>
            </MetalFx>
          </div>

          <div className="text-[11px] font-mono text-zinc-500 pt-3 border-t border-zinc-100 dark:border-white/5 flex justify-between">
            <span>WebGL Shaders · Cursor bend</span>
            <span className="text-amber-600 dark:text-amber-400 font-sans font-medium">Open Studio →</span>
          </div>
        </div>

        {/* 7. Image FX */}
        <div
          onClick={() => onSelectLib('image')}
          className="group rounded-2xl border border-zinc-200/90 dark:border-white/10 bg-white dark:bg-[#101012] hover:border-violet-500/50 p-6 flex flex-col justify-between cursor-pointer transition-all hover:bg-zinc-50/80 dark:hover:bg-[#141418] shadow-sm hover:shadow-xl dark:shadow-none hover:shadow-violet-500/5 dark:hover:shadow-violet-500/10"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
                img-fx
              </span>
              <ArrowRight size={14} className="text-zinc-400 group-hover:text-violet-500 dark:group-hover:text-violet-400 group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors">
              Image FX
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
              WebGL pixel mosaic image loader that settles and dissolves into photography.
            </p>
          </div>

          <div className="my-6 flex items-center justify-center min-h-[96px]">
            <div className="w-24 h-24 rounded-xl overflow-hidden border border-zinc-200 dark:border-white/10 shadow-lg">
              <ImageGeneration
                images={["/images/Untitled.jpg"]}
                autoReveal={true}
                preset="pixels-mechanic"
                theme={currentTheme}
                speed={1.2}
                className="w-full h-full"
              >
                <div className="w-full h-full" />
              </ImageGeneration>
            </div>
          </div>

          <div className="text-[11px] font-mono text-zinc-500 pt-3 border-t border-zinc-100 dark:border-white/5 flex justify-between">
            <span>Three.js · Chromatic sampling</span>
            <span className="text-violet-600 dark:text-violet-400 font-sans font-medium">Open Studio →</span>
          </div>
        </div>
      </div>
    </div>
  );
}
