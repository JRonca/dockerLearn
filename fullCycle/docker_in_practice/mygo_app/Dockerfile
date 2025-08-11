FROM golang:latest AS builder

WORKDIR /app

COPY . .

RUN CGO_ENABLED=0 go build -o server main.go

# Final stage
FROM scratch

COPY --from=builder /app/server /server

CMD ["./server"]
