# VexLanguage — MVP 0.1

> เบาแบบ JS • ง่ายแบบ Python • เร็วเข้าใกล้ C  
> ติดตั้งผ่าน **npm (เฉพาะตอนติดตั้ง)** หรือ **ดาวน์โหลดไบนารีตรง** — การ *รันจริง* ใช้ไบนารีของ Vex เอง (ไม่พึ่ง Node)

## ติดตั้ง (2 วิธี)

### A) ผ่าน npm (แนะนำสำหรับมือใหม่)
```bash
# ในโปรเจกต์ใดๆ
npm i -g vexlanguage-installer
# หรือแบบ local:
npm i -D vexlanguage-installer
# หลังติดตั้ง คำสั่ง:
vex --version
vex --help
```

> npm ใช้เฉพาะ **ช่วงติดตั้ง** เท่านั้น — เมื่อเรียก `vex` จะถูก map ไปยัง **ไบนารีของ Vex** ตามแพลตฟอร์มของคุณ (ไม่รันบน Node)

### B) ดาวน์โหลดไบนารีสแตนด์อโลน
ไปที่หน้า **Download** (Docs) แล้วเลือกแพลตฟอร์มของคุณ:  
- Windows x64 / arm64 (`vex.exe`)  
- macOS x64 / arm64 (`vex`)  
- Linux x64 / arm64 (`vex`)  

วางลงใน PATH แล้วเรียก `vex` ได้ทันที

---

## โฟลเดอร์ในรีโปนี้
- `packages/vexlanguage-installer/` — แพ็กเกจ npm สำหรับติดตั้งไบนารี (postinstall จะ map ตัวเรียก `vex` แบบ native)
- `vscode-extension/` — VS Code Extension สำหรับ .vl (syntax, icons)
- `docs/` — เว็บเอกสารแบบ static (ไม่มี build step)
- `examples/` — ตัวอย่างโปรเจกต์เล็กๆ (เว็บ/CLI)
- `scripts/release/` — สคริปต์ checksum + release checklist
- `.github/` — เทมเพลต Issues/PRs
- `LICENSE` — MIT
- `CODE_OF_CONDUCT.md`, `CONTRIBUTING.md`

## แผนเวอร์ชัน
- 0.1.0 (MVP): ติดตั้งได้ 2 ช่องทาง, คำสั่ง `vex`, VS Code extension, docs, ตัวอย่าง
- 0.2.x: DX เพิ่ม (`vex init`, snippets, docs), เสถียรภาพ
- 0.3.x: เดโม performance เบื้องต้น, เตรียม Playground
- >0.3: IR/Optimizer, WASM/Native backend, LSP, package manager (`vxp`)

## License
MIT
