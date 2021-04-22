// 首页
import Taro from '@tarojs/taro'
import React, { useEffect,useCallback} from 'react'
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
  console.info('....重新 Index render...')


  const dispatch = useDispatch()

  // 当前地址
  const { currentAddress,email} = useSelector(
    (state: Reducers) => state
  )

  console.info(props)

  useReady(() => {
    console.log('Index page....onReady')
  })
  useDidShow(() => {
    console.log('Index page....componentDidShow')

    let pages = Taro.getCurrentPages();
    let currPage = pages[pages.length - 1]; // 获取当前页面
    if (currPage.__data__.email) { // 获取值
      console.info('...登录的邮箱:%s',currPage.__data__.email)
    } 
  })
  useDidHide(() => {
    console.log('Index page....componentDidHide')
  })


  //获取异步请求等
  useEffect(() => {
  }, [])

  const handleToOther = useCallback(() => {
    Taro.navigateTo({
      url: '/pages/other/index',
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
  },[])

  const flushData = (data) => {
    console.info('...flushData: '+data)
  }

  const handleLogin = useCallback(() => {
    //set token after login in
        Taro.showLoading({
          title: '跳向登录页',
          mask: true,
          success() {
            setTimeout(() => {
              Taro.hideLoading()
              Taro.navigateTo({ url: '/pages/login/index' })
            }, 1000)
          }
        })
  },[])

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
          
          <View className="email-data">
            <Text>登录后获取的email: {email}</Text>
          </View>
        </View>
      {/* 底部导航 */}
      <FooterNav title="testname" callback = { getSubCmpInfo.bind(this) }/>
    </View>
  )
}

export default Index
