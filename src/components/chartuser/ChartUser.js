import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../authprovider/AuthContext";
import axios from "axios";
import ReactApexChart from "react-apexcharts";

const ChartUser = ({ userId }) => {
    const { authToken } = useContext(AuthContext);
    console.log("authToken no home", authToken)
    axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
    console.log("userId no home", userId)

    const [lineOptions, setLineOptions] = useState({
        chart: {
            type: 'line',
        },
        title: {
            text: 'Desempenho por Tecnologia',
            align: 'center'
        },
        xaxis: {
            categories: [] // Will be updated with test dates
        }
    });


    const [lineSeries, setLineSeries] = useState([]);

    // State for the bar chart
    const [barOptions, setBarOptions] = useState({
        chart: {
            type: 'bar',
            height: 350
        },
        title: {
            text: 'Tendencia de perfil',
            align: 'center'
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: true,
                barHeight: '40%', // Adjusts the height of the bars
                distributed: true // Adjusts the width of the bars
            }
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: [] // Will be updated with technology names
        }
    });

    const [barSeries, setBarSeries] = useState([{
        data: [] // Will be updated with average scores
    }]);

    useEffect(() => {
        axios.get(`http://localhost:8888/api/v1/chart-data/${userId}`)
            .then(response => {
                const chartData = response.data.chartData;

                // Define the front-end and back-end technologies
                const frontEndTechs = ['JavaScript', 'angular', 'js', 'react', 'vue'];
                const backEndTechs = ['Java', 'springboot', 'node', 'c##', 'php'];

                // Group data by technology name
                const groupedData = chartData.reduce((groups, item) => {
                    const group = (groups[item.technologyName] || []);
                    group.push(item);
                    groups[item.technologyName] = group;
                    return groups;
                }, {});

                // Create a series for each group for the line chart
                const newLineSeries = Object.entries(groupedData).map(([technologyName, group]) => ({
                    name: technologyName,
                    data: group.map(item => item.score)
                }));

                setLineOptions(prevOptions => ({
                    ...prevOptions,
                    xaxis: {
                        ...prevOptions.xaxis,
                        // Format date to Brazilian format (day/month/year)
                        categories: chartData.map(item => new Date(item.testDate).toLocaleDateString('pt-BR'))
                    }
                }));
                setLineSeries(newLineSeries);

                // Calculate average score for each group and categorize as front-end or back-end for the bar chart
                const averages = Object.entries(groupedData).map(([technologyName, group]) => {
                    const averageScore = group.reduce((total, item) => total + item.score, 0) / group.length;
                    const category = frontEndTechs.includes(technologyName) ? 'Front-end' : backEndTechs.includes(technologyName) ? 'Back-end' : 'Other';
                    return { category, averageScore };
                });

                // Group averages by category
                const categoryAverages = averages.reduce((groups, item) => {
                    const group = (groups[item.category] || []);
                    group.push(item.averageScore);
                    groups[item.category] = group;
                    return groups;
                }, {});

                // Calculate total score for each category
                const categoryTotals = Object.entries(categoryAverages).map(([category, scores]) => ({
                    category,
                    totalScore: scores.reduce((total, score) => total + score, 0)
                }));

                setBarOptions(prevOptions => ({
                    ...prevOptions,
                    xaxis: {
                        ...prevOptions.xaxis,
                        categories: categoryTotals.map(item => item.category)
                    }
                }));
                setBarSeries([{
                    data: categoryTotals.map(item => item.totalScore)
                }]);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, [userId]);
    return (
        <div className="App">
            <ReactApexChart options={lineOptions} series={lineSeries} type="line" height={350}/>
            <ReactApexChart options={barOptions} series={barSeries} type="bar" height={350}/>
        </div>
    );
}

export default ChartUser;