import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

import './results.css';

const server = process.env.API_URL || 'http://127.0.0.1:9000';
const placeholderImage = process.env.PUBLIC_URL + '/logo192.png';
const image_path = '../images/'

interface Prop {
  reload?: boolean;
  onLoadCompleted?: () => void;
}

type resultsType = {
  wants_id: number,
  item_image_name: string,
  item_name: string,
  budget: number
}

const insertTag = (index: number, min_i: number, max_i: number) => { return index >= min_i && index <= max_i }

const linkTo = (itemId: number) => {
  return { pathname: '/want/item', search: "want_id=" + String(itemId) }
}

const searchWords = (s: string) => {
  // サーチの文字列を変換して返す
  return s.replace('?keyword=', '') + '　'
}

export const WantResults: React.FC<Prop> = (props) => {
  const { reload = true, onLoadCompleted } = props;
  const location = useLocation(); // 前のページから情報を受け取る
  const [results, setResults] = useState<resultsType[]>([]);
  const fetchItems = () => {
    console.log(decodeURI(location.search))
    fetch(server.concat('/want/results' + location.search),
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
        setResults(data);
        // onLoadCompletedが存在するときのみonLoadCompleted()を実行する
        onLoadCompleted && onLoadCompleted();
      })
      .catch(error => {
        console.error('GET error:', error)
      })
  }

  useEffect(() => {
    fetchItems();
  }, [reload]);
  return (
    <div id="results">
      <Header />
      <main>
        <div className="filter">
          <h2 className="filter-heading x17px-bold">絞り込み<span className="filter-clear x14px">クリア</span></h2>
          <ul className="filter-container x14px-bold">
            <li className="filter-item first">
              <h3 className="filter-item-heading">カテゴリー</h3>
              <img className="chevron-down" src="../assets/chevron-down-solid.png" />
            </li>
            <li className="filter-item">
              <h3 className="filter-item-heading">商品の状態</h3>
              <img className="chevron-down" src="../assets/chevron-down-solid.png" />
            </li>
            <li className="filter-item">
              <h3 className="filter-item-heading">予算</h3>
              <img className="chevron-down last" src="../assets/chevron-down-solid.png" />
            </li>
          </ul>
        </div>

        <div className="content">
          <h1 className="results-heading x24px-bold">{searchWords(decodeURI(location.search))}の検索結果</h1>
          <div className="col">
            <p className="quantity x12px">999+件</p>
            <div className="filter-select-container">
              <p className="filter-select x14px">おすすめ順</p>
              <p className="save-filter x12px-bold">この検索条件を保存する</p>
            </div>
          </div>
          <div className="results-container">
            {results && results.map((value: resultsType, index) => {
              return (
                <div key={value.wants_id}>
                  {insertTag(index, 0, 4) && (
                    <div className={"item"}>
                      <Link to={linkTo(value.wants_id)}>
                        <div className="thumbnail">
                          <img id="thumbnail12" className="thumbnail-image" src={image_path + value.item_image_name} />
                          <div className="price-label x20px-bold">
                            <div className="price">¥</div>
                            <div id="valuePrice12" className="price-value">{value.budget}</div>
                          </div>
                        </div>
                        <p className="item-name x14px">{value.item_name}</p>
                      </Link>
                    </div>
                  )}
                  {insertTag(index, 5, 9) && (
                    <div className={"item"}>
                      <Link to={linkTo(value.wants_id)}>
                        <div className="thumbnail">
                          <img id="thumbnail12" className="thumbnail-image" src={image_path + value.item_image_name} />
                          <div className="price-label x20px-bold">
                            <div className="price">¥</div>
                            <div id="valuePrice12" className="price-value">{value.budget}</div>
                          </div>
                        </div>
                        <p className="item-name x14px">{value.item_name}</p>
                      </Link>
                    </div>
                  )}
                  {insertTag(index, 10, 14) && (
                    <div className={"item"}>
                      <Link to={linkTo(value.wants_id)}>
                        <div className="thumbnail">
                          <img id="thumbnail12" className="thumbnail-image" src={image_path + value.item_image_name} />
                          <div className="price-label x20px-bold">
                            <div className="price">¥</div>
                            <div id="valuePrice12" className="price-value">{value.budget}</div>
                          </div>
                        </div>
                        <p className="item-name x14px">{value.item_name}</p>
                      </Link>
                    </div>
                  )}
                  {insertTag(index, 15, 19) && (
                    <div className={"item"}>
                      <Link to={linkTo(value.wants_id)}>
                        <div className="thumbnail">
                          <img id="thumbnail12" className="thumbnail-image" src={image_path + value.item_image_name} />
                          <div className="price-label x20px-bold">
                            <div className="price">¥</div>
                            <div id="valuePrice12" className="price-value">{value.budget}</div>
                          </div>
                        </div>
                        <p className="item-name x14px">{value.item_name}</p>
                      </Link>
                    </div>
                  )}

                </div>
              )
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
