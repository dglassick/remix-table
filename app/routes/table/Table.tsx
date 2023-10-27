import React, { useMemo, useState } from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Input,
  } from '@chakra-ui/react'
import _ from 'lodash';
import Pagination from './Pagination';
import { Column, Row } from '.';
import { filterRows, paginateRows, sortRows } from './tableHelpers';

type props = {
    rows: Row[];
    columns: Column[];
}

const TableComponent = ({rows, columns}: props) => {

    const [activePage, setActivePage] = useState(1)
    const [filters, setFilters] = useState({})
    const [sort, setSort] = useState({ order: 'asc', orderBy: 'id' })
    const rowsPerPage = 3

    const filteredRows = useMemo(() => filterRows(rows, filters), [rows, filters])
    const sortedRows = useMemo(() => sortRows(filteredRows, sort), [filteredRows, sort])
    const calculatedRows = paginateRows(sortedRows, activePage, rowsPerPage)    
        
    const count = filteredRows.length
    const totalPages = Math.ceil(count / rowsPerPage)

    const handleSearch = (value, accessor) => {
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
    
      const handleSort = (accessor) => {
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
                        return <Td key={column.accessor}>{column.format(row[column.accessor])}</Td>
                        }
                        return <Td key={column.accessor}>{row[column.accessor]}</Td>
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