// 首页
import Taro from '@tarojs/taro'
import React, { useEffect} from 'react'
import{useDidShow,useDidHide,useReady}from'@tarojs/taro'

import { Text,View,Image,Button,Input } from '@tarojs/components'

import FooterNav from '../../components/FooterNav/FooterNav'

import { useSelector,useDispatch } from 'react-redux'
import { Reducers } from '../../redux/interface'
import {
  setCurrentAddress,
} from '../../redux/actions/user'


import './index.scss'

const Index = (props) => {

  const dispatch = useDispatch()
  // 当前地址
  const { currentAddress} = useSelector(
    (state: Reducers) => state
  )

  console.info(props)

  useReady(() => {
    console.log('Index page....onReady')
  })
  useDidShow(() => {
    console.log('Index page....componentDidShow')
  })
  useDidHide(() => {
    console.log('Index page....componentDidHide')
  })


  //获取异步请求等
  useEffect(() => {
  }, [])

  const handleToOther = () => {
    Taro.navigateTo({
      url: '/pages/page/other',
      events: {
        acceptDataFromOpenedPage: function(data) {
          console.log(data)
        },
        someEvent: function(data) {
          console.log(data)
        }
      },
      success: function (res) {
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'testdata' })
      }
    })

  }

  const handleLogin = () => {
    //set token after login in
        Taro.showLoading({
          title: '跳向登录页',
          mask: true,
          success() {
            setTimeout(() => {
              Taro.hideLoading()
              Taro.redirectTo({ url: '/pages/login/index' })
            }, 1000)
          }
        })
  }

  //修改定位地址
  const changeAddress = (value) => {
    //更改定位地址
    dispatch(
      setCurrentAddress({
        address: value
      })
    )
  }

const getSubCmpInfo = (msg) => {
        console.info("...获取子组件的数据....%s ",msg)
}

  return (
    <View className='msite'>
        {/* 内容区 */}
        <View>
          {/* ip定位 */}
          <View>
            <Text className="msite-navbar-title">当前ip定位的地址:{currentAddress.address}</Text>
            <View>
              <Input
                value={""}
                placeholder='在这里修改定位地址'
                className='item-right-input'
                onInput={(e) => changeAddress(e.detail.value)}
              />
           </View>

           
          </View>

            <View className='ad-image'>
              <Image mode="widthFix" src={'https://images.contentstack.io/v3/assets/blt318321ee56f896a2/blt3d20b66eefcf1e41/6017a1a782548c0f8284e108/BIG_Member.jpg'} className='image' />
            </View>


            <Button onClick={handleToOther}>
              查询航班
          </Button>

          <Button onClick={handleLogin}>
              模拟登录
          </Button>
        </View>
      {/* 底部导航 */}
      <FooterNav title="testname" callback = { getSubCmpInfo.bind(this) }/>
    </View>
  )
}

export default Index
