export type MediaSessionConfig = {
  title: string
  artist?: string
  album?: string
  artwork?: string
  onPlay: () => void
  onPause: () => void
  onSeekTo?: (time: number) => void
  onNextTrack?: () => void
  onPreviousTrack?: () => void
}

type MediaSessionSeekToDetails = MediaSessionActionDetails & { seekTime?: number }

export function setupMediaSession(config: MediaSessionConfig) {
  if (typeof navigator === "undefined" || !("mediaSession" in navigator)) {
    return
  }

  const artworkEntries = config.artwork
    ? [
        {
          src: config.artwork,
          sizes: "512x512",
          type: "image/png",
        },
      ]
    : []

  navigator.mediaSession.metadata = new MediaMetadata({
    title: config.title,
    artist: config.artist,
    album: config.album,
    artwork: artworkEntries,
  })

  navigator.mediaSession.setActionHandler?.("play", config.onPlay)
  navigator.mediaSession.setActionHandler?.("pause", config.onPause)

  if (config.onSeekTo) {
    navigator.mediaSession.setActionHandler?.("seekto", (details) => {
      const seekDetails = details as MediaSessionSeekToDetails
      if (typeof seekDetails.seekTime === "number") {
        config.onSeekTo?.(seekDetails.seekTime)
      }
    })
  }

  if (config.onNextTrack) {
    navigator.mediaSession.setActionHandler?.("nexttrack", config.onNextTrack)
  }

  if (config.onPreviousTrack) {
    navigator.mediaSession.setActionHandler?.("previoustrack", config.onPreviousTrack)
  }
}

export function resetMediaSession() {
  if (typeof navigator === "undefined" || !("mediaSession" in navigator)) {
    return
  }

  navigator.mediaSession.playbackState = "none"
  navigator.mediaSession.metadata = null
  navigator.mediaSession.setActionHandler?.("play", null)
  navigator.mediaSession.setActionHandler?.("pause", null)
  navigator.mediaSession.setActionHandler?.("seekto", null)
  navigator.mediaSession.setActionHandler?.("nexttrack", null)
  navigator.mediaSession.setActionHandler?.("previoustrack", null)
}
