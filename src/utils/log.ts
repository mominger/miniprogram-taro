const Log = {
  error(msg: String){
    //统一上传到日志平台，比如Sentry
    console.info("....in error.ts...")
    console.error(msg)
  }
}
export default Log

