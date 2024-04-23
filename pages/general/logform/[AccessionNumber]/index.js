import { useMutation, useQuery } from "react-query";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-hot-toast";
import useSessionStorage from "~/hooks/useSessionStorage";
import RoutineForm from "@/Forms/RoutineForm";
import INITIAL_FORM_STATE from "@/Forms/RoutineForm/InitialFormState";
import initializer from "~/helpers/initializer";
import preprocessor from "~/helpers/preprocessor";
import setData from "~/helpers/setData";
import { createCTrecord } from "~/queries/mutations";
import { getHomepageCTUnlimited } from "~/queries/queries";

function RoutineCases() {
  const router = useRouter();
  const { AccessionNumber } = router.query;
  const fakeApiCallToOrthanc =(AccessionNumber) =>{
    console.log(AccessionNumber)
    var data =  {
      PID: "", //PatientID
      inPatient: false,
      age: "", // PatientAge
      weight: "", //PatientWeight
      height: "",//PatientSize 1.67m need convert
      circumference: "",
      Date: new Date(), //AcquisitionDate
      urgent: false,
      sedation: false,
      sedatedBy: "",
      sedationMethod: [],
      protocol: [], //ProtocolName
      kV_a: [],//KVP[0]
      kV_b: [], //KVP[1]
      pitch: [], //SpiralPitchFactor

      injectionSite: "",
      handInjection: false,
      mixedContrast: false,
      contrastType: "",
      rate: "",
      volume: "",
      directPostContrast: null,
      ttp: "",
      radiographers: [],
      radiologists: [],
      nurses: [],
      keywords: "",
      remark: "",
      delays: Array(1).fill(null),
      examType: [],
      ctdi: [],
      IR: false,

      ROI: "",
    };
    return data
  }
  const {
    data: fetchedData,
    isLoading: isQueryLoading,
    isSuccess: isQuerySuccess,
    isError,
  } = useQuery(
    ["OrthancFind", AccessionNumber],
     () => fakeApiCallToOrthanc(AccessionNumber),
    {
      retry: true,
      refetchOnMount: "always",
      cacheTime: 1,
    }
  );



  const mutation = useMutation(
    async (newFormData) => {
      await setData(createCTrecord, { data: newFormData });
    },
    {
      mutationKey: "createCTitem",
      onSuccess: (data, variables) => {
        console.log("onSuccess", data, variables);
      },
    }
  );
  const [sessionData, setSessionData] = useSessionStorage("sessionData", null);

  const handleSubmit = async (values) => {
    const sessionDataFromSubmission = initializer(values);
    setSessionData(sessionDataFromSubmission);
    const modifiedValues = preprocessor(values);
    await new Promise((r) => setTimeout(r, 500));
    mutation.mutate(
      { ...modifiedValues },
      {
        onSuccess: async (_res) => {
          toast.success(
            `Your CT records for ${modifiedValues.PID} at ${modifiedValues.Date} is created`,
            {
              style: {
                border: "1px solid #713200",
                padding: "40px",
                color: "#713200",
                fontSize: "2rem",
                minWidth: "80%",
              },
              duration: 6000,
            }
          );
          router.push("/general/table");
        },
        onError: async (err, varia) => {
          toast.error(`Input failed. Error: ${varia}`, {
            style: {
              border: "1px solid #713200",
              padding: "40px",
              color: "#713200",
              fontSize: "1.5rem",
              minWidth: "20%",
            },
          });
        },
      }
    );
    if (mutation.isError) {
      console.log(
        "Fail,🚀 ~ file: index.js ~ line 74 ~ RoutineForm ~ mutation",
        mutation.error
      );
    }
    if (mutation.onSettled) {
      return (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      );
    }
  };

  return (
    <>
      <Head>
        <title>CT record</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <RoutineForm
        data={sessionData || INITIAL_FORM_STATE}
        handleSubmit={handleSubmit}
        records={records}
      />
    </>
  );
}

export default RoutineCases;
