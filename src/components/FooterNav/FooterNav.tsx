import Taro, { useDidShow,useDidHide,useReady,useResize,getCurrentInstance } from '@tarojs/taro'
import React, { FC, useState, useEffect } from 'react'
import { View, Image } from '@tarojs/components'
import classnames from 'classnames'

import homeIcon from './images/logo-a.svg'
import homeActiveIcon from './images/logo-a-selected.svg'
import bookingIcon from './images/bookings.svg'
import bookingActiveIcon from './images/bookings-selected.svg'
import chatIcon from './images/chat.svg'
import chatActiveIcon from './images/chat-selected.svg'
import memeberIcon from './images/member.svg'
import memberActiveIcon from './images/member-selected.svg'

import './FooterNav.scss'

interface Bar {
  id: number
  name: string
  path: string
  icon: string
  active_icon: string
}

interface FooterNavProps {
  title?: string
}

const FooterNav: FC<FooterNavProps> = (props) => {
  const {title} = props
  console.info("..props title:%s",title)

  useReady(() => {
    console.log('component FooterNav....onReady')
  })
  useResize(() => {
    console.log('component FooterNav....onReady')
  })
  useDidShow(() => {
    console.log('component FooterNav...componentDidShow')
  })
  useDidHide(() => {
    console.log('component FooterNav....componentDidHide')
  })


  // 路由地址
  const [path, setPath] = useState('')
  const bars: Bar[] = [
    {
      id: 0,
      name: '首页',
      path: '/pages/index/index',
      icon: homeIcon,
      active_icon: homeActiveIcon,
    },
    {
      id: 1,
      name: '我的预订',
      path: '',
      icon: bookingIcon,
      active_icon: bookingActiveIcon,
    },
    {
      id: 2,
      name: '在线客服',
      path: '',
      icon: chatIcon,
      active_icon: chatActiveIcon,
    },
    {
      id: 3,
      name: '会员',
      path: '',
      icon: memeberIcon,
      active_icon: memberActiveIcon,
    },
  ]

  useEffect(() => {
    // 获取路由路径
    const current: Taro.Current = getCurrentInstance()
    setPath(current.router.path)
  }, [])

  // 跳转到bar对应页面
  const handleGo = (bar: Bar) => {
    Taro.reLaunch({
      url: bar.path,
    })
  }

  return (
    <View className='footerbar'>
      <View className='footerbar-main'>
        {bars.map((bar) => {
          return (
            <View
              key={bar.id}
              onClick={() => handleGo(bar)}
              className={classnames('footer-item', {
                active: path === bar.path,
              })}
            >
              <View className='item-icon'>
                <Image
                  className='item-icon-img'
                  src={path === bar.path ? bar.active_icon : bar.icon}
                />
              </View>
              <View className='item-name'>{bar.name}</View>
            </View>
          )
        })}
      </View>
    </View>
  )
}
export default FooterNav
