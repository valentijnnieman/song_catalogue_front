FROM golang:latest 
LABEL Name=song_catalogue_app Version=0.0.1 
RUN mkdir /app 
ADD ./dist /app/dist
ADD ./index.html /app/index.html
ADD ./server.go /app/server.go
WORKDIR /app 
RUN go build -o server .
EXPOSE 3000 
CMD ["/app/server"]
