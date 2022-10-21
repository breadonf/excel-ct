import { Container, Grid, Paper } from "@mui/material";

import Head from "next/head";
import { RecordTableHeaders } from "/components/Table/RoutineRecordTableHeaderNew";
import { RowActionsItems } from "../../components/Table/RowActionsItems";
import TableMaterialReact from "/components/Table/MaterialTableReact";
import { getHomepageCTUnlimited } from "../../queries/queries";
import { useQuery } from "react-query";
import { useState } from "react";

export default function Table() {
  const [sorting, setSorting] = useState([]);

  const { data: records, isSuccess, isLoading } = useQuery(
    ["record"],
    async () => await getHomepageCTUnlimited(),
    {
      keepPreviousData: true,
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
            {isSuccess && (
              <TableMaterialReact
                columnHeaders={RecordTableHeaders}
                records={records}
                enableBottomToolbar={false}
                enablePagination={false}
                enableRowVirtualization
                enableColumnFilterModes
                enableRowActions
                enableClickToCopy
                muiTableBodyCellProps={{
                  sx: {
                    fontSize: "1rem",
                  },
                }}
                muiTableContainerProps={{
                  sx: {
                    maxHeight: "75vh",
                  },
                }}
                onSortingChange={setSorting}
                initialState={{
                  density: "spacious",
                  showColumnFilters: true,
                }}
                displayColumnDefOptions={{
                  "mrt-row-actions": {
                    size: 350, //set custom width
                    muiTableHeadCellProps: {
                      align: "center", //change head cell props
                    },
                    muiTableBodyCellProps: {
                      align: "center", //change head cell props
                    },
                  },
                }}
                virtualizerProps={{ overscan: 40 }}
                state={{ sorting }}
                renderRowActions={({ row }) => <RowActionsItems row={row} />}
              />
            )}
          </Paper>
        </Container>
      </Grid>
    </Grid>
  );
}
