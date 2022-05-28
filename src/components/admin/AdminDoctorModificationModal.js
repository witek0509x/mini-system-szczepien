import * as React from 'react';
import { Modal } from "@mui/material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import {useEffect, useState} from 'react';
import { Button } from "@mui/material";
import theme from "assets/theme";
import {modalStyle} from "../../styles/modal.css";
import "../../styles/global.css"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ApiConnection from "../../logic/api/ApiConnection";


export function AdminDoctorModifyModal(props) {

    const [open, setOpen] = useState(false);
    const [center, setCenter] = useState('');
    const [data, setData] = useState([]);

    const instance = ApiConnection("/admin/doctors/addDoctor");

    const handleClose = () => {
        console.log(props.centers)
        setOpen(false);
    }

    const style = modalStyle()

    const handleChange = (event) => {
        setCenter(event.target.value);
      };

    const addDoctor = (patient, center) =>
    {
        console.log([patient, center])
        instance.post(
            "/admin/doctors/modifyDoctor", {
                "patientId": patient,
                "vaccinationCenterId": center
            }).then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              })

    }

    return (
        <>
        <Button onClick={() => setOpen(true)}>Doktoryzuj</Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h2" component="h2">
                    Dodaj doktora {props.data.firstName} {props.data.lastName}
                </Typography>
                <Box sx={{ minWidth: 120, minHeight: 50 }}>
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                    <TextField id="filled-basic" label="Filled" variant="filled" />
                    <TextField id="standard-basic" label="Standard" variant="standard" />
                
                </Box>
                <Button onClick={() => addDoctor(props.data.patientId, center)}>
                        Doktoryzuj
                </Button>
            </Box>
        </Modal>
        </>
    )
}