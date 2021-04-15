import { Card, message } from 'antd';

import React, { useEffect, useState } from 'react';
import { Pie } from './Charts';
import styles from '../style.less';
import { typeschooling } from '../service';

const Schooling: React.FC<{}> = () => {
  interface PieGraphic {
    x: string;
    y: number;
  }



  const [schooling, setSchooling] = useState<PieGraphic[]>([]);
  const TypeSchoolingData = () => {
    typeschooling().catch(() => {
    }).then((res) => {
      if (res.erro === true) {
        message.error('erro')
      }

      else {
        const typedata = []

        for (let i = 0; i < res.length; i += 1) {
          typedata.push({
            // eslint-disable-next-line radix
            x: `${res[i] === undefined ? 0 : res[i].escolaridade} `,
            y: res[i] === undefined ? 0 : parseInt(res[i].count, 10),
          });

        }

        setSchooling(typedata);
      }
    })
  }
  useEffect(() => {
    TypeSchoolingData();
  }, []
  );

  return (<Card
    className={styles.salesCard}
    bordered={false}
    title={
      'Escolaridade'
    }
    style={{
      height: '100%',
    }}
    extra={
      <div className={styles.salesCardExtra}>
        <div className={styles.salesTypeRadio}>
          {/* <Radio.Group >
            <Radio.Button value="all">
              <FormattedMessage id="dashboardandanalysis.channel.all" defaultMessage="ALL" />
            </Radio.Button>
            <Radio.Button value="online">
              <FormattedMessage id="dashboardandanalysis.channel.online" defaultMessage="Online" />
            </Radio.Button>
            <Radio.Button value="stores">
              <FormattedMessage id="dashboardandanalysis.channel.stores" defaultMessage="Stores" />
            </Radio.Button>
          </Radio.Group> */}
        </div>
      </div>
    }
  >
    <div>
      <h4 style={{ marginTop: 8, marginBottom: 32 }}>
        Escolaridades dos Estudantes
      </h4>
      <Pie
        total={schooling.reduce((pre, now) => now.y + pre, 0)}
        valueFormat={(value) => value}
        hasLegend
        subTitle={
          'Escolaridades'
        }
        data={schooling}
        height={220}

        lineWidth={5}
      />
    </div>
  </Card>
  );
}

export default Schooling;
