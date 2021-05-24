import {http} from '@biz-kit';

export const login = (args: {email: string; password: string}) => {
  return http.post(`/api/login`, args);
};
