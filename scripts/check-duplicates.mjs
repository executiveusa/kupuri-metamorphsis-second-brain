import { execSync } from "node:child_process"

function collectVersions(node, map) {
  if (!node || typeof node !== "object") return
  const { name, version, dependencies } = node
  if (name && version) {
    if (!map.has(name)) {
      map.set(name, new Set())
    }
    map.get(name).add(version)
  }
  if (Array.isArray(dependencies)) {
    for (const child of dependencies) {
      collectVersions(child, map)
    }
  } else if (dependencies && typeof dependencies === "object") {
    for (const key of Object.keys(dependencies)) {
      collectVersions(dependencies[key], map)
    }
  }
}

function main() {
  const raw = execSync("pnpm list --depth 100 --json", { stdio: ["ignore", "pipe", "pipe"] }).toString()
  const tree = JSON.parse(raw)
  const versionsMap = new Map()

  if (Array.isArray(tree)) {
    for (const node of tree) {
      collectVersions(node, versionsMap)
    }
  } else if (tree) {
    collectVersions(tree, versionsMap)
  }

  const duplicates = [...versionsMap.entries()].filter(([, versions]) => versions.size > 1)

  if (duplicates.length > 0) {
    console.error("Duplicate package versions detected:\n")
    for (const [name, versions] of duplicates) {
      console.error(` - ${name}: ${[...versions].join(", ")}`)
    }
    console.error("\nPlease resolve duplicates before committing.")
    process.exit(1)
  }

  console.log("No duplicate package versions found.")
}

main()
