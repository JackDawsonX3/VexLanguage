class Vex < Formula
  desc "VexLanguage compiler"
  homepage "https://github.com/poqgo/VexLanguage"
  version "0.1.0"
  on_macos do
    if Hardware::CPU.arm?
      url "https://github.com/poqgo/VexLanguage/releases/download/v0.1.0/vex-macos-arm64-0.1.0"
      sha256 "<FILL_ME>"
    else
      url "https://github.com/poqgo/VexLanguage/releases/download/v0.1.0/vex-macos-x64-0.1.0"
      sha256 "<FILL_ME>"
    end
  end
  on_linux do
    if Hardware::CPU.arm?
      url "https://github.com/poqgo/VexLanguage/releases/download/v0.1.0/vex-linux-arm64-0.1.0"
      sha256 "<FILL_ME>"
    else
      url "https://github.com/poqgo/VexLanguage/releases/download/v0.1.0/vex-linux-x64-0.1.0"
      sha256 "<FILL_ME>"
    end
  end
  def install
    bin.install Dir["vex-*"].first => "vex"
  end
end
