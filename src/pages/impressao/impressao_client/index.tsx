import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import './style.css';
import { Button, Col, Input, Row } from 'antd';
import { SaveOutlined } from '@ant-design/icons';

// const getEscolaridade = (option: string) => {
//   if (option === 'ensinofundamental') {
//     return 'Ensino Fundamental';
//   }
//   if (option === 'ensinomedio') {
//     return 'Ensino Médio';
//   }
//   if (option === 'graduacao') {
//     return 'Graduação';
//   }
//   return 'Pós-Graduação';
// };

// const capitalizeText = (text: string) => {
//   const first = text.charAt(0);
//   const rest = text.substring(1, text.length);

//   return first.toUpperCase() + rest.toLowerCase();
// };

const { Search } = Input;

const ImpressaoClient: React.FC<{}> = () => {
  // const [name, setName] = useState('-');
  // const [instituicao, setInstituicao] = useState('-');
  // const [curso, setCurso] = useState('-');
  const [cpf, setCPF] = useState('-');
  // const [matricula, setMatricula] = useState('-');
  // const [nascimento, setNascimento] = useState('-');
  // const [validade, setValidade] = useState('-');
  // const [codigo, setCodigo] = useState('-');
  // const [hasFile, setHasFile] = useState(false);
  // const [file, setFile] = useState('');
  const [selected, setSelected] = useState(1);
  const [hasResponse] = useState(false);

  // var QRCode = require('qrcode.react');

  const getStyle = (value: number) => {
    let retorno = 'btn_select_card btn_non_selected';
    if (value === selected) {
      retorno = 'btn_select_card btn_selected';
    }

    return retorno;
  };

  return (
    <PageContainer>
      <div id={'div_menu_options'}>
        <div id={''} onClick={() => setSelected(1)} className={getStyle(1)}>
          Carteira Unidas
        </div>
        <div id={''} onClick={() => setSelected(2)} className={getStyle(2)}>
          Carteira CMEIE
        </div>
        <div id={''} onClick={() => setSelected(3)} className={getStyle(3)}>
          Passe Estudantil
        </div>
      </div>
      <Row className={'div_content'}>
        {/* <Col xs={12} sm={12} md={18} lg={12} xl={12}>
          <p className={'input_fields'}>Nome do aluno</p>
          <Input placeholder="Ex:. João Ribeiro" onChange={(e: any) => setName(e.target.value)} />

          <p className={'input_fields'}>Instituição do aluno</p>
          <Input placeholder="Ex:. IFPI" onChange={(e: any) => setInstituicao(e.target.value)} />

          <p className={'input_fields'}>Curso do aluno</p>
          <Input placeholder="Ex:. Administração" onChange={(e: any) => setCurso(e.target.value)} />


          <p className={'input_fields'}>Matrícula do aluno</p>
          <Input
            placeholder="Matrícula do aluno"
            onChange={(e: any) => setMatricula(e.target.value)}
          />

          <p className={'input_fields'}>Data de nascimento do aluno</p>
          <Input
            placeholder="Ex:. 01/01/2020"
            onChange={(e: any) => setNascimento(e.target.value)}
          />

          <p className={'input_fields'}>Validade da carteira</p>
          <Input placeholder="Ex:. 06/06/2021" onChange={(e: any) => setValidade(e.target.value)} />

          <p className={'input_fields'}>Código de uso</p>
          <Input placeholder="Código de uso" onChange={(e: any) => setCodigo(e.target.value)} />

          <p className={'input_fields'}>Foto do aluno</p>
          <input type="file" onChange={handleChange} />
        </Col> */}
        <Col className={'align_center'} xs={6} sm={6} md={6} lg={6} xl={6} />
        <Col className={'align_center'} xs={6} sm={6} md={6} lg={12} xl={12}>
          <p className={'input_fields'}>CPF do aluno solicitante:</p>
          <Search
            placeholder="Ex:. 111.111.111-11"
            enterButton="Buscar"
            size="large"
            loading={false}
            onChange={(e: any) => setCPF(e.target.value)}
          />

          {hasResponse ? (
            <div>
              {/*  </div> */}
              <div className={'div_card_and_buttons'}>
                <Button id={'btn_download'} type={'primary'} icon={<SaveOutlined />}>
                  Salvar modelo {cpf}
                </Button>
                {/* <QRCode value="https://transmobibeneficios.com.br/" /> */}
              </div>
            </div>
          ) : (
            <div />
          )}
        </Col>
      </Row>
    </PageContainer>
  );
};

export default ImpressaoClient;
