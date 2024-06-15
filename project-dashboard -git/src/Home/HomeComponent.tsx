import './HomeComponent.css'
import Filter from '../Filter/FilterComponent';
import PieChart, { PieChartProps, PieChartData } from '../PieChart/PieChartComponent';
import ColumnChart, { ColumnData } from '../ColumnChart/ColumnChartComponent';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Category, Product } from '../api.interfaces';
import { Button } from '@mui/material';
import { ColumnChartProps } from '../ColumnChart/ColumnChartComponent';

export const RunReportCtx = createContext({
    categoryNames: [] as string[],
    setCategoryNames: (...args: any) => { },
    productNames: [] as string[],
    setProductNames: (...args: any) => { },
    selectedCategory: '',
    selectedProducts: [] as Product[],
    setSelectedCategory: (...args: any) => { },
    setSelectedProducts: (...args: any) => { },
})

export default function Home() {
    const [categoryNames, setCategoryNames] = useState<string[]>([])
    const [productNames, setProductNames] = useState<string[]>([])
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
    const [chartData, setChartData] = useState<ColumnChartProps>({
        data: [{
            name: 'x-axis',
            y: 10
        }],
        yAxisName: 'Price',
        xAxisName: 'Categories',
        title: 'Products in selected Categories'

    })
    const [pieChartData, setPieChartData] = useState<PieChartProps>({
        data: [{ name: 'Default', y: 1 }],
        title: 'Categories'
    })

    const showBarChart = useRef(false);
    const shouldDisableRunReport = useRef(true)
    const runReport = () => {
        if (selectedProducts.length > 0) {
            const data: ColumnData[] = selectedProducts.map((product) => {
                return { name: product.title, y: product.price }
            })
            const chartData = {
                data, xAxisName: selectedCategory,
                yAxisName: 'Price',
                title: 'Products in selected Categories'
            }
            setChartData(chartData)
            showBarChart.current = true
        }
    }

    const loadPieChart = () => {
        if (categoryNames.length > 0) {
            const data: PieChartData[] = categoryNames.map(name => {
                return { name, y: 1 }
            })
            const pieChartData = {
                data,
                title: 'Categories'
            }
            setPieChartData(pieChartData)
        }
    }

    useEffect(() => {
        loadPieChart()
    }, [categoryNames])

    return (
        <div className="home">
            <RunReportCtx.Provider value={
                {
                    categoryNames,
                    setCategoryNames,
                    productNames,
                    setProductNames,
                    selectedCategory,
                    selectedProducts,
                    setSelectedCategory,
                    setSelectedProducts,
                }
            }>
                <div className='filterArea'>
                    <Filter />
                    <div className='runBtn'>
                        <Button variant="contained" disabled={!selectedCategory && shouldDisableRunReport.current} onClick={() => runReport()}>Run Report</Button>
                    </div>
                </div>
                <div className='chartArea'>
                    {!selectedCategory ? <PieChart {...pieChartData} /> : ''}
                    {selectedCategory ? <ColumnChart {...chartData} /> : ''}

                </div>
            </RunReportCtx.Provider>
        </div>
    );
}
