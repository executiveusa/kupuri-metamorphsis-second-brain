import { fireEvent, render, screen } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { AudioPlayer } from "@/components/audio/AudioPlayer"

declare global {
  interface Navigator {
    mediaSession?: any
  }
  var MediaMetadata: any
}

const playMock = vi.fn(async () => undefined)
const pauseMock = vi.fn(() => undefined)

beforeEach(() => {
  vi.restoreAllMocks()
  playMock.mockClear()
  pauseMock.mockClear()
  Object.defineProperty(HTMLMediaElement.prototype, "play", {
    configurable: true,
    value: playMock,
  })
  Object.defineProperty(HTMLMediaElement.prototype, "pause", {
    configurable: true,
    value: pauseMock,
  })

  ;(global as any).MediaMetadata = class {
    constructor(public data: any) {
      Object.assign(this, data)
    }
  }

  navigator.mediaSession = {
    metadata: null,
    setActionHandler: vi.fn(),
  }
})

describe("AudioPlayer", () => {
  it("plays and pauses audio via button", async () => {
    render(
      <AudioPlayer
        src="https://example.com/audio.mp3"
        title="Test Journey"
        artist="Metamorfosis"
        artwork="https://example.com/art.png"
      />,
    )

    const button = screen.getByRole("button", { name: /play audio/i })
    const audio = document.querySelector("audio") as HTMLAudioElement

    await fireEvent.click(button)
    expect(playMock).toHaveBeenCalledTimes(1)
    fireEvent(audio, new Event("play"))

    const pauseButton = await screen.findByRole("button", { name: /pause audio/i })
    await fireEvent.click(pauseButton)
    expect(pauseMock).toHaveBeenCalledTimes(1)
  })

  it("binds media session handlers", () => {
    render(
      <AudioPlayer
        src="https://example.com/audio.mp3"
        title="Test Journey"
        artist="Metamorfosis"
        artwork="https://example.com/art.png"
      />,
    )

    expect(navigator.mediaSession?.setActionHandler).toHaveBeenCalledWith(
      "play",
      expect.any(Function),
    )
    expect(navigator.mediaSession?.setActionHandler).toHaveBeenCalledWith(
      "pause",
      expect.any(Function),
    )
    expect(navigator.mediaSession?.metadata).toMatchObject({ title: "Test Journey" })
  })
})
