import { Grid, Typography } from "@mui/material";

import Checkbox from "../../FormsUI/Checkbox";
import React from "react";
import SickIcon from "@mui/icons-material/Sick";
import Textfield from "../../FormsUI/Textfield";

function PatientDetail({ formik }) {
  return (
    <Grid container spacing={2} component={"div"} sx={{ py: 5 }}>
      <Grid item xs={12}>
        <Typography variant="h5" color="#05668D">
          <SickIcon sx={{ mr: 1 }} /> Patient Detail
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Textfield
          name="PID"
          label="Patient ID (e.g. A1234567)"
          onChange={(event) => {
            console.log("trimming")
            formik.setFieldValue("PID", event.target.value.trim());
          }}
        ></Textfield>
      </Grid>
      <Grid item xs={5}>
        <Textfield
          name="age"
          label="Age (e.g. 3d => 3days, 5m => 5months, 12 => 12years) "
        ></Textfield>
      </Grid>
      <Grid item xs={2} sx={{ ml: 4 }}>
        <Checkbox name="inPatient" legend="In patient?" label="Yes" />
      </Grid>
      <Grid item xs={4}>
        <Textfield name="height" label="Height(cm)"></Textfield>
      </Grid>
      <Grid item xs={4}>
        <Textfield name="weight" label="Weight(kg)"></Textfield>
      </Grid>
      <Grid item xs={4}>
        <Textfield name="circumference" label="Circumference(cm)"></Textfield>
      </Grid>
    </Grid>
  );
}

export default PatientDetail;
