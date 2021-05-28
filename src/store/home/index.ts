import {IListStore, IPageStore} from '@store/types';
import {action, observable, runInAction} from 'mobx';
import * as Api from './api';

export default class HomeStore implements IPageStore {
  @observable ipAddress: Api.IpAddress = {};

  @action
  onLoad = async () => {
    this.ipAddress = await Api.ipAddress();
  };

  @action
  onUnload = () => {
  };
}
