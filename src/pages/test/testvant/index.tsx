import React, { useState,useCallback } from 'react'
import {inject, observer} from 'mobx-react'
import { View, Text, Slot } from '@tarojs/components'
import TestVantStore from '@store/testvant'
import './index.scss'

type IProps = {
  testVantStore: TestVantStore;
};

const TestVant = inject('testVantStore')(
  observer((props: IProps) => {
  const {testVantStore: store} = props; 

  return (
    <View className='index'>
      <van-button type='primary' onClick={store.showCalendar}>显示日历</van-button>
      <van-calendar
        show={store.show}
        showConfirm
        type='range'
        onClose={store.closeCalendar}
        onConfirm={store.onConfirm}
        >
        <Slot name='title'>
          <View>选择日期</View>
        </Slot>
      </van-calendar>
      <View>
        endDate: {store.endDate}
      </View>
    </View>
  )
}))

export default TestVant