import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../globals.css';
import '../variables.css';
import './input.css';

const server = process.env.API_URL || 'http://127.0.0.1:9000';

interface Prop {
  onListingCompleted?: () => void;
}

type formDataType = {
  category: string, // カテゴリ
  item_name: string, // 商品名
  budget: string, // 予算
  item_status: number | null, // 商品の状態
  item_discription: string // 詳細
}

type locationDataType = {
  item_name: string, 
  category: string,
  item_price: string,
  item_id: string | null
}

export const WantInput: React.FC<Prop> = (props) => {
  const { onListingCompleted } = props;
  const location = useLocation();
  const state = location.state as locationDataType
  const selectedJudge = (selectValue: string, stateValue:string) => {
      return selectValue == stateValue
  }
  const initialState = {
      category: (state ? state.category : ''),
      item_name: (state ? state.item_name : ''),
      budget: (state ? state.item_price : '300'),
      item_status: null,
      item_discription: 'null'
  };
  const [values, setValues] = useState<formDataType>(initialState);
  const isVaild = (values: formDataType): boolean => {
      // return !(values.category && values.item_name && values.budget && values.item_status);
      return false
  };
  console.log(values)
  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    fetch(server.concat('/want/input'), {
      method: 'POST', // デフォルトはGET
      mode: 'cors', // デフォルトもcors
      body: JSON.stringify(values),
    })
      .then(response => {
          if (response.status == 200){
              return response.json()
            }
            throw 'Expected status code is 200, but got status code is '+response.status; // エラーを投げている
        })
      .then(data => {
        console.log('POST success:', data);
        onListingCompleted && onListingCompleted();
        window.location.href='/finish';
      })
      .catch((error) => {
        console.error('POST error:', error);
        alert('もう一度やりなおしてください');
      })
  };

  return (
    <div id="input">
      <div className="header">
        <img className="mercari_logo_horizontal" src="/assets/mercari-logo-horizontal.png" />
      </div>
        <main className="input-main">
          <form onSubmit={onSubmit}>
          <h1 className="heading x24px-bold">ほしい商品の登録</h1>
          <section className="item-detail">
            <h2 className="input-section">商品の詳細</h2>
            <h3 className="label">カテゴリー</h3>
            <select id="selectCategory" name="category"  className="select-category border-1px-e4e4e4" onChange={onChangeInput} required>
              <option hidden selected = {selectedJudge("", initialState.category)}>選択してください</option>
              <option value="レディース" selected = {selectedJudge("レディース", initialState.category)}>レディース</option>
              <option value="メンズ" selected = {selectedJudge("メンズ", initialState.category)}>メンズ</option>
              <option value="ベビー・キッズ" selected = {selectedJudge("ベビー・キッズ", initialState.category)}>ベビー・キッズ</option>
              <option value="インテリア・住まい・小物" selected = {selectedJudge("インテリア・住まい・小物", initialState.category)}>インテリア・住まい・小物</option>
              <option value="本・音楽・ゲーム" selected = {selectedJudge("本・音楽・ゲーム", initialState.category)}>本・音楽・ゲーム</option>
              <option value="おもちゃ・ホビー・グッズ" selected = {selectedJudge("おもちゃ・ホビー・グッズ", initialState.category)}>おもちゃ・ホビー・グッズ</option>
              <option value="コスメ・香水・美容" selected = {selectedJudge("コスメ・香水・美容", initialState.category)}>コスメ・香水・美容</option>
              <option value="家電・スマホ・カメラ" selected = {selectedJudge("家電・スマホ・カメラ", initialState.category)}>家電・スマホ・カメラ</option>
              <option value="スポーツ・レジャー" selected = {selectedJudge("スポーツ・レジャー", initialState.category)}>スポーツ・レジャー</option>
              <option value="ハンドメイド" selected = {selectedJudge("ハンドメイド", initialState.category)}>ハンドメイド</option>
              <option value="チケット" selected = {selectedJudge("チケット", initialState.category)}>チケット</option>
              <option value="自動車・オートバイ" selected = {selectedJudge("自動車・オートバイ", initialState.category)}>自動車・オートバイ</option>
              <option value="その他" selected = {selectedJudge("その他", initialState.category)}>その他</option>
            </select>
        
            <h3 className="label">商品の状態</h3>
            <select name="item_status" id="selectStatus" className="select-status border-1px-e4e4e4" onChange={onChangeInput} required>
              <option hidden>選択してください</option>
              <option value="0">新品、未使用</option>
              <option value="1">未使用に近い</option>
              <option value="2">目立った傷や汚れなし</option>
              <option value="3">やや傷や汚れあり</option>
              <option value="4">傷や汚れあり</option>
              <option value="5">全体的に状態が悪い</option>
            </select>
          </section>
        
          <section className="item-name-description">
        
            <h2 className="input-section">商品名と説明</h2>
            <h3 className="label">商品名</h3>
            <div className="item-name">
              <input id="inputItemName" name="item_name" className="input-item-name border-1px-e4e4e4" value={values.item_name} onChange={onChangeInput} required />
              <p className="name-count x10px">{[... values.item_name].length} / 40</p>
            </div>
        
            <div className="description">
              <div className="description-container">
                <h3 className="label">商品の説明</h3>
                <p className="optional x10px">任意</p>
              </div>
              <textarea id="inputDescription" name="item_discription" className="input-description border-1px-e4e4e4 x16px" placeholder="色、素材、重さ、定価、注意点など
              
              例) 黒い花柄のロング丈ワンピースが欲しいです。
              
              #ワンピース #黒ワンピ #ロング丈" onChange={onChangeInput}></textarea>
              <p className="description-count x10px">{[... values.item_discription].length} / 1000</p>
            </div>
          </section>
        
          <section className="budget">
            <h2 className="input-section">予算</h2>
            <div className="budget-container">
              <h3 className="label">予算</h3>
              <p className="budget-range x14px">(¥300〜9,999,999)</p>
            </div>
            <input id="inputBudget" name="budget" type="number" min="300"  placeholder="300" className="input-budget border-1px-e4e4e4 x20px-bold" value={values.budget} onChange={onChangeInput} required />
          </section>
        
          <button type='submit' disabled={isVaild(values)}  id="submitButton" className="submit-btn x15px-bold">登録する</button>
          </form>
        </main>
      <div className="footer">
        <div className="footer-menu">
          <div className="footer-menu-item first x14px">プライバシーポリシー</div>
          <div className="footer-menu-item x14px">メルカリ利用規約</div>
          <div className="footer-menu-item x14px">特定商取引に関する表記</div>
        </div>
        <div className="copyright x12px">© Mercari, Inc.</div>
      </div>
    </div>
  );
}