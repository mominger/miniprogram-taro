import HomeStore from './home';
import {configure} from 'mobx';

configure({
  enforceActions: 'never',
});

const store = {
  homeStore: new HomeStore(),
};

export default store;
