# Build minimal image with vex preinstalled
FROM alpine:3.20
ARG VEX_VERSION=0.1.0
RUN apk add --no-cache curl
RUN ARCH=$(apk --print-arch) &&     case "$ARCH" in x86_64) A=x64;; aarch64) A=arm64;; *) echo "arch $ARCH unsupported"; exit 1;; esac &&     curl -fsSL https://github.com/poqgo/VexLanguage/releases/download/v${VEX_VERSION}/vex-linux-${A}-${VEX_VERSION} -o /usr/local/bin/vex &&     chmod +x /usr/local/bin/vex
ENTRYPOINT ["vex"]
