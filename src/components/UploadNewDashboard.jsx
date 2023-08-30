import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import FileUpload from 'react-material-file-upload';
import Alert from '@mui/material/Alert';
import * as XLSX from 'xlsx';
import { Bar } from 'react-chartjs-2';

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
    const [data, setData] = useState();
    // const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
   
    useEffect(() => {
        console.log("filessss ", files[0]);
        if (files?.length > 0) {
            const fileExtension = files[0]?.name?.substr(files[0]?.name?.lastIndexOf('.') + 1);
            console.log("fileExtension", fileExtension);
            if (!["csv", "xls", "xlsx"].includes(fileExtension)) {
                setData({})
                setError(true);
            } else {
                setData(readExcelFile());
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


        console.log("hellooo", jsonData)


       return jsonData
    }

    const transformData = async (dat) => {
        // const data = {
        //     labels: ["Organic", "Sponsored", "Organic", "Sponsored"],
        //     previousDate: {
        //       label: "08/10/2019 - 09/30/2019",
        //       dataSet: [10000, 150000, 10000, 150000]
        //     },
        //     currentDate: {
        //       label: "10/01/2019 - 11/20/2019",
        //       dataSet: [10000, 225000, 10000, 225000]
        //     }
        //   };
        const finalStructure = {
            labels: [], // months
            // TODO: there needs to be an array of other columns -> categories
        }
        const finalDat = await data;
        console.log("daataa in ", finalDat)
        for (let i = 0; i < finalDat?.length; i++) {
            console.log("BRO")
            for(let j = 0; j < finalDat[i]?.length; j++) {
                if (i > 0 && j === 0) {
                    finalStructure.labels.push(finalDat[i][j])
                }
            }
        }

        console.log("daataaaa", finalStructure)

        return finalStructure;

    };

    useEffect(() => {
        if(data) transformData(data);
    }, [data]);

    


    const renderBarChart = () => {
        const transformedData = transformData(data);
        return (
            <Bar
                pointStyle="star"
                data={{
                labels: transformedData.labels,
                responsive: true,
                offset: true,
                datasets: [
                    {
                    label: "Mobile",
                    pointStyle: "rectRounded",
                    backgroundColor: "#6ED3FF",
                    barThickness: 40,
                    categoryPercentage: 1,
                    data: data.previousDate.dataSet //From API
                    },
                    {
                    label: "Desktop",
                    backgroundColor: "#1497FF",
                    barThickness: 40,
                    categoryPercentage: 1,
                    pointStyle: "triangle",
                    data: data.currentDate.dataSet //From API
                    }
                ]
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
            />
        )
    }
    return (
        <div>
            {
                // files.length !== 0 && !error ? 
                // <Chart
                //     options={{
                //     data,
                //     primaryAxis,
                //     secondaryAxes,
                //     }}
                // /> :
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