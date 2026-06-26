# Native Platform Scaffolding

This directory stores the generated Capacitor native projects. Run the following after installing dependencies:

```bash
pnpm run cap:add:ios
pnpm run cap:add:android
```

After each web build, sync the artifacts:

```bash
pnpm run build
pnpm run cap:sync
```

Open the platform workspaces with:

```bash
pnpm run cap:open:ios
pnpm run cap:open:android
```

> The native projects are excluded from web builds but tracked to simplify provisioning and permission management.
