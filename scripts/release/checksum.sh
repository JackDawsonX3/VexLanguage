#!/usr/bin/env bash
set -euo pipefail
dir="${1:-dist}"
echo "Checksums for $dir"
for f in "$dir"/*; do
  if [ -f "$f" ]; then
    sha256sum "$f"
  fi
done
