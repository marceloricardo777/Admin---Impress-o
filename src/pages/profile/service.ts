import request from 'umi-request';
import type { TableListParams } from './data.d';

const URL_API = process.env.UMI_APP_HOST;
const token = `Bearer ${localStorage.getItem('token')}`;
const idadmin = `${localStorage.getItem('id')}`;

export async function queryUsersDocs(params?: TableListParams) {
  return request(
    `${URL_API}primeira-via/listardocspessoas/${params?.currentPage}/${params?.type}/complete`,
    {
      headers: { authorization: token },
    },
  );
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

export async function updateDocsUser(params: any, data: any) {
  return request(`${URL_API}primeira-via/validardocuments/${params}/${idadmin}`, {
    headers: { authorization: token },
    method: 'PUT',
    data: {
      data,
      method: 'update',
    },
  });
}

export async function verificareditacao(params?: string, type?: string) {
  return request(`${URL_API}verificareditacao/${params}/${type}/${idadmin}`, {
    headers: { authorization: token },
  });
  //   params,
  // });
}
export async function cancelareditacao(id: string) {
  return request(`${URL_API}cancelareditacao/${id}`, {
    headers: { authorization: token },
  });
  //   params,
  // });
}
export async function queryUsersDocsIntervalDate(params: any, type: any, data: any) {
  return request(
    `${URL_API}primeira-via/listardocspessoasintervaldate/${params}/${type}/complete`,
    {
      headers: { authorization: token },
      method: 'POST',
      data: {
        data,
      },
    },
  );
  //   params,
  // });
}
export async function queryUsersNotPaymentIntervalDate(params: any, data: any) {
  return request(`${URL_API}primeira-via/aguardandopagamentosdata/${params}`, {
    headers: { authorization: token },
    method: 'POST',
    data: {
      data,
    },
  });
}
export async function imgdocs(url: any) {
  return request(`${URL_API}imgaproved/`, {
    headers: { authorization: token },
    method: 'POST',
    data: {
      url,
    },
  });
  //   params,
  // });
}
export async function awaitPayment(params?: string) {
  return request(`${URL_API}primeira-via/aguardandopagamentos/${params}`, {
    headers: { authorization: token },
  });
  //   params,
  // });
}
export async function queryUsersCards(params?: TableListParams) {
  return request(`${URL_API}primeira-via/listarcarteiras/${params?.currentPage}/${params?.type}`, {
    headers: { authorization: token },
  });
  //   params,
  // });
}
export async function updateSituationCard(idcard: string, data: any) {
  return request(`${URL_API}primeira-via/validacaosituacaocarteira/${idcard}/${idadmin}`, {
    headers: { authorization: token },
    method: 'PUT',
    data: {
      data,
      method: 'update',
    },
  });
}

export async function undoCard(idcard: string, data: any) {
  return request(`${URL_API}primeira-via/desfazeraprovacao/${idcard}/${idadmin}`, {
    headers: { authorization: token },
    method: 'PUT',
    data: {
      data,
      method: 'update',
    },
  });
}

export async function getCpf(cpf?: string, type?: string) {
  return request(`${URL_API}primeira-via/pesquisacpf/${cpf}/${type}`, {
    headers: { authorization: token },
  });
  //   params,
  // });
}
