import { DeleteFilled, EditFilled, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, message, Drawer, Pagination } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from './components/CreateForm';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import type { UserListItem } from './data.d';
import { queryUsers, updateRule, addRule, removeRule } from './service';
import { maskForDate, setKeyOnObjects } from '../../../../globals/globalFunctions';
import { isLogged, isAdmin } from '../../../../globals/globalFunctions';

if (isLogged() === false) {
  window.location.href = '/user/login';
} else if (isAdmin() === false) {
  window.location.href = '/user/login';
}

const handleAdd = async (fields: UserListItem) => {
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
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('Carregando');
  try {
    await updateRule({
      name: fields.pessoa_nome,
      desc: fields.escolaridade,
      key: fields.key,
    });
    hide();

    message.success('Sucesso');
    return true;
  } catch (error) {
    hide();
    message.error('Erro');
    return false;
  }
};

const handleRemove = async (selectedRows: UserListItem[]) => {
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
  const [usersList, setUserList] = useState<UserListItem[]>([]);
  const [row, setRow] = useState<UserListItem>();
  const [selectedRowsState, setSelectedRows] = useState<UserListItem[]>([]);
  const columns: ProColumns<UserListItem>[] = [
    {
      title: 'Nome',
      dataIndex: 'pessoa_nome',
      tip: 'Nome da pessoa',
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
    },
    {
      title: 'E-mail',
      dataIndex: 'user_email',
      tip: 'E-mail',
    },
    {
      title: 'Escolaridade',
      dataIndex: 'pessoa_escolaridade',
      hideInForm: true,
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
    },
    {
      title: 'Data do cadastro',
      dataIndex: 'user_createdAt',
      sorter: true,
      valueType: 'dateTime',
      hideInForm: true,
      render: (dom, entity) => {
        const date = new Date(entity.transaction_createdAt);
        return maskForDate(date);
      },
    },
    {
      title: 'Status',
      dataIndex: 'transaction_requestStatus',
      valueType: 'text',
      hideInForm: true,
      tip: 'Usuário já fez a atualização cadastral?',
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
    queryUsers({ currentPage: page }).then((res: any) => {
      const list = setKeyOnObjects(res.user);
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

  return (
    <PageContainer>
      <ProTable<UserListItem>
        headerTitle="Usuários"
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
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
        <ProTable<UserListItem, UserListItem>
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
          <ProDescriptions<UserListItem>
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
