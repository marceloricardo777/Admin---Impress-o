import React, { useState } from 'react';
import { Form, Button, Modal, Steps, Row, Col, Radio, Select, Input, message } from 'antd';
import type { DocsListItem } from '@/pages/profile/data';
import { cpf } from 'cpf-cnpj-validator';
import moment from 'moment';
import { buscarCep, getDateFromMoment, checkDateFieldData, date1IsAfterOrEqualThenDate2 } from './globalFunctions';

import MaskedInput from 'antd-masked-input/build/main/lib/MaskedInput';

const { Option } = Select;
interface MyObject {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
}

export interface FormValueType extends Partial<DocsListItem> {
  pessoa_genero?: string;
  pessoa_cpf?: string;
  pessoa_escolaridade?: string;
  pessoa_telefone?: string;
  pessoa_serieperiodo?: string;
  pessoa_instituicao?: string;
  pessoa_cidadeescola?: string;
  pessoa_ufescola?: string;
  pessoa_tipodocumento?: string;
  pessoa_rg?: string;
  pessoa_registrocnh?: string;
  pessoa_datanascimento?: string;
  pessoa_nomemae?: string;
  pessoa_nomepai?: string;
  pessoa_tpcomprovantematricula?: string;
  pessoa_turno?: string;
  pessoa_numregistro?: string;
  pessoa_anodeconclusao?: string;
  user_id?: string;
  pessoa_nome?: string;
  carteiaatual_aproved?: boolean;
  comprovanteendereco_aproved?: boolean;
  comprovanteendereco__criticalmessage?: string;
  comprovantematricula_aproved?: boolean;
  comprovantematricula__criticalmessage?: string;
  doccarteiaatual?: string;
  doccarteiaatual_criticalmessage?: string;
  doccomprovanteendereco?: string;
  doccomprovantematricula?: string;
  docfotoestudante?: string;
  docidentidadefrente?: string;
  docidentidadeverso?: string;
  fotoestudante_aproved?: boolean;
  fotoestudante_criticalmessage?: string;
  identidadefrente_aproved?: boolean;
  identidadefrente_criticalmessage?: string;
  identidadeverso_aproved?: boolean;
  identidadeverso_criticalmessage?: string;

