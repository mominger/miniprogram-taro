// 首页
import Taro from '@tarojs/taro'
import React, { useEffect,useCallback} from 'react'
import{useDidShow,useDidHide,useReady}from'@tarojs/taro'
import {withErrorBoundary} from 'react-error-boundary'
// import Log from '../../../utils/log'
import Log from '@utils/log'
import I18n from '@utils/i18'
import {inject, observer} from 'mobx-react'
import HomeStore from '@store/home'
//import { useSelector,useDispatch } from 'react-redux'
//import { Reducers } from '../../redux/interface'
import { Text,View,Image,Button,Input } from '@tarojs/components'
import FooterNav from '@components/FooterNav/FooterNav'
import {Page} from '@ui-kit'


/* import {
  setCurrentAddress,
} from '../../redux/actions/user' */

import './index.scss'

type IProps = {
  homeStore: HomeStore;
};

//const Index = (props) => {
const Index = inject('homeStore')(
  observer((props: IProps) => {
  console.info('....重新 Index render...')
  const {homeStore} = props;

  const chain = I18n.use();
  console.info("..name...",chain.home.name)

  //const dispatch = useDispatch()

  // 当前地址
  /* const { currentAddress,email} = useSelector(
    (state: Reducers) => state
  ) */

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
  const handleVant = useCallback(() => {
    Taro.navigateTo({ url: '/pages/testvant/index' })
  },[])

  //修改定位地址
  const changeAddress = (value) => {
    //更改定位地址
    /* dispatch(
      setCurrentAddress({
        address: value
      })
    ) */
  }

const getSubCmpInfo = (msg) => {
        console.info("...获取子组件的数据....%s ",msg)
}

  return (
    <Page className="msite" store={homeStore}>
       {/* 内容区 */}
       <View>
          {/* ip定位 */}
          <View>
            <Text className="msite-navbar-title">当前ip定位的地址:{homeStore.ipAddress.recommend}</Text>
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
          
          <Button onClick={handleVant}>
              测试Vant基础组件
          </Button>

          <View className="email-data">
            <Text>登录后获取的email: {}</Text>
          </View>
        </View>
      {/* 底部导航 */}
      <FooterNav title="testname" callback = { getSubCmpInfo.bind(this) }/>
    </Page>
  )
}))

const ErrorFallback = ({error, resetErrorBoundary}) => {
  return (
    <View>
        Error:
        <View>
          {error.message}
        </View>
    </View>
  )
}

const ComponentWithErrorBoundary = withErrorBoundary(Index, {
  FallbackComponent: ErrorFallback,
  onError(error, info) {
    Log.error(error  + info.componentStack)
  },
})

export default ComponentWithErrorBoundary
