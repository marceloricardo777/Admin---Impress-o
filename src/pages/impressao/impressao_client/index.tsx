import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import './style.css';
import { Button, Col, Input, Row } from 'antd';
import { EyeOutlined, SaveOutlined } from '@ant-design/icons';

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

const ImpressaoClient: React.FC<{}> = () => {
  const [name, setName] = useState('-');
  const [instituicao, setInstituicao] = useState('-');
  const [curso, setCurso] = useState('-');
  const [cpf, setCPF] = useState('-');
  const [matricula, setMatricula] = useState('-');
  const [nascimento, setNascimento] = useState('-');
  const [validade, setValidade] = useState('-');
  const [codigo, setCodigo] = useState('-');
  // const [hasFile, setHasFile] = useState(false);
  const [file, setFile] = useState('');

  const handleChange = (e: any) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    // setHasFile(true)
  };

  return (
    <PageContainer>
      <Row>
        <Col xs={12} sm={12} md={18} lg={12} xl={12}>
          <p className={'input_fields'}>Nome do aluno</p>
          <Input placeholder="Ex:. João Ribeiro" onChange={(e: any) => setName(e.target.value)} />

          <p className={'input_fields'}>Instituição do aluno</p>
          <Input placeholder="Ex:. IFPI" onChange={(e: any) => setInstituicao(e.target.value)} />

          <p className={'input_fields'}>Curso do aluno</p>
          <Input placeholder="Ex:. Administração" onChange={(e: any) => setCurso(e.target.value)} />

          <p className={'input_fields'}>CPF do aluno</p>
          <Input
            placeholder="Ex:. 111.111.111-11"
            maxLength={11}
            max={11}
            onChange={(e: any) => setCPF(e.target.value)}
          />

          <p className={'input_fields'}>Matrícula do aluno</p>
          <Input placeholder="" onChange={(e: any) => setMatricula(e.target.value)} />

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
        </Col>
        <Col className={'align_center'} xs={6} sm={6} md={6} lg={12} xl={12}>
          <div className={'card_example'}>
            <div id={'div_logo_unidas'} />
            <div id={'div_logo'} />
            <div id={'person_img'}>
              <img id={'person'} src={file} alt={''} />
            </div>
            <div id={'div_dados_1'} className={'divs_dados'}>
              <p className={'title_card'}>Nome</p>
              <p className={'text_card'}>{name}</p>
            </div>
            <div id={'div_dados_2'} className={'divs_dados'}>
              <p className={'title_card'}>Instituição de Ensino</p>
              <p className={'text_card'}>{instituicao}</p>
            </div>
            <div id={'div_dados_3'} className={'divs_dados'}>
              <p className={'title_card'}>Curso</p>
              <p className={'text_card'}>{curso}</p>
            </div>
            <div id={'div_dados_4'} className={'divs_dados'}>
              <div>
                <p className={'title_card'}>CPF</p>
                <p className={'text_card'}>{cpf}</p>
              </div>
              <div>
                <p className={'title_card'}>Matrícula</p>
                <p className={'text_card'}>{matricula}</p>
              </div>
              <div>
                <p className={'title_card'}>Nascimento</p>
                <p className={'text_card'}>{nascimento}</p>
              </div>
            </div>
            <div id={'div_dados_5'} className={'divs_dados'}>
              <div>
                <p className={'title_card'}>Válido até</p>
                <p className={'text_card'}>{validade}</p>
              </div>
              <div>
                <p className={'title_card'}>Código de uso</p>
                <p className={'text_card'}>{codigo}</p>
              </div>
              <div />
            </div>
            <div id={'bottom_card'} />
            <div id={'qr_code_icon'}>
              <img
                id={'qr_code'}
                src={
                  'https://www.kaspersky.com.br/content/pt-br/images/repository/isc/2020/9910/a-guide-to-qr-codes-and-how-to-scan-qr-codes-2.png'
                }
                alt={''}
              />
            </div>
          </div>
          <div className={'div_card_and_buttons'}>
            <Button id={'btn_watch'} icon={<EyeOutlined />}>
              Ver modelo pronto
            </Button>
            <Button id={'btn_download'} type={'primary'} icon={<SaveOutlined />}>
              Salvar modelo
            </Button>
          </div>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default ImpressaoClient;
