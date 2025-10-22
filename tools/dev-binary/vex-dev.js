#!/usr/bin/env node
/**
 * DEV-ONLY fallback binary to let you try commands now.
 * Replace with real native compiler in CI for releases.
 */
const fs = require('fs');
const path = require('path');

const version = "0.1.0-dev";

function printHelp() {
  console.log(`VexLanguage ${version}
Usage:
  vex <command> [args]

Commands:
  run <file.vl>       Run a .vl script (dev-mode)
  build               Build project (stub)
  init <dir>          Scaffold a new project
  --version           Show version
  --help              Show this help

Notes:
  This is a DEV fallback implemented in Node.js for quick testing.
  Release builds must replace this with native binaries.
`);
}

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function cmdRun(file) {
  if (!file) { console.error("Usage: vex run <file.vl>"); process.exit(2); }
  if (!fs.existsSync(file)) { console.error(`File not found: ${file}`); process.exit(2); }
  const src = fs.readFileSync(file, 'utf8');
  // Ultra-simple interpreter demo: print lines that are print("...") only.
  const re = /print\s*\(\s*"(.*?)"\s*\)\s*/g;
  let m, any = false;
  while ((m = re.exec(src))) {
    any = true;
    console.log(m[1]);
  }
  if (!any) {
    console.log(`[dev] Ran ${file}. (No output; this is a stub runtime.)`);
  }
}

function cmdBuild() {
  console.log("[dev] Build: This is a stub. In real compiler, bundle or produce binaries.");
}

function cmdInit(dir) {
  const target = dir || ".";
  ensureDir(path.join(target, "src"));
  const main = path.join(target, "src", "main.vl");
  if (!fs.existsSync(main)) {
    fs.writeFileSync(main, '// VexLanguage demo\nprint("Hello from VexLanguage init")\n', 'utf8');
  }
  const vexToml = path.join(target, "vex.toml");
  if (!fs.existsSync(vexToml)) {
    fs.writeFileSync(vexToml, 'name = "my-vex-app"\nversion = "0.1.0"\n', 'utf8');
  }
  console.log(`[dev] Initialized project at ${path.resolve(target)}`);
}

const args = process.argv.slice(2);
if (args.length === 0 || args.includes("--help")) {
  printHelp();
  process.exit(0);
}
if (args.includes("--version")) {
  console.log(version);
  process.exit(0);
}

const [cmd, ...rest] = args;
switch (cmd) {
  case "run": cmdRun(rest[0]); break;
  case "build": cmdBuild(); break;
  case "init": cmdInit(rest[0]); break;
  default:
    console.error(`Unknown command: ${cmd}`);
    printHelp();
    process.exit(2);
}
