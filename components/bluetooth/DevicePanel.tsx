"use client"

import * as React from "react"
import {
  type BluetoothDeviceSummary,
  connect,
  disconnect,
  isNative,
  listDevices,
} from "@/services/bluetooth"

export function DevicePanel() {
  const [devices, setDevices] = React.useState<BluetoothDeviceSummary[]>([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [connectedId, setConnectedId] = React.useState<string | null>(null)
  const [available, setAvailable] = React.useState(false)

  React.useEffect(() => {
    setAvailable(isNative() || typeof navigator !== "undefined")
  }, [])

  const refreshDevices = React.useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const items = await listDevices()
      setDevices(items)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to scan for devices")
    } finally {
      setLoading(false)
    }
  }, [])

  const handleConnect = async (device: BluetoothDeviceSummary) => {
    try {
      await connect(device.id)
      setConnectedId(device.id)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to connect")
    }
  }

  const handleDisconnect = async (device: BluetoothDeviceSummary) => {
    try {
      await disconnect(device.id)
      setConnectedId((current) => (current === device.id ? null : current))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to disconnect")
    }
  }

  if (!available) {
    return null
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-4 text-slate-100 shadow-lg backdrop-blur">
      <header className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Bluetooth Devices</h3>
          <p className="text-sm text-slate-300">
            Pair optional wellness sensors or remote controls. Audio playback routes through the OS automatically.
          </p>
        </div>
        <button
          onClick={refreshDevices}
          className="rounded-2xl bg-[#57B8BF] px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-[#0C6B74] hover:text-white"
          disabled={loading}
        >
          {loading ? "Scanning…" : "Scan"}
        </button>
      </header>
      {error ? <p className="mb-4 text-sm text-red-300">{error}</p> : null}
      <ul className="flex flex-col gap-3">
        {devices.length === 0 ? (
          <li className="text-sm text-slate-300">No devices discovered yet.</li>
        ) : (
          devices.map((device) => {
            const isConnected = connectedId === device.id
            return (
              <li
                key={`${device.transport}-${device.id}`}
                className="flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-white/5 p-3"
              >
                <div>
                  <p className="text-base font-medium">{device.name ?? "Unnamed device"}</p>
                  <p className="text-xs uppercase tracking-wide text-slate-400">{device.transport}</p>
                </div>
                <div className="flex items-center gap-2">
                  {isConnected ? (
                    <button
                      onClick={() => handleDisconnect(device)}
                      className="rounded-2xl border border-white/20 px-3 py-1.5 text-xs font-semibold text-slate-100 transition hover:border-white"
                    >
                      Disconnect
                    </button>
                  ) : (
                    <button
                      onClick={() => handleConnect(device)}
                      className="rounded-2xl bg-white px-3 py-1.5 text-xs font-semibold text-slate-900 transition hover:bg-slate-200"
                    >
                      Connect
                    </button>
                  )}
                </div>
              </li>
            )
          })
        )}
      </ul>
      <p className="mt-4 text-xs text-slate-400">
        Bluetooth control is optional. Audio streaming continues through your selected headphones or speakers via the operating
        system.
      </p>
    </section>
  )
}
