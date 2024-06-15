import { useEffect } from 'react';
import Highcharts from 'highcharts';


export interface ColumnData {
    name: string; 
    y: number;
}
export interface ColumnChartProps { 
    data: ColumnData[];
    yAxisName: string;
    xAxisName: string;
    title: string;
   
}

function ColumnChart(chartData: ColumnChartProps) {
    useEffect(() => {
        const chartOptions: Highcharts.Options = {
            chart: {
                type: 'column'
            },
            legend: {
                enabled: false
            },
            title: {
                text: chartData.title
            },
            xAxis: {
                categories: chartData.data.map((item: ColumnData) => item.name),
                title: {
                    text: chartData.xAxisName
                }
            },
            yAxis: {
                title: {
                    text: chartData.yAxisName
                }
            },
            series: [
                {
                    type: 'column',
                    data: chartData.data.map((item: ColumnData) => item.y),
                    
                }
            ]
        };

        Highcharts.chart('chart-container', chartOptions);
    }, [chartData.data]);

    return <div id="chart-container" />;
};

export default ColumnChart;
