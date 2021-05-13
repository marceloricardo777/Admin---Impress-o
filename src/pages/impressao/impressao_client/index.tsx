import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import './style.css';
import { Button, Col, message, Row } from 'antd';
import { SaveOutlined, SearchOutlined } from '@ant-design/icons';
import { getDocumentPicture, getUserByCPF } from './service';
import MaskedInput from 'antd-masked-input/build/main/lib/MaskedInput';

const QRCode = require('qrcode.react');

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

const ImpressaoClient: React.FC<any> = () => {
  const [name, setName] = useState('');
  const [instituicao, setInstituicao] = useState('');
  const [curso, setCurso] = useState('');
  const [cpf, setCPF] = useState('');
  const [matricula, setMatricula] = useState('');
  const [nascimento, setNascimento] = useState('');
  const [validade, setValidade] = useState('');
  const [codigo, setCodigo] = useState('');
  const [file] = useState('');
  const [selected, setSelected] = useState(1);
  const [hasResponse, setHasResponse] = useState(false);

  // var QRCode = require('qrcode.react');

  const getStyle = (value: number): string => {
    if (value === selected) {
      return 'btn_select_card btn_selected';
    }

    return 'btn_select_card btn_non_selected';
  };

  const getCard = (): unknown => {
    if (selected === 1) {
      return (
        <div id={'card_unidas'} className={'card_model'}>
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
            <div>
              <p className={'title_card'}></p>
              <p className={'text_card'} />
            </div>
            <div />
          </div>
          <div id={'bottom_card'} />
          <div id={'qr_code_icon'}>
            <QRCode id={'qr_code'} value="https://transmobibeneficios.com.br/" />
          </div>
        </div>
      );
    }

    if (selected === 2) {
      return <div id={'card_cmeie'} className={'card_model'}></div>;
    }

    return <div />;
  };

  const applyCPFSearch = async () => {
    getUserByCPF(cpf)
      .then((res: any) => {
        if (res.pessoa.cpf === undefined) {
          message.error('Houve algum erro, verifique o CPF e tente novamente!');
        } else {
          setName(res.pessoa.nome);
          setInstituicao(res.pessoa.instituicao);
          setCurso(res.pessoa.course);
          setMatricula(res.pessoa.numregistro);
          setCodigo('---');
          setNascimento(res.pessoa.datanascimento);
          setValidade(`31/03/${new Date().getFullYear() + 1}`);

          getDocumentPicture(res.foto).then((res1: any) => {
            alert(JSON.stringify(res1));
          });

          setHasResponse(true);
        }
        return true;
      })
      .catch(() => {
        message.error('Houve algum erro, verifique o CPF e tente novamente!');
        return false;
      });
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
        <Col className={'align_center'} xs={6} sm={6} md={6} lg={6} xl={6} />
        <Col className={'align_center'} xs={6} sm={6} md={6} lg={12} xl={12}>
          <p className={'input_fields'}>CPF do aluno solicitante:</p>
          <div id={'div_search_input'}>
            <MaskedInput
              mask={'111.111.111-11'}
              placeholder="Ex:. 111.111.111-11"
              onPressEnter={applyCPFSearch}
              onChange={(e: any) => setCPF(e.target.value)}
            />
            <Button type="primary" onClick={applyCPFSearch} icon={<SearchOutlined />}>
              Buscar
            </Button>
          </div>
          {hasResponse ? (
            <div>
              {getCard()}
              <div className={'div_card_and_buttons'}>
                <Button
                  id={'btn_download'}
                  onClick={async () => getUserByCPF('067.045.973-95')}
                  type={'primary'}
                  icon={<SaveOutlined />}
                >
                  Salvar modelo
                </Button>
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
