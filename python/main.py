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

@app.get("/")
def root():
    return {"message": "Hello, world!"}

# 探してます商品の登録
@app.post("/want")
def add_want():

    return

# 品切れ商品をほしいものに登録
@app.post("/item/soldout")
def add_want_soldout():
    return

# 探してますコーナーのトップ画面
@app.get("/want/pickup")
def pickup():

    return

# 探してます商品の検索結果
@app.get("/want/results")
def search():
    return

# これ売りませんか通知
@app.get("/notifications")
def notification():

    return

# デモ出品入力
@app.post("/sell/create")
def add_item():
    return