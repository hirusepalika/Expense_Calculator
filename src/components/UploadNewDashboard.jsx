import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import FileUpload from 'react-material-file-upload';
import Alert from '@mui/material/Alert';

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
    // const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
   
    useEffect(() => {
        console.log("filessss ", files[0]);
        if (files?.length > 0) {
            const fileExtension = files[0]?.name?.substr(files[0]?.name?.lastIndexOf('.') + 1);
            console.log("fille ext", fileExtension);
            if (fileExtension != "csv") { //|| fileExtension != 'xlsx'
                setError(true);
            } else {
                setError(false);
            }
        }

    }, [files]);

    return (
        <div>
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
        </div>
    );
}

export default UploadNewDashboard;