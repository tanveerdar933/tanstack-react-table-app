import { Person } from "../types/tableTypes"
import { createColumnHelper } from '@tanstack/react-table';
import { VscEye } from "react-icons/vsc";

const columnHelper = createColumnHelper<Person>()

const btnStyle = {
  background: "none",
  border: "none",
  fontSize: "18px",
  padding: "0"
}

export const columns = [
  columnHelper.accessor(row => row.name, {
    id: "name",
    cell: info => info.getValue(),
    header: () => <span>NAME</span>,
    footer: info => info.column.id,
    meta: "string"
  }),
  columnHelper.accessor(row => row.job, {
    id: 'job',
    cell: info => <i>{info.getValue()}</i>,
    header: () => <span>JOB</span>,
    footer: info => info.column.id,
    meta: "string"
  }),
  columnHelper.accessor(row => row.salary, {
    id: "salary",
    cell: info => info.renderValue(),
    header: () => <span>SALARY</span>,
    footer: info => info.column.id,
    meta: "number"
  }),
  columnHelper.accessor(row => row.phone, {
    id: "phone",
    cell: info => info.renderValue(),
    header: () => <span>PHONE</span>,
    footer: info => info.column.id,
    meta: "number"
  }),
  columnHelper.accessor(row => row.status, {
    id: "status",
    cell: info => info.renderValue(),
    header: () => <span>STATUS</span>,
    footer: info => info.column.id,
    meta: "string"
  }),
  columnHelper.display({
    id: 'actions',
    header: () => <span>ACTION</span>,
    cell: props => <button style={btnStyle} onClick={() => console.log({ ...props.row.original })}><VscEye /></button>
  })
]