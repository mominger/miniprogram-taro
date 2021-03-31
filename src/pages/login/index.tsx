import Taro from '@tarojs/taro'
import React, { useState, useCallback, useMemo } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { View, Form, Input, Button, Navigator } from '@tarojs/components'
import classnames from 'classnames'
import { InputProps } from '@tarojs/components/types/Input'
import { BaseEventOrig } from '@tarojs/components/types/common'
import { setToken } from '../../redux/actions/user'
import './index.scss'
import util from '../../utils/util'

const Login = () => {
  const dispatch = useDispatch()


  const [email, setEmail] = useState('')
  // 密码
  const [password, setPassword] = useState('')

  const handleSetEmail = (e: BaseEventOrig<InputProps.inputEventDetail>) => {
    const { value } = e.detail
    setEmail(value)
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
          <Navigator
            url='/pages/register/index'
            openType='redirect'
            className='register'
          >
             点此注册
          </Navigator>
        </Form>
      </View>
    </View>
  )
}
export default Login
