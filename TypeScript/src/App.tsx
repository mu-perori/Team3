import { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import {
  Want,
  WantInput,
  SoldOut,
  WantItem,
  Finish,
  WantResults,
  TestWant
} from './page';

function App() {
  const [reload, setReload] = useState(true);
  return (
    <div>
      <noscript>ヘッダーは必要なページにのみ書く</noscript>
      <Router>
      <Routes>
        <Route path="/want" element={<Want reload={reload} onLoadCompleted={() => setReload(false)} />} /> // 探してますトップ
        
        <Route path="/want/input" element={<WantInput onListingCompleted={() => setReload(true)} />} /> // 探してます登録
        
        <Route path="/item/soldout" element={<SoldOut onListingCompleted={() => setReload(true)} />} /> // 売り切れ商品
        
        <Route path="/want/item" element={<WantItem reload={reload} onLoadCompleted={() => setReload(false)} />} /> // 探されてる商品
        
        <Route path="/finish" element={<Finish />} /> // 登録完了
        
        <Route path="/want/results" element={<WantResults reload={reload} onLoadCompleted={() => setReload(false)} />} /> // 検索結果

        <Route path="/" element={<TestWant reload={reload} onLoadCompleted={() => setReload(false)} />} /> // オブジェクト表示のテスト
        </Routes>
      </Router>
      <noscript>フッターは必要なページにのみ書く</noscript>
    </div>
  )
}

export default App;