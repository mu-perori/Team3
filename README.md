# 「商品需要の見える化機能」プロトタイプ
これは[Build@mercari2022](https://mercan.mercari.com/articles/33259/)のHackweekで「私たちの考えた新しいメルカリの出品機能」をテーマに作成した「商品需要の見える化機能」プロトタイプです。
詳細は以下の[デモ映像](#デモ映像)と[コンセプト・着想](#コンセプト・着想(プレゼンテーションスライドから抜粋))をご覧ください。

## 必要なソフトウェア
- Python 3
- node v16
- ブラウザ

## 動作環境
次の環境で動作することを確認しています。
- OS: macOS 12.3.1
- ブラウザ: Google Chrome 102.0.5005.61
- Python 3.8
- node v16.15.0

## 使い方
### 環境構築
1. このリポジトリをクローンしてください
1. ターミナルから以下のコマンドを実行し、必要なPythonのパッケージをインストールします。
   ```
   cd path/to/Team3/app
   pip install -r requirements.txt
   ```
1. 次にターミナルから以下のコマンドを実行し、必要なnodeライブラリをインストールします。
   ```
   cd path/to/Team3/TypeScript
   npm ci
   ```

### 起動方法
1. ターミナルから以下のコマンドを実行し、サーバを立ち上げます。
   ```
   cd path/to/Team3/app
   uvicorn main:app --reload --port 9000
   ```
1. 次にターミナルの別のウィンドウから以下のコマンドを実行し、アプリを起動します。
   ```
   cd path/to/Team3/TypeScript
   npm start
   ```
1. 起動後、`http://localhost:3000/want`にアクセスするとこの機能のトップページが表示されます。

## デモ映像
### 購入者視点
#### トップページのボタンから登録


https://user-images.githubusercontent.com/61280283/171287318-a0575486-3f59-4ef5-9c74-cbaf70945a92.mp4


### 売り切れ商品のページのボタンから登録


https://user-images.githubusercontent.com/61280283/171287333-9b5cfdb2-0b2e-421b-b8c9-7dafe8763a4b.mp4


### 出品者視点


https://user-images.githubusercontent.com/61280283/171287343-824ccffe-6169-46c9-826c-5ec85261aa8d.mp4



## コンセプト・着想(プレゼンテーションスライドから抜粋)
![1](https://user-images.githubusercontent.com/61280283/171263311-b363c233-7708-4a8a-a82f-5235bd9bb002.jpg)
![2](https://user-images.githubusercontent.com/61280283/171263348-f92d5516-7776-4243-a2ae-efa90164ba49.jpg)
![3](https://user-images.githubusercontent.com/61280283/171263379-035d818d-641f-4257-bdf0-f77ff4d5e98b.jpg)

## 使用技術・担当者
### フロントエンド：TypeScript/React
- Mitama Masuda ([mitamam](https://github.com/mitamam)) (HTML/CSS)

- mu ([mu-perori](https://github.com/mu-perori)) (TypeScript/React)

### バックエンド：Python/FastAPI/SQLite
- Ando Taichi ([Taichi-ando](https://github.com/Taichi-ando))
- Koheki ([Koheki](https://github.com/Koheki))

