import { ref } from 'vue'
import BuiTableHeader from '@/components/ui/table/BuiTableHeader.vue'

export function useResizeColumns() {
  const isResizing = ref<boolean>(false)
  const resizingCellId = ref<string>('')
  const neighborCellId = ref<string>('')
  const cells = ref<
    | {
        [key: string]: { cell: HTMLTableCellElement; initialWidth: number }
      }
    | undefined
  >(undefined)
  const minCellWidth = ref<number>(90)
  const calculatedColumnSizing = ref<Record<string, number> | undefined>(undefined)
  const tableHeaderElement = ref<InstanceType<typeof BuiTableHeader> | null>(null)

  const setProvidedCellWidths = (columnSizing: Record<string, number> | undefined) => {
    if (tableHeaderElement.value && tableHeaderElement.value.headRef) {
      const headerCells = [...tableHeaderElement.value.headRef.querySelectorAll('th')]

      //установить заданные как модель изначальные размеры
      headerCells.forEach((cell) => {
        const cellId = cell.id.split('_')[0]

        if (columnSizing && columnSizing[cellId]) {
          cell.style.width = columnSizing[cellId] + 'px'
        }
      })
    }
  }

  const getCells = () => {
    if (tableHeaderElement.value && tableHeaderElement.value.headRef) {
      const headerCells = [...tableHeaderElement.value.headRef.querySelectorAll('th')]
      const headerCellsWidths: {
        [key: string]: { cell: HTMLTableCellElement; initialWidth: number }
      } = headerCells.reduce((acc, cell) => {
        const cellId = cell.id.split('_')[0]
        return {
          ...acc,
          [cellId]: {
            cell: cell,
            initialWidth: cell.offsetWidth
          }
        }
      }, {})

      return headerCellsWidths
    }

    return undefined
  }

  const handleResizeControlMouseDown = (cellId: string, enableColumnResizing: boolean) => {
    if (!enableColumnResizing) return

    isResizing.value = true
    resizingCellId.value = cellId

    if (cells.value) {
      const resizingCell = cells.value[cellId].cell
      let neighborCell = resizingCell.nextElementSibling as HTMLTableCellElement

      if (!neighborCell) {
        neighborCell = resizingCell.previousElementSibling as HTMLTableCellElement
      }

      neighborCellId.value = neighborCell ? neighborCell.id.split('_')[0] : ''

      document.addEventListener('mousemove', handleCellResize)
    }
  }

  const handleResizeControlMouseUp = () => {
    if (!isResizing.value) return

    isResizing.value = false
    resizingCellId.value = ''
    neighborCellId.value = ''
    document.removeEventListener('mousemove', handleCellResize)

    if (cells.value) {
      const updatedColumnSizingValue: Record<string, number> = {}

      for (let cell in cells.value) {
        const currentCell = cells.value[cell]
        const newWidth = !currentCell.cell.hasAttribute('can-resize')
          ? currentCell.initialWidth
          : Math.floor(currentCell.cell.offsetWidth) <= minCellWidth.value
            ? minCellWidth.value
            : currentCell.cell.offsetWidth

        currentCell.cell.style.width = newWidth + 'px'
        updatedColumnSizingValue[cell] = newWidth
      }

      calculatedColumnSizing.value = updatedColumnSizingValue
    }
  }
  const getLastCellOnTheRightExtraSpace = (cell: HTMLTableCellElement) => {
    if (!cell.nextElementSibling) {
      const cellWrapperElement = cell.querySelector('.header-cell_wrapper') as
        | HTMLElement
        | undefined

      if (cellWrapperElement) {
        return parseInt(window.getComputedStyle(cellWrapperElement).paddingRight)
      }
    }

    return 0
  }

  const resizeCells = (
    cell: HTMLTableCellElement,
    neighborCell: HTMLTableCellElement,
    e: MouseEvent
  ) => {
    if (!cell || !neighborCell) {
      resizingCellId.value = ''
      neighborCellId.value = ''

      return
    }

    const direction: 'left' | 'right' = e.movementX < 0 ? 'left' : 'right'

    const newCellWidth = Math.floor(parseInt(cell.style.width)) + e.movementX
    const newNeighborCellWidth = Math.floor(parseInt(neighborCell.style.width)) - e.movementX

    if (direction === 'left') {
      if (newCellWidth <= minCellWidth.value || !cell.hasAttribute('can-resize')) {
        const nextCell = cell.previousElementSibling as HTMLTableCellElement

        resizeCells(nextCell, neighborCell, e)
      } else {
        cell.style.width = newCellWidth + 'px'
        neighborCell.style.width = newNeighborCellWidth + 'px'
      }
    } else {
      if (
        newNeighborCellWidth <=
          minCellWidth.value + getLastCellOnTheRightExtraSpace(neighborCell) ||
        !neighborCell.hasAttribute('can-resize')
      ) {
        const nextNeighborCell = neighborCell.nextElementSibling as HTMLTableCellElement

        resizeCells(cell, nextNeighborCell, e)
      } else {
        cell.style.width = newCellWidth + 'px'
        neighborCell.style.width = newNeighborCellWidth + 'px'
      }
    }
  }

  const handleCellResize = (e: MouseEvent) => {
    e.preventDefault()

    if (cells.value) {
      const resizingCell = cells.value[resizingCellId.value]?.cell
      const neighborCell = cells.value[neighborCellId.value]?.cell

      resizeCells(resizingCell, neighborCell, e)
    }
  }

  const resetCells = () => {
    if (cells.value) {
      for (let cell in cells.value) {
        cells.value[cell].cell.style.width = cells.value[cell].initialWidth + 'px'
      }
    }
  }

  const setInititalColumnWidths = () => {
    cells.value = getCells()

    if (cells.value) {
      for (let cell in cells.value) {
        if (!cells.value[cell].cell.style.width) {
          cells.value[cell].cell.style.width = cells.value[cell].initialWidth + 'px'
        }
      }
    }
  }

  return {
    tableHeaderElement,
    calculatedColumnSizing,
    isResizing,
    resizingCellId,
    neighborCellId,
    handleResizeControlMouseDown,
    handleResizeControlMouseUp,
    handleCellResize,
    resetCells,
    setInititalColumnWidths,
    setProvidedCellWidths
  }
}
