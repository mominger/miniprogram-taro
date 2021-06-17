import {http} from '@biz-kit';

// Ip地址
export type IpAddress = {
  city?: string;
  latitude?: number;
  longitude?: number;
  recommend?: string;
}

export const ipAddress = async (): Promise<IpAddress> => {
  return http.get(`/ip`, { key: 'UNZBZ-MJUKS-W76OY-6SGXP-7TIFE-AXBA3' });
};
