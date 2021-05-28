//设置缓存: 单位秒
const setStorage = (key:string, value:string) => {
  const params = {
    date: new Date().getTime(),
    value
  };
  wx.setStorageSync(key, JSON.stringify(params));
}

//默认1天
const getStorage = (key:string,day:number = 1) => {
  let obj = wx.getStorageSync(key);
  if (!obj) return null;
  obj = JSON.parse(obj);
  const date = new Date().getTime();
  if (date - obj.date > 86400000 * day) {
    removeStorage(key)
    return null;
  }
  return obj.value;
}

//keys
const getStorageKeys = (keyPre:string) :Array<string> => {
  let keys = wx.getStorageInfoSync().keys;
  let newKeys = keys.filter((value) => {
      const reg = new RegExp("^"+keyPre+".+$")
      return reg.test(value);
  })

  return newKeys;
}

const removeStorage = (key: string) => {
  wx.removeStorageSync(key);
}

const Storage = {
  setStorage,
  getStorage,
  removeStorage,
  getStorageKeys
};

export default Storage;
