import AsyncStorage from '@react-native-community/async-storage';

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
  async getUser(): Promise<U> {
    if (user == null) {
      const us = await AsyncStorage.getItem('user');
      if (us) {
        user = JSON.parse(us);
        initSentry();
        initSocket();
      }
    }
    return user;
  },

  //
  async setUser(u: U) {
    user = u;
    await AsyncStorage.setItem('user', JSON.stringify(u));
    initSentry();
    initSocket();
  },

  async clean() {
    await AsyncStorage.removeItem('user');
    if (socket) {
      socket.close();
    }
  },
};
