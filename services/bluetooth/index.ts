import { Capacitor } from "@capacitor/core"
import { BluetoothLe } from "@capacitor-community/bluetooth-le"

type BluetoothSerialModule = typeof import("@awesome-cordova-plugins/bluetooth-serial")

let serialModule: BluetoothSerialModule | null = null

export type BluetoothDeviceSummary = {
  id: string
  name?: string | null
  transport: "ble" | "serial" | "web"
}

export const isNative = () => Capacitor.isNativePlatform()

async function getSerial() {
  if (!serialModule) {
    try {
      serialModule = await import("@awesome-cordova-plugins/bluetooth-serial")
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        console.warn("Bluetooth serial module failed to load", error)
      }
      serialModule = null
    }
  }
  return serialModule?.BluetoothSerial ?? null
}

export async function listDevices(): Promise<BluetoothDeviceSummary[]> {
  if (!isNative()) {
    if (typeof navigator !== "undefined" && "bluetooth" in navigator) {
      return []
    }
    return []
  }

  const devices: BluetoothDeviceSummary[] = []

  try {
    const initResult = await BluetoothLe.initialize()
    if ((initResult as unknown as { status?: string })?.status === "enabled") {
      const scan = await BluetoothLe.getConnectedDevices?.({ services: [] })
      const scanResult = scan as unknown as { devices?: Array<{ deviceId?: string; id?: string; name?: string }> }
      if (scanResult && Array.isArray(scanResult.devices)) {
        for (const device of scanResult.devices) {
          devices.push({
            id: device.deviceId ?? device.id ?? "unknown",
            name: device.name ?? device.deviceId ?? "Unknown BLE device",
            transport: "ble",
          })
        }
      }
    }
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("BLE discovery failed", error)
    }
  }

  if (Capacitor.getPlatform() === "android") {
    const serial = await getSerial()
    if (serial) {
      try {
        const serialDevices = await serial.list()
        if (Array.isArray(serialDevices)) {
          for (const device of serialDevices as Array<{ address?: string; id?: string; name?: string }>) {
            devices.push({
              id: device.address ?? device.id ?? "unknown",
              name: device.name ?? device.address ?? "Serial device",
              transport: "serial",
            })
          }
        }
      } catch (error) {
        if (process.env.NODE_ENV !== "production") {
          console.warn("Serial discovery failed", error)
        }
      }
    }
  }

  return devices
}

export async function connect(deviceId: string) {
  if (!isNative()) {
    if (typeof navigator !== "undefined" && "bluetooth" in navigator) {
      type BluetoothAPI = { requestDevice(options: { filters: Array<{ services: string[] }> }): Promise<{ gatt?: { connect(): Promise<unknown> } }> }
      const bt = navigator.bluetooth as unknown as BluetoothAPI
      const requestDevice = await bt.requestDevice({
        filters: [{ services: ["device_information"] }],
      })
      return requestDevice?.gatt?.connect()
    }
    throw new Error("Bluetooth is only available in native builds")
  }

  try {
    await BluetoothLe.connect?.({ deviceId })
  } catch (error) {
    if (Capacitor.getPlatform() === "android") {
      const serial = await getSerial()
      if (serial) {
        await serial.connect(deviceId)
        return
      }
    }
    throw error
  }
}

export async function disconnect(deviceId: string) {
  if (!isNative()) {
    return
  }

  try {
    await BluetoothLe.disconnect?.({ deviceId })
  } catch (error) {
    if (Capacitor.getPlatform() === "android") {
      const serial = await getSerial()
      if (serial) {
        await serial.disconnect()
        return
      }
    }
    throw error
  }
}

export async function write(deviceId: string, data: Uint8Array) {
  if (!isNative()) {
    return
  }

  try {
    await BluetoothLe.write?.({
      deviceId,
      value: data as unknown as DataView,
      service: "",
      characteristic: "",
    })
  } catch (error) {
    if (Capacitor.getPlatform() === "android") {
      const serial = await getSerial()
      if (serial) {
        await serial.write(data)
        return
      }
    }
    throw error
  }
}
