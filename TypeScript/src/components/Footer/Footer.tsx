import React, { useState } from 'react';
import './footer.css';

const server = process.env.API_URL || 'http://127.0.0.1:9000';
const placeholderImage = process.env.PUBLIC_URL + '/logo192.png';

interface Prop {
  reload?: boolean;
  onLoadCompleted?: () => void;
}

export const Footer: React.FC<Prop> = (props) => {
  const { reload = true, onLoadCompleted } = props;

  return (
    <footer>
    	<div className="footer-container">
    		<div className="footer-top">
    			<ul className="footer-menu first">
    				<li className="footer-heading">メルカリについて</li>
    				<li className="footer-menu-item first">会社概要（運営会社）</li>
    				<li className="footer-menu-item">採用情報</li>
    				<li className="footer-menu-item">プレスリリース</li>
    				<li className="footer-menu-item">公式ブログ</li>
    				<li className="footer-menu-item">プレスキット</li>
    				<li className="footer-menu-item">メルカリUS</li>
    			</ul>
    			<ul className="footer-menu">
    				<li className="footer-heading">ヘルプ&amp;ガイド</li>
    				<li className="footer-menu-item first text-1">メルカリガイド</li>
    				<li className="footer-menu-item">らくらくメルカリ便</li>
    				<li className="footer-menu-item">ゆうゆうメルカリ便</li>
    				<li className="footer-menu-item">梱包・発送たのメル便</li>
    				<li className="footer-menu-item">車体取引ガイド</li>
    				<li className="footer-menu-item">メルカリあんしん・あんぜん宣言！</li>
    				<li className="footer-menu-item">偽ブランド品撲滅への取り組み</li>
    				<li className="footer-menu-item">フリーワードからさがす</li>
    				<li className="footer-menu-item">お問い合わせ</li>
    			</ul>
    			<ul className="footer-menu">
    				<li className="footer-heading">プライバシーと利用規約</li>
    				<li className="footer-menu-item first text-1">プライバシーポリシー</li>
    				<li className="footer-menu-item">メルカリ利用規約</li>
    				<li className="footer-menu-item">コンプライアンスポリシー</li>
    				<li className="footer-menu-item">個人データの安全管理に係る基本方針</li>
    				<li className="footer-menu-item">特定商取引に関する表記</li>
    				<li className="footer-menu-item">資金決済法に基づく表示</li>
    				<li className="footer-menu-item">法令順守と犯罪抑止のために</li>
    			</ul>
    		</div>
    		<div className="footer-bottom">
    			<img className="icon-twitter" src="../assets/twitter-brands.svg" />
    			<img className="icon-facebook" src="../assets/facebook-brands.svg" />
    			<p className="copyright x12px">© Mercari, Inc.</p>
    		</div>
    	</div>
    </footer>
  )
};
