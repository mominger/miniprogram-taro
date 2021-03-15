import Taro, { getCurrentInstance } from '@tarojs/taro'
import React, { FC, useState, useEffect } from 'react'
import { View, Image } from '@tarojs/components'
import classnames from 'classnames'

import msiteIcon from './images/msite_1.svg'
import msiteActiveIcon from './images/msite_2.svg'
import discoverIcon from './images/discover_1.svg'
import discoverActiveIcon from './images/discover_2.svg'
import orderIcon from './images/order_1.svg'
import orderActiveIcon from './images/order_2.svg'
import profileIcon from './images/profile_1.svg'
import profileActiveIcon from './images/profile_2.svg'

import './FooterNav.scss'

interface Bar {
  id: number
  name: string
  path: string
  icon: string
  active_icon: string
}

const FooterNav: FC = () => {
  // 路由地址
  const [path, setPath] = useState('')
  const bars: Bar[] = [
    {
      id: 0,
      name: '首页',
      path: '/pages/index/index',
      icon: msiteIcon,
      active_icon: msiteActiveIcon,
    },
    {
      id: 1,
      name: '我的预订',
      path: '',
      icon: discoverIcon,
      active_icon: discoverActiveIcon,
    },
    {
      id: 2,
      name: '在线客服',
      path: '',
      icon: orderIcon,
      active_icon: orderActiveIcon,
    },
    {
      id: 3,
      name: '会员',
      path: '',
      icon: profileIcon,
      active_icon: profileActiveIcon,
    },
  ]

  useEffect(() => {
    // 获取路由路径
    const current: Taro.Current = getCurrentInstance()
    setPath(current.router.path)
  }, [])

  // 跳转
  const handleGo = (bar: Bar) => {
    Taro.reLaunch({
      url: bar.path,
    })
  }

  return (
    <View className='footerbar'>
      <View className='footerbar-mian'>
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
