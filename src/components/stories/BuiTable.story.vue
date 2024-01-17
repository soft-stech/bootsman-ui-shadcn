<script setup lang="ts">
import BuiButton from '@/components/ui/button/BuiButton.vue'
import {
  BuiTable,
  BuiTableBody,
  BuiTableCaption,
  BuiTableCell,
  BuiTableEmpty,
  BuiTableHead,
  BuiTableHeader,
  BuiTableRow,
  BuiTableFooter
} from '@/components/ui/table'
</script>

<template>
  <Story title="BuiTable" autoPropsDisabled :layout="{ type: 'grid', width: '95%' }">
    <Variant :key="`variant`" title="Table">
      <BuiTable>
        <BuiTableCaption><BuiButton variant="outline">Download YAML</BuiButton></BuiTableCaption>
        <BuiTableHeader>
          <BuiTableRow>
            <BuiTableHead class="w-[100px]"> Invoice </BuiTableHead>
            <BuiTableHead>Status</BuiTableHead>
            <BuiTableHead>Method</BuiTableHead>
            <BuiTableHead> Amount </BuiTableHead>
          </BuiTableRow>
        </BuiTableHeader>
        <BuiTableBody>
          <BuiTableRow>
            <BuiTableCell class="font-medium"> INV001 </BuiTableCell>
            <BuiTableCell>Paid</BuiTableCell>
            <BuiTableCell>Credit Card</BuiTableCell>
            <BuiTableCell> $250.00 </BuiTableCell>
          </BuiTableRow>
          <BuiTableRow>
            <BuiTableCell class="font-medium"> INV002 </BuiTableCell>
            <BuiTableCell>Paid</BuiTableCell>
            <BuiTableCell>Credit Card</BuiTableCell>
            <BuiTableCell> $50.00 </BuiTableCell>
          </BuiTableRow>
        </BuiTableBody>
        <BuiTableFooter>
          <BuiTableRow>
            <BuiTableCell :colspan="4">Footer </BuiTableCell>
          </BuiTableRow>
        </BuiTableFooter>
      </BuiTable>
    </Variant>

    <Variant :key="`empty`" title="Empty">
      <BuiTable>
        <BuiTableHeader>
          <BuiTableRow>
            <BuiTableHead class="w-[100px]"> Invoice </BuiTableHead>
            <BuiTableHead>Status</BuiTableHead>
            <BuiTableHead>Method</BuiTableHead>
            <BuiTableHead>Amount</BuiTableHead>
          </BuiTableRow>
        </BuiTableHeader>
        <BuiTableBody>
          <BuiTableEmpty :colspan="4">No data</BuiTableEmpty>
        </BuiTableBody>
      </BuiTable>
    </Variant>
  </Story>
</template>
