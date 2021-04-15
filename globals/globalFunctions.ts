import type { UserListItem } from '@/pages/User/list/data';
import type { DocsListItem, ListUserNotPayment, ListUserCard } from '@/pages/profile/data';
import type { UserListItemAdmin } from '@/pages/TableList/data';

export const token = localStorage.getItem('token');
export const level = localStorage.getItem('level');
export function isLogged() {
  if (token !== null && token !== undefined) {
    return true;
  }
  return false;
}
export function isAdmin() {
  if (token !== null && token !== undefined && level === '0') {
    return true;
  }
  return false;
}

export function maskForDate(date: Date): string {
  let retorno = '';

  if (date.getDate() < 10) {
    retorno += `0${date.getDate()}/`;
  } else {
    retorno += `${date.getDate()}/`;
  }

  if (date.getMonth() < 9) {
    retorno += `0${date.getMonth() + 1}/`;
  } else {
    retorno += `${date.getMonth() + 1}/`;
  }
  retorno += date.getFullYear();

  return retorno;
}
export function setKeyOnObjectsAdmin(objetos: any[]): UserListItemAdmin[] {
  const retorno: UserListItemAdmin[] = [];

  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < objetos.length; index++) {
    const element = objetos[index];
    // eslint-disable-next-line no-underscore-dangle

    const obj = <UserListItemAdmin>{};
    obj.key = index;
    obj.user_id = element.id;
    obj.user_email = element.email;
    obj.user_createdAt = new Date(element.createdAt);
    obj.user_updateAt = new Date(element.updateAt);
    obj.user_active = element.active;
    obj.user_level = element.level;
    obj.user_nome = element.fullName;
    retorno.push(obj);
  }

  return retorno;
}
export function setKeyOnObjectsNotPayment(objetos: any[]): ListUserNotPayment[] {
  const retorno: ListUserNotPayment[] = [];
  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < objetos.length; index++) {
    const element = objetos[index];
    // eslint-disable-next-line no-underscore-dangle
    const transaction = element.__transactions__[element.__transactions__.length - 1];
    // eslint-disable-next-line no-underscore-dangle
    const pay = transaction.payment;
    const obj = <ListUserNotPayment>{};
    obj.key = index;
    obj.user_id = element.id;
    obj.user_email = element.email;
    obj.user_createdAt = new Date(element.createdAt);
    obj.user_updateAt = new Date(element.updateAt);
    obj.pessoa_id = element.pessoa.id;
    obj.pessoa_nome = element.pessoa.nome;
    obj.pessoa_genero = element.pessoa.genero;
    obj.pessoa_cpf = element.pessoa.cpf;
    obj.pessoa_escolaridade = element.pessoa.escolaridade;
    obj.pessoa_telefone = element.pessoa.telefone;
    obj.pessoa_serieperiodo = element.pessoa.serieperiodo;
    obj.pessoa_instituicao = element.pessoa.instituicao;
    obj.pessoa_cidadeescola = element.pessoa.cidadeescola;
    obj.pessoa_ufescola = element.pessoa.ufescola;
    obj.pessoa_tipodocumento = element.pessoa.tipodocumento;
    obj.pessoa_rg = element.pessoa.rg;
    obj.pessoa_registrocnh = element.pessoa.registocnh;
    obj.pessoa_datanascimento = element.pessoa.datanascimento;
    obj.pessoa_nomemae = element.pessoa.nomemae;
    obj.pessoa_nomepai = element.pessoa.nomepai;
    obj.pessoa_tpcomprovantematricula = element.pessoa.tpcomprovantematricula;
    obj.pessoa_turno = element.pessoa.turno;
    obj.pessoa_numregistro = element.pessoa.numregistro;
    obj.pessoa_anodeconclusao = element.pessoa.anodeconclusao;
    obj.payment_id = element.payment_id;
    let statuspag = '';
    if (pay.paymentStatus === 'paid') {
      statuspag = 'Pago';
    }
    else {
      statuspag = 'Aguardando Pagamento';
    }
    obj.payment_paymentStatus = statuspag;
    obj.payment_createdAt = element.payment_createdAt;
    obj.payment_updateAt = element.payment_updateAt;
    retorno.push(obj);
  }

  return retorno;
}
export function setKeyOnObjectsCard(objetos: any[]): ListUserCard[] {
  const retorno: ListUserCard[] = [];
  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < objetos.length; index++) {
    const element = objetos[index];
    // eslint-disable-next-line no-underscore-dangle
    const transaction = element.__transactions__[element.__transactions__.length - 1];
    // eslint-disable-next-line no-underscore-dangle
    const pay = transaction.payment;
    // eslint-disable-next-line prefer-destructuring
    const card = transaction.card;
    const obj = <ListUserCard>{};
    obj.key = index;
    obj.user_id = element.id;
    obj.user_email = element.email;
    obj.user_createdAt = new Date(element.createdAt);
    obj.user_updateAt = new Date(element.updateAt);
    obj.pessoa_id = element.pessoa.id;
    obj.pessoa_nome = element.pessoa.nome;
    obj.pessoa_genero = element.pessoa.genero;
    obj.pessoa_cpf = element.pessoa.cpf;
    obj.pessoa_escolaridade = element.pessoa.escolaridade;
    obj.pessoa_telefone = element.pessoa.telefone;
    obj.pessoa_serieperiodo = element.pessoa.serieperiodo;
    obj.pessoa_instituicao = element.pessoa.instituicao;
    obj.pessoa_cidadeescola = element.pessoa.cidadeescola;
    obj.pessoa_ufescola = element.pessoa.ufescola;
    obj.pessoa_tipodocumento = element.pessoa.tipodocumento;
    obj.pessoa_rg = element.pessoa.rg;
    obj.pessoa_registrocnh = element.pessoa.registocnh;
    obj.pessoa_datanascimento = element.pessoa.datanascimento;
    obj.pessoa_nomemae = element.pessoa.nomemae;
    obj.pessoa_nomepai = element.pessoa.nomepai;
    obj.pessoa_tpcomprovantematricula = element.pessoa.tpcomprovantematricula;
    obj.pessoa_turno = element.pessoa.turno;
    obj.pessoa_numregistro = element.pessoa.numregistro;
    obj.pessoa_anodeconclusao = element.pessoa.anodeconclusao;
    obj.payment_id = element.payment_id;
    obj.transaction_id = transaction.id;

    let statuspag = '';
    if (pay.paymentStatus === 'paid') {
      statuspag = 'Pago';
    }
    else {
      statuspag = 'Aguardando Pagamento';
    }
    obj.payment_paymentStatus = statuspag;
    obj.payment_createdAt = element.payment_createdAt;
    obj.payment_updateAt = element.payment_updateAt;
    obj.card_id = card.id
    obj.status_card = card.status_card
    obj.card_createdAt = card.createdAt
    obj.card_updateAt = card.updateAt
    retorno.push(obj);
  }


  return retorno;
}
export function setKeyOnObjects(objetos: any[]): UserListItem[] {
  const retorno: UserListItem[] = [];

  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < objetos.length; index++) {
    const element = objetos[index];
    // eslint-disable-next-line no-underscore-dangle
    const transaction = element.__transactions__[element.__transactions__.length - 1];

    const obj = <UserListItem>{};
    obj.key = index;
    obj.user_id = element.id;
    obj.user_email = element.email;
    obj.user_createdAt = new Date(element.createdAt);
    obj.user_updateAt = new Date(element.updateAt);
    obj.pessoa_id = element.pessoa.id;
    obj.pessoa_nome = element.pessoa.nome;
    obj.pessoa_genero = element.pessoa.genero;
    obj.pessoa_cpf = element.pessoa.cpf;
    obj.pessoa_escolaridade = element.pessoa.escolaridade;
    obj.pessoa_telefone = element.pessoa.telefone;
    obj.pessoa_serieperiodo = element.pessoa.serieperiodo;
    obj.pessoa_instituicao = element.pessoa.instituicao;
    obj.pessoa_cidadeescola = element.pessoa.cidadeescola;
    obj.pessoa_ufescola = element.pessoa.ufescola;
    obj.pessoa_tipodocumento = element.pessoa.tipodocumento;
    obj.pessoa_rg = element.pessoa.rg;
    obj.pessoa_registrocnh = element.pessoa.registocnh;
    obj.pessoa_datanascimento = element.pessoa.datanascimento;
    obj.pessoa_nomemae = element.pessoa.nomemae;
    obj.pessoa_nomepai = element.pessoa.nomepai;
    obj.pessoa_tpcomprovantematricula = element.pessoa.tpcomprovantematricula;
    obj.pessoa_turno = element.pessoa.turno;
    obj.pessoa_numregistro = element.pessoa.numregistro;
    obj.pessoa_anodeconclusao = element.pessoa.anodeconclusao;
    obj.transaction_type = transaction.type;
    obj.transaction_requestStatus = transaction.requestStatus;
    obj.transaction_createdAt = new Date(transaction.createdAt);
    obj.transaction_updateAt = new Date(transaction.updateAt);
    obj.transaction_paymentId = transaction.payment.id;

    retorno.push(obj);
  }

  return retorno;
}

