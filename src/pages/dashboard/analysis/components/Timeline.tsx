import React, { useEffect, useState } from 'react';
import TimelineChart from './Charts/TimelineChart';
import { timespayment } from '../service';
import { Card, message } from 'antd';

const Timeline: React.FC<{}> = () => {
  interface TimeDataType {
    x: number;
    y1: number;
    y2: number;
  }
  const [chartData, settimepaymentlist] = useState<TimeDataType[]>([]);
  const [loading, setloading] = useState(true);


  const TimePaymentData = () => {
    timespayment().catch(() => {
    }).then((res) => {
      if (res.erro === true) {
        message.error('erro')
      }
      else {
        const chartdata = [];

        for (let i = 0; i < res.length; i += 1) {
          const d = new Date();
          chartdata.push({
            // eslint-disable-next-line radix
            x: res[i] === undefined ? 0 : d.setHours(res[i].hora, 0, 0),
            y1: res[i] === undefined ? 0 : parseInt(res[i].transacoes, 10),
            y2: res[i] === undefined ? 0 : parseInt(res[i].pagamentos, 10),
          });
        }
        settimepaymentlist(chartdata);
        setloading(false)
      }
    })
  }


  useEffect(() => {
    TimePaymentData();
  }, []
  );
  return (
    <div>
      <Card
        loading={loading}
        bordered={true}
        title={'Transações e Pagamentos'}
      >
        <TimelineChart height={200} data={chartData} titleMap={{ y1: 'Fluxo de Transação', y2: 'Quantidade de Pagamentos' }} />
      </Card>

    </div >
  );
};
export default Timeline;
