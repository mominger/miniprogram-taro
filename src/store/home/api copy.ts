import {http} from '@biz-kit';
import dj from 'dayjs';

export type Banner = {
  id: any;
  image: string;
  link: string;
  createTime: number;
};
export const bannerList = (): Promise<Array<Banner>> => {
  return http.post(`/api/banner/find/all`, {});
};

export type Notice = {
  id?: number;
  title?: string;
  publishTime?: any;
  createTime?: number;
};
export const noticeLatest = async (): Promise<Notice> => {
  const data = await http.post(`/api/notice/find`, {size: 1});
  return data[0];
};

export type Article = {
  id?: number;
  image?: string;
  title?: string;
  publishTime?: any;
  createTime?: number;
};
export const articleList = async (page: number): Promise<Array<Article>> => {
  const dataList = await http.post(`/api/article/find`, {page, size: 20});
  return dataList.map((v) => {
    return {
      ...v,
      createTime: dj(new Date(v.createTime)).format('YYYY-MM-DD HH:mm:ss'),
      publishTime: dj(new Date(v.publishTime)).format('YYYY-MM-DD HH:mm:ss'),
    };
  });
};

export type Stock = {
  id?: string;
  name?: string;
  highest?: number;
  lowest?: number;
  current?: number;
  todayOpen?: number;
  yesterdayClose?: number;
  volume?: number;
  turnover?: number;
  createTime?: any;
  increaseValue?: number;
  increaseRate?: number;
};
export const grail = async (): Promise<Array<Stock>> => {
  const data = await http.get(`/stock-data/grail`);
  const sort = [
    data.filter((v) => v.id == 'HSI')[0],
    data.filter((v) => v.id == 'HSCEI')[0],
    data.filter((v) => v.id == 'HSCCI')[0],
  ];
  sort[0].name = I18.t('home.indexHS');
  sort[1].name = I18.t('home.indexGQ');
  sort[2].name = I18.t('home.indexHC');
  return sort;
};
