/* eslint-disable eqeqeq */

import type { Row } from "."

export function isEmpty(obj = {}) {
    return Object.keys(obj).length === 0
  }
  
  export function isString(value: any) {
    return typeof value === 'string' || value instanceof String
  }
  
  export function isNumber(value: any) {
    return typeof value == 'number' && !isNaN(value)
  }
  
  export function isBoolean(value: any) {
    return value === true || value === false
  }
  
  export function isNil(value: any) {
    return typeof value === 'undefined' || value === null
  }
  
  export function isDateString(value: any) {
    if (!isString(value)) return false
  
    return value.match(/^\d{2}-\d{2}-\d{4}$/)
  }
  
  export function convertDateString(value: any) {
    return value.substr(6, 4) + value.substr(3, 2) + value.substr(0, 2)
  }
  
  export function toLower(value: any) {
    if (isString(value)) {
      return value.toLowerCase()
    }
    return value
  }
  
  export function convertType(value: any) {
    if (isNumber(value)) {
      return value.toString()
    }
  
    if (isDateString(value)) {
      return convertDateString(value)
    }
  
    if (isBoolean(value)) {
      return value ? '1' : '-1'
    }
  
    return value
  }
  
  export function filterRows(rows: Row[], filters: {[key: string]: string | number}) {
    if (isEmpty(filters)) return rows
  
    return rows.filter((row) => {
      return Object.keys(filters).every((accessor) => {
        const value = row[accessor as keyof Row]
        const searchValue = filters[accessor]
  
        if (isString(value)) {
          return toLower(value).includes(toLower(searchValue))
        }
  
        if (isBoolean(value)) {
          return (searchValue === 'true' && value) || (searchValue === 'false' && !value)
        }
  
        if (isNumber(value)) {
          return value == searchValue
        }
  
        return false
      })
    })
  }
  
  export function sortRows(rows: Row[], sort: {
    order: string;
    orderBy: string;
}) {
    return rows.sort((a, b) => {
      const { order, orderBy } = sort
  
      if (isNil(a[orderBy as keyof Row])) return 1
      if (isNil(b[orderBy as keyof Row])) return -1
  
      const aLocale = convertType(a[orderBy as keyof Row])
      const bLocale = convertType(b[orderBy as keyof Row])
  
      if (order === 'asc') {
        return aLocale.localeCompare(bLocale, 'en', { numeric: isNumber(b[orderBy as keyof Row]) })
      } else {
        return bLocale.localeCompare(aLocale, 'en', { numeric: isNumber(a[orderBy as keyof Row]) })
      }
    })
  }
  
  export function paginateRows(sortedRows: Row[], activePage: number, rowsPerPage: number) {
    return [...sortedRows].slice((activePage - 1) * rowsPerPage, activePage * rowsPerPage)
  }
  