import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import FileUpload from 'react-material-file-upload';
import Alert from '@mui/material/Alert';
import * as XLSX from 'xlsx';
import BarChart from './RenderBarChart';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const UploadNewDashboard = () => {
    const [open, setOpen] = React.useState(true);
    const [files, setFiles] = useState([]);
    const [error, setError] = useState(false);
    const [data, setData] = useState(undefined);
    // const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
   
    // useEffect( () => {
    //     console.log("filessss ", files[0]);
    //     if (files?.length > 0) {
    //         const fileExtension = files[0]?.name?.substr(files[0]?.name?.lastIndexOf('.') + 1);
    //         console.log("fileExtension", fileExtension);
    //         if (!["csv", "xls", "xlsx"].includes(fileExtension)) {
    //             setData({})
    //             setError(true);
    //         } else {
    //             setData(readExcelFile());
    //             setError(false);
    //         }
    //     }

    // }, [files]);

    useEffect(() => {
        if (files?.length > 0) {
            const fileExtension = files[0]?.name?.substr(files[0]?.name?.lastIndexOf('.') + 1);
            if (!["csv", "xls", "xlsx"].includes(fileExtension)) {
                setData([])
                setError(true);
            } else {
                const readData = async()=> {
                    const dat = await readExcelFile()
                    setData(dat);
                }
                readData()
                setError(false);
            }
        }

    }, [files]);

    const readExcelFile = async() => {
        console.log('reading input file:');
        const file =  files[0];
        const data =  await file.arrayBuffer();
        const workbook = XLSX.read(data);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
            header: 1,
            defval: "",
        });
        
        var ws = XLSX.utils.aoa_to_sheet(jsonData);

        console.log("hellooo", jsonData)

        console.log("ws", ws)

       return ws
    }

    const transformData = async (dat) => {
        const finalDat = await data;
        let categorySet = {};
        let finalArr = [];
        if (finalDat) {
            console.log("finlal daa", finalDat)
            Object.keys(finalDat)?.map(key => {
                if (key.split('')[0] !== '!') {
                    categorySet[key.split('')[0]] = [];
                } 
            });
    
            Object.keys(finalDat)?.map(key => {
                const category = key.split('')[0];
                if (category !== '!') {
                    categorySet[category].push(finalDat[key].v);
                }
            });
    
            Object.keys(categorySet)?.map(key => {
                finalArr.push(categorySet[key]);
    
            });
    
        }
        
        return finalArr;
    };

    const buildDataset = (dat) => {
        const arr = [];
        dat?.forEach(element => {
            arr.push(
                {
                    label: element[0],
                    pointStyle: "rectRounded",
                    backgroundColor: `#${Math.floor(Math.random()*16777215).toString(16)}`,
                    barThickness: 40,
                    categoryPercentage: 1,
                    data: element.slice(1, element.length) //From API
                }
            )
        });
        console.log("aarrrr", arr)
        return arr;
    } 


    // const renderBarChart = async () => {
    //     const transformedData = await transformData(data);
    //     console.log("tranasformdfsdf", transformedData)
    //     const labels = transformedData[0]?.slice(1, transformedData[0].length)
    //     const dataSet = buildDataset(transformedData?.slice(1,transformedData.length))
    //     return (
    //         <Bar
    //             pointStyle="star"
    //             data={{
    //                 labels: labels,
    //                 responsive: true,
    //                 offset: true,
    //                 datasets: dataSet
    //             }}
    //             height={220}
    //             options={{
    //             offsetGridLines: true,
    //             drawTicks: true,
    //             layout: {
    //                 padding: {
    //                 top: 30,
    //                 right: 40,
    //                 bottom: 40
    //                 }
    //             },
    //             legend: {
    //                 display: true,
    //                 position: "right",
    //                 align: "start",
    //                 labels: {
    //                     usePointStyle: true
    //                 }
    //             },
    //             responsive: true,
    //             maintainAspectRatio: false,
    //             scales: {
    //                 xAxes: [
    //                 {
    //                     stacked: true,
    //                     ticks: {
    //                         padding: 5
    //                     },
    //                     gridLines: {
    //                         display: false
    //                     }
    //                 }
    //                 ],
    //                 yAxes: [
    //                 {
    //                     stacked: false,
    //                     gridLines: {
    //                         drawBorder: false
    //                     },
    //                     ticks: {
    //                         beginAtZero: true,
    //                         maxTicksLimit: 6,
    //                         padding: 20,
    //                         callback(n) {
    //                             if (n < 1e3) return n;
    //                             if (n >= 1e3) return +(n / 1e3).toFixed(1) + "K";
    //                         }
    //                     }
    //                 }
    //                 ]
    //             }
    //             }}
    //         />
    //     )
    // }

    // const barChart = await renderBarChart;
    return (
        <div>
            {
                files.length !== 0 && !error && data? 
                    <BarChart
                        data={data}
                        transformedData={transformData}
                        buildDataset={buildDataset}
                    /> :
                (
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        
                        <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Upload Dashboard
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Please upload a file that is of type .csv
                        </Typography>
                        {
                            error ? 
                            <>
                                <Alert severity="error">This file type is not supported, please reupload</Alert>
                                <FileUpload value={files} onChange={setFiles} /> 
                            </>
                            :
                            <FileUpload value={files} onChange={setFiles} maxFiles={1} title='Upload file here' />
                        }
                        </Box>
                    </Modal>
                )
            }
        </div>
    );
}

export default UploadNewDashboard;