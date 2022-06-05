import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../globals.css';
import '../../variables.css';
import './header.css';

const server = process.env.API_URL || 'http://127.0.0.1:9000';

interface Prop {
  reload?: boolean;
  onLoadCompleted?: () => void;
}

type searchWordsType = {
  search: string
}

export const Header: React.FC<Prop> = (props) => {
  const { reload = true, onLoadCompleted } = props;
  const initialSearchWords = {
    search: ''
  }
  const [searchWords, setSearchWords] = useState<searchWordsType>(initialSearchWords);
  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWords({ ...searchWords, [event.target.name]: event.target.value });
  };
  const navigate = useNavigate()
  const onSubmit = () => {
    navigate(`/want/results?keyword=${encodeURI(searchWords.search)}`);
  }
  return (
    <header>
      <img className="mercari_logo_horizontal" src="../assets/mercari-logo-horizontal.png" />
      <form action="get" onSubmit={onSubmit}>
        <input className="search-box x16px" name="search" placeholder="探されている商品検索" type="text" onChange={onChangeInput} required />
      </form>
      <ul className="header-menu x14px">
        <li className="header-menu-item first"><a href="#">お知らせ</a></li>
        <li className="header-menu-item"><a href="#">やることリスト</a></li>
        <li className="header-menu-item"><a href="#">アカウント</a></li>
        <a href="#" className="sell-btn x14px-bold">出品</a>
      </ul>
    </header>
  )
};
