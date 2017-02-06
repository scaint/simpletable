'use strict';

(function () {
  class Table {
    constructor (element) {
      this.el = element
      this.tbody = this.el.tBodies[0]
    }

    appendRow (values) {
      let table = this
      let tr = document.createElement('TR')
      values.forEach(function (value) {
        let td = tr.insertCell()
        table.setValue(td, value)
      })
      this.tbody.appendChild(tr)
    }

    getCell (rowIndex, cellIndex) {
      return this.tbody.rows[rowIndex].cells[cellIndex]
    }

    setValue (cell, value) {
      if (value && value.nodeName) {
        cell.innerHTML = ''
        cell.appendChild(value)
      } else {
        cell.textContent = value
      }
    }
  }

  class RowFormatter {
    constructor () {
      this.formatters = {}
    }

    setFormatter (cellIndex, formatter) {
      this.formatters[cellIndex] = formatter
    }

    formatCell (cellIndex, value) {
      let formatter = this.formatters[cellIndex]
      return formatter ? formatter(value) : value
    }

    formatRow (values) {
      let rowFormatter = this
      return values.map(function (v, i) {
        return rowFormatter.formatCell(i, v)
      })
    }
  }

  class SimpleTable {
    constructor (element) {
      this.table = new Table(element)
      this.rowFormatters = new RowFormatter
    }

    setFormatter (cellIndex, formatter) {
      this.rowFormatters.setFormatter(cellIndex, formatter)
      return this
    }

    setCellValue (rowIndex, cellIndex, value) {
      let cell = this.table.getCell(rowIndex, cellIndex)
      this.table.setValue(cell, this.rowFormatters.formatCell(cellIndex))
      this.triggerEvent(cell, 'cell_changed')
    }

    appendRow (values) {
      this.table.appendRow(this.rowFormatters.formatRow(values))
    }

    triggerEvent (target, name) {
      let e = new Event('name')
      target.dispatchEvent(e)
    }
  }

  // Exports
  window.SimpleTable = SimpleTable
}());
