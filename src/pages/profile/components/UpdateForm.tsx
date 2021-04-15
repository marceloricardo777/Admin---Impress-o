import React, { useState } from 'react';
import { Form, Button, Modal, Steps, Image, Row, Col, Radio, Select } from 'antd';
import type { DocsListItem } from '../data';
import { imgdocs } from '../service';

const { Option } = Select;

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
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<DocsListItem>;
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
    pessoa_genero: props.values.pessoa_genero,
    pessoa_cpf: props.values.pessoa_cpf,
    pessoa_escolaridade: props.values.pessoa_escolaridade,
    pessoa_telefone: props.values.pessoa_telefone,
    pessoa_serieperiodo: props.values.pessoa_serieperiodo,
    pessoa_instituicao: props.values.pessoa_instituicao,
    pessoa_cidadeescola: props.values.pessoa_cidadeescola,
    pessoa_ufescola: props.values.pessoa_ufescola,
    pessoa_tipodocumento: props.values.pessoa_tipodocumento,
    pessoa_rg: props.values.pessoa_rg,
    pessoa_registrocnh: props.values.pessoa_registrocnh,
    pessoa_datanascimento: props.values.pessoa_datanascimento,
    pessoa_nomemae: props.values.pessoa_nomemae,
    pessoa_nomepai: props.values.pessoa_nomepai,
    pessoa_tpcomprovantematricula: props.values.pessoa_tpcomprovantematricula,
    pessoa_turno: props.values.pessoa_turno,
    pessoa_numregistro: props.values.pessoa_numregistro,
    pessoa_anodeconclusao: props.values.pessoa_anodeconclusao,
    user_id: props.values.user_id,
    pessoa_nome: props.values.pessoa_nome,
    carteiaatual_aproved: props.values.carteiaatual_aproved,
    docfotoestudante: props.values.docfotoestudante,
    docidentidadefrente: props.values.docidentidadefrente,
    docidentidadeverso: props.values.docidentidadeverso,
    fotoestudante_aproved: props.values.fotoestudante_aproved,
    fotoestudante_criticalmessage: props.values.fotoestudante_criticalmessage,
    identidadefrente_aproved: props.values.identidadefrente_aproved,
    identidadefrente_criticalmessage: props.values.identidadefrente_criticalmessage,
    identidadeverso_aproved: props.values.identidadeverso_aproved,
    identidadeverso_criticalmessage: props.values.identidadeverso_criticalmessage,
    comprovanteendereco_aproved: props.values.comprovanteendereco_aproved,
    comprovanteendereco_criticalmessage: props.values.comprovanteendereco_criticalmessage,
    comprovantematricula_aproved: props.values.comprovantematricula_aproved,
    comprovantematricula_criticalmessage: props.values.comprovantematricula_criticalmessage,
    doccarteiaatual: props.values.doccarteiaatual,
    doccarteiaatual_criticalmessage: props.values.doccarteiaatual_criticalmessage,
    doccomprovanteendereco: props.values.doccomprovanteendereco,
    doccomprovantematricula: props.values.doccomprovantematricula,
    cpf: props.values.pessoa_cpf,
    target: '0',
    escolaridade: props.values.pessoa_escolaridade,
    school: props.values.pessoa_instituicao,
    template: '0',
    type: '1',
    time: '',
    frequency: 'month',
  });

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [fotoestudante, setFotoEstudante] = useState('');
  const [imgverso, setimgeverso] = useState('');
  const [imgfrente, setimgfrente] = useState('');
  const [comprovanteendereco, setcomprovanteendereco] = useState('');
  const [comprovantematricula, setcomprovantematricula] = useState('');
  const [doccarteiaatual, setdoccarteiaatual] = useState('');

  const [form] = Form.useForm();

  async function image(url: string) {
    const base64 = await imgdocs(url).then((res: any) => {
      if (res.message) {
        localStorage.clear();
        window.location.href = '/user/login';
      }
      return res.url;
    });
    return base64;
  }

  image(`${formVals.docfotoestudante}`).then((total) => {
    setFotoEstudante(`${total}`);
  });
  image(`${formVals.docidentidadeverso}`).then((total) => {
    setimgeverso(`${total}`);
  });
  image(`${formVals.docidentidadefrente}`).then((total) => {
    setimgfrente(`${total}`);
  });
  image(`${formVals.doccomprovanteendereco}`).then((total) => {
    setcomprovanteendereco(`${total}`);
  });
  image(`${formVals.doccomprovantematricula}`).then((total) => {
    setcomprovantematricula(`${total}`);
  });
  image(`${formVals.doccarteiaatual}`).then((total) => {
    setdoccarteiaatual(`${total}`);
  });

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

    if (currentStep < 6) {
      forward();
    } else {
      handleUpdate({ ...formVals, ...fieldsValue });
    }
  };
  const onValidateForm = async () => {
    const fieldsValue = await form.validateFields();

    handleUpdate({ ...formVals, ...fieldsValue });
    console.log(formVals);
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const optionsfotoestudante = [
    'Baixa Qualidade',
    'Imagem Enviada é incorreta',
    'Foto Fora do Padrão Permitido',
    'Documento não é valido',
    'Os dados Desse documento esta ilegível ',
  ];

  // eslint-disable-next-line consistent-return
  const renderContent = () => {
    if (currentStep === 0) {
      return (
        <>
          <Row style={{ textAlign: 'left' }}>
            <Col sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
              {/* {image(`${formVals.docfotoestudante}`)} */}
              <div>
                <Image width={200} src={fotoestudante} />
              </div>
              <br></br>
              <FormItem
                name="fotoestudante_aproved"
                label="Status do Documento"
                rules={[{ required: false }]}
              >
                {/* <Switch defaultChecked={formVals.fotoestudante_aproved} /> */}
                <Radio.Group defaultValue={formVals.fotoestudante_aproved}>
                  <Radio value={true}>Aprovado</Radio>
                  <Radio value={false}>Não Aprovado</Radio>
                </Radio.Group>
              </FormItem>
              <FormItem
                name="fotoestudante_criticalmessage"
                label="Mensagem de Critica"
                initialValue={formVals.fotoestudante_criticalmessage}
                rules={[{ required: false }]}
              >
                <Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="Escolha motivo da reprovação"
                  defaultValue={['Baixa Qualidade teste']}
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
                {/* <TextArea
                  rows={4}
                  placeholder="Caso a documentação não tenha sido aprovada, explique detalhadamente o motivo"
                /> */}
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
              <div>
                {imgfrente.includes('data:application/pdf;base64,') ? (
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => {
                      const pdfWindow = window.open('');
                      pdfWindow?.document.write(
                        `<iframe width='100%' height='100%' src='${imgfrente}'></iframe>`,
                      );
                    }}
                  >
                    Visualizar PDF
                  </Button>
                ) : (
                  <Image width={200} src={imgfrente} />
                )}
              </div>
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
              <div>
                {imgverso.includes('data:application/pdf;base64,') ? (
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => {
                      const pdfWindow = window.open('');
                      pdfWindow?.document.write(
                        `<iframe width='100%' height='100%' src='${imgverso}'></iframe>`,
                      );
                    }}
                  >
                    Visualizar PDF
                  </Button>
                ) : (
                  <Image width={200} src={imgverso} />
                )}
              </div>
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
            <Col sm={{ span: 14 }} md={{ span: 14 }} lg={{ span: 14 }}>
              <div>
                {comprovantematricula.includes('data:application/pdf;base64,') ? (
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => {
                      const pdfWindow = window.open('');
                      pdfWindow?.document.write(
                        `<iframe width='100%' height='100%' src='${comprovantematricula}'></iframe>`,
                      );
                    }}
                  >
                    Visualizar PDF
                  </Button>
                ) : (
                  <Image width={200} src={comprovantematricula} />
                )}
              </div>
              <br></br>
              <b>Tipo de Comprovante de Matricula: </b>
              {formVals.pessoa_tpcomprovantematricula}
              <br></br>
              <b>Turno: </b>
              {formVals.pessoa_turno}
              <br></br>
              <b>Número da Matrícula:</b> {formVals.pessoa_numregistro}
              <br></br>
              <b>Ano de Conclusão:</b> {formVals.pessoa_anodeconclusao}
              <br></br>
              <FormItem
                labelCol={{ span: 24 }}
                name="comprovantematricula_aproved"
                label="Status do Documento"
                rules={[{ required: false }]}
              >
                {/* <Switch defaultChecked={formVals.comprovantematricula_aproved} /> */}
                <Radio.Group defaultValue={formVals.comprovantematricula_aproved}>
                  <Radio value={true}>Aprovado</Radio>
                  <Radio value={false}>Não Aprovado</Radio>
                </Radio.Group>
              </FormItem>
              <FormItem
                labelCol={{ span: 24 }}
                initialValue={formVals.comprovantematricula_criticalmessage}
                name="comprovantematricula_criticalmessage"
                label="Mensagem de Critica"
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
            <Col sm={{ span: 8 }} md={{ span: 8 }} lg={{ span: 8 }}></Col>
          </Row>
        </>
      );
    }
    if (currentStep === 3) {
      return (
        <>
          <Row style={{ textAlign: 'left' }}>
            <Col sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
              <br></br>
              <div>
                {comprovanteendereco.includes('data:application/pdf;base64,') ? (
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => {
                      const pdfWindow = window.open('');
                      pdfWindow?.document.write(
                        `<iframe width='100%' height='100%' src='${comprovanteendereco}'></iframe>`,
                      );
                    }}
                  >
                    Visualizar PDF
                  </Button>
                ) : (
                  <Image width={200} src={comprovanteendereco} />
                )}
              </div>
              <FormItem
                name="comprovanteendereco_aproved"
                label="Status do Documento"
                rules={[{ required: false }]}
              >
                {/* <Switch defaultChecked={formVals.comprovanteendereco_aproved} /> */}
                <Radio.Group defaultValue={formVals.comprovanteendereco_aproved}>
                  <Radio value={true}>Aprovado</Radio>
                  <Radio value={false}>Não Aprovado</Radio>
                </Radio.Group>
              </FormItem>
              <FormItem
                initialValue={formVals.comprovanteendereco_criticalmessage}
                name="comprovanteendereco_criticalmessage"
                label="Mensagem de Critica"
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
    if (currentStep === 4) {
      return (
        <>
          <Row style={{ textAlign: 'left' }}>
            <Col sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
              <br></br>
              <div>
                {doccarteiaatual.includes('data:application/pdf;base64,') ? (
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => {
                      const pdfWindow = window.open('');
                      pdfWindow?.document.write(
                        `<iframe width='100%' height='100%' src='${doccarteiaatual}'></iframe>`,
                      );
                    }}
                  >
                    Visualizar PDF
                  </Button>
                ) : (
                  <Image width={200} src={doccarteiaatual} />
                )}
              </div>

              <FormItem name="carteiaatual_aproved" label="Status" rules={[{ required: false }]}>
                {/* <Switch defaultChecked={formVals.carteiaatual_aproved} /> */}
                <Radio.Group defaultValue={formVals.carteiaatual_aproved}>
                  <Radio value={true}>Aprovado</Radio>
                  <Radio value={false}>Não Aprovado</Radio>
                </Radio.Group>
              </FormItem>
              <FormItem
                initialValue={formVals.doccarteiaatual_criticalmessage}
                name="doccarteiaatual_criticalmessage"
                label="Mensagem de Critica"
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
              handleUpdateModalVisible(false, values);
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
        <Button
          onClick={() => {
            handleUpdateModalVisible(false, values);
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
        handleUpdateModalVisible();
      }}
    >
      <Steps style={{ marginBottom: 28 }} size="small" current={currentStep}>
        <Step title="Foto Estudante" />
        <Step title="Identificação" />
        <Step title="Matricula" />
        <Step title="Endereço" />
        <Step title="Carteira Estudantil" />
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
