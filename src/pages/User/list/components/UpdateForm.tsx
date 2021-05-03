import React, { useState } from 'react';
import { Form, Button, Input, Modal, Select, Steps, message } from 'antd';
import type { UserListItem } from '../data.d';
import MaskedInput from 'antd-masked-input/build/main/lib/MaskedInput';
import { querySchools } from '../service';

export interface FormValueType extends Partial<UserListItem> {
  pessoa_nome?: string;
  email?: string;
  cpf?: string;
  telefone?: string;
  target?: string;
  escolaridade?: string;
  school?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
}

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<UserListItem>;
}
const FormItem = Form.Item;
const { Step } = Steps;
const { Option } = Select;

export interface UpdateFormState {
  formVals: FormValueType;
  currentStep: number;
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [formVals, setFormVals] = useState<FormValueType>({
    pessoa_nome: props.values.pessoa_nome,
    email: props.values.user_email,
    cpf: props.values.pessoa_cpf,
    telefone: props.values.pessoa_telefone,
    target: '0',
    escolaridade: props.values.pessoa_escolaridade,
    school: props.values.pessoa_instituicao,
    template: '0',
    type: '1',
    time: '',
    frequency: 'month',
  });

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [optionselect, setOptionselect] = useState('ensinofundamental');
  const [valuesoptions, setValuesIntituicao] = useState([]);

  const [form] = Form.useForm();

  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  const forward = () => setCurrentStep(currentStep + 1);

  const backward = () => setCurrentStep(currentStep - 1);

  const handleNext = async () => {
    const fieldsValue = await form.validateFields();

    setFormVals({ ...formVals, ...fieldsValue });

    if (currentStep < 2) {
      forward();
    } else {
      handleUpdate({ ...formVals, ...fieldsValue });
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const buscarinstituicao = (values: any) => {
    console.log(values);
    let tipo = '';
    if (optionselect === 'ensinomedio' || optionselect === 'ensinofundamental') {
      tipo = 'escola';
    } else if (optionselect === 'graduacao' || optionselect === 'posgraduacao') {
      tipo = 'faculdade';
    }

    if (values.length >= 4) {
      querySchools(tipo, values)
        .then((res: any) => {
          console.log(res[0]);
          setValuesIntituicao(res);
        })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .catch((error: any) => {
          message.error('Não foi possivel salvar seus dados, caso o erro persista, fale conosco');
        });
    }
  };

  const renderContent = () => {
    if (currentStep === 1) {
      return (
        <>
          <FormItem name="escolaridade" label="Escolaridade">
            <Select style={{ width: '100%' }} onSelect={(value: any) => setOptionselect(value)}>
              <Option value="ensinofundamental">Ensino Fundamental</Option>
              <Option value="ensinomedio">Ensino Médio</Option>
              <Option value="graduacao">Graduação</Option>
              <Option value="posgraduacao">Pós-Graduação</Option>
            </Select>
          </FormItem>
          <FormItem name="school" label="Escola">
            <Select
              style={{ width: '100%' }}
              onSearch={buscarinstituicao}
              showSearch
              placeholder="Selecione"
              filterOption={false}
              className={'formItemSelector'}
              bordered={false}
            >
              {valuesoptions.map((d: any) => (
                <Option value={d.name} key={d.name}>
                  {d.name}
                </Option>
              ))}
            </Select>
          </FormItem>
        </>
      );
    }
    return (
      <>
        <FormItem
          name="name"
          label="Nome"
          rules={[{ required: true, message: 'Por favor, informe o nome!' }]}
        >
          <Input placeholder="Digite o nome" />
        </FormItem>
        <FormItem
          name="email"
          label="E-mail"
          rules={[{ required: true, message: 'Por favor, informe o e-mail!' }]}
        >
          <Input placeholder="Digite o e-mail" />
        </FormItem>
        <FormItem
          name="cpf"
          label="CPF"
          rules={[{ required: true, message: 'Por favor, informe o CPF!' }]}
        >
          <MaskedInput placeholder="Digite o CPF" mask={'111.111.111-11'} />
        </FormItem>
        <FormItem
          name="telefone"
          label="Telefone"
          rules={[{ required: true, message: 'Por favor, informe o Telefone!' }]}
        >
          <MaskedInput placeholder="Digite o telefone" mask={'(11) 1 1111-1111'} />
        </FormItem>
      </>
    );
  };

  const renderFooter = () => {
    if (currentStep === 1) {
      return (
        <>
          <Button style={{ float: 'left' }} onClick={backward}>
            Voltar
          </Button>
          <Button onClick={() => handleUpdateModalVisible(false, values)}>Cancelar</Button>
          <Button type="primary" onClick={() => handleNext()}>
            Salvar
          </Button>
        </>
      );
    }
    // if (currentStep === 2) {
    //   return (
    //     <>
    //       <Button style={{ float: 'left' }} onClick={backward}>
    //         Voltar
    //       </Button>
    //       <Button onClick={() => handleUpdateModalVisible(false, values)}>Cancelar</Button>
    //       <Button type="primary" onClick={() => handleNext()}>
    //         Próximo
    //       </Button>
    //     </>
    //   );
    // }
    return (
      <>
        <Button onClick={() => handleUpdateModalVisible(false, values)}>Cancelar</Button>
        <Button type="primary" onClick={() => handleNext()}>
          Próximo
        </Button>
      </>
    );
  };

  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="Edição de usuário"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible()}
    >
      <Steps style={{ marginBottom: 28 }} size="small" current={currentStep}>
        <Step title="Dados pessoais" />
        <Step title="Escolaridade" />
      </Steps>
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          target: formVals.target,
          escolaridade: formVals.escolaridade,
          school: formVals.school,
          template: formVals.template,
          type: formVals.type,
          frequency: formVals.frequency,
          name: formVals.pessoa_nome,
          email: formVals.email,
          cpf: formVals.cpf,
          telefone: formVals.telefone,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
