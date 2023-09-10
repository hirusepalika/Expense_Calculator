import React, {useEffect, useState} from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables); // need this to get rid of error -> "category" is not a registered scale
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
 
const BarChart = ({data, transformedData, buildDataset}) => {
    const [transformedDat, setTransformedDat] = useState(undefined);
    const [finalDatStruct, setFinalDatStruct] = useState({
        dataSet: [],
        labels: []    
    });
    useEffect(() => {
        if(data) {
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

    const renderTable = () => {
        const columnNames = transformedDat[0];
        const otherRows = transformedDat.slice(1, transformedDat.length + 1)
        return (
            <div style={{paddingLeft: '60px', paddingRight: '60px'}}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                        <TableRow key="column-names">
                            {
                                columnNames.map((eachVal, ind) => (ind == 0 ? <StyledTableCell>{eachVal}</StyledTableCell> : <StyledTableCell align="right">{eachVal}</StyledTableCell>))
                            }
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {otherRows.map((row, ind) => (
                            <StyledTableRow key={`row-${ind+1}-data`}>
                            { 
                                row.map((eachVal, ind) => ( ind == 0 ? <StyledTableCell>{eachVal}</StyledTableCell> : <StyledTableCell align="right">{eachVal}</StyledTableCell>))
                            }
                            </StyledTableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
          );
    };

    return (
        finalDatStruct?.labels?.length > 0 &&
        <>
            <div style={{backgroundColor: "white", marginLeft: "60px", marginRight: "60px", marginTop: "60px"}}>
                <Bar
                    pointStyle="star"
                    data={{
                        labels: finalDatStruct?.labels,
                        responsive: true,
                        offset: true,
                        datasets: finalDatStruct?.dataset
                    }}
                    height={400}
                    options={{
                        plugins: {
                            title: {
                            display: true,
                            text: 'Expense Chart 2023',
                            },
                        },
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
                />
            </div>
            <br />
            {renderTable()}
        </>
        
    )
    
};

export default BarChart