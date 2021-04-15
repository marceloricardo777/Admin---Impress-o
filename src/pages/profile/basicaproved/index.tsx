import { DeleteFilled, EditFilled, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, message, Drawer, Pagination } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from '../components/CreateForm';
import UpdateForm from '../components/UpdateForm';
import type { DocsListItem } from '../data.d';
import {
  queryUsersDocs,
  queryUsersDocsIntervalDate,
  addRule,
  updateDocsUser,
  removeRule,
} from '../service';
import { setKeyOnObjectsDocs } from '../../../../globals/globalFunctions';
import { isLogged } from '../../../../globals/globalFunctions';

console.log(isLogged());
if (isLogged() === false) {
  window.location.href = '/user/login';
}

const handleAdd = async (fields: DocsListItem) => {
  const hide = message.loading('Carregando...');
  try {
    await addRule({ ...fields });
    hide();
    message.success('Sucesso');
    return true;
  } catch (error) {
    hide();
    message.error('Erro');
    return false;
  }
};

/**
 * 更新节点
 * @param fields
 */

const handleRemove = async (selectedRows: DocsListItem[]) => {
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
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const [first, setFirst] = useState(true);
  const [pages, setPages] = useState(1);
  const [usersList, setUserList] = useState<DocsListItem[]>([]);
  const [row, setRow] = useState<DocsListItem>();
  const [selectedRowsState, setSelectedRows] = useState<DocsListItem[]>([]);
  const types = 'aprovado';
  const columns: ProColumns<DocsListItem>[] = [
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
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              setStepFormValues(record);
              handleUpdateModalVisible(true);
              // alert(JSON.stringify(record));
            }}
          >
            <EditFilled style={{ color: '#343132' }} />
          </a>
          <Divider type="vertical" />
          <a href="">
            <DeleteFilled style={{ color: '#FF2222' }} />
          </a>
        </>
      ),
    },
  ];
  const updateTable = (page: number) => {
    queryUsersDocs({ currentPage: page, type: types }).then((res: any) => {
      if (res.message) {
        localStorage.clear();
        window.location.href = '/user/login';
      }
      const list = setKeyOnObjectsDocs(res.userdocs);
      setUserList(list);
      setPages(res.pages);
    });
  };
  const handleUpdate = async (fields: any) => {
    const hide = message.loading('Carregando');
    try {
      await updateDocsUser(fields.user_id, {
        carteiaatual_aproved: fields.carteiaatual_aproved,
        comprovanteendereco_aproved: fields.comprovanteendereco_aproved,
        comprovanteendereco_criticalmessage: fields.comprovanteendereco_criticalmessage,
        comprovantematricula_aproved: fields.comprovantematricula_aproved,
        comprovantematricula_criticalmessage: fields.comprovantematricula_criticalmessage,
        doccarteiaatual_criticalmessage: fields.doccarteiaatual_criticalmessage,
        fotoestudante_aproved: fields.fotoestudante_aproved,
        fotoestudante_criticalmessage: fields.fotoestudante_criticalmessage,
        identidadefrente_aproved: fields.identidadefrente_aproved,
        identidadefrente_criticalmessage: fields.identidadefrente_criticalmessage,
        identidadeverso_aproved: fields.identidadeverso_aproved,
        identidadeverso_criticalmessage: fields.identidadeverso_criticalmessage,
      });
      hide();
      message.success('Sucesso');
      updateTable(pages);
      setFirst(false);
      return true;
    } catch (error) {
      hide();
      message.error('Erro');
      return false;
    }
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
      queryUsersDocsIntervalDate(pages, types, formtvalue)
        .catch((erro: any) => {
          return erro;
        })
        .then((res: any) => {
          if (res.message) {
            localStorage.clear();
            window.location.href = '/user/login';
          }
          const list = setKeyOnObjectsDocs(res.userdocs);
          setUserList(list);
          setPages(res.pages);
        });
    }
    // console.log(formtkey.split('_')[1], formtvalue);
  };
  return (
    <PageContainer>
      <ProTable<DocsListItem>
        headerTitle="Atualizações"
        actionRef={actionRef}
        rowKey="key"
        beforeSearchSubmit={teste}
        search={{
          layout: 'vertical',
          labelWidth: 180,
        }}
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> Novo
          </Button>,
        ]}
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
      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <ProTable<DocsListItem, DocsListItem>
          onSubmit={async (value) => {
            const success = await handleAdd(value);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="key"
          type="form"
          columns={columns}
        />
      </CreateForm>
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async (value: any) => {
            const success = await handleUpdate(value);
            if (success) {
              handleUpdateModalVisible(false);
              setStepFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}

      <Drawer
        width={600}
        visible={!!row}
        onClose={() => {
          setRow(undefined);
        }}
        closable={false}
      >
        {row?.pessoa_nome && (
          <ProDescriptions<DocsListItem>
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
