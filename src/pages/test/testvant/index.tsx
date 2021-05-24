import React, { useState,useCallback } from 'react'
import { View, Text, Slot } from '@tarojs/components'
import './index.scss'

const TestVant = () => {

  const [show, setShow] = useState(false)
  const [endDate, setEndDate] = useState('')

  const showCalendar = useCallback(() => {
    setShow(true)
  },[])

  const formatDate = (date)=>{
      date = new Date(date)
      return `${date.getMonth() + 1}/${date.getDate()}`
  }

  const closeCalendar = useCallback(() => {
    setShow(false)
  },[])

  const onConfirm = useCallback((event) => {
    setShow(false)
    setEndDate(formatDate(event.detail[1]))
  },[])

  return (
    <View className='index'>
      <van-button type='primary' onClick={showCalendar}>显示日历</van-button>
      <van-calendar
        show={show}
        showConfirm
        type='range'
        onClose={closeCalendar}
        onConfirm={onConfirm}
        >
        <Slot name='title'>
          <View>选择日期</View>
        </Slot>
      </van-calendar>
      <View>
        endDate: {endDate}
      </View>
    </View>
  )
}

export default TestVant