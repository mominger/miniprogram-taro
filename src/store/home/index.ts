import {IPageStore} from '@store/types';
import {action, observable} from 'mobx';
import * as Api from './api';

export default class HomeStore implements IPageStore {
  @observable ipAddress: Api.IpAddress = {};
  @observable name: string = '';

  @action
  onLoad = async () => {
    this.ipAddress = await Api.ipAddress();
  };

  @action
  setName = (name: string) => {
    this.name = name;
  }

  @action
  onUnload = () => {
  };
}
