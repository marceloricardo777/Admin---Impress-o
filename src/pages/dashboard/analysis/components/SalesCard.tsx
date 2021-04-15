import { Button, Card, Col, DatePicker, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { Column } from '@ant-design/charts';
import styles from '../style.less';
import { saleMount } from '../service';

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;


const SalesCard: React.FC<{}> = () => {

  interface SaleMount {
    x: string;
    y: number;
  }
  const mount = [
    '',
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro']
  const [salevaluesmount, setsalevaluesmount] = useState<SaleMount[]>([]);

  const SaleMountxy = () => {
    saleMount().catch(() => {
    }).then((res) => {
      const xy = []
      for (let i = 0; i < 13; i += 1) {
        xy.push({
          // eslint-disable-next-line radix
          x: `${res[i] === undefined ? mount[i] : mount[parseInt(res[i].mes, 10)]} `,
          y: res[i] === undefined ? 0 : parseFloat(res[i].sale),
        });

      }
      setsalevaluesmount(xy);

    })
  }
  useEffect(() => {
    SaleMountxy();
  }, []
  );
  const selectDate = (value: any) => {
    const datainicial = value[0].format('YYYY-MM-DD')
    const datafinal = value[1].format('YYYY-MM-DD')
    console.log(datainicial, datafinal)
  }
  const data = [
    {
      type: '家具家电',
      sales: 38,
    },
    {
      type: '粮油副食',
      sales: 52,
    },
    {
      type: '生鲜水果',
      sales: 61,
    },
    {
      type: '美容洗护',
      sales: 145,
    },
    {
      type: '母婴用品',
      sales: 48.5000,
    },
    {
      type: '进口食品',
      sales: 38,
    },
    {
      type: '食品饮料',
      sales: 38,
    },
    {
      type: '家庭清洁',
      sales: 38,
    },
  ];
  const config = {

    meta: {
      type: { alias: '类别' },
      sales: { alias: '销售额' },
    },
  };
  console.log(data);
  console.log(salevaluesmount)
  return (

    <Card loading={false} bordered={false} bodyStyle={{ padding: 0 }}>

      <div className={styles.salesCard}>
        <Tabs
          tabBarExtraContent={
            <div style={{ display: 'none' }} className={styles.salesExtraWrap}>
              <RangePicker
                format={'YYYY-MM-DD'}
                onChange={selectDate}
                style={{ width: 256 }}
              />
              <div className={styles.salesExtra}>
                <a className={'year'} onClick={() => selectDate('year')}>
                  <Button type='primary'>Filtrar</Button>

                </a>
              </div>
            </div>
          }
          size="large"
          tabBarStyle={{ marginBottom: 24 }}
        >
          <TabPane
            tab={'Vendas de 1° Via por mês'}
            key="sales"
          >
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <div className={styles.salesBar}>
                <Column xField={'x'} yField={'y'} {...config} data={salevaluesmount} label={{ position: 'middle' }} columnWidthRatio={0.8} />
              </div>
            </Col>

          </TabPane>

        </Tabs>
      </div>
    </Card>
  );
}

export default SalesCard;
