// 首页
import React, { useEffect} from 'react'
import { Text,View,Image,Button,Input } from '@tarojs/components'

import FooterNav from '../../components/FooterNav/FooterNav'

import { useSelector,useDispatch } from 'react-redux'
import { Reducers } from '../../redux/interface'
import {
  setCurrentAddress,
} from '../../redux/actions/user'


import './index.scss'

const Index = () => {

  const dispatch = useDispatch()
  // 当前地址
  const { currentAddress} = useSelector(
    (state: Reducers) => state
  )


  //获取异步请求等
  useEffect(() => {
  }, [])

  // 跳转到登录
  const handleToLogin = () => {
    //Taro.reLaunch({ url: '/pages/login/index' })
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

  return (
    <View className='msite'>
        {/* 内容区 */}
        <View>
          {/* 地址信息 */}
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


            <Button onClick={handleToLogin}>
              查询航班
          </Button>
        </View>
      {/* 底部导航 */}
      <FooterNav />
    </View>
  )
}

export default Index
