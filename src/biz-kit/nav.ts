import Taro from '@tarojs/taro'

/**
 * 包装路由，预留将来做路由鉴权
 */
export default {
  navigateTo(to) {
		Taro.navigateTo(to);
	},

	redirectTo(to) {
    Taro.redirectTo(to);
	},

	reLaunch(to) {
    Taro.reLaunch(to);
	},

	switchTab(to) {
    Taro.switchTab(to);
	},

	navigateBack(to) {
    Taro.navigateBack(to);
	}
};
