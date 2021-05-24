import dayjs from 'dayjs';

export default {
  //
  formatDate(src: number) {
    return dayjs(new Date(src)).format('YYYY-MM-DD');
  },
  formatDateTime(src: number) {
    return dayjs(new Date(src)).format('YYYY-MM-DD HH:mm:ss');
  },
  //
  range(mode: any) {
    return [dayjs().startOf(mode).toDate(), new Date()];
  },
  before(mode: number) {
    return [dayjs().add(mode, 'd').toDate(), new Date()];
  },
};
