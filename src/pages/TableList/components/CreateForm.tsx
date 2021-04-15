import React from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { createUserAdmin } from '../service';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

interface CreateFormProps {
  modalVisible: boolean;

  onCancel: () => void;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { modalVisible, onCancel } = props;
  const onFinish = (values: any) => {
    createUserAdmin(values)
      .then((res: any) => {
        if (res.resposta) {
          message.error(res.resposta);
        } else {
          message.success(res.sucesso);
          onCancel();
        }
      })
      .catch(() => {
        message.error('Erro ao salvar!');
      });
  };

  return (
    <Modal
      destroyOnClose
      title="Adicionar Acesso ao Administrativo"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <Form {...layout} name="nest-messages" onFinish={onFinish}>
        <Form.Item name="fullName" label="Nome" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              type: 'email',
              required: true,
              message: 'Por favor insira um email',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Senha"
          rules={[
            {
              required: true,
              message: 'Por favor insira uma senha',
            },
            {
              min: 6,
              message: 'Pelo menos 6 caracteres.',
            },
          ]}
          hasFeedback
        >
          <Input.Password className={'inputText'} placeholder={'Insira a uma senha'} />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirme a Senha"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Por favor confime essa senha',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('Suas senhas estão diferentes, confiara novamente!'),
                );
              },
            }),
          ]}
        >
          <Input.Password className={'inputText'} placeholder={'Confirme a sua senha'} />
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Registrar
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateForm;
