import React  from 'react'
import { View } from '@tarojs/components';
import {withErrorBoundary} from 'react-error-boundary'
import Log from '@biz-kit/log'

  /**
 * react组件异常统一捕获
 * @param WrapComponent 
 * @returns 
 */
  //
export default function withError(WrapComponent){
  return  withErrorBoundary(WrapComponent, {
    FallbackComponent: ({error}) => {
      return (
        <View>
            Error:
            <View>
              {error.message}
            </View>
        </View>
      )
    },
    onError(error, info) {
      Log.error(error  + info.componentStack)
    }
  })
}
