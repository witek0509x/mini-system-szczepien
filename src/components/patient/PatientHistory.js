import React, {useEffect, useState} from 'react';
import '../../styles/patient/patient.css';
import Patient from '../../models/Patient'
import '../../models/User';
import MDBox from "../MDBox";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import Header from "../../layouts/profile/components/Header";
import Footer from "../../examples/Footer";
import DataTable from "../../examples/Tables/DataTable";
import useLogin from "../../logic/useLogin";
import ApiConnection from "../../logic/api/ApiConnection";
import { PatientIncomingVisitModal } from './PatientVisitModal';
import Loader from "react-loader";
import { Typography } from '@mui/material';

export default function PatientDashboard() {

    const {isLoggedIn, GetId, LogOut} = useLogin();
    const [loading, setLoading] = useState(true);
    const [tableData, setTableData] = useState([]);
    const [patientData, setPatientData] = useState([]);
    const [visitsExist, setExist] = useState(true);

    useEffect(async () => {
        const instance = ApiConnection("/patient/appointments/formerAppointments/");
        const instance2 = ApiConnection("/patient/info/");
        let id = GetId()
        if(isLoggedIn("/doctor"))
        {
            const instanceDoctor = ApiConnection("/doctor/info")
            const d = await instanceDoctor.get("doctor/info/" + GetId())
            id = d.data.patientAccountId;
        }
        const p = await instance2.get("/patient/info/" + id).catch((error) => {
            if(error.response.status === 401)
                LogOut()
          })
        const patient = new Patient(p.data)
        setPatientData(patient)
        const r = await instance.get(
            "/patient/appointments/formerAppointments/" + id
        ).catch((error) =>{
            if(error.response.status === 404)
                setExist(false)
        })
        if ( typeof r !== 'undefined')
        {
            for(let i = 0; i < r.data.length; i++)
            {
                r.data[i].detailsButton = <PatientIncomingVisitModal data={r.data[i]}/>
            }
            setTableData(r.data)
        }
        setLoading(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const tableColumns = [
        {Header: "Nazwa szczepionki", accessor: "vaccineName", width: "20%"},
        {Header: "Wirus", accessor: "vaccineVirus", width: "20%"},
        {Header: "Data", accessor: "windowBegin", width: "20%"},
        {Header: "Szczeg????y", accessor: "detailsButton", width: "20%"},
    ]

    return (
        <DashboardLayout>
            <DashboardNavbar/>
            <MDBox mb={10}/>
            <Header name={patientData.getFirstName + " " + patientData.getLastName} position={"Pacjent"}>            
            {
                visitsExist?
                loading?
                <Grid>
                    <Loader /> 
                </Grid> 
                :
                    <MDBox mt={5} mb={3}>
                        <DataTable table={{columns: tableColumns, rows: tableData}}/>
                    </MDBox>
                :
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignContent="center"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: 30 }}>
                    <Typography>
                        Nie mia??e?? ??adnych wizyt
                    </Typography>
                </Grid>
            }
            </Header>
            <Footer/>
        </DashboardLayout>
    )
}



