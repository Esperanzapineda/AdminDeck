"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table"
import { useState } from "react";

interface PropsDataTable<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

const TableProducts =<TData, TValue> ({
    columns,
    data
}: PropsDataTable<TData, TValue>) => {
    const [storing, setStoring] = useState<SortingState>([]);
    const [columnFilteers, setColumnFilters] = useState<ColumnFiltersState>([])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setStoring,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting: storing,
            columnFilters: columnFilteers,
        },
    })
  return (
    <div>
        <div>
            <Input
                placeholder="Filtrar por nombre"
                value= {(table.getColumn('name')?.getFilterValue() as string) ?? ''}
                onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
            />
        </div>
        <div>
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) =>(
                            <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ): (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No se encontraron resultados.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
        <div>
            <Button variant='outline' onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                    Anterior
            </Button>
            <Button variant='outline' onClick={() => table.nextPage()} disabled={!table.getCanNextPage}>
                Siguiente
            </Button>
        </div>
    </div>
  )
}

export default TableProducts