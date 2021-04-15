import { CloseCircleOutlined, EditFilled, QuestionCircleOutlined } from '@ant-design/icons';
import { message, Drawer, Pagination, Radio, Popconfirm, Card, Input } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';

import type { ListUserCard } from '../data';
import {
  updateSituationCard,
  queryUsersCards,
  queryUsersDocsIntervalDate,
  undoCard,
  getCpf,
} from '../service';
import { setKeyOnObjectsCard } from '../../../../globals/globalFunctions';
import { isLogged } from '../../../../globals/globalFunctions';

const { Search } = Input;

if (isLogged() === false) {
  window.location.href = '/user/login';
}

/**
 * 更新节点
 * @param fields
 */

// const handleRemove = async (selectedRows: ListUserCard[]) => {
//   const hide = message.loading('Carregando...');
//   if (!selectedRows) return true;
//   try {
//     await removeRule({
//       key: selectedRows.map((row) => row.key),
//     });
//     hide();
//     message.success('Excluido com Sucesso');
//     return true;
//   } catch (error) {
//     hide();
//     message.error('Erro ao excluir');
//     return false;
//   }
// };

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
  const [usersList, setUserList] = useState<ListUserCard[]>([]);
  const [row, setRow] = useState<ListUserCard>();
  const [selectedRowsState, setSelectedRows] = useState<ListUserCard[]>([]);
  let types = '';
  const url = window.location.href.split('/');
  const path = url.length - 1;
  types = url[path];
  const updateTable = (page: number) => {
    queryUsersCards({ currentPage: page, type: types }).then((res: any) => {
      if (res.message) {
        localStorage.clear();
        window.location.href = '/user/login';
      }
      const list = setKeyOnObjectsCard(res.user);
      setUserList(list);
      setPages(res.pages);
    });
  };
  const columns: ProColumns<ListUserCard>[] = [
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
      title: 'Escola',
      dataIndex: 'pessoa_instituicao',
      valueType: 'textarea',
      hideInForm: true,
      tip: 'Escola que o usuário estuda.',
      filtered: false,
      search: false,
    },
    {
      title: 'Status da Atualização Cadastral',
      dataIndex: 'transaction_requestStatus',
      valueType: 'text',
      hideInForm: true,
      tip: 'Usuário já fez a atualização cadastral?',
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
      search: false,

      title: 'Data de Atualização',
      hideInTable: true,
      dataIndex: 'transaction_updateAt',
      valueType: 'dateRange',
      hideInForm: true,
      tip: 'Data de atualização de documentos',
      filtered: false,
    },
    {
      title: 'Ações',
      dataIndex: 'option',
      valueType: 'option',
      render: (dom, entity) => {
        return (
          <a onClick={() => setRow(entity)}>
            <EditFilled style={{ color: '#343132' }} />
          </a>
        );
      },
    },
  ];
  useEffect(() => {
    if (first) {
      updateTable(pages);
      setFirst(false);
    }
  });
  const undo = async () => {
    undoCard(`${row?.card_id}`, row?.transaction_id)
      .catch(() => {
        message.error('Erro ao atualizar');
      })
      .then((res: any) => {
        if (res.message === 'sucesso') {
          message.success('Salvo com Sucesso');
          updateTable(pages);
        } else {
          message.error('Erro ao atualizar');
        }
      });
  };
  const updateStatusCard = async (values: any) => {
    updateSituationCard(`${row?.card_id}`, {
      status_card: values.target.value,
      email: row?.user_email,
    })
      .catch(() => {
        message.error('Erro ao atualizar');
      })
      .then((res: any) => {
        if (res.status_card === 'sucesso') {
          message.success('Salvo com Sucesso');
          updateTable(pages);
        } else {
          message.error('Erro ao atualizar');
        }
      });
  };

  const teste = async (values: any) => {
    const formtkey = Object.keys(values);
    const formtvalue = Object.values(values)[0];
    // for (let index = 0; index < formtkey.length; index += 1) {
    //   console.log(index);
    // }

    if (formtkey[0] === 'transaction_updateAt') {
      queryUsersDocsIntervalDate(pages, types, formtvalue)
        .catch((erro: any) => {
          return erro;
        })
        .then((res: any) => {
          if (res.message) {
            localStorage.clear();
            window.location.href = '/user/login';
          }
          const list = setKeyOnObjectsCard(res.user);
          setUserList(list);
          setPages(res.pages);
        });
    }
    // console.log(formtkey.split('_')[1], formtvalue);
  };
  const onSearch = (value: string) => {
    // eslint-disable-next-line no-useless-escape
    const cpf = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');

    if (value.length < 11) {
      message.info('CPF muito curto para ser pesquisado');
    } else {
      getCpf(cpf, types)
        .catch(() => {
          message.error('Erro ao pesquisar');
        })
        .then((res) => {
          if (res.message) {
            message.info(res.message);
          } else if (res.error) {
            message.error('Erro ao pesquisar');
          } else {
            const list = setKeyOnObjectsCard(res.user);
            setUserList(list);
          }
        });
    }
  };
  return (
    <PageContainer>
      <Card
        bordered={false}
        title={'Pesquisar'}
        style={{
          height: '100%',
          marginBottom: 24,
          marginTop: 24,
        }}
      >
        <Search
          required
          style={{ width: 300 }}
          placeholder={'Digite o CPF aqui'}
          onSearch={onSearch}
          enterButton
        />
      </Card>
      <ProTable<ListUserCard>
        actionRef={actionRef}
        rowKey="key"
        beforeSearchSubmit={teste}
        search={false}
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
          {/* <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
            style={{ backgroundColor: '#FF0000', color: '#FFF' }}
          >
            Excluir selecionados
          </Button> */}
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
        <Radio.Group defaultValue={row?.status_card} buttonStyle="solid">
          <Radio.Button onClick={updateStatusCard} value="confeccao">
            Em Confecção
          </Radio.Button>
          <Radio.Button onClick={updateStatusCard} value="pronta">
            Pronto para Retirada
          </Radio.Button>
          <Radio.Button onClick={updateStatusCard} value="entregue">
            Entregue
          </Radio.Button>
        </Radio.Group>
        <Popconfirm
          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          title="Caso confirme, essa solicitação será movida para Conferencia"
          onConfirm={undo}
          okText="Confirmar"
          cancelText="Desistir"
        >
          <CloseCircleOutlined style={{ margin: '8px', color: 'red', fontSize: '16px' }} />
        </Popconfirm>
        {row?.pessoa_nome && (
          <ProDescriptions<ListUserCard>
            column={1}
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
