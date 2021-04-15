import request from 'umi-request';

const URL_API = process.env.UMI_APP_HOST;
const token = `Bearer ${localStorage.getItem('token')}`;
// const idadmin = `${localStorage.getItem('id')}`;

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function saleTotal() {
  return request(`${URL_API}primeira-via/totalvenda/`, {
    headers: { authorization: token },
  });
  //   params,
  // });
}
export async function saleMount() {
  return request(
    `${URL_API}primeira-via/totalvendapormes/
  `,
    {
      headers: { authorization: token },
    },
  );
  //   params,
  // });
}
export async function ranking() {
  return request(
    `${URL_API}primeira-via/ranking/
  `,
    {
      headers: { authorization: token },
    },
  );
  //   params,
  // });
}
export async function typespayment() {
  return request(
    `${URL_API}primeira-via/tiposdepagamentos/
  `,
    {
      headers: { authorization: token },
    },
  );
  //   params,
  // });
}
export async function timespayment() {
  return request(
    `${URL_API}primeira-via/fluxodepagamento/
  `,
    {
      headers: { authorization: token },
    },
  );
  //   params,
  // });
}
export async function HeadMap() {
  return request(
    `${URL_API}getlongitudelatitude/
  `,
    {
      headers: { authorization: token },
    },
  );
  //   params,
  // });
}
export async function typeschooling() {
  return request(
    `${URL_API}primeira-via/tipoescolaridade/
  `,
    {
      headers: { authorization: token },
    },
  );
  //   params,
  // });
}
export async function RankingInstituicoes() {
  return request(
    `${URL_API}primeira-via/rankinginstituicoes/
  `,
    {
      headers: { authorization: token },
    },
  );
  //   params,
  // });
}
export async function MapAPI(data: any) {
  return request('https://api-geo.herokuapp.com/mapa', {
    mode: 'no-cors',
    credentials: 'omit',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'application/json',
    },
    method: 'POST',
    data,
  });
  //   params,
  // });
}
