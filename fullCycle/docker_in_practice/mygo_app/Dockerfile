FROM golang:latest AS builder

WORKDIR /app
COPY . .
RUN CGO_ENABLED=0 go build -o server main.go

# Final stage
FROM scratch

LABEL maintainer="jronca"
LABEL env="production"
# LABEL traefik.enable="true"

COPY --from=builder /app/server /server
ENTRYPOINT ["./server"]
CMD ["8080"]
