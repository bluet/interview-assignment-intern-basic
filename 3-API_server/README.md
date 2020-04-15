# 執行方式

`docker-compose up -d`

`docker logs <api_server>`

(api_server 容器名稱請用 `docker-compose ps` 確認)

Swagger yaml 檔案位置為：`./swagger.yaml`

# 執行畫面

[View on asciinema](https://asciinema.org/a/J9pgG2JRN5qlTopPi4ASblRNQ)

# API 相關使用

請直接將 swagger.yaml 匯入至 [Online Swagger Editor](https://editor.swagger.io/)

![demo](https://i.imgur.com/3ppEO4M.png)

Swagger 右側有鎖頭的 API 代表必須先透過 `/api/login` 登入後才能使用
