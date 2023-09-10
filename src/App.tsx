import { useState, useEffect } from 'react';
import { Card } from 'antd';

import Content from './Content';
import AddData from './AddData';

import type { ListDataParams, FormParams } from './types';
// import type { PropsType } from './types';

interface TabTitle {
  key: string;
  label: string;
}

const tabListNoTitle: Array<TabTitle> = [
  {
    key: 'day',
    label: '每日',
  },
  {
    key: 'week',
    label: '每周',
  },
  {
    key: 'month',
    label: '每月',
  },
];

const App = () => {
  const [activeTabKey, setActiveTabKey] = useState('day');

  const [dayList, setDayList] = useState(Array<ListDataParams>);
  const [weekList, setWeekList] = useState(Array<ListDataParams>);
  const [monthList, setMonthList] = useState(Array<ListDataParams>);

  useEffect(() => {
    setDayList(JSON.parse(localStorage.getItem('dayList') || '[]'));
  }, [])

  useEffect(() => {
    setWeekList(JSON.parse(localStorage.getItem('weekList') || '[]'));
  }, [])

  useEffect(() => {
    setMonthList(JSON.parse(localStorage.getItem('monthList') || '[]'));
  }, [])

  const switchDayStatus = (data: Array<ListDataParams>) => {
    setDayList(data);
    localStorage.setItem('dayList', JSON.stringify(data));
  };

  const switchWeekStatus = (data: Array<ListDataParams>) => {
    setWeekList(data);
    localStorage.setItem('weekList', JSON.stringify(data));
  };

  const switchMonthStatus = (data: Array<ListDataParams>) => {
    setMonthList(data);
    localStorage.setItem('monthList', JSON.stringify(data));
  };

  const contentListNoTitle: Record<string, JSX.Element>  = {
    day: <Content data={dayList} switchStatus={switchDayStatus}></Content>,
    week: <Content data={weekList} switchStatus={switchWeekStatus}></Content>,
    month: <Content data={monthList} switchStatus={switchMonthStatus}></Content>,
  };

  const onTabChange = (key: string) => {
    setActiveTabKey(key);
  };

  const addData = ({ content }: FormParams) => {
    const addedItem = {
      content,
      status: false,
    };

    if (activeTabKey === 'day') {
      setDayList([...dayList, addedItem]);
      localStorage.setItem('dayList', JSON.stringify([...dayList, addedItem]));
    }

    if (activeTabKey === 'week') {
      setWeekList([...weekList, addedItem]);
      localStorage.setItem('weekList', JSON.stringify([...weekList, addedItem]));
    }

    if (activeTabKey === 'month') {
      setMonthList([...monthList, addedItem]);
      localStorage.setItem('monthList', JSON.stringify([...monthList, addedItem]));
    }
  };

  return (
    <>
      <Card
        style={{
          margin: '10rem auto',
          width: '50rem',
          boxShadow: '0 0 1rem rgba(0, 0, 0, 0.2)',
        }}
        tabList={tabListNoTitle}
        activeTabKey={activeTabKey}
        tabBarExtraContent={<AddData addData={addData}></AddData>}
        onTabChange={onTabChange}
      >
        {contentListNoTitle[activeTabKey]}
      </Card>
    </>
  );
};
export default App;
