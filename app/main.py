from random import shuffle
import shutil
from math import fabs
import os
import logging
import pathlib
import sqlite3
import json
import hashlib
from unicodedata import category
from fastapi import FastAPI, Form, HTTPException, UploadFile, File
from fastapi.responses import FileResponse, JSONResponse, ORJSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI()
logger = logging.getLogger("uvicorn")
logger.level = logging.INFO
images = pathlib.Path(__file__).parent.resolve() / "images"
origins = [os.environ.get("FRONT_URL", "http://localhost:3000")]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

db_path = (
    pathlib.Path(os.path.dirname(__file__)).parent.resolve() / "db" / "team3.sqlite3"
)

images_path = pathlib.Path(os.path.dirname(__file__)).parent.resolve() / "images"


class Want_keyword(BaseModel):
    keyword: str


class Want_input(BaseModel):
    user_id: int
    user_name: str
    category: str
    item_name: str
    budget: int
    item_status: int = Field(..., ge=0, le=5)
    item_discription: str
    item_id: int = None


class Want_item(BaseModel):
    want_id: int


@app.get("/")
def root():
    return {"message": "Hello, world!"}


# 探してます商品の登録
@app.post("/want/input")
def add_want(want_input: Want_input):
    con = sqlite3.connect(db_path, check_same_thread=False)
    cur = con.cursor()
    # res = cur.execute("SELECT item_id FROM wants")
    cur.execute(
        "INSERT INTO wants(user_id, user_name, category, item_name, budget, item_status, item_discription, item_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?)",
        (
            want_input.user_id,
            want_input.user_name,
            want_input.category,
            want_input.item_name,
            want_input.budget,
            want_input.item_status,
            want_input.item_discription,
            want_input.item_id,
        ),
    )
    con.commit()
    con.close()
    return {"message": "登録しました！", "path": db_path}


#探してますコーナーのトップ画面
@app.get("/want")
def pickup():
    con = sqlite3.connect(db_path, check_same_thread=False)
    cur = con.cursor()
    # カテゴリは今回は４のみの用意
    categories = ["カメラ","本","服","文房具"]
    tmp_dict = dict()

    for i in range(4):
        cid = "category{}".format(i+1)


        cname = categories[i]
        items_list = cur.execute("select item_id,item_name,item_price from wants where category = :c limit 5",{"c":cname}).fetchall()
        for j in range(5):
            item_id,item_name,item_price = *items_list[j]

            item_image_name = cur.execute("select item_image_name from items where item_id = :id",{"id":item_id}).fetchone()

            items_list[j] = {"item_id":item_id ,"item_name":item_name,"item_price":item_price,"item_image_name":item_image_name}

        avg_bud = int(cur.execute("select avg(item_price) from wants where category = :c",{"c":cname}).fetchone())

        tmp_dict[cid] = {"category":cname,
                        "avg_budget":avg_bud,
                        "items":items_list}
    
    con.close()
    return json.dumps(tmp_dict)

  
@app.get("/want/results")
def search(want: Want_keyword):
    con = sqlite3.connect(db_path, check_same_thread=False)
    cur = con.cursor()
    tmp_set = set()
    keyword = want.keyword
    items_list = cur.execute("select item_id,item_name,item_price from wants where category = ?  or item_name = ? limit 20",(keyword,keyword)).fetchall()


    for item in items_list:
        item_id,item_name,item_price = *item
        item_image_name = cur.execute("select item_image_name from items where item_id = :id",{"id":item_id}).fetchone()

        tmp_set.add(json.dumps( {"item_id":item_id ,"item_name":item_name,"item_price":item_price,"item_image_name":item_image_name}))

    con.close()
    return json.dumps(tmp_set)


# 探されているアイテムの詳細画面
@app.get("/want/item")
def view_item(want_item: Want_item):
    con = sqlite3.connect(db_path, check_same_thread=False)
    cur = con.cursor()
    cur.execute(
        "SELECT wants.item_id FROM wants WHERE wants.item_id = ?", (want_item.want_id,)
    )
    res = cur.fetchall()
    if res:
        cur.execute(
            "SELECT items.item_image_name FROM items WHERE items.item_id = ?",
            (res,),
        )
        image_name = cur.fetchall()
    else:
        image_name = "no_image"
    cur.execute(
        "SELECT wants.item_name, wants.category, wants.item_discription, wants.item_status FROM wants WHERE wants.wants_id = ?",
        (want_item.want_id,),
    )
    items = cur.fetchall()
    print(items)
    cur.execute(
        "SELECT wants.budget FROM wants WHERE wants.item_name = ?", (items[0][0],)
    )
    budgets = cur.fetchall()
    con.close()
    avg_budget = sum([i[0] for i in budgets]) / len(budgets)
    print(budgets)
    return {
        "item_name": items[0][0],
        "avg_budget": int(avg_budget),
        "category": items[0][1],
        "item_status": items[0][3],
        "item_discription": items[0][2],
        "item_image_name": image_name,
    }


# # これ売りませんか通知
# @app.get("/notifications")
# def notification():

#     return

# # デモ出品入力
# @app.post("/sell/create")
# def add_item():
#     return
