import request from 'umi-request';
import type { TableListParams } from './data';

const URL_API = process.env.UMI_APP_HOST;
const token = `Bearer ${localStorage.getItem('token')}`;

export async function queryUsersDocs(params?: TableListParams) {
  return request(`${URL_API}primeira-via/listardocspessoas/${params?.currentPage}/first/incomplete`, {
    headers: { authorization: token },
  });
  //   params,
  // });
}
export async function queryUsersDocsIntervalDate(params: any, data: any) {
  return request(`${URL_API}primeira-via/listardocspessoasintervaldate/${params}/first/incomplete`, {
    headers: { authorization: token },
    method: 'POST',
    data: {
      data,
    },
  });
}


export async function removeRule(params: { key: number[] }) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateDocsUser(params: any, data: any) {
  return request(`${URL_API}validardocuments/${params}`, {
    method: 'PUT',
    data: {
      data,
      method: 'update',
    },
  });
}
