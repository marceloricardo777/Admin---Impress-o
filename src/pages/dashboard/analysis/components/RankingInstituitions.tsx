
import numeral from 'numeral';
import React, { useEffect, useState } from 'react';
import { Col, Row, message, Card } from 'antd';
import { RankingInstituicoes } from '../service';
import styles from '../style.less';





const RankingInstitu: React.FC<{}> = () => {

  interface DateRanking {
    title: string;
    total: number;
  }

  const [rankingListData, setrankingListData] = useState<DateRanking[]>([]);
  const rankingListAproveds = () => {
    RankingInstituicoes().catch(() => {
    }).then((res) => {

      if (res.erro === true) {
        message.error('erro ao buscar ranking')
      }

      else {
        const rankingdata = []

        for (let i = 0; i < res.length; i += 1) {
          rankingdata.push({
            // eslint-disable-next-line radix
            title: `${res[i] === undefined ? i : res[i].instituicao} `,
            total: res[i] === undefined ? 0 : parseInt(res[i].count, 10),
          });

        }
        setrankingListData(rankingdata);
      }
    })
  }
  useEffect(() => {
    rankingListAproveds();
  }, []
  );
  return (
    <Row
      style={{
        marginTop: 24,
      }}>
      <Card

        bordered={false}
      >
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <div className={styles.salesRank}>
            <h4 className={styles.rankingTitle}>
              Ranking de Faculdades por Aluno

                  </h4>
            <ul className={styles.rankingList}>
              {rankingListData.map((item, i) => (
                <li key={item.title}>
                  <span className={`${styles.rankingItemNumber} ${i < 3 ? styles.active : ''} `}>
                    {i + 1}
                  </span>
                  <span className={styles.rankingItemTitle} title={item.title}>
                    {item.title}
                  </span>
                  <span className={styles.rankingItemValue}>
                    {numeral(item.total).format('0,0')}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Col></Card>
    </Row >
  );
}
export default RankingInstitu;
