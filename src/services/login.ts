import request from '@/utils/request';

export type LoginParamsType = {
  email: string;
  userName: string;
  password: string;
  id: string;
  token: string;
};

export async function fakeAccountLogin() {
  return request('http://192.168.15.23:3333/login', {
    method: 'POST',
    data: {
      email: 'marceloricardo7777@hotmail.com',
      password: '123',
      method: 'post',
    },
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
