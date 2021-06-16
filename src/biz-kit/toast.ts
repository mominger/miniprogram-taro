import Taro from '@tarojs/taro'

/**
 * 提示框
 * @param message  
 * @param mask 
 * @param duration 
 */
function show(message, mask = false, duration = 2000, icon:any = 'none') {
  //https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showToast.html
  Taro.showToast({
    title: message,
    duration,
    mask,
    icon
  })
}

/**
 * 确认框
 * https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showModal.html
 * @param content  
 * @param title 
 * @returns 
 */
function confirm(
  content: string,
  title: string,
): Promise<boolean> {
  return new Promise((s, f) => {
    Taro.showModal({
      title,
      content,
      success (res) {
        if (res.confirm) {
          s(true);
        } else if (res.cancel) {
          f(true);
        }
      }
    })
  })
}

export default {show, confirm};
