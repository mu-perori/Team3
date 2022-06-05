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

"""
db_path = (
    pathlib.Path(os.path.dirname(__file__)).parent.resolve() / "db" / "team3.sqlite3"
)
"""
db_path = "../db/team3.sqlite3" # うえはらの環境はこのパスなら動く

images_path = pathlib.Path(os.path.dirname(__file__)).parent.resolve() / "images"


# class Want_keyword(BaseModel):
#     keyword: str


#class Want_input(BaseModel):
    # user_id: int
    # user_name: str
    # item_id: int = None
    


# class Want_item(BaseModel):
#     want_id: int


@app.get("/")
def root():
    return {"message": "Hello, world!"}


# 探してます商品の登録
@app.post("/want/input")
def add_want():
  pass
"""
def add_want(category: str = Form(...), item_name: str = Form(...), budget: int = Form(...), item_status: int = Form(...), item_discription: str = Form(...)):
    con = sqlite3.connect(db_path, check_same_thread=False)
    cur = con.cursor()
    # res = cur.execute("SELECT item_id FROM wants")
    cur.execute(
        "INSERT INTO wants(category, item_name, budget, item_status, item_discription) VALUES(?, ?, ?, ?, ?)",
        (
            category,
            item_name,
            budget,
            item_status,
            item_discription,
            # want_input.item_id,
        ),
    )
    con.commit()
    con.close()
    return {"message": "登録しました！"}
"""

# 探してますコーナーのトップ画面
@app.get("/want")
def pickup():
    con = sqlite3.connect(db_path, check_same_thread=False)
    cur = con.cursor()
    # カテゴリは今回は４のみの用意
    categories = ["カメラ", "本", "レディース", "スポーツ"]
    tmp_list = []

    for i in range(4):
        cname = categories[i]
        items_list = cur.execute(
            "select item_id, wants_id, item_name,budget from wants where category = :c limit 5",
            {"c": cname},
        ).fetchall()

        tmp_list2 = []

        for j in range(len(items_list)):
            item_id, wants_id, item_name, budget = items_list[j]

            item_image_name = cur.execute(
                "select item_image_name from items where item_id = :id", {"id": item_id}
            ).fetchone()[0]

            tmp_list2.append(
                {
                    "wants_id": wants_id,
                    "item_name": item_name,
                    "budget": budget,
                    "item_image_name": item_image_name,
                }
            )

        avg_bud = cur.execute(
            "select avg(budget) from wants where category = :c", {"c": cname}
        ).fetchone()

        tmp_list.append(
            {
                "category_info": {"category": cname, "avg_budget": round(avg_bud[0])},
                "item_list": tmp_list2,
            }
        )

    con.close()
    return tmp_list


@app.get("/want/results")
def search(keyword: str):
    con = sqlite3.connect(db_path, check_same_thread=False)
    cur = con.cursor()
    tmp_set = []
    items_list = cur.execute(
        "select item_id, wants_id, item_name, budget from wants where category = ?  or item_name = ? limit 20",
        (keyword, keyword),
    ).fetchall()

    for item in items_list:
        item_id, wants_id, item_name, budget = item
        item_image_name = cur.execute(
            "select item_image_name from items where item_id = :id", {"id": item_id}
        ).fetchone()

        tmp_set.append(
            {
                "wants_id": wants_id,
                "item_name": item_name,
                "budget": budget,
                "item_image_name": item_image_name[0],
            }
        )

    con.close()
    return tmp_set


# 探されているアイテムの詳細画面
@app.get("/want/item")
def view_item(want_id: str):
    con = sqlite3.connect(db_path, check_same_thread=False)
    cur = con.cursor()
    cur.execute(
        "SELECT wants.item_id FROM wants WHERE wants.wants_id = ?", (int(want_id),)
    )
    res = cur.fetchall()
    if res[0][0]:
        cur.execute(
            "SELECT items.item_image_name FROM items WHERE items.item_id = ?",
            (int(res[0][0]),),
        )
        image_name = cur.fetchall()[0][0]
    else:
        image_name = "no_image"
    cur.execute(
        "SELECT wants.item_name, wants.category, wants.item_discription, wants.item_status, wants.budget FROM wants WHERE wants.wants_id = ?",
        (int(want_id),),
    )
    items = cur.fetchall()
    budgets = cur.fetchall()
    con.close()
    return {
        "item_name": items[0][0],
        "budget": items[0][4],
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


def main():
    print(pickup())


if __name__ == "__main__":
    main()
