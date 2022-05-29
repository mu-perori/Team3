import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

import './want.css';

const server = process.env.API_URL || 'http://127.0.0.1:9000';
const placeholderImage = process.env.PUBLIC_URL + '/logo192.png';

interface Prop {
  reload?: boolean;
  onLoadCompleted?: () => void;
}

type pickupItemsType = {
  category_info: categoryInfoType,
  item_list: itemsListType[]
};
type categoryInfoType = {
  category: string,
  avg_budget: number
};
type itemsListType = {
  wants_id: number,
  item_image_name: string,
  item_name: string,
  budget: number
};

// 一番最初の要素にだけ指定されているクラスをmapのindexを使って判定して返す
const first = (index: number) => {
  if (index == 0) { return " first" }
  return ""
};

const linkTo = (itemId: number) => {
  return { pathname: "/want/item", search: String(itemId) }
}

// 探してますトップページ
export const Want: React.FC<Prop> = (props) => {
  const { reload = true, onLoadCompleted } = props;

  const [pickupItems, setPickupItems] = useState<pickupItemsType[] | undefined>(undefined);
  const fetchItems = () => {
    fetch(server.concat('/want'),
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
        setPickupItems(data);
        onLoadCompleted && onLoadCompleted();
      })
      .catch(error => {
        console.error('GET error:', error)
      });
  }

  useEffect(() => {
    if (reload) {
      fetchItems();
    }
  }, [reload]);

  return (
    <div id="want">
      <Header />
      <div className="header-list x14px-bold border-1px-e5e5e5">
        <p className="header-list-item first">おすすめ</p>
        <p className="header-list-item">マイリスト</p>
        <p className="header-list-item">ピックアップ</p>
        <p className="active">人気</p>
      </div>

      <main>
        <div className="heading">
          <h1 className="x20px-bold">人気の探されている商品</h1>
          <a href="/want/input" className="move-want-input x14px-bold">ほしい物に登録</a>
        </div>

        {pickupItems && pickupItems.map((value: pickupItemsType, index) => {
          return (
            <div key={value.category_info.category}>
              <div className={"category" + first(index)}>
                <div className="col">
                  <h2 className="category-heading arial-bold-mine-shaft-17px">{value.category_info.category}</h2>
                  <div className="average-price">
                    <p className="x14px">平均価格</p>
                    <p className="price-yen x14px-bold">¥</p>
                    <p className="price-value x14px-bold">{value.category_info.avg_budget}</p>
                  </div>
                </div>

                <ul className="col">
                  {value.item_list.map((item: itemsListType, index) => {
                    return (
                      <div key={item.wants_id}>
                        <li className={"item" + first(index)}>
                          <Link to={linkTo(item.wants_id)}>
                            <div className="thumbnail">
                              <img className="thumbnail-image" src="" alt="" />
                              <div className="price-label x20px-bold">
                                <span>¥</span>
                                <p className="price-value">{item.budget}</p>
                              </div>
                            </div>
                            <p className="item-name x14px">{item.item_name}</p>
                          </Link>
                        </li>
                      </div>
                    );
                  })}
                  <noscript>商品繰り返しの終わり</noscript>
                </ul>
              </div>
            </div>
          );
        })}
        <noscript>カテゴリ繰り返しの終わり</noscript>
      </main>
      <Footer />
    </div>
  );
};
