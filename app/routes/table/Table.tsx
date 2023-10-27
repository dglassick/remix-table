import React, { useMemo, useState } from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Input,
  } from '@chakra-ui/react'
import Pagination from './Pagination';
import { filterRows, paginateRows, sortRows } from './tableHelpers';
import type { Column, Row } from '.';

type props = {
    rows: Row[];
    columns: Column[];
}

const TableComponent = ({rows, columns}: props) => {

    const [activePage, setActivePage] = useState(1)
    const [filters, setFilters] = useState<{[key: string]: string | number}>({})
    const [sort, setSort] = useState({ order: 'asc', orderBy: 'id' })
    const rowsPerPage = 3

    const filteredRows = useMemo(() => filterRows(rows, filters), [rows, filters])
    const sortedRows = useMemo(() => sortRows(filteredRows, sort), [filteredRows, sort])
    const calculatedRows = paginateRows(sortedRows, activePage, rowsPerPage)    
        
    const count = filteredRows.length
    const totalPages = Math.ceil(count / rowsPerPage)

    const handleSearch = (value: string | number, accessor: string) => {
        setActivePage(1)
    
        if (value) {
          setFilters((prevFilters) => ({
            ...prevFilters,
            [accessor]: value,
          }))
        } else {
          setFilters((prevFilters) => {
            const updatedFilters = { ...prevFilters }
            delete updatedFilters[accessor]
    
            return updatedFilters
          })
        }
      }
    
      const handleSort = (accessor: string) => {
        setActivePage(1)
        setSort((prevSort) => ({
          order: prevSort.order === 'asc' && prevSort.orderBy === accessor ? 'desc' : 'asc',
          orderBy: accessor,
        }))
      }
    
    
    return (
        <>
            <Table>
            <Thead>
                <Tr>
                {columns.map(column => {
                    const sortIcon = () => {
                        if (column.accessor === sort.orderBy) {
                        if (sort.order === 'asc') {
                            return '⬆️'
                        }
                        return '⬇️'
                        } else {
                        return '️↕️'
                        }
                    }

                    return (
                        <Th key={column.accessor}>
                        <span>{column.label}</span>
                        <button onClick={() => handleSort(column.accessor)}>{sortIcon()}</button>
                        </Th>
                    )
                    })}
                </Tr>
                <Tr>
                    {columns.map(column => {
                        return (
                            <Th key={column.accessor}>
                                <Input
                                    key={`${column.accessor}-search`}
                                    type="search"
                                    placeholder={`Search ${column.label}`}
                                    value={filters[column.accessor]}
                                    onChange={event => handleSearch(event.target.value, column.accessor)}
                                />
                            </Th>
                        )
                    })}
                </Tr>
            </Thead>
            <Tbody>
                {calculatedRows.map(row => {
                return (
                    <Tr key={row.id}>
                    {columns.map(column => {
                        if (column.format) {
                        return <Td key={column.accessor}>{column.format(row[column.accessor as keyof Row])}</Td>
                        }
                        return <Td key={column.accessor}>{row[column.accessor as keyof Row]}</Td>
                    })}
                    </Tr>
                )
                })}
            </Tbody>
            </Table>
            <Pagination
                activePage={activePage}
                count={count}
                rowsPerPage={rowsPerPage}
                totalPages={totalPages}
                setActivePage={setActivePage}
        />
      </>
      )
}

export default TableComponent;