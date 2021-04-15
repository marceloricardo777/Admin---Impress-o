import { Button, message, Drawer, Pagination } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';

import type { ListUserNotPayment } from '../data';
import { awaitPayment, queryUsersNotPaymentIntervalDate, removeRule } from '../service';
import { setKeyOnObjectsNotPayment } from '../../../../globals/globalFunctions';

/**
 * 更新节点
 * @param fields
 */

import { isLogged } from '../../../../globals/globalFunctions';

console.log(isLogged());
if (isLogged() === false) {
  window.location.href = '/user/login';
}

const handleRemove = async (selectedRows: ListUserNotPayment[]) => {
  const hide = message.loading('Carregando...');
  if (!selectedRows) return true;
  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('Excluido com Sucesso');
    return true;
  } catch (error) {
    hide();
    message.error('Erro ao excluir');
    return false;
  }
};

const getEscolaridade = (option: string) => {
  if (option === 'ensinofundamental') {
    return 'Ensino Fundamental';
  }
  if (option === 'ensinomedio') {
    return 'Ensino Médio';
  }
  if (option === 'graduacao') {
    return 'Graduação';
  }
  return 'Pós-Graduação';
};

const capitalizeText = (text: string) => {
  const first = text.charAt(0);
  const rest = text.substring(1, text.length);

  return first.toUpperCase() + rest.toLowerCase();
};

const TableList: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
  const [first, setFirst] = useState(true);
  const [pages, setPages] = useState(1);
  const [usersList, setUserList] = useState<ListUserNotPayment[]>([]);
  const [row, setRow] = useState<ListUserNotPayment>();
  const [selectedRowsState, setSelectedRows] = useState<ListUserNotPayment[]>([]);
  const columns: ProColumns<ListUserNotPayment>[] = [
    {
      title: 'Nome',
      dataIndex: 'pessoa_nome',
      tip: 'Nome da pessoa',
      search: false,

      formItemProps: {
        rules: [
          {
            required: true,
            message: 'Nome da pessoa',
          },
        ],
      },
      render: (dom, entity) => {
        return <a onClick={() => setRow(entity)}>{capitalizeText(entity.pessoa_nome)}</a>;
      },
    },
    {
      title: 'CPF',
      dataIndex: 'pessoa_cpf',
      tip: 'CPF',
      search: false,
    },

    {
      title: 'Escolaridade',
      dataIndex: 'pessoa_escolaridade',
      hideInForm: true,
      filtered: false,
      search: false,
      render: (dom, entity) => {
        return (
          <p style={{ margin: '0' }}>{getEscolaridade(entity.pessoa_escolaridade.toString())}</p>
        );
      },
    },
    {
      title: 'Email',
      dataIndex: 'user_email',
      valueType: 'text',
      hideInForm: true,
      tip: 'Email do Usuário',
      search: false,
    },
    {
      title: 'Whatsapp',
      dataIndex: 'pessoa_whatsapp',
      valueType: 'text',
      hideInForm: true,
      tip: 'Whatsapp do Usuário',
      search: false,
    },
    {
      title: 'Status de Pagamento',
      dataIndex: 'payment_paymentStatus',
      valueType: 'text',
      hideInForm: true,
      tip: 'Usuário já fez o pagamento?',
      search: false,
    },
    {
      title: 'Data',
      hideInTable: true,
      dataIndex: 'transaction_updateAt',
      valueType: 'dateRange',
      hideInForm: true,
      tip: 'Data',
      filtered: false,
    },
  ];
  const updateTable = (page: number) => {
    awaitPayment(`${page}`).then((res: any) => {
      if (res.message) {
        localStorage.clear();
        window.location.href = '/user/login';
      }
      const list = setKeyOnObjectsNotPayment(res.user);
      setUserList(list);
      setPages(res.pages);
    });
  };

  useEffect(() => {
    if (first) {
      updateTable(pages);
      setFirst(false);
    }
  });
  const teste = async (values: any) => {
    console.log(pages);
    const formtkey = Object.keys(values)[0];
    const formtvalue = Object.values(values)[0];
    if (formtkey !== '_timestamp') {
      queryUsersNotPaymentIntervalDate(pages, formtvalue)
        .catch((erro: any) => {
          return erro;
        })
        .then((res: any) => {
          if (res.message) {
            localStorage.clear();
            window.location.href = '/user/login';
          }
          const list = setKeyOnObjectsNotPayment(res.user);
          setUserList(list);
          setPages(res.pages);
        });
    }
    // console.log(formtkey.split('_')[1], formtvalue);
  };
  return (
    <PageContainer>
      <ProTable<ListUserNotPayment>
        headerTitle="Aguardando Pagamento"
        actionRef={actionRef}
        rowKey="key"
        beforeSearchSubmit={teste}
        search={{
          layout: 'vertical',
          labelWidth: 180,
        }}
        cardBordered={true}
        footer={() => (
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <Pagination defaultPageSize={1} total={pages} onChange={(e: any) => updateTable(e)} />
          </div>
        )}
        pagination={false}
        dataSource={usersList}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>&nbsp; item(ns)
              selecionado(s);
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
            style={{ backgroundColor: '#FF0000', color: '#FFF' }}
          >
            Excluir selecionados
          </Button>
          {/* <Button type="primary">Aprovar todos</Button> */}
        </FooterToolbar>
      )}

      <Drawer
        width={600}
        visible={!!row}
        onClose={() => {
          setRow(undefined);
        }}
        closable={false}
      >
        {row?.pessoa_nome && (
          <ProDescriptions<ListUserNotPayment>
            column={2}
            title={row?.pessoa_nome}
            request={async () => ({
              data: row || {},
            })}
            params={{
              id: row?.pessoa_id,
            }}
            columns={columns}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
