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
      baseWidth: number
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

        cell.style.width =
          columnSizing && columnSizing[cellId] && columnSizing[cellId] !== 0
            ? columnSizing[cellId] + 'px'
            : ''
      })
    }
  }

  const getCells = () => {
    if (
      tableHeaderElement.value &&
      tableHeaderElement.value.headRef &&
      tableElement.value &&
      tableElement.value?.tableRef
    ) {
      const headerCells = [...tableHeaderElement.value.headRef.querySelectorAll('th')]

      if (calculatedColumnSizing.value && calculatedColumnSizing.value['table'] === 0) {
        calculatedColumnSizing.value = {}
        tableElement.value.tableRef.style.width = ''
      }

      const tableInitialWidth = getTableWidth()

      tableElement.value.tableRef.style.width = 'min-content'

      const headerCellsWidths: CELL = headerCells.reduce((acc, cell, index, array) => {
        const cellId = getCellId(cell)

        return {
          ...acc,
          [cellId]: {
            cell: cell,
            initialWidth: Math.floor(cell.offsetWidth),
            baseWidth: Math.floor(cell.offsetWidth),
            minWidth:
              cellId === 'actions'
                ? ACTIONS_CELL_MIN_WIDTH
                : cell.offsetWidth < MIN_CELL_WIDTH
                  ? MIN_CELL_WIDTH
                  : cell.offsetWidth
          }
        }
      }, {})

      tableElement.value.tableRef.style.width = ''

      Object.values(headerCellsWidths).forEach((cellElement) => {
        cellElement.baseWidth = Math.floor(cellElement.cell.offsetWidth)
      })

      setProvidedCellWidths(calculatedColumnSizing.value)
      tableElement.value.tableRef.style.width =
        (calculatedColumnSizing.value?.['table'] || tableInitialWidth) + 'px'

      Object.values(headerCellsWidths).forEach((cellElement) => {
        cellElement.initialWidth = Math.floor(cellElement.cell.offsetWidth)
      })

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

      if (tableElement.value && tableElement.value?.tableRef) {
        updatedColumnSizingValue['table'] = tableElement.value.tableRef.offsetWidth
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
    if (cells.value && tableHeaderElement.value && tableHeaderElement.value.headRef) {
      const headerCells = [...tableHeaderElement.value.headRef.querySelectorAll('th')]

      return cells.value[getCellId(headerCells[headerCells.length - 1])]
    }

    return undefined
  })

  const secondToLastCell = computed(() => {
    if (cells.value && tableHeaderElement.value && tableHeaderElement.value.headRef) {
      const headerCells = [...tableHeaderElement.value.headRef.querySelectorAll('th')]

      return cells.value[getCellId(headerCells[headerCells.length - 2])]
    }

    return undefined
  })

  const getCellId = (cell: HTMLTableCellElement) => {
    return cell.id.split('_')[0]
  }

  const resizeCells = (cell: HTMLTableCellElement | null, e: MouseEvent) => {
    if (!cell || !tableElement.value?.tableRef || !lastCell.value) {
      resizingCellId.value = ''
      neighborCellId.value = ''

      return
    }

    const movementX = e.movementX
    const direction: 'left' | 'right' = movementX < 0 ? 'left' : 'right'
    const newCellWidth = Math.floor(parseInt(cell.style.width)) + movementX
    const newTableWidth =
      Math.floor(parseInt(tableElement.value?.tableRef?.style.width)) + movementX
    const newLastCellWidth = Math.floor(parseInt(lastCell.value.cell.style.width)) - movementX

    if (direction === 'left') {
      const min =
        cells.value && cells.value[getCellId(cell)]
          ? cells.value[getCellId(cell)].minWidth
          : MIN_CELL_WIDTH

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
    } else {
      const min =
        cells.value && cells.value[getCellId(lastCell.value.cell)]
          ? cells.value[getCellId(lastCell.value.cell)].minWidth +
            getLastCellOnTheRightExtraSpace(lastCell.value.cell)
          : MIN_CELL_WIDTH

      if (
        newLastCellWidth >= min &&
        tableElement.value.tableRef.offsetWidth <= minTableWidth.value
      ) {
        lastCell.value.cell.style.width = newLastCellWidth + 'px'
      } else {
        tableElement.value.tableRef.style.width = newTableWidth + 'px'
      }

      cell.style.width = newCellWidth + 'px'
    }
  }

  const handleCellResize = (e: MouseEvent) => {
    e.preventDefault()

    if (cells.value) {
      const resizingCell = cells.value[resizingCellId.value]?.cell

      resizeCells(resizingCell, e)
    }
  }

  const resetCells = () => {
    if (cells.value && tableElement.value && tableElement.value?.tableRef) {
      tableElement.value.tableRef.style.width = ''

      calculatedColumnSizing.value = {}
      setInitialColumnWidths()
    }
  }

  const resetCell = (cellId: string) => {
    if (
      cells.value &&
      calculatedColumnSizing.value &&
      lastCell.value &&
      tableElement.value &&
      tableElement.value?.tableRef
    ) {
      const thisCellBaseWidth = cells.value[cellId].baseWidth
      const thisCellCurrentWidth = calculatedColumnSizing.value[cellId]
      const diff = thisCellBaseWidth - thisCellCurrentWidth

      let newTableWidth = calculatedColumnSizing.value['table'] + diff
      let lastCellId = getCellId(lastCell.value.cell)

      if (newTableWidth < minTableWidth.value) {
        const tableWidthDiff = minTableWidth.value - newTableWidth
        let newLastCellWidth: number

        if (cellId === lastCellId) {
          //если ресетим последнюю колонку, то восстанавливаем ее ширину за счет соседней слева
          if (secondToLastCell.value) {
            lastCellId = getCellId(secondToLastCell.value.cell)
            newLastCellWidth = calculatedColumnSizing.value[lastCellId] + tableWidthDiff
            secondToLastCell.value.cell.style.width = newLastCellWidth + 'px'
          } else {
            resetCells()
            return
          }
        } else {
          newLastCellWidth =
            calculatedColumnSizing.value[getCellId(lastCell.value.cell)] + tableWidthDiff
          lastCell.value.cell.style.width = newLastCellWidth + 'px'
        }

        newTableWidth = minTableWidth.value
        calculatedColumnSizing.value[lastCellId] = newLastCellWidth
      }

      cells.value[cellId].cell.style.width = thisCellBaseWidth + 'px'
      tableElement.value.tableRef.style.width = newTableWidth + 'px'
      calculatedColumnSizing.value[cellId] = thisCellBaseWidth
      calculatedColumnSizing.value['table'] = newTableWidth
    }
  }

  const getTableWrapperWidth = () => {
    if (tableElement.value && tableElement.value.scrollAreaElementRef?.tableWrapperRef) {
      return tableElement.value.scrollAreaElementRef?.tableWrapperRef.$el.offsetWidth - 3
    }

    return 0
  }

  const getTableWidth = () => {
    if (tableElement.value && tableElement.value?.tableRef) {
      return tableElement.value.tableRef.offsetWidth
    }

    return 0
  }

  const setInitialColumnWidths = () => {
    cells.value = getCells()

    if (cells.value) {
      const updatedColumnSizingValue: Record<string, number> = {}

      for (const cell in cells.value) {
        if (!cells.value[cell].cell.style.width) {
          cells.value[cell].cell.style.width = cells.value[cell].initialWidth + 'px'
        }

        cells.value[cell].cell.style.minWidth = cells.value[cell].minWidth + 'px'

        updatedColumnSizingValue[cell] = cells.value[cell].cell.offsetWidth
      }

      if (tableElement.value && tableElement.value?.tableRef) {
        const tableOffsetWidth = getTableWidth()

        if (calculatedColumnSizing.value?.['table'] && !tableElement.value.tableRef.style.width) {
          tableElement.value.tableRef.style.width = calculatedColumnSizing.value['table'] + 'px'
        } else {
          initialTableWidth.value = tableOffsetWidth
          tableElement.value.tableRef.style.width = tableOffsetWidth + 'px'

          tableElement.value.tableRef.setAttribute('initialResize', 'set')
          updatedColumnSizingValue['table'] = tableOffsetWidth
        }
      }

      minTableWidth.value = getTableWrapperWidth()

      calculatedColumnSizing.value = updatedColumnSizingValue
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
    resetCell,
    resetCells,
    setInitialColumnWidths,
    setProvidedCellWidths,
    isMouseDownOnHandler,
    isMouseUpOnHandler
  }
}
