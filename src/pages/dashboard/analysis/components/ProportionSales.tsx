import { Card, message } from 'antd';

import { FormattedMessage } from 'umi';
import React, { useEffect, useState } from 'react';
import { Pie } from './Charts';
import styles from '../style.less';
import { typespayment } from '../service';

const ProportionSales: React.FC<{}> = () => {
  interface PieGraphic {
    x: string;
    y: number;
  }



  const [typepayment, settypepayment] = useState<PieGraphic[]>([]);
  const TypePaymentData = () => {
    typespayment().catch(() => {
    }).then((res) => {
      if (res.erro === true) {
        message.error('erro')
      }

      else {
        const typedata = []

        for (let i = 0; i < res.length; i += 1) {
          typedata.push({
            // eslint-disable-next-line radix
            x: `${res[i] === undefined ? 0 : res[i].payment_type_payment} `,
            y: res[i] === undefined ? 0 : parseInt(res[i].count, 10),
          });

        }

        settypepayment(typedata);
      }
    })
  }
  useEffect(() => {
    TypePaymentData();
  }, []
  );

  return (<Card
    className={styles.salesCard}
    bordered={false}
    title={
      <FormattedMessage
        id="dashboardandanalysis.analysis.the-proportion-of-sales"
        defaultMessage="The Proportion of Sales"
      />
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
        <FormattedMessage id="dashboardandanalysis.analysis.sales" defaultMessage="Sales" />
      </h4>
      <Pie
        total={typepayment.reduce((pre, now) => now.y + pre, 0)}
        valueFormat={(value) => value}
        hasLegend
        subTitle={
          'Quantidade de pagamentos'
        }
        data={typepayment}
        height={300}

        lineWidth={5}
      />
    </div>
  </Card>
  );
}

export default ProportionSales;
