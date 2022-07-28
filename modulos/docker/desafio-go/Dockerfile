FROM golang as build

LABEL maintainer="max10rogerio"
LABEL description="Desafio de docker do curso FullCycle"

WORKDIR /usr/app/src

COPY . .

RUN go build -o build/hello hello.go

FROM scratch


WORKDIR /app

COPY --from=build /usr/app/src/build .

CMD ["./hello"]