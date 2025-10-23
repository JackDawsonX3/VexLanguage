#!/usr/bin/env bash
# Helper to run the packaged placeholder binary for your platform (dev only)
node packages/vexlanguage-installer/scripts/postinstall.js >/dev/null 2>&1 || true
exec packages/vexlanguage-installer/vendor/$(uname | tr '[:upper:]' '[:lower:]')-x64/vex "$@"
