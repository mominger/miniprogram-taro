import Taro from '@tarojs/taro'
import React, { useState, useCallback, useMemo } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { Text,View, Form, Input, Button, Navigator } from '@tarojs/components'
import classnames from 'classnames'
import { InputProps } from '@tarojs/components/types/Input'
import { BaseEventOrig } from '@tarojs/components/types/common'
import { setToken,setEmail } from '../../redux/actions/user'
import './index.scss'
import util from '@biz-kit/util'

const Login = () => {
  const dispatch = useDispatch()


  const [email, setEmailValue] = useState('')
  // 密码
  const [password, setPassword] = useState('')

  const handleSetEmail = (e: BaseEventOrig<InputProps.inputEventDetail>) => {
    const { value } = e.detail
    setEmailValue(value)
  }

  //注册
  const handleRegister = () => {
    Taro.navigateTo({
      url: '/pages/register/index?id=1111',
      events: {
        // 获取打开页面传回来的数据
        acceptDataFromOpenedPage: function(data) {
          console.log(data)
        },
      },
      success: function (res) {
        //向被打开页面传送数据
        res.eventChannel.emit('login', { data: '传递给打开的数据' })
      }
    })
    
  }

  // 密码
  const handleSetPassword = (e: BaseEventOrig<InputProps.inputEventDetail>) => {
    const { value } = e.detail
    setPassword(value)
  }


  // 登录
  const handleSubmit = useCallback(async () => {
    console.info("..获取的值 email:%s password:%s...",email,password)

    dispatch(setToken("xxxxxxaaaaa"))

    dispatch(setEmail(email))


    util.setParentData({email})

    Taro.showLoading({
      title: '登录成功,可以查看token',
      mask: true,
      success() {
        setTimeout(() => {
          Taro.hideLoading()
        }, 1000)
      }
    })

    Taro.navigateBack()
  }, [email, password])

  return (
    <View className='login'>
      <View className='form'>
        <Form onSubmit={handleSubmit}>
          <View className='input-row'>
            <Input
              name='username'
              placeholder='邮箱号'
              value={email}
              className={classnames('input')}
              type='text'
              onInput={handleSetEmail}
            />
          </View>
          <View className='input-row'>
            <Input
              name='password'
              placeholder='密码'
              value={password}
              type='password'
              maxlength={11}
              className={classnames('input')}
              onInput={handleSetPassword}
            />
          </View>
          <Button className='submit' formType='submit'>
            登录
          </Button>

          <View className="email-data" onClick={handleRegister}>
            <Text>点此注册</Text>
          </View>

        </Form>
      </View>
    </View>
  )
}
export default Login
