import React, { useEffect, useState } from 'react';

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

// 探してますトップページ
export const TestWant: React.FC<Prop> = (props) => {
  const { reload = true, onLoadCompleted } = props;
  // 型がうまくいってない？ -> any
  // setPickupItems がそもそもうごかないのか？

  const [pickupItems, setPickupItems] = useState<pickupItemsType[]|undefined>(undefined);
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
      })
  }

  useEffect(() => {
    if (reload) {
      fetchItems();
    }
  }, [reload]);

  // 配列.map((value: 型, index)=>{}}
  // valueで値がindexで配列のインデックスが取得できる(変数名は何でもOK)
  /*
  {pickupItems && pickupItems.map((value: pickupItemsType, index) => {
    return (
      <div key={value.category_info.category}> // この行は必ず必要。keyに指定する値は必ず重複がないもの。
      {value.category_info.avg_budget}
      </div>
    )
  })}
  */
  return (
    <>
      <p>want</p>
      {pickupItems && pickupItems.map((value: pickupItemsType, index) => {
        return (
         <div key={value.category_info.category}>
           <div>{index} : {value.category_info.category} : {value.category_info.avg_budget}</div>
           {value.item_list.map((item : itemsListType, itemIndex) => {
             return <div key={item.wants_id}>{index}-{itemIndex} : {item.item_image_name} : {item.item_name} : {item.budget}円</div>
           })}
           <br/>
         </div>
        );
      })}
    </>
  );
};
