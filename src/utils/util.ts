import Taro from '@tarojs/taro'

export default {
    /**
      * 设置父页面数据  data:{x:xx}
     */
    setParentData(data) {
        //当前页面栈
        var pages = Taro.getCurrentPages();
        if (pages.length >1) {
            //获取上一个页面实例对象
            var beforePage = pages[pages.length- 2];

            beforePage && beforePage.setData(data);
        }
    }
}