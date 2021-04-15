import { InfoCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';

import { FormattedMessage } from 'umi';
import React, { useEffect, useState } from 'react';
import numeral from 'numeral';
import { ChartCard, Field } from './Charts';
import { saleTotal } from '../service';





const IntroduceRow: React.FC<{}> = () => {
  interface TotalSale {
    totalsale: number;
    today: number;
  }
  const [amount, settotalsale] = useState<TotalSale[]>([]);
  // const [visitData, setvisitData] = useState([]);
  const Totalamount = () => {
    saleTotal().then((res: any) => {
      if (res.message) {
        localStorage.clear();
        window.location.href = '/user/login';
      }
      else {
        settotalsale(res);
      }
      // eslint-disable-next-line @typescript-eslint/dot-notation

    });
  }
  useEffect(() => {
    Totalamount()
  }, []
  );

  return (
    <ChartCard
      loading={false}
      bordered={false}
      title={<FormattedMessage
        id="dashboardandanalysis.analysis.total-sales"
        defaultMessage="Total Sales" />}
      action={<Tooltip
        title={<FormattedMessage
          id="dashboardandanalysis.analysis.introduce"
          defaultMessage="Introduce" />}
      >
        <InfoCircleOutlined />
      </Tooltip>}
      // eslint-disable-next-line @typescript-eslint/dot-notation
      total={() => `R$ ${numeral(`R$ ${amount['totalsale']}`).format('0.00')}`
      }
      footer={<Field
        label={<FormattedMessage
          id="dashboardandanalysis.analysis.day-sales"
          defaultMessage="Daily Sales" />}
        // eslint-disable-next-line @typescript-eslint/dot-notation
        value={`R$ ${numeral(`R$ ${amount['today']}`).format('0.00')}`} />}
      contentHeight={46}
    >

    </ChartCard>

    //   {/* <Col {...topColResponsiveProps}>
    //     <ChartCard
    //       bordered={false}
    //       title={<FormattedMessage id="dashboardandanalysis.analysis.visits" defaultMessage="Visits" />}
    //       action={<Tooltip
    //         title={<FormattedMessage
    //           id="dashboardandanalysis.analysis.introduce"
    //           defaultMessage="Introduce" />}
    //       >
    //         <InfoCircleOutlined />
    //       </Tooltip>}
    //       total={numeral(8846).format('0,0')}
    //       footer={<Field
    //         label={<FormattedMessage
    //           id="dashboardandanalysis.analysis.day-visits"
    //           defaultMessage="Daily Visits" />}
    //         value={numeral(1234).format('0,0')} />}
    //       contentHeight={46}
    //     >
    //        <MiniArea color="#975FE4" data={visitData} />
    //     </ChartCard>
    //   </Col> */}
    // {/* <Col {...topColResponsiveProps}>
    //     <ChartCard
    //       bordered={false}
    //       title={<FormattedMessage id="dashboardandanalysis.analysis.payments" defaultMessage="Payments" />}
    //       action={<Tooltip
    //         title={<FormattedMessage
    //           id="dashboardandanalysis.analysis.introduce"
    //           defaultMessage="Introduce" />}
    //       >
    //         <InfoCircleOutlined />
    //       </Tooltip>}
    //       total={numeral(6560).format('0,0')}
    //       footer={<Field
    //         label={<FormattedMessage
    //           id="dashboardandanalysis.analysis.conversion-rate"
    //           defaultMessage="Conversion Rate" />}
    //         value="60%" />}
    //       contentHeight={46}
    //     >
    //       <MiniBar data={visitData} />
    //     </ChartCard>
    //   </Col> */}
    // {/* <Col {...topColResponsiveProps}>
    //     <ChartCard
    //       bordered={false}
    //       title={<FormattedMessage
    //         id="dashboardandanalysis.analysis.operational-effect"
    //         defaultMessage="Operational Effect" />}
    //       action={<Tooltip
    //         title={<FormattedMessage
    //           id="dashboardandanalysis.analysis.introduce"
    //           defaultMessage="Introduce" />}
    //       >
    //         <InfoCircleOutlined />
    //       </Tooltip>}
    //       total="78%"
    //       footer={<div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
    //         <Trend flag="up" style={{ marginRight: 16 }}>
    //           <FormattedMessage
    //             id="dashboardandanalysis.analysis.week"
    //             defaultMessage="Weekly Changes" />
    //           <span className={styles.trendText}>12%</span>
    //         </Trend>
    //         <Trend flag="down">
    //           <FormattedMessage
    //             id="dashboardandanalysis.analysis.day"
    //             defaultMessage="Weekly Changes" />
    //           <span className={styles.trendText}>11%</span>
    //         </Trend>
    //       </div>}
    //       contentHeight={46}
    //     >
    //       <MiniProgress percent={78} strokeWidth={8} target={80} color="#13C2C2" />
    //     </ChartCard>
    //   </Col> */}
  );
};
export default IntroduceRow;
