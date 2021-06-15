import HomeStore from './home';
import TestVantStore from './testvant';
import {configure} from 'mobx';

configure({
  enforceActions: 'never',
});

const store = {
  homeStore: new HomeStore(),
  testVantStore: new TestVantStore(),
};

export default store;
