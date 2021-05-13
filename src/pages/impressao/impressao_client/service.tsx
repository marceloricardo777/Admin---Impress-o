import request from 'umi-request';

const URL_API = process.env.UMI_APP_HOST;
const token = `Bearer ${localStorage.getItem('token')}`;

export async function getUserByCPF(cpf: string) {
  return request(`${URL_API}listarusuariosbycpf/${cpf}/`, {
    headers: { authorization: token },
  });
}

export async function getDocumentPicture(nomeFoto: string) {
  return request(`${URL_API}imgaproved/`, {
    headers: { authorization: token },
    method: 'POST',
    data: { url: nomeFoto },
  });
}
