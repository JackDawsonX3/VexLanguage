# VexLanguage — เบา ง่าย เร็ว (Production‑ready)

ชุดนี้พร้อมปล่อยแบบภาษาระดับโลก:
- **Native compiler (Go)**: `compiler/` — คำสั่ง `vex` รองรับ `run`, `init`, `build` (รวมโหมด web bundle demo)
- **Install everywhere**:
  - **npm**: `packages/vex` (postinstall ดาวน์โหลดไบนารีจริงจาก GitHub Releases + ตรวจ checksum)
  - **Homebrew (macOS)**: `distros/homebrew/vex.rb`
  - **Scoop (Windows)**: `distros/scoop/vex.json`
  - **winget (Windows)**: `distros/winget/manifest.yaml`
  - **Shell installers**: `scripts/install.sh` (Linux/macOS), `scripts/install.ps1` (Windows)
  - **Docker**: `Dockerfile`
- **VS Code**: `vscode-extension/` + workspace `.vscode/` tasks
- **CI/CD**: `.github/workflows/release.yml` สร้างไบนารีหลายแพลตฟอร์ม + checksum + อัปโหลด Releases + publish npm

> ค่าเริ่มต้นชี้ไปที่รีโป: `poqgo/VexLanguage` — ปรับใน `packages/vex/postinstall.js` ได้ทุกเมื่อ

## ปล่อยเวอร์ชันแรก (v0.1.0)

1. สร้าง repo GitHub `poqgo/VexLanguage` แล้ว push โค้ดนี้ทั้งหมด
2. ตั้ง secret: `NPM_TOKEN` (สิทธิ์ publish npm)
3. สร้าง tag: `git tag v0.1.0 && git push origin v0.1.0`
4. GitHub Actions จะ build/upload binary + publish npm อัตโนมัติ
5. ผู้ใช้ติดตั้งได้ทันที:
```bash
npm i -g vex
vex --version
vex init my-app && cd my-app && vex run src/main.vl
```

ดูเอกสารเริ่มต้นที่ `docs/QUICKSTART.md`
