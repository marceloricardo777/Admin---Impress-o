import { PlusOutlined } from '@ant-design/icons';
import { Button, Drawer, Pagination } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from './components/CreateForm';
// import UpdateForm from './components/UpdateForm';
import type { UserListItemAdmin } from './data.d';
import { queryUsers } from './service';
import { maskForDate, setKeyOnObjectsAdmin } from '../../../globals/globalFunctions';
import { isLogged, isAdmin } from '../../../globals/globalFunctions';

if (isLogged() === false) {
  window.location.href = '/user/login';
} else if (isAdmin() === false) {
  window.location.href = '/user/login';
}

/**
 * 更新节点
 * @param fields
 */

const capitalizeText = (text: string) => {
  const first = text.charAt(0);
  const rest = text.substring(1, text.length);

  return first.toUpperCase() + rest.toLowerCase();
};

const TableList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  // const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  // const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const [first, setFirst] = useState(true);
  const [pages, setPages] = useState(1);
  const [usersList, setUserList] = useState<UserListItemAdmin[]>([]);
  const [row, setRow] = useState<UserListItemAdmin>();
  const [selectedRowsState, setSelectedRows] = useState<UserListItemAdmin[]>([]);
  const columns: ProColumns<UserListItemAdmin>[] = [
    {
      title: 'Nome',
      search: false,
      dataIndex: 'user_nome',
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
        return <a onClick={() => setRow(entity)}>{capitalizeText(entity.user_nome)}</a>;
      },
    },
    {
      filtered: false,
      filters: false,
      title: 'E-mail',
      dataIndex: 'user_email',
      tip: 'E-mail',
      search: false,
    },
    {
      title: 'Status',
      dataIndex: 'user_active',
      valueType: 'textarea',
      search: false,
      hideInForm: true,
      render: (dom, entity) => {
        return entity.user_active === true ? 'Ativo' : 'Inativo';
      },
    },
    {
      title: 'Nível',
      dataIndex: 'user_level',
      valueType: 'textarea',
      search: false,
      hideInForm: true,
      render: (dom, entity) => {
        return entity.user_level === 0 ? 'Admin' : 'Comum';
      },
      // tip: 'Escola que o usuário estuda.',
    },
    {
      title: 'Data de Criação',
      dataIndex: 'user_createdAt',
      sorter: true,
      search: false,
      valueType: 'dateTime',
      hideInForm: true,
      render: (dom, entity) => {
        const date = new Date(entity.user_createdAt);
        return maskForDate(date);
      },
    },
    // {
    //   title: 'Ações',
    //   dataIndex: 'option',
    //   valueType: 'option',
    //   render: (_, record) => (
    //     <>
    //       <a
    //         onClick={() => {
    //           console.log(record);
    //           // setStepFormValues(record);
    //           // handleUpdateModalVisible(true);
    //           // alert(JSON.stringify(record));
    //         }}
    //       >
    //         <EditFilled style={{ color: '#343132' }} />
    //       </a>
    //       <Divider type="vertical" />
    //       <a href="">
    //         <DeleteFilled style={{ color: '#FF2222' }} />
    //       </a>
    //     </>
    //   ),
    // },
  ];

  const updateTable = (page: number) => {
    queryUsers({ currentPage: page }).then((res: any) => {
      const list = setKeyOnObjectsAdmin(res.user);
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
      <ProTable<UserListItemAdmin>
        headerTitle="Usuários"
        actionRef={actionRef}
        rowKey="key"
        search={false}
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
        <ProTable<UserListItemAdmin, UserListItemAdmin>
          onSubmit={async (value) => {
            console.log(value);
            // if (success) {
            //   handleModalVisible(false);
            //   if (actionRef.current) {
            //     actionRef.current.reload();
            //   }
            // }
          }}
          rowKey="key"
          type="form"
          columns={columns}
        />
      </CreateForm>
      {/* {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async (value: any) => {
            const success = value;
            if (success) {
              handleUpdateModalVisible(false);
              setStepFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }
          }
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null} */}

      <Drawer
        width={600}
        visible={!!row}
        onClose={() => {
          setRow(undefined);
        }}
        closable={false}
      >
        {row?.user_nome && (
          <ProDescriptions<UserListItemAdmin>
            column={2}
            title={row?.user_nome}
            request={async () => ({
              data: row || {},
            })}
            params={{
              id: row?.user_id,
            }}
            columns={columns}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
