FROM golang:latest

WORKDIR /app

COPY . .

RUN CGO_ENABLED=0 go build -o server main.go

CMD ["./server"]
