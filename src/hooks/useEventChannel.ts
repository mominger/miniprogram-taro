import Taro from '@tarojs/taro'

/**
 * 页面间事件通信通道: 向open页面，或back页面传递数据  https://developers.weixin.qq.com/miniprogram/dev/api/route/EventChannel.html
 * @returns 
 */
export default function useEventChannel() {
	const pages = Taro.getCurrentPages()
	const current = pages[pages.length - 1]
	const eventChannel = current.getOpenerEventChannel()
	return eventChannel
}
