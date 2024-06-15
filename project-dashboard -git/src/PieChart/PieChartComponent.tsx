import { useRef, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact, { HighchartsReactRefObject } from 'highcharts-react-official';

export interface PieChartData {
  name: string; 
  y: number; 
}
export interface PieChartProps { 
  data: PieChartData[]
  title: string 
};

function PieChart(chartData: PieChartProps) {
  const chartRef = useRef<HighchartsReactRefObject>(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.chart.update({
        series: [{
          type: 'pie',
          name: 'Products',
          data: chartData.data
        }]
      });
    }
  }, [chartData.data]);

  const options: Highcharts.Options = {
    chart: {
      type: 'pie'
    },
    title: {
      text: chartData.title
    },
    series: [{
      type: 'pie',
      name: chartData.title,
      data: chartData.data
    }]
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      ref={chartRef}
    />
  );
};

export default PieChart;