#!/usr/bin/env sh
set -eu

if command -v npm >/dev/null 2>&1; then
  exec npm run dev
fi

if [ -s "$HOME/.nvm/nvm.sh" ]; then
  # shellcheck disable=SC1090
  . "$HOME/.nvm/nvm.sh"
  nvm use >/dev/null
  exec npm run dev
fi

echo "npm was not found. Install Node.js 20.19+ or run: nvm use" >&2
exit 1
