import request from 'umi-request';
import type { UserLoginParams } from './data';

const URL_API = process.env.UMI_APP_HOST;
const token = `Bearer ${localStorage.getItem('token')}`;
export async function login(params: UserLoginParams) {
  return request(`${URL_API}loginadmin/`, {
    headers: { authorization: token },

    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}
