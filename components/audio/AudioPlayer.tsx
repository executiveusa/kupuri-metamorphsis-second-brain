"use client"

import * as React from "react"
import { resetMediaSession, setupMediaSession } from "@/lib/mediaSession"

type AudioPlayerProps = {
  src: string
  title: string
  artist?: string
  artwork?: string
  onEnd?: () => void
  onNextTrack?: () => void
  onPreviousTrack?: () => void
}

const defaultVolume = 0.85

export function AudioPlayer({
  src,
  title,
  artist,
  artwork,
  onEnd,
  onNextTrack,
  onPreviousTrack,
}: AudioPlayerProps) {
  const audioRef = React.useRef<HTMLAudioElement | null>(null)
  const progressRef = React.useRef<HTMLInputElement | null>(null)
  const [playing, setPlaying] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const [duration, setDuration] = React.useState(0)
  const [volume, setVolume] = React.useState(defaultVolume)

  React.useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = defaultVolume

    const handleTimeUpdate = () => {
      setProgress(audio.currentTime)
    }

    const handleLoaded = () => {
      setDuration(audio.duration || 0)
    }

    const handlePlay = () => setPlaying(true)
    const handlePause = () => setPlaying(false)
    const handleEnded = () => {
      setPlaying(false)
      setProgress(0)
      onEnd?.()
      if (onNextTrack) {
        onNextTrack()
      }
    }

    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("loadedmetadata", handleLoaded)
    audio.addEventListener("play", handlePlay)
    audio.addEventListener("pause", handlePause)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("loadedmetadata", handleLoaded)
      audio.removeEventListener("play", handlePlay)
      audio.removeEventListener("pause", handlePause)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [onEnd, onNextTrack])

  React.useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    setupMediaSession({
      title,
      artist,
      artwork,
      onPlay: () => audio.play(),
      onPause: () => audio.pause(),
      onSeekTo: (time) => {
        audio.currentTime = time
        setProgress(time)
      },
      onNextTrack,
      onPreviousTrack,
    })

    return () => {
      resetMediaSession()
    }
  }, [title, artist, artwork, onNextTrack, onPreviousTrack])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
    } else {
      void audio.play()
    }
  }

  const onProgressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return
    const value = Number(event.target.value)
    audio.currentTime = value
    setProgress(value)
  }

  const onVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return
    const value = Number(event.target.value)
    audio.volume = value
    setVolume(value)
  }

  return (
    <div className="flex w-full flex-col gap-4 rounded-3xl bg-white/5 p-4 text-slate-100 shadow-lg backdrop-blur-md">
      <audio ref={audioRef} src={src} preload="metadata" />
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-lg font-semibold">{title}</p>
          {artist ? <p className="truncate text-sm text-slate-300">{artist}</p> : null}
        </div>
        <button
          onClick={togglePlay}
          className="rounded-2xl bg-[#57B8BF] px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-[#0C6B74] hover:text-white"
          aria-label={playing ? "Pause audio" : "Play audio"}
        >
          {playing ? "Pause" : "Play"}
        </button>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xs uppercase tracking-wide text-slate-300" htmlFor="audio-progress">
          Progress
        </label>
        <input
          ref={progressRef}
          id="audio-progress"
          type="range"
          min={0}
          max={duration || 0}
          step={0.5}
          value={progress}
          onChange={onProgressChange}
          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-700 accent-brand-300"
        />
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>{formatTime(progress)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xs uppercase tracking-wide text-slate-300" htmlFor="audio-volume">
          Volume
        </label>
        <input
          id="audio-volume"
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={volume}
          onChange={onVolumeChange}
          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-700 accent-brand-300"
        />
      </div>
    </div>
  )
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) {
    return "0:00"
  }
  const minutes = Math.floor(seconds / 60)
  const remainder = Math.floor(seconds % 60)
  return `${minutes}:${remainder.toString().padStart(2, "0")}`
}
