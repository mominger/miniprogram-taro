//设置缓存: 单位秒
const setItem = (key:string, value:string) => {
  const params = {
    date: new Date().getTime(),
    value
  };
  wx.setStorageSync(key, JSON.stringify(params));
}

//默认1天
const getItem = (key:string,day:number = 1) => {
  let obj = wx.getStorageSync(key);
  if (!obj) return null;
  obj = JSON.parse(obj);
  const date = new Date().getTime();
  if (date - obj.date > 86400000 * day) {
    removeItem(key)
    return null;
  }
  return obj.value;
}

//keys
const getItemKeys = (keyPre:string) :Array<string> => {
  let keys = wx.getStorageInfoSync().keys;
  let newKeys = keys.filter((value) => {
      const reg = new RegExp("^"+keyPre+".+$")
      return reg.test(value);
  })

  return newKeys;
}

const removeItem = (key: string) => {
  wx.removeStorageSync(key);
}

const Item = {
  setItem,
  getItem,
  removeItem,
  getItemKeys
};

export default Item;
