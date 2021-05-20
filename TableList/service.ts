import request from 'umi-request';
import type { TableListParams } from './data.d';

const URL_API = process.env.UMI_APP_HOST;
const token = `Bearer ${localStorage.getItem('token')}`;
export async function queryUsers(params?: TableListParams) {
  return request(`${URL_API}listarusuariosadm/${params?.currentPage}`, {
    headers: { authorization: token },
  });
  //   params,
  // });
}
export async function createUserAdmin(values: any) {
  return request(`${URL_API}criaruseradmin/`, {
    headers: { authorization: token },
    method: 'POST',
    data: {
      values,
    },
  });
  //   params,
  // });
}
