import {IPageStore} from '@store/types';
import {action, observable} from 'mobx';
import * as Api from './api';
import {User,Nav} from '@biz-kit';

export default class LoginStore implements IPageStore {
  @observable param = {
    email: '',
    password: '',
  };

  @action
  login = async () => {
    //todo: 假设登录成功
    //const data = await Api.login(this.param);
    
    User.setUser({
      id:   Math.random()*1000000,
      name: this.param.email,
      email: this.param.email,
      token: 'token_'+this.param.email+Math.random()*10000000,
    });
    
    //登录之后跳到首页
    Nav.reLaunch({url:'/pages/test/home/index'});
  };

  @action
  onFormItemChange = (name: string, value: any) => {
    this.param[name] = value;
  };

  @action
  onLoad = async () => {
  };

  @action
  onUnload = () => {
  };
}
