
import Taro from '@tarojs/taro'
import React,{useCallback, useEffect} from 'react'
import{useDidShow,useDidHide,useReady}from'@tarojs/taro'
import {inject, observer} from 'mobx-react'

import {I18,Nav,http} from '@biz-kit'
import HomeStore from '@store/home'
import { Text,View,Image,Button,Input } from '@tarojs/components'
import {Page,FooterNav,withError} from '@ui-kit'
import './index.scss'

type IProps = {
  homeStore: HomeStore;
};

const Index = inject('homeStore')(
  observer((props: IProps) => {

  const {homeStore: store} = props;
  console.info("..渲染了 home page ....");

  //测试国际化
  const chain = I18.use();
  console.info("..测试国际化 name...",chain.home.name)

  /** 测试小程序页面生命周期 */
  /* useReady(() => {
    console.log('Index page....onReady')
  })
  useDidShow(() => {
    console.log('Index page....componentDidShow')
  })
  useDidHide(() => {
    console.log('Index page....componentDidHide')
  }) */

  //测试子组件通信数据:1. 传递function  2.传递store,action更改数据 
  const getSubCmpInfo = useCallback((msg: string) => {
      console.info("...获取子组件的数据....%s ",msg);
  },[])

  useEffect(() => {
    let timeId = setTimeout(()=>{
      store.setName('这是首页');
    },3000)
    return ()=>{
      clearTimeout(timeId)
    }
  }, [])

  return (
    <Page className="home" store={store}>
       {/* 内容区 */}
       <View>
          {/* ip定位 */}
          <View>
            <Text className="home-navbar-title">当前ip定位的地址:{store.ipAddress.city}</Text>
            <View>
              <Input
                value={""}
                placeholder='在这里修改定位地址'
                className='item-right-input'
                onInput={(e) => console.info("...修改定位地址:",e.detail.value)}
              />
           </View>

           
          </View>

            <View className='ad-image'>
              <Image mode="widthFix" src={'https://images.contentstack.io/v3/assets/blt318321ee56f896a2/blt3d20b66eefcf1e41/6017a1a782548c0f8284e108/BIG_Member.jpg'} className='image' />
            </View>


            <Button onClick={()=>Nav.navigateTo({ url: '/pages/test/other/index' })}>
              查询航班
          </Button>

          <Button onClick={()=>Nav.navigateTo({ url: '/pages/test/login/index' })}>
              模拟登录
          </Button>
          
          <Button onClick={()=>Nav.navigateTo({ url: '/pages/test/testvant/index' })}>
              测试Vant基础组件
          </Button>


          <View>
            <Text>
              '测试的name: '{store.name}
            </Text>
          </View>

        </View>
      {/* 底部导航 */}
      <FooterNav title="testname" callback = { getSubCmpInfo }/>
    </Page>
  )
}))

export default Index;
