import {IPageStore} from '@store/types';
import {action, observable} from 'mobx';

export default class TestVantStore implements IPageStore {
  @observable show: boolean = false;
  @observable endDate: string = '';

  @action
  showCalendar = () => {
    this.show = true;
  }

  @action
  closeCalendar = () => {
    this.show = false;
  }

  @action
  onConfirm = (event) => {
    this.show = false;
    let date = new Date(event.detail[1]);
    this.endDate = `${date.getMonth() + 1}/${date.getDate()}`;
  }

  @action
  onLoad = async () => {
  };

  @action
  onUnload = () => {
  };
}
