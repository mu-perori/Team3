from random import shuffle
import shutil
from math import fabs
import os
import logging
import pathlib
import sqlite3
import json
import hashlib
from fastapi import FastAPI, Form, HTTPException, UploadFile, File
from fastapi.responses import FileResponse, JSONResponse, ORJSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI()
logger = logging.getLogger("uvicorn")
logger.level = logging.INFO
images = pathlib.Path(__file__).parent.resolve() / "images"
origins = [ os.environ.get('FRONT_URL', 'http://localhost:3000') ]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["GET","POST","PUT","DELETE"],
    allow_headers=["*"],
)

db_path = pathlib.Path(__file__).parent.resolve() / "db" / "team3.sqlite3"
images_path = pathlib.Path(__file__).parent.resolve() / "images"

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
    

class Want_item(BaseModel):
    item_id: int


@app.get("/")
def root():
    return {"message": "Hello, world!"}

# 探してます商品の登録
@app.post("/want/input")
def add_want(want_input: Want_input):
    con = sqlite3.connect(db_path, check_same_thread=False)
    cur = con.cursor()
    
    con.close()
    return 


# 探してますコーナーのトップ画面
@app.get("/want")
def pickup():
    con = sqlite3.connect(db_path, check_same_thread=False)
    cur = con.cursor()
# カテゴリは今回は４のみの用意

    tmp_dict = dict()

    for i in range(4):
        cid = "category{}".format(i+1)
        tmp_dict[cid] = {"category":,
                        "avg_budget":,
                        "items":[
                            {"item_name":,"item_price":,"item_image": },
                            {"item_name":,"item_price":,"item_image": },
                            {"item_name":,"item_price":,"item_image": },
                            {"item_name":,"item_price":,"item_image": },
                            {"item_name":,"item_price":,"item_image": },
                        ]}
    
    con.close()
    return json.dumps(tmp_dict)

@app.get("/want/results")
def search(want: Want_keyword):
    con = sqlite3.connect(db_path, check_same_thread=False)
    cur = con.cursor()

    tmp_set = set()

    for _ in range(20):
        tmp_set.add(json.dumps({"item_name":,"item_price":,"item_image": }))

    
    con.close()
    return json.dumps(tmp_set)
  

# 探されているアイテムの詳細画面 
@app.get("/want/item")
def view_item(want_item: Want_item):
    con = sqlite3.connect(db_path, check_same_thread=False)
    cur = con.cursor()

    
    con.close()
    return 


# # これ売りませんか通知
# @app.get("/notifications")
# def notification():

#     return

# # デモ出品入力
# @app.post("/sell/create")
# def add_item():
#     return

