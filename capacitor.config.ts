import { CapacitorConfig } from "@capacitor/cli"

const config: CapacitorConfig = {
  appId: "com.metamorfosis.app",
  appName: "Metamorfosis Wellness Journey",
  webDir: ".next",
  bundledWebRuntime: false,
  backgroundColor: "#0B0F12",
  server: {
    androidScheme: "https",
  },
  plugins: {
    BluetoothLe: {
      displayStrings: {
        permissionDeniedErrorMessage:
          "Bluetooth permissions are required to connect with your wellness devices.",
      } as unknown as Record<string, string>,
    },
  },
}

export default config
