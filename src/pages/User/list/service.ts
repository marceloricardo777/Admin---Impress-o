import request from 'umi-request';
import type { TableListParams } from './data.d';

const URL_API = process.env.UMI_APP_HOST;
const token = `Bearer ${localStorage.getItem('token')}`;
export async function querySchools(tipo: string, name: string) {
  return request(`${URL_API}instituicoes/${tipo}/${name}`);
}

export async function createdUser(tipo: string, name: string) {
  return request(`${URL_API}instituicoes/${tipo}/${name}`);
}
export async function queryUsers(params?: TableListParams) {
  return request(`${URL_API}listarpessoas/${params?.currentPage}`, {
    headers: { authorization: token },
  });
  //   params,
  // });
}
export async function queryUsersDocs(params?: TableListParams) {
  return request(`${URL_API}listardocspessoas/${params?.currentPage}`);
  //   params,
  // });
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

export async function updateRule(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
