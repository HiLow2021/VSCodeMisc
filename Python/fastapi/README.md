# FastAPI

## 起動方法

main.py ファイルがある場所で
```sh
> uvicorn ソースファイル名:サーバー変数名
```

例
```sh
> uvicorn main:app --reload
```

## API ドキュメント

- http://127.0.0.1:8000/docs にアクセス。
- http://127.0.0.1:8000/redoc で別パターンの UI。