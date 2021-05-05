import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import './style.css';
import { Col, Input, Row } from 'antd';

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

  return (
    <PageContainer>
      <Row>
        <Col xs={12} sm={12} md={18} lg={12} xl={12}>
          <Input placeholder="Nome do aluno" onChange={(e: any) => setName(e.target.value)} />
          <Input
            placeholder="Instituição do aluno"
            onChange={(e: any) => setInstituicao(e.target.value)}
          />
          <Input placeholder="Curso do aluno" onChange={(e: any) => setCurso(e.target.value)} />
          <Input
            placeholder="CPF do aluno"
            maxLength={11}
            max={11}
            onChange={(e: any) => setCPF(e.target.value)}
          />
          <Input
            placeholder="Matrícula do aluno"
            onChange={(e: any) => setMatricula(e.target.value)}
          />
          <Input
            placeholder="Data de nascimento do aluno"
            onChange={(e: any) => setNascimento(e.target.value)}
          />
          <Input
            placeholder="Validade da carteira"
            onChange={(e: any) => setValidade(e.target.value)}
          />
          <Input placeholder="Código de uso" onChange={(e: any) => setCodigo(e.target.value)} />
        </Col>
        <Col className={'align_center'} xs={6} sm={6} md={6} lg={12} xl={12}>
          <div className={'card_example'}>
            <div id={'div_logo_unidas'} />
            <div id={'div_logo'} />
            <div id={'person_img'}>
              <img
                id={'person'}
                src={
                  'http://s2.glbimg.com/HOos1Mu3tztptizOaf1ZuE4mMRM=/290x386/s.glbimg.com/jo/g1/f/original/2012/04/13/tereza-fotoruim_300_400.jpg'
                }
                alt={''}
              />
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
        </Col>
      </Row>
    </PageContainer>
  );
};

export default ImpressaoClient;
