import os
import logging # あるソフトウェアが実行されているときに起こったイベントを追跡する
import pathlib # ファイルシステムのパスを表すクラスを提供
import json
import hashlib # ハッシュを求めるライブラリ
# FastAPI：APIのすべての機能を提供するPythonクラス
# Form：JSONの代わりにフィールドを受け取る
# HTTPException：
from fastapi import FastAPI, Form, HTTPException, File, UploadFile
from fastapi.responses import FileResponse # 
# CORSMiddleware：CORSに関する設定ができるミドルウェア
from fastapi.middleware.cors import CORSMiddleware
import sqlite3
import shutil

# FastAPIの「インスタンス」を生成
# uvicornコマンド内のappおよび以下の@appは全てこのインスタンスを指している
app = FastAPI()
logger = logging.getLogger("uvicorn")
# INFOレベル以上の情報をコンソールに表示する設定(デフォルトはWARNING)
logger.level = logging.INFO
"""
__file__：実行中のファイルの場所(パス)
parent：現在の階層の一つ上のパスを返す
resolve()：絶対パスに変換
/演算子：Pathオブジェクトに対して使うとパスが連結される
images = <<main.pyのパス>-"/main.py"の絶対パス>/images
       = .../python/images
"""
images = pathlib.Path(__file__).parent.resolve() / "images"
# os.environ.get：環境変数を取得。無い場合は第二引数の値になる。
origins = [ os.environ.get('FRONT_URL', 'http://localhost:3000') ]
"""
ミドルウェア：OSとAPの中間で様々なソフトウェアから共通して利用される機能を提供するもの。
オリジン：プロトコルとドメインとポートの組み合わせ。(例：http://localhost:3000)
add_middleware：ミドルウェアの設定をする。第一引数にミドルウェアクラスを受け取る
CORSMiddleware：CORSに関する設定ができるミドルウェア
allow_origins：オリジン間リクエストを許可するオリジンのリスト
allow_credentials：オリジン間リクエストでCookieをサポートする必要があることを示す。(今回はFalseだからサポートの必要がないことを示している)
allow_methods：オリジン間リクエストで許可するHTTPメソッドのリスト。デフォルトは ['GET']。
allow_headers：オリジン間リクエストでサポートするHTTPリクエストヘッダーのリスト。デフォルトは [] 。['*']を使用して、すべてのヘッダーを許可。
"""
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["GET","POST","PUT","DELETE"],
    allow_headers=["*"],
)

def get_json(file_name):
    # JSONファイルの有無を確認
    if os.path.isfile(file_name) == True:
        # あったら読み込んでjson_dictに代入
        with open(file_name, 'r') as f:
            return json.loads(f.read())
    else:
        return {"items": []}

def add_json(content):
    json_dict = get_json("items.json")
    json_dict["items"].append(content)
    with open("items.json", 'w') as f:
        json.dump(json_dict, f, indent=2, ensure_ascii=False)

@app.get("/hello")
def root():
    return {"greeting_word": "Hello,", "name": " world!"} # レスポンス

@app.get("/want")
def want():
    return_list = []
    for i in range(4):
        category = {"category": "カテゴリ名"+str(i+1), "avg_budget": (i+1)*100}
        item_list = []
        for j in range(5):
            item = {"wants_id": (i+1)*(j+1), "item_image_name": "画像名.jpg", "item_name": "商品名"+str(i+1)+"-"+str(j+1), "item_price": (i+1)*(j+1)}
            item_list.append(item)
        return_list.append({"category_info": category, "item_list": item_list})
    return return_list # レスポンス

@app.get("/want/results")
def want():
    return_list = []
    for i in range(20):
        return_list.append({"item_image_name": str(i+1)+".jpg", "item_name": "商品名"+str(i+1), "item_price": (i+1)*100})
    return return_list # レスポンス

@app.get("/want/item")
def want_item():
    return_obj = {'item_name': '黒の花柄ワンピース',
    'avg_budget': '1000', 
    'category': 'レディース', 
    'item_status': 2,
    'item_discription': 'こういう黒い花柄のロング丈のワンピースが欲しいです。\nサイズはM希望です。ぜひ出品お願いします。',
    'item_image_name': '画像.jpg'}
    return return_obj # レスポンス

@app.post("/input") 
def add_item(user_id: str = Form(...), category: str = Form(...), item_name: str = Form(...), budget: str = Form(...), item_status: str = Form(...), item_discription: str = Form(...), item_id: str = Form(...)):
    # add_json({"name": name, "category": category})
    # logger.info：このアプリを起動したウィンドウに表示されるイベントの報告
    logger.info(f"Receive item: {item_name} {category} {item_status}")
    return {"message": f"item received: {item_name}"}


def main():
    print(want())

if __name__ == '__main__':
    main()
