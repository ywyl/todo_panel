import { useState, useEffect } from 'react';
import { List, Button } from 'antd';
import { CheckCircleTwoTone, ExclamationCircleTwoTone } from '@ant-design/icons';

import type { ListDataParams } from './types';

export interface PropsType {
  data: Array<ListDataParams>;
  switchStatus: (x: Array<ListDataParams>) => void;
}

const Content = ({ data, switchStatus }: PropsType): JSX.Element => {
  const [listData, setListData] = useState(data);

  useEffect(() => {
    setListData(data);
    console.log(data);
  }, [data]);

  const finishClick = (checkedItem: ListDataParams) => {
    const newList = listData.map((item) => {
      if (checkedItem.content === item.content) {
        return {
          ...item,
          status: !item.status,
        };
      } else {
        return item;
      }
    });
    setListData(newList);
    switchStatus(newList);
  };

  const deleteData = (deleteItem: ListDataParams) => {
    const newList = listData.filter((item) => deleteItem.content !== item.content);
    setListData(newList);
    switchStatus(newList);
  };

  return (
    <>
      <List
        dataSource={listData}
        renderItem={(item) => (
          <List.Item>
            <div className='tips'>
              {item.status ? (
                <CheckCircleTwoTone twoToneColor='#84cc16' />
              ) : (
                <ExclamationCircleTwoTone twoToneColor='#64748b' />
              )}
              <span style={{ marginLeft: '1rem' }}>{item.content}</span>
            </div>
            <div className='operation'>
              <Button type='link' onClick={() => finishClick(item)}>
                {item.status ? (
                  <span style={{ color: '#64748b' }}>取消</span>
                ) : (
                  <span style={{ color: '#84cc16' }}>完成</span>
                )}
              </Button>
              <Button type='link' onClick={() => deleteData(item)}>
                <span style={{ color: '#ef4444' }}>删除</span>
              </Button>
            </div>
          </List.Item>
        )}
      />
    </>
  );
};

export default Content;
