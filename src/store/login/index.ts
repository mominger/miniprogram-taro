import {IFormStore, IPageStore} from '@store/types';
import {action, observable, makeObservable} from 'mobx';
import {Nav, User} from '@biz-kit';
import AsyncStorage from '@react-native-community/async-storage';
import * as Api from './api';

export default class LoginStore implements IPageStore, IFormStore {
  @observable param = {
    email: '',
    password: '',
  };

  constructor() {
    makeObservable(this);
  }

  @action
  onFormItemChange = (name: string, value: any) => {
    this.param[name] = value;
  };

  @action
  onLoad = () => {
    this.param = {
      email: '',
      password: '',
    };
  };

  @action
  login = async () => {
    const data = await Api.login(this.param);
    User.setUser(data);
    await AsyncStorage.setItem('user', JSON.stringify(data));
    Nav.reset('Index');
  };
}
