import { Container, Grid, Paper } from "@mui/material";
import { getHomepageCT, getHomepageCTNumber } from "~/queries/queries";

import Head from "next/head";
import { RecordTableHeaders } from "~/components/Table/RoutineRecordTableHeader";
import TableMaterial from "~/components/Table/TableMaterial";
import { useQuery } from "react-query";
import { useState } from "react";

export default function Table() {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  const { data: records, isSuccess, isLoading, isPreviousData } = useQuery(
    ["record", pageNumber, pageSize],
    async () => await getHomepageCT(pageNumber, pageSize),
    {
      keepPreviousData: true,
      refetchOnMount: "always", // for updating record on every mounting
    }
  );
  const { data: rowCount, isSuccess: isRowCountSuccess } = useQuery(
    "rowNumbers",
    async () => await getHomepageCTNumber(),
    {
      staleTime: 60 * 1000,
    }
  );
  return (
    <Grid sx={{ py: 3 }} container>
      <Head>
        <title>CT record</title>
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
                columnHeaders={RecordTableHeaders}
                paginationMode="server"
                getRowId={(row) => row.count}
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
