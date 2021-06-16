import Taro from '@tarojs/taro'
import React, { useState, useCallback, useMemo } from 'react'
import { Text,View, Form, Input, Button } from '@tarojs/components'
import {inject, observer} from 'mobx-react'
import {I18,Nav} from '@biz-kit'
import {Page} from '@ui-kit'
import LoginStore from '@store/login'
import classnames from 'classnames'
import { InputProps } from '@tarojs/components/types/Input'
import { BaseEventOrig } from '@tarojs/components/types/common'
import './index.scss'

type IProps = {
  loginStore: LoginStore;
};

const Login = inject('loginStore')(
  observer((props: IProps) => {
  const {loginStore: store} = props; 

  // 邮箱
  const handleSetEmail = useCallback((e: BaseEventOrig<InputProps.inputEventDetail>) => {
    const { value } = e.detail
    store.onFormItemChange("email",value);
  },[])
  // 密码
  const handleSetPassword = useCallback((e: BaseEventOrig<InputProps.inputEventDetail>) => {
    const { value } = e.detail
    store.onFormItemChange("password",value);
  },[])

  return (
    <Page className="login" store={store}>

    <View className='login'>
      <View className='form'>
        <Form onSubmit={store.login}>
          <View className='input-row'>
            <Input
              name='username'
              placeholder='邮箱号'
              value={store.param.email}
              className={classnames('input')}
              type='text'
              onInput={handleSetEmail}
            />
          </View>
          <View className='input-row'>
            <Input
              name='password'
              placeholder='密码'
              value={store.param.password}
              type='password'
              maxlength={11}
              className={classnames('input')}
              onInput={handleSetPassword}
            />
          </View>
          <Button className='submit' formType='submit'>
            登录
          </Button>

          <View className="email-data" onClick={() => Nav.navigateTo({url: '/pages/test/register/index?id=1111'})} >
            <Text>点此注册</Text>
          </View>

        </Form>
      </View>
    </View>
    </Page>
  )
}))

export default Login
