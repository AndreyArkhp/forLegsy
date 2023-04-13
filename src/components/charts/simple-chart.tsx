import React, { FC, useState } from 'react';
import { AgChartsReact } from 'ag-charts-react';
import { getGraphData } from '../../utils/functions';
import { IGraph } from '../../types';
import styles from './simple-chart.module.css';

const Chart: FC<{ data: IGraph[] }> = ({ data }) => {
  const [options] = useState<any>({
    autoSize: true,
    data: getGraphData(),
    series: [
      {
        type: 'column',
        xKey: 'date',
        yKey: 'amount',
        fill: '#0084e7',
        strokeWidth: 0,
        shadow: {
          xOffset: 3,
        },
      },
    ],
    axes: [
      {
        type: 'category',
        position: 'bottom',
      },
      {
        type: 'number',
        position: 'left',
      },
    ],
    legend: {
      enabled: false,
    },
  });

  return (
    <div className={styles.chartContainer}>
      <AgChartsReact options={options} />
    </div>
  );
};

export default Chart;
