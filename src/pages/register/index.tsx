import Taro, {useRouter} from '@tarojs/taro'
import React, { useState, useCallback, useMemo } from 'react'
import { View} from '@tarojs/components'
import './index.scss'

const Register = () => {
  //通过路由获取上一页传递的数据
  const router = useRouter()
  console.info("..获取的路由参数...id:%s",router.params.id)

  //通过事件和上一页进行数据交互
  const pages = Taro.getCurrentPages();
  const current = pages[pages.length - 1];
  const eventChannel = current.getOpenerEventChannel();
  eventChannel.emit('acceptDataFromOpenedPage', {
    data: '这是返回给上一页面的数据'
  });
  eventChannel.on('login', function(data){
    console.info("..接收到前一页面传回来的数据: ",data)
  });

  return (
    <View className='register'>
      <View>this is Register page</View>
    </View>
  )
}
export default Register
