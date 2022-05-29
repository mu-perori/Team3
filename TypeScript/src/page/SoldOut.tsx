import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

import './soldout.css';

const server = process.env.API_URL || 'http://127.0.0.1:9000';

interface Prop {
  onListingCompleted?: () => void;
}

export const SoldOut: React.FC<Prop> = (props) => {
  const { onListingCompleted } = props;
  const item_info = {
    item_name: 'ハリー・ポッターと賢者の石',
    category: '本・音楽・ゲーム',
    item_price: 1000,
    item_id: 1
  }
  const navigate = useNavigate()
  const moveInputPage = () => {
    navigate("/want/input", { state: item_info });
  };
  return (
    <div id="soldout">
    <Header />
	<main className="soldout-main">
		<ul className="image-slider">
			<li className="slider-item"><img src="" /></li> <noscript> メイン画像と同じ画像（スライダー用） </noscript>
		</ul>

		<div className="item-image">
			<div className="soldout-triangle"><p className="sold">SOLD</p></div>
			<img id="itemImage" src="" /> <noscript> メイン画像 </noscript>
		</div>

		<div className="soldout-content">
			<h1 className="x24px-bold">ハリー・ポッターと賢者の石</h1>  <noscript> 商品名 </noscript>

			<div className="price-heading">
				<div className="price x28px-bold">
					<p className="price-yen">¥</p>
					<h2 id="price" className="amount">1,000</h2> <noscript> 値段 </noscript>
				</div>
				<p className="price-detail x12px">(税込) 送料込み</p>
			</div>

			<div className="like-and-comment">
				<div className="like">
					<img className="icon" src="../assets/heart-regular.svg" />
					<div className="like-number x12px">1</div>
				</div>
				<div className="comment">
					<img className="icon" src="../assets/message-regular.svg" />
					<div className="comment-text x12px">コメント</div>
				</div>
			</div>

			<div className="soldout-btn x15px-bold">売り切れました</div>
			<a onClick={moveInputPage} className="move-want-input-btn x15px-bold">ほしい商品に登録する</a>

			<h3 className="soldout-heading">商品の説明</h3>
			<p className="soldout-description x15px"> <noscript> 商品説明 </noscript>
				「ハリー・ポッターと賢者の石」<br/>J.K.ローリング / 松岡 佑子<br/>定価: ¥ 2090<br/><br/>#JKローリング #J_K_ローリング #松岡佑子 #松岡_佑子 #本 #外国文学／小説・物語
			</p>
			<p className="timeago x15px">1日前</p>

			<h3 className="soldout-heading">商品の情報</h3>
			<div className="detail-list">
				<div className="detail-list-item">
					<p className="detail-list-heading x15px-bold">カテゴリー</p>
					<div className="category-container x14px">
						<p className="x15px">本・音楽・ゲーム</p> <noscript> カテゴリー </noscript>
						<img className="chevron-right-solid" src="../assets/chevron-right-solid.svg" />
					</div>
				</div>
				<div className="detail-list-item status">
					<p className="detail-list-heading x15px-bold">商品の状態</p> <noscript> 商品の状態 </noscript>
					<p id="itemStatus" className="item-status x15px">目立った傷や汚れなし</p>
				</div>
				<div className="detail-list-item fee">
					<p className="detail-list-heading x15px-bold">配送料の負担</p>
					<p className="item-fee x15px">送料込み(出品者負担)</p>
				</div>
				<div className="detail-list-item delivery">
					<p className="detail-list-heading x15px-bold">配送の方法</p>
					<p className="item-delivery x15px">らくらくメルカリ便</p>
				</div>
				<div className="detail-list-item area">
					<p className="detail-list-heading x15px-bold">発送元の地域</p>
					<p className="item-area x15px">東京都</p>
				</div>
				<div className="detail-list-item days">
					<p className="detail-list-heading x15px-bold">発送までの日数</p>
					<p className="item-days x15px">1~2日で発送</p>
				</div>
			</div>
		</div>
	</main>
	<Footer />
    </div>
  );
}