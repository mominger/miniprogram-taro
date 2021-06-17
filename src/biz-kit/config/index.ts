/* export const BASEURL = 'http://127.0.0.1:4000/api'
export const WEAPP = process.env.TARO_ENV === 'weapp'
export const designWidth = '750'
export const defaultImg = '' //默认背景图 */

import dev from './dev.config.js'
import prd from './prd.config.js'

const CONFIG = {
        //开发环境
        development: {
                ...dev
        },

        //生产环境
        production: {
                ...prd
        }
}

export default Object.assign(CONFIG[process.env.NODE_ENV]);
