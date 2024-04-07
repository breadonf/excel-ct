import { Avatar, Chip } from "@mui/material";

import PageviewIcon from "@mui/icons-material/Pageview";
import Tooltip from "@mui/material/Tooltip";
import Link from "next/link";
export const WorklistTableHeader = [
  {
    headerName: "",
    field: "actions",
    type: "actions",
    width: 120,
    getActions: (params) => [
      <Link key="1" href={`/exam/${params.id}`}>
        <a>
          <Tooltip title="View exam detail">
            <PageviewIcon />
          </Tooltip>
        </a>
      </Link>,
    ],
  },
  {
    headerName: "Accession Number",
    field: "AccessionNumber",
    width: 250,
    align: "center",
  },
  {
    headerName: "Exam Date",
    field: "ExamDate",
    align: "center",
    type: "date",
    width: 250,
    // valueGetter: ({ value }) => value && new Date(value),
    // valueFormatter: ({ value }) => {
    //   const valueFormatted =
    //     value.getFullYear().toString() +
    //     "-" +
    //     (value.getMonth() + 1).toString() +
    //     "-" +
    //     value.getDate().toString();
    //   return valueFormatted;
    // },
  },
  { headerName: "Patient ID", field: "PatientID", width: 100, align: "center" },

  {
    headerName: "Age",
    field: "PatientAge",
    type: "number",
    align: "center",
    width: 150,
    valueGetter: ({ value }) => value && new Number(value),
  },
  {
    headerName: "Study Description",
    field: "StudyDescription",
    flex: true,
    minWidth: 350,
    // renderCell: (protocol) => {
    //   return protocol.value ? (
    //     <div>
    //       {protocol.value.map((protocol) => (
    //         <div>
    //           <Chip
    //             key={`ctdi-${protocol}`}
    //             variant="outlined"
    //             color="primary"
    //             label={protocol.slice(2)}
    //           />
    //         </div>
    //       ))}
    //     </div>
    //   ) : (
    //     <></>
    //   );
    // },
  },
];
