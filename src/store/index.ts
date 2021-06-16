import HomeStore from './home';
import TestVantStore from './testvant';
import LoginStore from './login';
import {configure} from 'mobx';

configure({
  enforceActions: 'never',
});

const store = {
  homeStore: new HomeStore(),
  testVantStore: new TestVantStore(),
  loginStore: new LoginStore(),
};

export default store;
