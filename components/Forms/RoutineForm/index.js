import { Container, Grid, Paper, Typography } from "@mui/material";
import { Form, Formik } from "formik";

import BottomButton from "./bottomButton";
import ContrastDetail from "./contrastDetail";
import ExamDetail from "./examDetail";
import FORM_VALIDATION from "./ValidationSchema";
import INITIAL_FORM_STATE from "./InitialFormState";
import { LoadingSpinner } from "../LoadingSpinner";
import PatientDetail from "./patientDetail";
import React from "react";
import Remarks from "./remarks";
import StaffDetail from "./staffDetail";
import { getHomepageData } from "~/queries/queries";
import { useQuery } from "react-query";

function RoutineForm({ data, handleSubmit, records }) {
  const { data: autocompleteOptions, isSuccess, isLoading } = useQuery(
    "autocompleteOptions",
    async () => await getHomepageData()
  );
  const [sedation, setSedation] = React.useState(false);
  const [contrast, setContrast] = React.useState(false);
  const [numberOfProtocol, setNumberOfProtocol] = React.useState(1);

  React.useEffect(() => {
    if (data.volume) {
      setContrast(true);
    }
    if (data.ctdi.length > 1) {
      setNumberOfProtocol(data.ctdi.length);
    }
    if (data.pitch.length > 1) {
      setNumberOfProtocol(data.pitch.length);
    }
  }, [data.volume, data.ctdi.length, data.pitch.length]);
  const handleSwitch = (e) => {
    setContrast(e.target.checked);
  };
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isSuccess) {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Container
            maxWidth="lg"
            sx={{
              height: "90vh",
            }}
          >
            <Formik
              initialValues={data ? data : INITIAL_FORM_STATE}
              validationSchema={FORM_VALIDATION}
              onSubmit={handleSubmit}

            >
              {(formik) => (
                <Form>
                  <Grid container spacing={2} sx={{ height: "90vh", py: 3 }}>
                    <Grid item xs={12}>
                      <Paper
                        elevation={12}
                        sx={{
                          p: 3,
                          height: "85vh",
                          bgcolor: "#F0F3BD",
                          overflowY: "auto",

                        }}
                      >
                        <Grid item xs={12}>
                          <Typography
                            variant="h3"
                            align="center"
                            color="#093A3E"
                          >
                            Routine Case Log Form
                          </Typography>
                        </Grid>
                        <PatientDetail formik={formik}/>
                        <ExamDetail
                          data={data}
                          sedation={sedation}
                          autocompleteOptions={autocompleteOptions}
                          isSuccess={isSuccess}
                          numberOfProtocol={numberOfProtocol}
                          setNumberOfProtocol={setNumberOfProtocol}
                          formik={formik}
                          setSedation={setSedation}
                        />
                        <ContrastDetail
                          records={records}
                          formik={formik}
                          autocompleteOptions={autocompleteOptions}
                          data={data}
                          contrast={contrast}
                          handleSwitch={handleSwitch}
                        />
                        <StaffDetail
                          data={data}
                          autocompleteOptions={autocompleteOptions}
                          isSuccess={isSuccess}
                        />
                        <Remarks />
                        {/* Buttons */}
                        <BottomButton formik={formik} />
                      </Paper>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Container>
        </Grid>
      </Grid>
    );
  } else {
    return (
      <>
        <div>not loading or success</div>
      </>
    );
  }
}

export default RoutineForm;
