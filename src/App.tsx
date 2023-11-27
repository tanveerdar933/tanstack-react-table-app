import { useEffect, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  PaginationState,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState
} from '@tanstack/react-table'
import { makeData } from "./data/tableData";
import { columns } from "./components/tableColumns";
import { Table, Container, Card, Button, Row, Col, Form, FormControl } from "react-bootstrap";
import {
  BsSortAlphaDown,
  BsSortAlphaDownAlt,
  BsSortNumericDown,
  BsSortNumericDownAlt,
  BsRewindFill,
  BsFillFastForwardFill,
  BsFillCaretLeftFill,
  BsFillCaretRightFill
} from "react-icons/bs";
import { BiSortAlt2 } from "react-icons/bi";

function App() {
  const [data, _setData] = useState(() => makeData(10000));
  const [page, setPage] = useState(0);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel()
  })
  useEffect(() => {
    table.setPageIndex(page)
  }, [page])
  return (
    <Container fluid className="p-5">
      <Row className="mb-2 justify-content-end">
        <Col xs={3}>
          <FormControl
            type="text"
            value={globalFilter ?? ''}
            onChange={e => setGlobalFilter(String(e.target.value))}
            placeholder="Search you query.." />
        </Col>
      </Row>
      <Card className="table-card">
        <Table striped hover responsive>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="table-head">
                    {header.isPlaceholder
                      ? null
                      :
                      <div
                        className={header.column.getCanSort() ? 'cursor-pointer sortable' : ''}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: header.column.columnDef.meta === "string" ? <BsSortAlphaDown /> : <BsSortNumericDown />,
                          desc: header.column.columnDef.meta === "string" ? <BsSortAlphaDownAlt /> : <BsSortNumericDownAlt />,
                        }[header.column.getIsSorted() as string] ?? (header.column.getCanSort() ? <BiSortAlt2 /> : null)}
                      </div>
                    }
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
        <Card.Footer className="container-fluid table-footer">
          <Row>
            <Col xs={4}>
              <Button
                className="me-1 table-btn"
                onClick={() => setPage(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <BsRewindFill />
              </Button>
              <Button
                className="me-1 table-btn"
                onClick={() => setPage(table.getState().pagination.pageIndex - 1)}
                disabled={!table.getCanPreviousPage()}
              >
                <BsFillCaretLeftFill />
              </Button>
              <Button
                className="ms-1 table-btn"
                onClick={() => setPage(table.getState().pagination.pageIndex + 1)}
                disabled={!table.getCanNextPage()}
              >
                <BsFillCaretRightFill />
              </Button>
              <Button
                className="ms-1 table-btn"
                onClick={() => setPage(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <BsFillFastForwardFill />
              </Button>
            </Col>
            <Col xs={3}>
              <Form.Select
                aria-label="select-page-length"
                value={table.getState().pagination.pageSize}
                onChange={e => table.setPageSize(Number(e.target.value))}
              >
                {[10, 20, 30, 40].map(pageSize => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize} records/page
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col xs={3} className="text-end">
              <label className="col-form-label">Page:</label>
            </Col>
            <Col xs={2}>
              <div className="input-group">
                <input
                  className="form-control"
                  type="number"
                  value={page + 1}
                  // defaultValue={table.getState().pagination.pageIndex + 1}
                  onChange={e => setPage(e.target.value ? Number(e.target.value) - 1 : 0)}
                  min={1}
                  max={table.getPageCount()}
                />
                <span className="input-group-text" id="basic-addon2">/{table.getPageCount()}</span>
              </div>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </Container >
  )
}

export default App;
