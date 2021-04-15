export interface UserObjectResponse {
  page: number;
  user: any;
}

export interface DocsListItem {
  key: number;
  user_id: string;
  user_email: string;
  user_password: string;
  user_termo1: boolean;
  user_termo2: boolean;
  user_termo3: boolean;
  user_createdAt: Date;
  user_updateAt: Date;
  user_pessoaId: string;
  pessoa_id: string;
  pessoa_nome: string;
  pessoa_genero: string;
  pessoa_cpf: string;
  pessoa_escolaridade: string;
  pessoa_telefone: string;
  pessoa_serieperiodo: string;
  pessoa_instituicao: string;
  pessoa_cidadeescola: string;
  pessoa_ufescola: string;
  pessoa_tipodocumento: string;
  pessoa_rg: string;
  pessoa_registrocnh: string;
  pessoa_datanascimento: string;
  pessoa_nomemae: string;
  pessoa_whatsapp: string;
  pessoa_nomepai: string;
  pessoa_tpcomprovantematricula: string;
  pessoa_turno: string;
  pessoa_numregistro: string;
  pessoa_anodeconclusao: string;
  transaction_id: string;
  transaction_type: string;
  transaction_requestStatus: string;
  transaction_createdAt: Date;
  transaction_updateAt: Date;
  transaction_userId: string;
  transaction_paymentId: string;
  transaction_documentId: string;
  payment_id: string;
  payment_invoice_id_iugu: string;
  payment_url_boleto_iugu: string;
  payment_paymentStatus: string;
  payment_iugu_message: string;
  payment_createdAt: Date;
  payment_updateAt: Date;
  carteiaatual_aproved: boolean;
  comprovanteendereco_aproved: boolean;
  comprovanteendereco_criticalmessage: string;
  comprovantematricula_aproved: boolean;
  comprovantematricula_criticalmessage: string;
  doccarteiaatual: string;
  doccarteiaatual_criticalmessage: string;
  doccomprovanteendereco: string;
  doccomprovantematricula: string;
  docfotoestudante: string;
  docidentidadefrente: string;
  docidentidadeverso: string;
  fotoestudante_aproved: boolean;
  fotoestudante_criticalmessage: string;
  identidadefrente_aproved: boolean;
  identidadefrente_criticalmessage: string;
  identidadeverso_aproved: boolean;
  identidadeverso_criticalmessage: string;
}
export interface ListUserNotPayment {
  key: number;
  user_id: string;
  user_email: string;
  user_password: string;
  user_termo1: boolean;
  user_termo2: boolean;
  user_termo3: boolean;
  user_createdAt: Date;
  user_updateAt: Date;
  user_pessoaId: string;
  pessoa_id: string;
  pessoa_nome: string;
  pessoa_genero: string;
  pessoa_cpf: string;
  pessoa_escolaridade: string;
  pessoa_telefone: string;
  pessoa_serieperiodo: string;
  pessoa_instituicao: string;
  pessoa_cidadeescola: string;
  pessoa_ufescola: string;
  pessoa_tipodocumento: string;
  pessoa_rg: string;
  pessoa_registrocnh: string;
  pessoa_datanascimento: string;
  pessoa_nomemae: string;
  pessoa_whatsapp: string;
  pessoa_nomepai: string;
  pessoa_tpcomprovantematricula: string;
  pessoa_turno: string;
  pessoa_numregistro: string;
  pessoa_anodeconclusao: string;
  transaction_id: string;
  transaction_type: string;
  transaction_requestStatus: string;
  transaction_createdAt: Date;
  transaction_updateAt: Date;
  transaction_userId: string;
  transaction_paymentId: string;
  transaction_documentId: string;
  payment_id: string;
  payment_invoice_id_iugu: string;
  payment_url_boleto_iugu: string;
  payment_paymentStatus: string;
  payment_iugu_message: string;
  payment_createdAt: Date;
  payment_updateAt: Date;

}
export interface ListUserCard {
  key: number;
  user_id: string;
  user_email: string;
  user_createdAt: Date;
  user_updateAt: Date;
  user_pessoaId: string;
  pessoa_id: string;
  pessoa_nome: string;
  pessoa_genero: string;
  pessoa_cpf: string;
  pessoa_escolaridade: string;
  pessoa_telefone: string;
  pessoa_serieperiodo: string;
  pessoa_instituicao: string;
  pessoa_cidadeescola: string;
  pessoa_ufescola: string;
  pessoa_tipodocumento: string;
  pessoa_rg: string;
  pessoa_registrocnh: string;
  pessoa_datanascimento: string;
  pessoa_nomemae: string;
  pessoa_whatsapp: string;
  pessoa_nomepai: string;
  pessoa_tpcomprovantematricula: string;
  pessoa_turno: string;
  pessoa_numregistro: string;
  pessoa_anodeconclusao: string;
  transaction_id: string;
  transaction_type: string;
  transaction_requestStatus: string;
  transaction_createdAt: Date;
  transaction_updateAt: Date;
  transaction_userId: string;
  transaction_paymentId: string;
  transaction_documentId: string;
  payment_id: string;
  payment_invoice_id_iugu: string;
  payment_url_boleto_iugu: string;
  payment_paymentStatus: string;
  payment_iugu_message: string;
  payment_createdAt: Date;
  payment_updateAt: Date;
  card_id: string;
  status_card: string;
  card_createdAt: Date;
  card_updateAt: Date;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  user_id?: string;
  status?: string;
  name?: string;
  type?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
}
