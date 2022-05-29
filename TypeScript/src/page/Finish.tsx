import React from 'react';
import './finish.css';

const server = process.env.API_URL || 'http://127.0.0.1:9000';

export const Finish: React.FC = () => {
  return (
    <div id="finish">
      <div className="header">
        <img className="mercari_logo_horizontal" src={"assets/mercari-logo-horizontal.png"} />
      </div>
      <main className="finish-main">
        <h1 className="finish-heading x24px-bold">登録が完了しました</h1>
        <p className="finish-text x14px">あなたのほしい商品は「ほしい商品」からいつでも見ることができます</p>
        <a href="/want/input" className="btn continue-btn x15px-bold">続けて登録する</a>
        <a href="/want" className="btn return-btn x15px-bold">トップページへ戻る</a>
      </main>
      <div className="footer">
        <div className="footer-menu">
          <p className="footer-menu-item first x14px">プライバシーポリシー</p>
          <p className="footer-menu-item x14px">メルカリ利用規約</p>
          <p className="footer-menu-item x14px">特定商取引に関する表記</p>
        </div>
        <p className="copyright x12px">© Mercari, Inc.</p>
      </div>
    </div>
  )
};
