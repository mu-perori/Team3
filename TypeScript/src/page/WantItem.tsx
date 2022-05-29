import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

import './item.css';

const server = process.env.API_URL || 'http://127.0.0.1:9000';

interface Prop {
  reload?: boolean;
  onLoadCompleted?: () => void;
}

type itemInfoType = {
  item_name: string,
  budget: number, 
  category: string, 
  item_status: number,
  item_discription: string,
  item_image_name: string
}

const status = (item_status: number) => {
  switch (item_status){
    case 0: return '新品、未使用'
    case 1: return '未使用に近い'
    case 2: return '目立った傷や汚れなし'
    case 3: return 'やや傷や汚れあり'
    case 4: return '傷や汚れあり'
    case 5: return '全体的に状態が悪い'
  }
}

export const WantItem: React.FC<Prop> = (props) => {
  const { reload = true, onLoadCompleted } = props;
  const location = useLocation(); // 前のページから情報を受け取る
  const parameter = location as {pathname: string, search: string}
  console.log(parameter.search)
  const initialStatus = {
    item_name: '',
    budget: 0, 
    category: '', 
    item_status: 0,
    item_discription: '',
    item_image_name: ''
  }
  const [itemInfo, setItemInfo] = useState<itemInfoType>(initialStatus);
  const fetchItems = () => {
    fetch(server.concat('/want/item'+encodeURI(parameter.search)),
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      })
      .then(response => response.json())
      .then(data => {
        console.log('GET success:', data);
        setItemInfo(data);
        // onLoadCompletedが存在するときのみonLoadCompleted()を実行する
        onLoadCompleted && onLoadCompleted();
      })
      .catch(error => {
        console.error('GET error:', error)
      })
  }

  useEffect(() => {
    if (reload) {
      fetchItems();
    }
  }, [reload]);
  return (
    <div id="item">
    <Header />
  	<main>
  		<ul className="image-slider">
  			<li className="slider-item"><img id="sliderThumbnail" src="" /></li> <noscript> メイン画像と同じ画像（スライダー用） </noscript>
  		</ul>
  
  		<div className="item-image"><img id="itemImage" src="" /></div> <noscript> メイン画像 </noscript>
  
  		<div className="content">
  			<h1 className="x24px-bold" id="itemName">{itemInfo.item_name}</h1> <noscript> 商品名 </noscript>
  
  			<div className="price-heading">
  				<div className="price x28px-bold">
  					<p className="price-yen">¥</p>
  					<h2 id="budget" className="amount">{Number(itemInfo.budget).toLocaleString()}</h2> <noscript> 予算 </noscript>
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
  
  			<a id="sellCreate" href="https://jp.mercari.com/sell/create" className="sell-create x15px-bold">出品する</a>
  
  			<h3 className="section">商品の説明</h3>
  			<p id="itemDescription" className="description x15px"> <noscript> 商品説明 </noscript>
  				{itemInfo.item_discription}
  			</p>
  			<p className="timeago x15px">1日前</p>
  
  			<div className="section">商品の情報</div>
  			<div className="detail-list">
  				<div className="category">
  					<p className="category-heading x15px-bold">カテゴリー</p>
  					<div className="category-container x14px">
  						<p id="category" className="x15px">{itemInfo.category}</p> <noscript> カテゴリー </noscript>
  						<img className="chevron-right-solid" src="../assets/chevron-right-solid.svg" />
  					</div>
  				</div>
  				<div className="status">
  					<p className="status-header x15px-bold">商品の状態</p> 
  					<noscript> 商品の状態 </noscript>
  					<p id="itemStatus" className="item-status x15px">{status(itemInfo.item_status)}</p>
  				</div>
  			</div>
  		</div>
  	</main>
    <Footer />
    </div>
  )
};
