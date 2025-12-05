import { computed, ref } from 'vue'
import BuiTableHeader from '@/components/table/BuiTableHeader.vue'
import BuiTable from '@/components/table/BuiTable.vue'
import { useEventListener } from '@vueuse/core'

const MIN_CELL_WIDTH = 90
const LAST_CELL_EXTRA_SPACE = 56
const ACTIONS_CELL_MIN_WIDTH = 10

export function useResizeColumns() {
  type CELL = {
    [key: string]: {
      cell: HTMLTableCellElement
      initialWidth: number
      minWidth: number
      isLast: boolean
    }
  }
  const isResizing = ref<boolean>(false)
  const resizingCellId = ref<string>('')
  const neighborCellId = ref<string>('')
  const cells = ref<CELL | undefined>(undefined)
  const calculatedColumnSizing = ref<Record<string, number> | undefined>(undefined)
  const tableHeaderElement = ref<InstanceType<typeof BuiTableHeader> | null>(null)
  const tableElement = ref<InstanceType<typeof BuiTable> | null>(null)
  const initialTableWidth = ref<number>(0)
  const minTableWidth = ref<number>(0)
  const unregisterMouseMove = ref<(() => void) | undefined>(undefined)

  const setProvidedCellWidths = (columnSizing: Record<string, number> | undefined) => {
    if (tableHeaderElement.value && tableHeaderElement.value.headRef) {
      const headerCells = [...tableHeaderElement.value.headRef.querySelectorAll('th')]

      //установить заданные как модель изначальные размеры
      headerCells.forEach((cell) => {
        const cellId = getCellId(cell)

        cell.style.width = columnSizing && columnSizing[cellId] ? columnSizing[cellId] + 'px' : ''
      })
    }
  }

  const getCells = () => {
    if (tableHeaderElement.value && tableHeaderElement.value.headRef) {
      const headerCells = [...tableHeaderElement.value.headRef.querySelectorAll('th')]
      const headerCellsWidths: CELL = headerCells.reduce((acc, cell, index, array) => {
        const cellId = getCellId(cell)
        return {
          ...acc,
          [cellId]: {
            cell: cell,
            isLast: index === array.length - 1,
            initialWidth: cell.offsetWidth,
            minWidth:
              cellId === 'actions'
                ? ACTIONS_CELL_MIN_WIDTH
                : Math.min(cell.offsetWidth, MIN_CELL_WIDTH)
          }
        }
      }, {})

      return headerCellsWidths
    }

    return undefined
  }

  const isMouseDownOnHandler = ref<boolean>(false)
  const isMouseUpOnHandler = ref<boolean>(false)

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

      unregisterMouseMove.value = useEventListener(document, 'mousemove', handleCellResize)
    }
  }

  const handleResizeControlMouseUp = (e: Event) => {
    const targetHTMLElement = e.target as HTMLElement
    isMouseUpOnHandler.value =
      targetHTMLElement.className.includes && targetHTMLElement.className.includes('resize-handler')

    if (!isResizing.value) return

    isResizing.value = false
    resizingCellId.value = ''
    neighborCellId.value = ''

    if (unregisterMouseMove.value) {
      unregisterMouseMove.value()
    }

    if (cells.value) {
      const updatedColumnSizingValue: Record<string, number> = {}

      for (const cell in cells.value) {
        const currentCell = cells.value[cell]
        const newWidth = !currentCell.cell.hasAttribute('can-resize')
          ? currentCell.initialWidth
          : Math.floor(currentCell.cell.offsetWidth) <= currentCell.minWidth
            ? currentCell.minWidth
            : currentCell.cell.offsetWidth

        currentCell.cell.style.width = newWidth + 'px'
        updatedColumnSizingValue[cell] = newWidth
      }

      calculatedColumnSizing.value = updatedColumnSizingValue
    }
  }

  const getLastCellOnTheRightExtraSpace = (cell: HTMLTableCellElement) => {
    if (getCellId(cell) === 'actions') {
      return LAST_CELL_EXTRA_SPACE
    }

    return 0
  }

  const lastCell = computed(() => {
    if (cells.value) {
      return Object.values(cells.value).find((cell) => cell.isLast)
    }

    return undefined
  })

  const getCellId = (cell: HTMLTableCellElement) => {
    return cell.id.split('_')[0]
  }

  const resizeCells = (
    cell: HTMLTableCellElement | null,
    neighborCell: HTMLTableCellElement | null,
    e: MouseEvent
  ) => {
    if (!cell || !tableElement.value?.tableRef || !lastCell.value) {
      resizingCellId.value = ''
      neighborCellId.value = ''

      return
    }

    const movementX = e.movementX
    const direction: 'left' | 'right' = movementX < 0 ? 'left' : 'right'
    const newCellWidth = Math.floor(parseInt(cell.style.width)) + movementX
    //const newNeighborCellWidth = Math.floor(parseInt(neighborCell.style.width)) - movementX
    const newTableWidth =
      Math.floor(parseInt(tableElement.value?.tableRef?.style.width)) + movementX
    const newLastCellWidth = Math.floor(parseInt(lastCell.value.cell.style.width)) - movementX

    if (direction === 'left') {
      const min =
        cells.value && cells.value[getCellId(cell)]
          ? cells.value[getCellId(cell)].minWidth
          : MIN_CELL_WIDTH

      // if (newCellWidth <= min || !cell.hasAttribute('can-resize')) {
      //   const nextCell = cell.previousElementSibling as HTMLTableCellElement | null

      //   resizeCells(nextCell, neighborCell, e)
      // } else {
      if (newCellWidth >= min) {
        cell.style.width = newCellWidth + 'px'

        if (newTableWidth >= minTableWidth.value) {
          tableElement.value.tableRef.style.width = newTableWidth + 'px'
        } else {
          tableElement.value.tableRef.style.width = minTableWidth.value + 'px'
          lastCell.value.cell.style.width = newLastCellWidth + 'px'
        }
      } else {
        return
      }
      //   neighborCell.style.width = newNeighborCellWidth + 'px'
      // }
    } else {
      const min =
        cells.value && cells.value[getCellId(lastCell.value.cell)]
          ? cells.value[getCellId(lastCell.value.cell)].minWidth +
            getLastCellOnTheRightExtraSpace(lastCell.value.cell)
          : MIN_CELL_WIDTH

      // if (newNeighborCellWidth <= min || !neighborCell.hasAttribute('can-resize')) {
      //   const nextNeighborCell = neighborCell.nextElementSibling as HTMLTableCellElement | null

      //   resizeCells(cell, nextNeighborCell, e)
      // } else {
      if (
        newLastCellWidth >= min &&
        tableElement.value.tableRef.offsetWidth <= minTableWidth.value
      ) {
        lastCell.value.cell.style.width = newLastCellWidth + 'px'
      } else {
        tableElement.value.tableRef.style.width = newTableWidth + 'px'
      }

      cell.style.width = newCellWidth + 'px'
      //neighborCell.style.width = newNeighborCellWidth + 'px'
      //}
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
    if (tableElement.value && tableElement.value?.tableRef) {
      tableElement.value.tableRef.style.width = minTableWidth.value + 'px'
    }

    if (cells.value) {
      // const updatedColumnSizingValue: Record<string, number> = {}

      // for (const cell in cells.value) {
      //   const initialWidth: number | undefined = initialColumnSizing.value?.[cell] //cells.value[cell].initialWidth

      //   if (initialWidth) {
      //     updatedColumnSizingValue[cell] = initialWidth
      //   } else {
      //     delete updatedColumnSizingValue[cell]
      //   }
      // }

      calculatedColumnSizing.value = {}
      setProvidedCellWidths(calculatedColumnSizing.value)
      setInitialColumnWidths()
    }
  }

  const setInitialColumnWidths = () => {
    cells.value = getCells()

    if (cells.value) {
      const updatedColumnSizingValue: Record<string, number> = {}

      for (const cell in cells.value) {
        if (!cells.value[cell].cell.style.width) {
          cells.value[cell].cell.style.width = cells.value[cell].initialWidth + 'px'
        }

        updatedColumnSizingValue[cell] = cells.value[cell].cell.offsetWidth
      }

      calculatedColumnSizing.value = updatedColumnSizingValue
    }

    if (tableElement.value && tableElement.value?.tableRef) {
      initialTableWidth.value = tableElement.value.tableRef.offsetWidth
      tableElement.value.tableRef.style.width = tableElement.value.tableRef.offsetWidth + 'px'
    }

    if (tableElement.value && tableElement.value.scrollAreaElementRef?.tableWrapperRef) {
      minTableWidth.value =
        tableElement.value.scrollAreaElementRef?.tableWrapperRef.$el.offsetWidth - 3
    }
  }

  return {
    cells,
    tableElement,
    tableHeaderElement,
    calculatedColumnSizing,
    isResizing,
    resizingCellId,
    handleResizeControlMouseDown,
    handleResizeControlMouseUp,
    resetCells,
    setInitialColumnWidths,
    setProvidedCellWidths,
    isMouseDownOnHandler,
    isMouseUpOnHandler
  }
}
