import { expect, test } from "@playwright/test"

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    ;(window as any).__playCount = 0
    HTMLMediaElement.prototype.play = function () {
      ;(window as any).__playCount += 1
      return Promise.resolve() as any
    }
    navigator.mediaSession = {
      metadata: null,
      setActionHandler: () => {},
    } as any
    ;(window as any).MediaMetadata = function (data: any) {
      Object.assign(this, data)
    }
  })
})

test("homepage audio player responds to play", async ({ page }) => {
  await page.goto("./")
  await expect(page).toHaveTitle(/Metamorfosis Wellness Journey/)
  await expect(page.getByRole("heading", { name: /transform your rituals/i })).toBeVisible()

  const playButton = page.getByRole("button", { name: /play audio/i })
  await playButton.click()

  const playCount = await page.evaluate(() => (window as any).__playCount)
  expect(playCount).toBeGreaterThan(0)
})
