import React, {useEffect, useState} from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables); // need this to get rid of error -> "category" is not a registered scale
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
 
const BarChart = ({data, transformedData, buildDataset}) => {
    const [transformedDat, setTransformedDat] = useState(undefined);
    const [finalDatStruct, setFinalDatStruct] = useState({
        dataSet: [],
        labels: []    
    });
    useEffect(() => {
        if(data) {
            console.log("am i here", data);
            const transform = async()=> {
                const dat = await transformedData()
                setTransformedDat(dat);
                console.log
            }
            transform();
        }
    }, [data])

    useEffect(() => {
        if(transformedDat) {
            console.log("helo ", buildDataset(transformedDat?.slice(1,transformedDat.length)));
            setFinalDatStruct(
                {
                    labels: transformedDat[0]?.slice(1, transformedDat[0].length),
                    dataset: buildDataset(transformedDat?.slice(1,transformedDat.length)),
                }
            )
        }
    }, [transformedDat])

    if (!finalDatStruct) {
        return (
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <div style={{backgroundColor: "white"}}>
            {finalDatStruct?.labels?.length > 0 && 
            <Bar
                pointStyle="star"
                data={{
                    labels: finalDatStruct?.labels,
                    responsive: true,
                    offset: true,
                    datasets: finalDatStruct?.dataset
                }}
                height={220}
                options={{
                offsetGridLines: true,
                drawTicks: true,
                layout: {
                    padding: {
                    top: 30,
                    right: 40,
                    bottom: 40
                    }
                },
                legend: {
                    display: true,
                    position: "right",
                    align: "start",
                    labels: {
                        usePointStyle: true
                    }
                },
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    xAxes: [
                    {
                        stacked: true,
                        ticks: {
                            padding: 5
                        },
                        gridLines: {
                            display: false
                        }
                    }
                    ],
                    yAxes: [
                    {
                        stacked: false,
                        gridLines: {
                            drawBorder: false
                        },
                        ticks: {
                            beginAtZero: true,
                            maxTicksLimit: 6,
                            padding: 20,
                            callback(n) {
                                if (n < 1e3) return n;
                                if (n >= 1e3) return +(n / 1e3).toFixed(1) + "K";
                            }
                        }
                    }
                    ]
                }
                }} 
            />}
        </div>
    )
    
};

export default BarChart