  cpf?: string;
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
  onSubmit: () => void;
  updateModalVisible: boolean;
}
const FormItem = Form.Item;
const { Step } = Steps;
export interface UpdateFormState {
  formVals: FormValueType;
  currentStep: number;
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 18 },
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [formVals, setFormVals] = useState<FormValueType>({


    target: '0',

    template: '0',
    type: '1',
    time: '',
    frequency: 'month',
  });

  const [currentStep, setCurrentStep] = useState<number>(0);


  const [form] = Form.useForm();



  const {
    onCancel: handleCreateUSerModalVisible,
    updateModalVisible,
  } = props;

  const forward = () => setCurrentStep(currentStep + 1);

  const backward = () => setCurrentStep(currentStep - 1);

  const handleNext = async () => {
    const fieldsValue = await form.validateFields();
    console.log(formVals, fieldsValue);

    if (currentStep < 6) {
      forward();
    } else {
      console.log(formVals, fieldsValue);
    }
  };
  const onValidateForm = async () => {
    const fieldsValue = await form.validateFields();
    console.log(formVals, fieldsValue);
  };
  // setformVals é pra armazenar os valores dos inputs
  console.log(setFormVals)

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const optionsfotoestudante = [
    'Baixa Qualidade',
    'Imagem Enviada é incorreta',
    'Foto Fora do Padrão Permitido',
    'Documento não é valido',
    'Os dados Desse documento esta ilegível ',
  ];
  const [cpfvalid, setCpfvalid] = useState(0)

  const validarcpf = (values: any) => {
    if (cpf.isValid(values.target.value) === false) {
      setCpfvalid(0);
      message.error('CPF invalido');
    } else {
      setCpfvalid(1);
    }
  };
  const [optionselect, setSelectEscolaridade] = useState('ensinofundamental');
  const applyOptionSelect = (value: any) => {
    if (optionselect !== value) {
      form.setFieldsValue({
        instituicao: undefined
      })
    }
    setSelectEscolaridade(value)
  }
  const [cidade, setCidade] = useState('-');
  const getNomeCidade = (estado: string) => {
    if (estado === "PI") {
      return "TE"
    } if (estado === "MA") {
      return "TI"
    }
    return "-"
  }
  const [hiddenRG, setHiddenRG] = useState(false);
  const [hiddenNumRegistro, setHiddenNumRegistro] = useState(true);
  const [dateNascimento, setDateNascimento] = useState('')
  const [dateNascimentoIsValid, setDateNascIsValid] = useState(false)
  const [cepExist, setCepExist] = useState(true);

  const updateCEP = async (e: any) => {
    // buscarCep(e)
    const cepvalue = e.target.value
    const cepData = await buscarCep(cepvalue)
    if (cepData !== undefined) {
      form.setFieldsValue(cepData)
      setCepExist(true)
    } else {
      setCepExist(false)
    }
  }
  const [cep] = useState<MyObject>({
    logradouro: '',
    bairro: '',
    localidade: '',
    uf: '',
  });

  const hiddencampos = (values: any) => {
    if (values === 'rg') {
      setHiddenRG(false);
      setHiddenNumRegistro(true);
    } else if (values === 'cnh') {
      setHiddenNumRegistro(false);
      setHiddenRG(true);
    }
  };

  // eslint-disable-next-line consistent-return
  const renderContent = () => {
    if (currentStep === 0) {
      return (
        <>
          <Row style={{ textAlign: 'left' }}>
            <Col sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
              {/* {image(`${formVals.docfotoestudante}`)} */}

              <br></br>
              <FormItem
                name="nome"
                label="Nome"
                rules={[{ required: false, message: "Digite o nome do usuario" }]}
              >
                <Input placeholder="Nome do aluno" />
              </FormItem>
              <FormItem
                name="email"
                label="Email"
                rules={[{ required: false, message: "Digite o email do usuario" }]}
              >
                <Input placeholder="teste@mail.com" />
              </FormItem>
              <FormItem
                name="cpf"
                hasFeedback
                validateStatus={cpfvalid === 1 ? 'success' : 'error'}
                label="CPF"
                rules={[{
                  required: false, message: 'digite o cpf',
                }]}
              >
                <MaskedInput className={"inputText"} mask="111.111.111-11" onBlur={validarcpf} />
              </FormItem>
              <FormItem
                name="genero"
                label="Genero"
                initialValue={"masculino"}
                rules={[
                  {
                    required: false,
                    message: 'Escolha o gênero',
                  },
                ]}
              >
                <Select
                  placeholder={"Escolha seu gênero"}
                  defaultValue={"masculino"}
                  className={"formItemSelector"}
                >
                  <Option value="masculino">Masculino</Option>
                  <Option value="feminino">Feminino</Option>
                </Select>
              </FormItem>
              <FormItem
                name="telefone"
                label="Telefone"
                rules={[{ required: false, message: 'Insira o Telefone' }]}
              >
                <MaskedInput className={"inputText"} mask="(11) 1 1111-1111" />
              </FormItem>
              <FormItem
                name="escolaridade"
                label="Escolaridade"
                rules={[{ required: false }]}
              >
                <Select className={"formItemSelector"} onChange={applyOptionSelect} placeholder="Selecione">
                  <Option value="ensinofundamental">Ensino Fundamental</Option>
                  <Option value="ensinomedio">Ensino Médio</Option>
                  <Option value="graduacao">Graduação</Option>
                  <Option value="posgraduacao">Pós-Graduação</Option>
                </Select>
              </FormItem>
              <FormItem
                name="serieperiodo"
                label="Serie/Periodo"
                rules={[{ required: false, message: 'Insira sua Série ou Período' }]}
              >
                <Input className={"inputText"} maxLength={2} type={"number"} />
              </FormItem>
              <FormItem
                name="turno"
                label="Turno"
                rules={[{ required: false }]}>
                <Select
                  className={"formItemSelector"}
                  placeholder="Selecione"
                  allowClear
                >
                  <Option value="manha">Manhã</Option>
                  <Option value="tarde">Tarde</Option>
                  <Option value="noite">Noite</Option>
                  <Option value="manhatarde">Manhã/Tarde</Option>
                  <Option value="manhanoite">Manhã/Noite</Option>
                  <Option value="manhatardenoite">Manhã/Tarde/Noite</Option>
                </Select>
              </FormItem>
              <FormItem
                name="ufescola"
                label="Estado"
                rules={[{ required: false, message: 'Preencha esse campo' }]}
              >
                <Select onChange={(e: any) => { form.setFieldsValue({ cidadeescola: getNomeCidade(e) }) }} className={"formItemSelector"} placeholder="Selecione o estado">
                  <Option value="PI">Piauí</Option>
                  <Option value="MA">Maranhão</Option>
                </Select>
              </FormItem>
              <FormItem
                name="cidadeescola"
                label="Cidade"
                rules={[{ required: false }]}>
                <Select value={cidade} onChange={() => { }} className={"formItemSelector"} id={"selectCity"} placeholder="Selecione a cidade" >
                  <Option value="-" disabled selected hidden>Selecione a cidade</Option>
                  <Option value="TE" disabled>Teresina</Option>
                  <Option value="TI" disabled>Timon</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
        </>
      );
    }
    if (currentStep === 1) {
      return (
        <>
          <Row style={{ textAlign: 'left' }}>
            <Col sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>

              <FormItem
                labelCol={{ span: 24 }}
                name="identidadefrente_aproved"
                label="Status do Documento (Frente)"
                rules={[{ required: false }]}
              >
                {/* <Switch defaultChecked={formVals.identidadefrente_aproved} /> */}
                <Radio.Group defaultValue={formVals.identidadefrente_aproved}>
                  <Radio value={true}>Aprovado</Radio>
                  <Radio value={false}>Não Aprovado</Radio>
                </Radio.Group>
              </FormItem>
              <FormItem
                labelCol={{ span: 24 }}
                initialValue={formVals.identidadefrente_criticalmessage}
                name="identidadefrente_criticalmessage"
                label="Mensagem de Critica (Frente)"
                rules={[{ required: false }]}
              >
                <Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="Escolha motivo da reprovação"
                  optionLabelProp="label"
                >
                  {optionsfotoestudante.map(function (critic: string) {
                    return (
                      <Option value={critic} label={critic}>
                        {critic}{' '}
                      </Option>
                    );
                  })}
                </Select>
              </FormItem>
              <br></br>
              <b>Nome:</b> {formVals.pessoa_nome}
              <br></br>
              <b> Tipo de Documentação: </b>
              {formVals.pessoa_rg === '' ? 'CNH' : 'RG'}
              <br></br>
              <b> Número da Indentificação:</b>
              {formVals.pessoa_rg === '' ? formVals.pessoa_registrocnh : formVals.pessoa_rg}
              <br></br>
              <b> Data de Nascimento: </b>
              {formVals.pessoa_datanascimento}
              <br></br>
              <b> Nome da Mãe: </b>
              {formVals.pessoa_nomemae}
              <br></br>
              <b>Nome do Pai:</b> {formVals.pessoa_nomepai}
              <br></br>

              <FormItem
                labelCol={{ span: 24 }}
                name="identidadeverso_aproved"
                label="Status do Documento (Verso)"
                rules={[{ required: false }]}
              >
                {/* <Switch defaultChecked={formVals.identidadeverso_aproved} /> */}
                <Radio.Group defaultValue={formVals.identidadeverso_aproved}>
                  <Radio value={true}>Aprovado</Radio>
                  <Radio value={false}>Não Aprovado</Radio>
                </Radio.Group>
              </FormItem>
              <FormItem
                labelCol={{ span: 24 }}
                initialValue={formVals.identidadeverso_criticalmessage}
                name="identidadeverso_criticalmessage"
                label="Mensagem de Critica (Verso)"
                rules={[{ required: false }]}
              >
                <Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="Escolha motivo da reprovação"
                  optionLabelProp="label"
                >
                  {optionsfotoestudante.map(function (critic: string) {
                    return (
                      <Option value={critic} label={critic}>
                        {critic}{' '}
                      </Option>
                    );
                  })}
                </Select>
              </FormItem>
            </Col>
          </Row>
        </>
      );
    }
    if (currentStep === 2) {
      return (
        <>
          <Row style={{ textAlign: 'left' }}>
            <Col sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
              <p /> <p className={"labelInputField"}>* Tipo do Documento:</p>
              <FormItem
                name="tipodocumento"
                rules={[{ required: false }]}
              >
                <Select
                  className={"formItemSelector"}
                  onChange={hiddencampos}
                  placeholder="Selecione"

                >
                  <Option value="rg">RG</Option>
                  <Option value="cnh">CNH</Option>
                </Select>
              </FormItem>

              {!hiddenRG ?
                (
                  <Row>
                    <Col xs={24} sm={24} md={24} lg={14} xl={14}>
                      {hiddenRG ? <p /> : <p className={"labelInputField"}>* RG:</p>}
                      <Form.Item
                        hidden={hiddenRG}
                        name="rg"
                        rules={[{ required: !hiddenRG, message: 'Insira o RG' }]}
                      >
                        <Input className={"inputText"} type={"number"} />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={10} xl={10}>
                      {hiddenRG ? <p /> : <p className={"labelInputField"}>* Orgão Emissor:</p>}
                      <Form.Item
                        hidden={hiddenRG}
                        name="orgaoemissor"
                        rules={[{ required: !hiddenRG, message: 'Insira o Orgão Emissor' }]}
                      >
                        <Input className={"inputText"} />
                      </Form.Item>

                    </Col>
                  </Row>

                ) : (
                  <div />
                )
              }

              {hiddenNumRegistro ? <p /> : <p className={"labelInputField"}>* Número de Registro:</p>}
              <Form.Item
                hidden={hiddenNumRegistro}
                name="registrocnh"
                rules={[
                  {
                    required: hiddenRG,
                    message: 'Insira o Número de Registro',
                  },
                ]}
              >
                <Input className={"inputText"} type={"number"} />
              </Form.Item>

              <p /> <p className={"labelInputField"}>* Data de Nascimento:</p>
              <FormItem
                initialValue={dateNascimento}
                name="datanascimento"
                tooltip={"O aluno deve ter pelo menos 8 anos completados."}
                rules={[
                  {
                    required: false,
                    message: 'Insira a Data de Nascimento',
                  }
                ]}
              >
                <MaskedInput
                  mask="11/11/1111"
                  onChange={(e: any) => {
                    const dateList = e.target.value.split("/")
                    if (e.target.value.length === 10) {
                      // message.info(e.target.value.length+ " | " + JSON.stringify(dateList[0])+" | "+JSON.stringify(dateList[1])+ " | "+JSON.stringify(dateList[2]))

                      const dateConverted = `${dateList[2]}-${dateList[1]}-${dateList[0]} 00:00:00`
                      const selecteddate = getDateFromMoment(dateConverted);

                      selecteddate.setHours(0)
                      selecteddate.setMinutes(0)
                      selecteddate.setSeconds(0)

                      const currentdate = moment(new Date()).format('YYYY/MM/DD HH:mm:ss');

                      const datelimit = getDateFromMoment(currentdate)
                      datelimit.setDate(datelimit.getDate())
                      datelimit.setMonth(datelimit.getMonth())
                      datelimit.setFullYear(datelimit.getFullYear() - 8)

                      const datelimit100 = getDateFromMoment(currentdate)
                      datelimit100.setDate(datelimit.getDate())
                      datelimit100.setMonth(datelimit.getMonth())
                      datelimit100.setFullYear(datelimit.getFullYear() - 100)

                      if (checkDateFieldData(dateList) === 0) {
                        // openNotificationSuccess(JSON.stringify((dateList)))
                        if (date1IsAfterOrEqualThenDate2(datelimit, selecteddate) &&
                          date1IsAfterOrEqualThenDate2(selecteddate, datelimit100)) {
                          setDateNascimento(e.target.value)
                          setDateNascIsValid(true)
                        } else {
                          // openNotificationError("Data de nascimento inválida!")
                          setDateNascimento('')
                          setDateNascIsValid(false)
                        }
                      } else {
                        setDateNascimento('')
                        setDateNascIsValid(false)
                      }
                    }
                  }}
                />
              </FormItem>

              <p /> <p className={"labelInputField"}>* Nome da mae:</p>
              <FormItem
                name="nomemae"
                rules={[{ required: false, message: 'Insira o nome da Mãe' }]}
              >
                <Input />
              </FormItem>

              <p /> <p className={"labelInputField"}> Nome do pai:</p>
              <FormItem
                name="nomepai"
                rules={[{ required: false, message: 'Insira o nome da Mãe' }]}
              >
                <Input />
              </FormItem>
            </Col>
          </Row>
        </>
      );
    }
    if (currentStep === 3) {
      return (
        <>
          <Row style={{ textAlign: 'left' }}>
            <Col sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
              <Form.Item
                label="Comprovante matricula"
                name="tpcomprovantematricula"
                rules={[{ required: true }]}
              >
                <Select
                  className={"formItemSelector"}
                  placeholder="Selecione"
                  allowClear
                >
                  <Option value="boleto">Boleto</Option>
                  <Option value="atestadomatricula">Atestado de Matrícula</Option>
                </Select>
              </Form.Item>

              <FormItem
                label="Numero Matricula"
                name="numregistro"
              >
                <Input className={"inputText"} />
              </FormItem>
              <FormItem
                label="Ano Conclusão"
                name="anodeconclusao"
              >
                <MaskedInput mask={"1111"} className={"inputText"} />

              </FormItem>
            </Col>
          </Row>
        </>
      );
    }
    if (currentStep === 4) {
      return (
        <>
          <Row style={{ textAlign: 'left' }}>
            <Col sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
              <FormItem
                label="CEP"
                name="cep"
                rules={[{ required: true, message: 'Insira seu CEP!' }]}
              >
                <MaskedInput className={"inputText"} mask="11111-111" onBlur={updateCEP} />
              </FormItem>

              <FormItem
                label="Numero"
                name="numero"
                rules={[
                  {
                    required: true,
                    message: 'Insira número do seu endereço de moradia',
                  },
                ]}
              >
                <Input className={"inputText"} />
              </FormItem>

              <FormItem
                label="logradouro"
                initialValue={cep.logradouro}
                name="logradouro"
                rules={[
                  { required: true, message: 'Insira seu logradouro de moradia' },
                ]}
              >
                <Input className={"inputText"} />
              </FormItem>

              <FormItem
                initialValue={cep.bairro}
                label="Bairro"
                name="bairro"
                rules={[
                  { required: true, message: 'Insira seu bairro de moradia' },
                ]}
              >
                <Input className={"inputText"} />
              </FormItem>

              <FormItem
                label="Cidade"
                name="localidade"
                rules={[
                  { required: true, message: 'Insira sua cidade de moradia' },
                ]}
              >
                <Input className={"inputText"} value={cep.localidade} />
              </FormItem>
              <FormItem
                label="UF"
                name="uf"
                rules={[
                  { required: true, message: 'Insira seu estado de moradia' },
                ]}
              >
                <MaskedInput className={"inputText"} value={cep.uf} mask="AA" />
              </FormItem>

            </Col>
          </Row>
        </>
      );
    }
    return 0;
  };

  const renderFooter = () => {
    if (currentStep > 0 && currentStep !== 5) {
      return (
        <>
          <Button style={{ float: 'left' }} onClick={backward}>
            Voltar
          </Button>
          <Button
            type="primary"
            onClick={() => {
              handleNext();
            }}
          >
            Próximo
          </Button>
        </>
      );
    }
    if (currentStep === 5) {
      return (
        <>
          <h1>Clique em "Salvar" para confimar a avaliação dos documentos</h1>

          <Button style={{ float: 'left' }} onClick={backward}>
            Voltar
          </Button>
          <Button
            onClick={() => {
              handleCreateUSerModalVisible(false);
            }}
          >
            Cancelar
          </Button>
          <Button type="primary" htmlType="submit" onClick={onValidateForm}>
            Salvar
          </Button>
        </>
      );
    }


    return (
      <>
        <Button
          onClick={() => {
            handleCreateUSerModalVisible(false);
          }}
        >
          Cancelar
        </Button>
        <Button type="primary" onClick={() => handleNext()}>
          Próximo
        </Button>
      </>
    );
  };

  return (
    <Modal
      closable={false}
      keyboard={false}
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose={true}
      title="Edição de usuário"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => {
        handleCreateUSerModalVisible();
      }}
    >
      <Steps style={{ marginBottom: 28 }} size="small" current={currentStep}>
        <Step title="Informação do Estudante" />
        <Step title="Foto do Estudante" />
        <Step title="Identificação" />
        <Step title="Matricula" />
        <Step title="Endereço" />
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
          cpf: formVals.cpf,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
