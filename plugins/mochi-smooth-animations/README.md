# Mochi Smooth Animations

A lightweight Kettu/Revenge plugin for the Mochi Catgirl theme.

## What it does

- Uses React Native `LayoutAnimation` for subtle 180 ms layout transitions.
- Limits animation setup to relevant view updates to avoid unnecessary work.
- Animates opacity, transforms, size/position changes and selected background updates.
- Automatically unpatches when the plugin is unloaded.

## Install

In Kettu/Revenge, open **Settings → Plugins → +** and paste:

```text
https://raw.githubusercontent.com/Ddeveloper-sr/Plugin-theme/main/plugins/mochi-smooth-animations/
```

Then enable the plugin and reload Discord.

## Theme

Use the Mochi Catgirl theme separately:

```text
https://raw.githubusercontent.com/Ddeveloper-sr/Plugin-theme/main/mochi_catgirl_animated.json
```

This plugin is intentionally separate from the JSON theme because mobile Kettu/Revenge themes are color maps; animation behavior requires executable plugin code rather than an unsupported JSON animation field.
