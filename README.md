# Interview Assignment - Intern - Basic
實習生面試前作業（基本題）

## 流程
1. 請複製這個 repo 到自己的帳號下，然後將自己的 repo 設為 private，請勿公開自己的答案
    - [Duplicating a repository](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/duplicating-a-repository)
2. 邀請我成為 collaborator
3. 開始開發，嘗試看看寫出自己最滿意的版本
4. 每一題題目做完後用 telegram 告訴我，並附上鍊結

## 內容
- 每一題分別開子目錄，以題號開頭。例： `1-1a2b/`
- 請包含專案需要的基本檔案，比如 .gitignore 和 README 等等任何所需檔案
- README 裡須將執行方法說明清楚
- 每個題目分別開 branch ，寫完後用 merge branch 的方式整合回 master

## 其他規定
- 須能在 Ubuntu Linux 18.04 64bit Desktop 環境執行
- 做完 README 中敘述的基本準備後，程式必須要可以直接執行、顯示。
    - 例：`chmod +x 檔案名稱` 後，可以用 `./檔案名稱` 直接執行。
    - 若有特殊情形，請提出討論。

## 題目：（題號. 題目名稱 - 時限）
1. 1A2B 遊戲，電腦出題，讓玩家猜 - 1 day
    - [猜數字 - 維基百科，自由的百科全書](https://zh.wikipedia.org/wiki/%E7%8C%9C%E6%95%B0%E5%AD%97)
    - 須檢查使用者輸入的數字不能重複。比如，不能輸入 1122 這種。
2. 細胞自動機 Cellular automaton - 2 days
    - [細胞自動機 - 維基百科，自由的百科全書](https://zh.wikipedia.org/wiki/%E7%B4%B0%E8%83%9E%E8%87%AA%E5%8B%95%E6%A9%9F)
    - [康威生命遊戲 - 維基百科，自由的百科全書](https://zh.wikipedia.org/wiki/%E5%BA%B7%E5%A8%81%E7%94%9F%E5%91%BD%E6%B8%B8%E6%88%8F)
3. RESTful API server - 5 days
    - 新使用者可透過 API 註冊、更新自己資料
    - 使用者可以新增修改刪除自己的寵物
    - 附上 OpenAPI (Swagger) yaml 檔
        - 可以用這個產生 [Swagger Editor](https://swagger.io/tools/swagger-editor/) or [Online Swagger Editor](https://editor.swagger.io/)
4. Crawler - 5 days
    - 抓取頁面 [很厲害的頁面](https://github.com/bluet/interview-assignment-intern-basic/blob/master/README.md)
    - 取出由 README.md 宣染成 html 的部份
    - 存檔 `子目錄名稱/頁面當按名稱-epoch時間（單位 ms）.檔案格式` ，例 `abc/README-1585469575123.html`
    - 分析頁面內容產生一個 json 存為 `子目錄名稱/頁面名稱-epoch時間.檔案格式.json`
    ```
    {
      url: "原始 url",
      filename: "存檔的檔名"
      content_urls: [
        {
          text: "頁面中的對外鍊結某某某 1",
          link: "the url"
        },
        {
            text: "頁面中的對外鍊結某某某 2",
            link: "the url"
        }
      ],
      content_structure: {
        頁面結構
      }
    }
    ```
    - 頁面結構
    ```
    H1 text
      |-> paragraph1 content
      |-> paragraph2 content
      |-> H2 text
        |-> paragraph1 content
        |-> paragraph2 content
        |-> H3 text
            |-> paragraph1 content
            |-> paragraph2 content
        ...
    ```
  
