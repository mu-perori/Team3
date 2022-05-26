from random import shuffle
import shutil
from math import fabs
import os
import logging
import pathlib
import sqlite3
import hashlib
from fastapi import FastAPI, Form, HTTPException, UploadFile, File
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

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


@app.get("/")
def root():
    con = sqlite3.connect(db_path, check_same_thread=False)
    cur = con.cursor()


    con.close()
    return {"message": "Hello, world!"}

# 探してます商品の登録
@app.post("/want/input")
def add_want():
    con = sqlite3.connect(db_path, check_same_thread=False)
    cur = con.cursor()
    
    con.close()
    return



# 探してますコーナーのトップ画面
@app.get("/want")
def pickup():
    con = sqlite3.connect(db_path, check_same_thread=False)
    cur = con.cursor()
    
    con.close()
    return

# 探されているアイテムの詳細画面
@app.get("/want/item")
def view_item():
    con = sqlite3.connect(db_path, check_same_thread=False)
    cur = con.cursor()
    
    con.close()
    return


# 探してます商品の検索結果
@app.get("/want/results")
def search():
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

