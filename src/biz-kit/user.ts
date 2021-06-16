import Storage from '@biz-kit/storage';

let user: U = null;

type U = {
  id: number;
  name: string;
  token: string;
  email: string;
};

/**
 * 公共用户信息
 */
export default {
  //
  getUser(): U {
    if (user == null) {
      const us = Storage.getItem('user');
      if (us) {
        user = JSON.parse(us);
      }
    }
    return user;
  },

  //
  setUser(u: U) {
    user = u;
    Storage.setItem('user', JSON.stringify(u));
  },

  clean() {
    Storage.removeItem('user');
  },
};
