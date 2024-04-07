import { Container, Grid, Paper } from "@mui/material";
import { getHomepageCT, getHomepageCTNumber } from "~/queries/queries";

import Head from "next/head";
import TableMaterial from "~/components/Table/TableMaterial";
import { useQuery } from "react-query";
import { useState } from "react";
import { generateFakeHKID, generateFakeWesternerName } from "~/helpers/isHKID";
import { WorklistTableHeader } from "~/components/Table/WorklistTableHeader";
export default function Table() {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const fakeData = Array.from({ length: 10 }, (_, i) => {
    return {
     PatientID: generateFakeHKID(),
      PatientName: generateFakeWesternerName(),
      PatientAge: Math.floor(Math.random() * 18),
      AccessionNumber: `HCH000${Math.floor(Math.random() * 100000)}-1`,
      StudyDescription: "CT Abd"
    };
  });
  const { data: rowCountData } = useQuery("rowCount", getHomepageCTNumber);
  const isRowCountSuccess = !!rowCountData;
  const {
    data: records,
    isSuccess,
    isLoading,
    isPreviousData,
  } = useQuery(
    ["record", pageNumber, pageSize],
    async () => fakeData,
    {
      keepPreviousData: true,
      refetchOnMount: "always",
    }
  );
  const rowCount = 10;
  return (
    <Grid sx={{ py: 3 }} container>
      <Head>
        <title>CT worklist</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Grid item xs={12}>
        <Container sx={{ maxWidth: "80%" }} maxWidth={false}>
          <Paper
            elevation={12}
            sx={{ p: 3, bgcolor: "#F0F3BD", height: "85vh" }}
          >
            {isSuccess && isRowCountSuccess && (
              <TableMaterial
                setPageNumber={setPageNumber}
                records={records}
                isSuccess={isSuccess}
                rowCount={rowCount}
                isLoading={isLoading}
                pageNumber={pageNumber}
                isPreviousData={isPreviousData}
                columnHeaders={WorklistTableHeader}
                paginationMode="server"
                getRowId={(row) => row.AccessionNumber}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              />
            )}
          </Paper>
        </Container>
      </Grid>
    </Grid>
  );
}
