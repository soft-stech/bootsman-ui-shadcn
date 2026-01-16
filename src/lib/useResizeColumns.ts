import { computed, ref } from 'vue'
import BuiTableHeader from '@/components/table/BuiTableHeader.vue'
import BuiTable from '@/components/table/BuiTable.vue'
import { useEventListener } from '@vueuse/core'

const MIN_CELL_WIDTH = 90
const LAST_CELL_EXTRA_SPACE = 56
const ACTIONS_CELL_MIN_WIDTH = 10
const TABLE_ID = 'table'

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
  const cells = ref<CELL | undefined>(undefined)
  const calculatedColumnSizing = ref<Record<string, number> | undefined>(undefined)
  const tableHeaderElement = ref<InstanceType<typeof BuiTableHeader> | null>(null)
  const tableElement = ref<InstanceType<typeof BuiTable> | null>(null)
  const initialTableWidth = ref<number>(0)
  const minTableWidth = ref<number>(0)
  const unregisterMouseMove = ref<(() => void) | undefined>(undefined)
  const isMouseDownOnHandler = ref<boolean>(false)
  const isMouseUpOnHandler = ref<boolean>(false)

  const setProvidedCellWidths = (columnSizing: Record<string, number> | undefined) => {
    if (!tableHeaderElement.value?.headRef || !columnSizing) return

    const headerCells = [...tableHeaderElement.value.headRef.querySelectorAll('th')]

    //установить заданные как модель изначальные размеры
    headerCells.forEach((cell) => {
      const cellId = getCellId(cell)
      const width = columnSizing[cellId]

      cell.style.width = width && width !== 0 ? columnSizing[cellId] + 'px' : ''
    })
  }

  const getCells = () => {
    const tableRef = tableElement.value?.tableRef
    const headRef = tableHeaderElement.value?.headRef

    if (!headRef || !tableRef) return undefined

    const headerCells = [...headRef.querySelectorAll('th')]

    if (calculatedColumnSizing.value?.[TABLE_ID] === 0) {
      calculatedColumnSizing.value = {}
      tableRef.style.width = ''
    }

    const tableInitialWidth = getTableWidth()

    tableRef.style.width = 'min-content'

    const headerCellsWidths: CELL = headerCells.reduce((acc, cell) => {
      cell.style.width = ''

      const cellId = getCellId(cell)
      const offsetWidth = Math.floor(cell.offsetWidth)
      const minWidth =
        cellId === 'actions'
          ? ACTIONS_CELL_MIN_WIDTH
          : cell.offsetWidth < MIN_CELL_WIDTH
            ? MIN_CELL_WIDTH
            : cell.offsetWidth

      return {
        ...acc,
        [cellId]: {
          cell: cell,
          initialWidth: offsetWidth,
          baseWidth: offsetWidth,
          minWidth: minWidth
        }
      }
    }, {})

    tableRef.style.width = ''

    Object.values(headerCellsWidths).forEach((cellElement) => {
      cellElement.baseWidth = Math.floor(cellElement.cell.offsetWidth)
    })

    setProvidedCellWidths(calculatedColumnSizing.value)
    tableRef.style.width = (calculatedColumnSizing.value?.[TABLE_ID] || tableInitialWidth) + 'px'

    Object.values(headerCellsWidths).forEach((cellElement) => {
      cellElement.initialWidth = Math.floor(cellElement.cell.offsetWidth)
    })

    return headerCellsWidths
  }

  const handleResizeControlMouseDown = (cellId: string, enableColumnResizing: boolean) => {
    if (!enableColumnResizing) return

    isResizing.value = true
    resizingCellId.value = cellId
    unregisterMouseMove.value = useEventListener(document, 'mousemove', handleCellResize)
  }

  const handleResizeControlMouseUp = (e: Event) => {
    const targetHTMLElement = e.target as HTMLElement
    isMouseUpOnHandler.value = targetHTMLElement.className?.includes?.('resize-handler') || false

    if (!isResizing.value) return

    cleanupResizeState()
    updateColumnSizingAfterResize()
  }

  const cleanupResizeState = () => {
    isResizing.value = false
    resizingCellId.value = ''

    if (unregisterMouseMove.value) {
      unregisterMouseMove.value()
      unregisterMouseMove.value = undefined
    }
  }

  const updateColumnSizingAfterResize = () => {
    if (!cells.value || !tableElement.value?.tableRef) return

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

    updatedColumnSizingValue[TABLE_ID] = tableElement.value.tableRef.offsetWidth
    calculatedColumnSizing.value = updatedColumnSizingValue
  }

  const getLastCellOnTheRightExtraSpace = (cellId: string) => {
    return cellId === 'actions' ? LAST_CELL_EXTRA_SPACE : 0
  }

  const lastCell = computed(() => {
    if (!cells.value || !tableHeaderElement.value?.headRef) return undefined

    const headerCells = [...tableHeaderElement.value.headRef.querySelectorAll('th')]
    if (headerCells.length === 0) return undefined

    const lastCellElement = headerCells[headerCells.length - 1]
    return cells.value[getCellId(lastCellElement)]
  })

  const secondToLastCell = computed(() => {
    if (!cells.value || !tableHeaderElement.value?.headRef) return undefined

    const headerCells = [...tableHeaderElement.value.headRef.querySelectorAll('th')]
    if (headerCells.length < 2) return undefined

    const secondToLastCellElement = headerCells[headerCells.length - 2]
    return cells.value[getCellId(secondToLastCellElement)]
  })

  const getCellId = (cell: HTMLTableCellElement) => {
    return cell.id.split('_')[0]
  }

  const resizeCells = (cell: HTMLTableCellElement | null, e: MouseEvent) => {
    if (!cell || !tableElement.value?.tableRef || !lastCell.value) {
      resizingCellId.value = ''

      return
    }

    const movementX = e.movementX
    const direction: 'left' | 'right' = movementX < 0 ? 'left' : 'right'
    const newCellWidth = Math.floor(parseInt(cell.style.width)) + movementX

    const newTableWidth = Math.floor(parseInt(tableElement.value.tableRef.style.width)) + movementX
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
      const lastCellId = getCellId(lastCell.value.cell)
      const min =
        cells.value && cells.value[lastCellId]
          ? cells.value[lastCellId].minWidth + getLastCellOnTheRightExtraSpace(lastCellId)
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

    if (!cells.value) return

    const resizingCell = cells.value[resizingCellId.value]?.cell
    resizeCells(resizingCell, e)
  }

  const resetCells = () => {
    if (!cells.value || !tableElement.value?.tableRef) return

    tableElement.value.tableRef.style.width = ''
    calculatedColumnSizing.value = {}
    setInitialColumnWidths()
  }

  const resetCell = (cellId: string) => {
    if (
      !cells.value ||
      !calculatedColumnSizing.value ||
      !lastCell.value ||
      !tableElement.value?.tableRef
    )
      return

    const updatedColumnSizingValue: Record<string, number> = { ...calculatedColumnSizing.value }

    const cellData = cells.value[cellId]
    const thisCellBaseWidth = cellData.baseWidth
    const thisCellCurrentWidth = calculatedColumnSizing.value[cellId]
    const diff = thisCellBaseWidth - thisCellCurrentWidth

    let newTableWidth = calculatedColumnSizing.value[TABLE_ID] + diff
    let lastCellId = getCellId(lastCell.value.cell)

    if (newTableWidth < minTableWidth.value) {
      const tableWidthDiff = minTableWidth.value - newTableWidth
      let newLastCellWidth: number

      if (cellId === lastCellId) {
        //если ресетим последнюю колонку, то восстанавливаем ее ширину за счет соседней слева
        if (!secondToLastCell.value) {
          resetCells()
          return
        }

        lastCellId = getCellId(secondToLastCell.value.cell)
        newLastCellWidth = calculatedColumnSizing.value[lastCellId] + tableWidthDiff
        secondToLastCell.value.cell.style.width = newLastCellWidth + 'px'
      } else {
        newLastCellWidth =
          calculatedColumnSizing.value[getCellId(lastCell.value.cell)] + tableWidthDiff
        lastCell.value.cell.style.width = newLastCellWidth + 'px'
      }

      newTableWidth = minTableWidth.value
      updatedColumnSizingValue[lastCellId] = newLastCellWidth
    }

    cells.value[cellId].cell.style.width = thisCellBaseWidth + 'px'
    tableElement.value.tableRef.style.width = newTableWidth + 'px'
    updatedColumnSizingValue[cellId] = thisCellBaseWidth
    updatedColumnSizingValue[TABLE_ID] = newTableWidth

    calculatedColumnSizing.value = updatedColumnSizingValue
  }

  const getTableWrapperWidth = () => {
    return tableElement.value?.scrollAreaElementRef?.tableWrapperRef?.$el.offsetWidth - 3 || 0
  }

  const getTableWidth = () => {
    return tableElement.value?.tableRef?.offsetWidth || 0
  }

  const setInitialColumnWidths = () => {
    cells.value = getCells()

    if (!cells.value) return

    const updatedColumnSizingValue: Record<string, number> = {}

    for (const cell in cells.value) {
      if (!cells.value[cell].cell.style.width) {
        cells.value[cell].cell.style.width = cells.value[cell].initialWidth + 'px'
      }

      cells.value[cell].cell.style.minWidth = cells.value[cell].minWidth + 'px'
      updatedColumnSizingValue[cell] = cells.value[cell].cell.offsetWidth
    }

    if (tableElement.value?.tableRef) {
      const tableOffsetWidth = getTableWidth()
      const tableWrapperWidth = getTableWrapperWidth()
      minTableWidth.value = tableWrapperWidth
      tableElement.value.tableRef.setAttribute('initialResize', 'set')

      if (calculatedColumnSizing.value?.[TABLE_ID] && !tableElement.value.tableRef.style.width) {
        tableElement.value.tableRef.style.width = calculatedColumnSizing.value[TABLE_ID] + 'px'
      } else {
        if (tableOffsetWidth < minTableWidth.value) {
          setTableFullScreen()
        } else {
          initialTableWidth.value = tableOffsetWidth
          tableElement.value.tableRef.style.width = tableOffsetWidth + 'px'
          updatedColumnSizingValue[TABLE_ID] = tableOffsetWidth
        }
      }
    }

    calculatedColumnSizing.value = updatedColumnSizingValue
  }

  const setColumnWidthsOnColumnVisibilityChange = () => {
    if (!tableHeaderElement.value?.headRef || !cells.value) return

    const headerCells = [...tableHeaderElement.value.headRef.querySelectorAll('th')]
    const updatedColumnSizingValue: Record<string, number> = {}

    headerCells.forEach((cell, index, array) => {
      const cellId = getCellId(cell)

      if (cells.value) {
        if (cells.value[cellId]) {
          cells.value[cellId].cell = cell
        } else {
          const minWidth =
            cellId === 'actions'
              ? ACTIONS_CELL_MIN_WIDTH
              : cell.offsetWidth < MIN_CELL_WIDTH
                ? MIN_CELL_WIDTH
                : cell.offsetWidth

          cells.value[cellId] = {
            cell: cell,
            baseWidth: cell.offsetWidth,
            minWidth: minWidth,
            initialWidth: cell.offsetWidth
          }
        }
      }

      if (index < array.length - 1) {
        const storedWidth = calculatedColumnSizing.value?.[cellId]

        if (storedWidth) {
          cell.style.width = storedWidth + 'px'
          updatedColumnSizingValue[cellId] = storedWidth
        } else {
          cell.style.width = ''

          const baseWidth = cells.value?.[cellId]?.baseWidth || cell.offsetWidth
          const minWidth = cells.value?.[cellId]?.minWidth || MIN_CELL_WIDTH
          cell.style.width = baseWidth + 'px'
          cell.style.minWidth = minWidth + 'px'
          updatedColumnSizingValue[cellId] = baseWidth
        }
      } else {
        const newLastCellWidth = cells.value?.[cellId]?.baseWidth || cell.offsetWidth
        updatedColumnSizingValue[cellId] = newLastCellWidth
      }
    })

    const wouldBeTableWidth = Object.values(updatedColumnSizingValue).reduce(
      (acc, value) => (acc += value),
      0
    )

    if (tableElement.value?.tableRef) {
      minTableWidth.value = getTableWrapperWidth()
      const newTableWidth = Math.max(wouldBeTableWidth, minTableWidth.value)
      tableElement.value.tableRef.style.width = newTableWidth + 'px'
      updatedColumnSizingValue[TABLE_ID] = newTableWidth
    }

    if (lastCell.value) {
      lastCell.value.cell.style.width = ''
      const newLastCellWidth = Math.floor(lastCell.value.cell.offsetWidth)
      updatedColumnSizingValue[getCellId(lastCell.value.cell)] = newLastCellWidth
      lastCell.value.cell.style.width = newLastCellWidth + 'px'
    }

    calculatedColumnSizing.value = updatedColumnSizingValue
  }

  const setColumnWidthsOnWindowResize = () => {
    const tableWidth = getTableWidth()
    minTableWidth.value = getTableWrapperWidth()

    if (tableWidth < minTableWidth.value) {
      setTableFullScreen()
    }
  }

  const setTableFullScreen = () => {
    if (!lastCell.value || !calculatedColumnSizing.value || !tableElement.value?.tableRef) return

    const lastCellId = getCellId(lastCell.value.cell)

    calculatedColumnSizing.value[TABLE_ID] = minTableWidth.value
    tableElement.value.tableRef.style.width = minTableWidth.value + 'px'
    lastCell.value.cell.style.width = ''

    const newLastCellWidth = Math.floor(lastCell.value.cell.offsetWidth)
    calculatedColumnSizing.value[lastCellId] = newLastCellWidth
    lastCell.value.cell.style.width = newLastCellWidth + 'px'
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
    setColumnWidthsOnColumnVisibilityChange,
    setColumnWidthsOnWindowResize,
    isMouseDownOnHandler,
    isMouseUpOnHandler
  }
}