export function setKeyOnObjectsDocs(objetos: any[]): DocsListItem[] {
  const retorno: DocsListItem[] = [];
  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < objetos.length; index++) {
    const element = objetos[index];
    // eslint-disable-next-line no-underscore-dangle
    const transaction = element.__transactions__[element.__transactions__.length - 1];
    // eslint-disable-next-line no-underscore-dangle
    const doc = transaction.document;
    const pay = transaction.payment;

    const obj = <DocsListItem>{};
    obj.key = index;
    obj.user_id = element.id;
    obj.user_email = element.email;
    obj.user_createdAt = new Date(element.createdAt);
    obj.user_updateAt = new Date(element.updateAt);
    obj.pessoa_id = element.pessoa.id;
    obj.pessoa_nome = element.pessoa.nome;
    obj.pessoa_genero = element.pessoa.genero;
    obj.pessoa_cpf = element.pessoa.cpf;
    obj.pessoa_whatsapp = element.pessoa.whatsapp;

    obj.pessoa_escolaridade = element.pessoa.escolaridade;
    obj.pessoa_telefone = element.pessoa.telefone;
    obj.pessoa_serieperiodo = element.pessoa.serieperiodo;
    obj.pessoa_instituicao = element.pessoa.instituicao;
    obj.pessoa_cidadeescola = element.pessoa.cidadeescola;
    obj.pessoa_ufescola = element.pessoa.ufescola;
    obj.pessoa_tipodocumento = element.pessoa.tipodocumento;
    obj.pessoa_rg = element.pessoa.rg;
    obj.pessoa_registrocnh = element.pessoa.registocnh;
    obj.pessoa_datanascimento = element.pessoa.datanascimento;
    obj.pessoa_nomemae = element.pessoa.nomemae;
    obj.pessoa_nomepai = element.pessoa.nomepai;
    obj.pessoa_tpcomprovantematricula = element.pessoa.tpcomprovantematricula;
    obj.pessoa_turno = element.pessoa.turno;
    obj.pessoa_numregistro = element.pessoa.numregistro;
    obj.pessoa_anodeconclusao = element.pessoa.anodeconclusao;
    obj.transaction_id = transaction.id;
    obj.transaction_type = transaction.type;
    obj.transaction_requestStatus = transaction.requestStatus;
    obj.transaction_createdAt = new Date(transaction.createdAt);
    obj.transaction_updateAt = new Date(transaction.updateAt);
    obj.pessoa_numregistro = element.pessoa.numregistro;
    obj.pessoa_anodeconclusao = element.pessoa.anodeconclusao;
    obj.transaction_type = transaction.type;
    obj.carteiaatual_aproved = doc.carteiaatual_aproved;
    obj.comprovanteendereco_aproved = doc.comprovanteendereco_aproved;
    obj.comprovanteendereco_criticalmessage =
      doc.comprovanteendereco_criticalmessage !== null
        ? doc.comprovanteendereco_criticalmessage.split(',')
        : null;
    obj.comprovantematricula_aproved = doc.comprovantematricula_aproved;
    obj.comprovantematricula_criticalmessage =
      doc.comprovantematricula_criticalmessage !== null
        ? doc.comprovantematricula_criticalmessage.split(',')
        : null;
    obj.doccarteiaatual = doc.doccarteiaatual;
    obj.doccarteiaatual_criticalmessage =
      doc.doccarteiaatual_criticalmessage !== null
        ? doc.doccarteiaatual_criticalmessage.split(',')
        : null;
    obj.doccomprovanteendereco = doc.doccomprovanteendereco;
    obj.doccomprovantematricula = doc.doccomprovantematricula;
    obj.docfotoestudante = doc.docfotoestudante;
    obj.docidentidadeverso = doc.docidentidadeverso;
    obj.docidentidadefrente = doc.docidentidadefrente;
    obj.fotoestudante_aproved = doc.fotoestudante_aproved;
    obj.fotoestudante_criticalmessage =
      doc.fotoestudante_criticalmessage !== null
        ? doc.fotoestudante_criticalmessage.split(',')
        : null;
    obj.identidadefrente_aproved = doc.identidadefrente_aproved;
    obj.identidadefrente_criticalmessage =
      doc.identidadefrente_criticalmessage !== null
        ? doc.identidadefrente_criticalmessage.split(',')
        : null;
    obj.identidadeverso_aproved = doc.identidadeverso_aproved;
    obj.identidadeverso_criticalmessage =
      doc.identidadeverso_criticalmessage !== null
        ? doc.identidadeverso_criticalmessage.split(',')
        : null;
    let statuspag = '';
    if (pay.paymentStatus === 'paid') {
      statuspag = 'Pago';
    }
    obj.payment_paymentStatus = statuspag;

    retorno.push(obj);
  }

  return retorno;
}

