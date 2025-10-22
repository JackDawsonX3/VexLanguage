# Quickstart

## ติดตั้ง (หลังปล่อย v0.1.0 แล้ว)
```bash
npm i -g vex
vex --version
vex init my-app
cd my-app
vex run src/main.vl
```

## โหมด Build สำหรับเว็บ (เดโม)
```bash
# จากในโปรเจกต์
vex build --target=web --out=dist/main.js
# จะได้ dist/main.js ที่เปลี่ยน print("...") → console.log("...")
node dist/main.js
```

## VS Code
- เปิดโปรเจกต์ แล้วกด `Ctrl/Cmd+Shift+B` เลือก task: *Vex: Run current file*, *Build project* หรือ *Init project*
- ติดตั้ง extension (dev): เปิด `vscode-extension/` แล้วกด `F5`

## โครงสร้างโปรเจกต์
```
my-app/
├─ src/
│  └─ main.vl
├─ vex.toml
└─ README.md
```
