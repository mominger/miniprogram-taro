import React, {useCallback, useEffect, useState} from 'react';
import {IPageStore} from '@store/types';
import { View } from '@tarojs/components';

type PageProps = {
  // 头部
  header?: Element;
  // 底部
  footer?: Element;
  //
  className?: string;
  contentStyle?: any;
  // 等待请求的资源
  store?: IPageStore | Array<IPageStore>;
  //
  children: any;
};

async function ec(store: IPageStore | Array<IPageStore>, call): Promise<any> {
  if (store) {
    if (Array.isArray(store)) {
      for (let s of store) {
        s[call] && (await s[call]());
      }
    } else {
      store[call] && (await store[call]());
    }
  }
}

/**
 *
 */
export default function Page(props: PageProps) {
  const {header, footer, store} = props;
  const [refresh, setRefresh] = useState(false);
  const [init, setInit] = useState(!props.store);

  //刷新
  const onRefresh = useCallback(async () => {
    if (refresh) {
      return;
    }
    setRefresh(true);
    try {
      await ec(store, 'onLoad');
    } catch (e) {}
    setInit(true);
    setRefresh(false);
  }, []);

  //store卸载
  useEffect(() => {
    onRefresh();
    return () => {
      ec(store, 'onUnload');
    };
  }, []);

  //

  if (!init) {
    return (
     <View></View>
    );
  }

  //
  return (
    <View className={props.className}>
      {/*  */}
      {header}
      {/*  */}
      <View>
        {props.children}
        </View>
      {/*  */}
      {footer}
      </View>
  );
}
