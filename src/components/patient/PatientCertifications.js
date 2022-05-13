import React, {useEffect, useState} from 'react';
import '../../styles/patient/patient.css';
import Patient from '../../models/Patient'
import '../../models/User';
import MDBox from "../MDBox";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import Header from "../../layouts/profile/components/Header";
import Divider from "@mui/material/Divider";
import ProfileInfoCard from "../../examples/Cards/InfoCards/ProfileInfoCard";
import Footer from "../../examples/Footer";
import DataTable from "../../examples/Tables/DataTable";
import Button from "@mui/material/Button";
import {Typography} from "@mui/material";
import useLogin from "../../logic/useLogin";
import ApiConnection from "../../logic/api/ApiConnection";

export default function PatientDashboard() {

    const {GetId} = useLogin();
    const [loading, setLoading] = useState(true);
    const [tableData, setTableData] = useState([]);

    const instance = ApiConnection("/patient/certificates/");

    useEffect(() => {
        instance.get(
            "/patient/certificates/" + GetId()
        ).then(r => {
            setTableData(r.data)
        })
            .finally(() => {
                setLoading(false)
            });
    }, [])

    const [patient, setPatient] = useState({
        firstName: "Andrew",
        lastName: "Bagpipe",

    })

    const tableColumns = [
        {Header: "Szczepionka", accessor: "Vaccine", width: "25%"},
        {Header: "Od", accessor: "from", width: "25%"},
        {Header: "Do", accessor: "to", width: "25%"},
        {Header: "", accessor: "download", width: "25%"},
    ]

    return (
        <DashboardLayout>
            <DashboardNavbar/>
            <MDBox mb={10}/>
            <Header name={patient.firstName + " " + patient.lastName} position={"Pacjent"}>
                <MDBox mt={5} mb={3}>
                    <DataTable table={{columns: tableColumns, rows: tableData}}/>
                </MDBox>
            </Header>
            <Footer/>
        </DashboardLayout>
    )
}