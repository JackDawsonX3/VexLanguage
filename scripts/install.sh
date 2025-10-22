#!/usr/bin/env bash
set -euo pipefail
REPO="${VEX_REPO:-poqgo/VexLanguage}"
VER="${VEX_VERSION:-0.1.0}"
OS="$(uname | tr '[:upper:]' '[:lower:]')"
ARCH="$(uname -m)"
case "$OS" in
  darwin) os=macos;;
  linux)  os=linux;;
  *) echo "Unsupported OS: $OS"; exit 1;;
esac
case "$ARCH" in
  x86_64|amd64) arch=x64;;
  arm64|aarch64) arch=arm64;;
  *) echo "Unsupported arch: $ARCH"; exit 1;;
esac
name="vex-$os-$arch-$VER"
url="https://github.com/$REPO/releases/download/v$VER/$name"
curl -fsSL "$url" -o "$name"
chmod +x "$name"
sudo mv "$name" /usr/local/bin/vex
echo "Installed vex $(/usr/local/bin/vex --version)"
