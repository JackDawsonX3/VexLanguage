package main

import (
	"bufio"
	"flag"
	"fmt"
	"os"
	"path/filepath"
	"regexp"
	"strings"
)

var Version = "0.1.0" // overridden by -ldflags "-X main.Version=${TAG#v}"

func main() {
	if len(os.Args) < 2 {
		help()
		return
	}
	switch os.Args[1] {
	case "--help", "-h", "help":
		help()
	case "--version", "-v", "version":
		fmt.Println(Version)
	case "run":
		if len(os.Args) < 3 {
			fmt.Fprintln(os.Stderr, "Usage: vex run <file.vl>")
			os.Exit(2)
		}
		if err := runFile(os.Args[2]); err != nil {
			fmt.Fprintln(os.Stderr, err)
			os.Exit(2)
		}
	case "init":
		dir := "."
		if len(os.Args) >= 3 { dir = os.Args[2] }
		if err := doInit(dir); err != nil {
			fmt.Fprintln(os.Stderr, err)
			os.Exit(2)
		}
	case "build":
		if err := buildCmd(os.Args[2:]); err != nil {
			fmt.Fprintln(os.Stderr, err)
			os.Exit(2)
		}
	default:
		fmt.Fprintf(os.Stderr, "Unknown command: %s\n", os.Args[1])
		os.Exit(2)
	}
}

func help() {
	fmt.Println(`VexLanguage ` + Version + `
Usage:
  vex <command> [args]

Commands:
  run <file.vl>           Run a .vl script (prints strings from print("..."))
  build [--target=web]    Build project (web demo transpiles to JS)
  init <dir>              Scaffold a new project
  --version               Show version
  --help                  Show help`)
}

func runFile(p string) error {
	f, err := os.Open(p)
	if err != nil { return err }
	defer f.Close()
	re := regexp.MustCompile(` + "`" + `print\\s*\\(\\s*"(.*?)"\\s*\\)\\s*` + "`" + `)
	sc := bufio.NewScanner(f)
	for sc.Scan() {
		line := sc.Text()
		m := re.FindStringSubmatch(line)
		if len(m) == 2 {
			fmt.Println(m[1])
		}
	}
	return sc.Err()
}

func doInit(dir string) error {
	if err := os.MkdirAll(filepath.Join(dir, "src"), 0o755); err != nil { return err }
	main := filepath.Join(dir, "src", "main.vl")
	if _, err := os.Stat(main); os.IsNotExist(err) {
		if err := os.WriteFile(main, []byte("// VexLanguage demo\nprint(\"Hello from VexLanguage init\")\n"), 0o644); err != nil {
			return err
		}
	}
	cfg := filepath.Join(dir, "vex.toml")
	if _, err := os.Stat(cfg); os.IsNotExist(err) {
		if err := os.WriteFile(cfg, []byte("name = \"my-vex-app\"\nversion = \"0.1.0\"\n"), 0o644); err != nil {
			return err
		}
	}
	fmt.Println("[vex] initialized project at", mustAbs(dir))
	return nil
}

func buildCmd(args []string) error {
	fs := flag.NewFlagSet("build", flag.ContinueOnError)
	target := fs.String("target", "web", "build target (web)")
	out := fs.String("out", "dist/main.js", "output file (for web target)")
	if err := fs.Parse(args); err != nil {
		return err
	}
	switch *target {
	case "web":
		os.MkdirAll(filepath.Dir(*out), 0o755)
		// naive transpile: print("x") → console.log("x")
		// look for src/main.vl by convention
		src := "src/main.vl"
		data, err := os.ReadFile(src)
		if err != nil { return fmt.Errorf("read %s: %w", src, err) }
		js := transpileToJS(string(data))
		if err := os.WriteFile(*out, []byte(js), 0o644); err != nil {
			return err
		}
		fmt.Println("[vex] web bundle:", *out)
	default:
		return fmt.Errorf("unsupported target: %s", *target)
	}
	return nil
}

func transpileToJS(code string) string {
	lines := strings.Split(code, "\n")
	re := regexp.MustCompile(` + "`" + `^\\s*print\\s*\\(\\s*\"(.*?)\"\\s*\\)\\s*$` + "`" + `)
	var out []string
	out = append(out, "(function(){")
	for _, ln := range lines {
		if m := re.FindStringSubmatch(ln); len(m) == 2 {
			out = append(out, fmt.Sprintf("console.log(%q);", m[1]))
		}
	}
	out = append(out, "})();")
	return strings.Join(out, "\n")
}

func mustAbs(p string) string {
	a, err := filepath.Abs(p)
	if err != nil { return p }
	return a
}
