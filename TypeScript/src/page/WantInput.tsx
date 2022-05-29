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
  user_id: number,
  category: string, // カテゴリ
  item_name: string, // 商品名
  budget: number, // 予算
  item_status: number | null, // 商品の状態
  item_discription: string, // 詳細
  item_id: string | null // 商品ID
}

type locationDataType = {
  item_name: string, 
  category: string,
  item_price: number,
  item_id: string | null
}

export const WantInput: React.FC<Prop> = (props) => {
  const { onListingCompleted } = props;
  const location = useLocation();
  const state = location.state as locationDataType
  console.log(state)
  const selectedJudge = (selectValue: string, stateValue:string) => {
      return selectValue == stateValue
  }
  const initialState = {
      user_id: 0,
      category: state.category || '',
      item_name: state.item_name || '',
      budget: state.item_price || 0,
      item_status: null,
      item_discription: 'null',
      item_id: 'null'
  };
  const [values, setValues] = useState<formDataType>(initialState);
  const isVaild = (values: formDataType): boolean => {
      return !(values.category && values.item_name && values.budget && values.item_status);
  };

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onChangeDiscription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData()
    data.append('user_id', String(values.user_id));
    data.append('category', values.category);
    data.append('item_name', values.item_name);
    data.append('budget', String(values.budget));
    data.append('item_status', String(values.item_status));
    data.append('item_discription', values.item_discription);
    data.append('item_id', String(values.item_id));

    fetch(server.concat('/input'), {
      method: 'POST', // デフォルトはGET
      mode: 'cors', // デフォルトもcors
      body: data,
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
            <select id="selectCategory" name="category"  className="select-category border-1px-e4e4e4" onChange={onChangeSelect} required>
              <option hidden selected = {selectedJudge("", state.category)}>選択してください</option>
              <option value="レディース" selected = {selectedJudge("レディース", state.category)}>レディース</option>
              <option value="メンズ" selected = {selectedJudge("メンズ", state.category)}>メンズ</option>
              <option value="ベビー・キッズ" selected = {selectedJudge("ベビー・キッズ", state.category)}>ベビー・キッズ</option>
              <option value="インテリア・住まい・小物" selected = {selectedJudge("インテリア・住まい・小物", state.category)}>インテリア・住まい・小物</option>
              <option value="本・音楽・ゲーム" selected = {selectedJudge("本・音楽・ゲーム", state.category)}>本・音楽・ゲーム</option>
              <option value="おもちゃ・ホビー・グッズ" selected = {selectedJudge("おもちゃ・ホビー・グッズ", state.category)}>おもちゃ・ホビー・グッズ</option>
              <option value="コスメ・香水・美容" selected = {selectedJudge("コスメ・香水・美容", state.category)}>コスメ・香水・美容</option>
              <option value="家電・スマホ・カメラ" selected = {selectedJudge("家電・スマホ・カメラ", state.category)}>家電・スマホ・カメラ</option>
              <option value="スポーツ・レジャー" selected = {selectedJudge("スポーツ・レジャー", state.category)}>スポーツ・レジャー</option>
              <option value="ハンドメイド" selected = {selectedJudge("ハンドメイド", state.category)}>ハンドメイド</option>
              <option value="チケット" selected = {selectedJudge("チケット", state.category)}>チケット</option>
              <option value="自動車・オートバイ" selected = {selectedJudge("自動車・オートバイ", state.category)}>自動車・オートバイ</option>
              <option value="その他" selected = {selectedJudge("その他", state.category)}>その他</option>
            </select>
        
            <h3 className="label">商品の状態</h3>
            <select name="item_status" id="selectStatus" className="select-status border-1px-e4e4e4" onChange={onChangeSelect} required>
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
              
              #ワンピース #黒ワンピ #ロング丈" onChange={onChangeDiscription}></textarea>
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