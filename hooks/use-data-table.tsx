import React from 'react';
import {
  ColumnFiltersState,
  ExpandedState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  // getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  TableOptions,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import {useSearchParams} from 'react-router-dom';

import {DataReturnObj} from '~/dtos';

type Data<TData> = Partial<
  Omit<TableOptions<TData>, 'data'> & {
    data: DataReturnObj<TData[]>;
  }
>;

export function useDataTable<TData>(options: Data<TData>) {
  const {data, columns, ...otherOptions} = options;
  const [searchParams, setSearchParams] = useSearchParams();
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [expanded, setExpanded] = React.useState<ExpandedState>({});

  const _columns = React.useMemo(() => columns, [columns]);
  const _data = React.useMemo(() => data?.data || [], [data?.data]);
  const manualPagination = otherOptions.manualPagination || true;
  const meta = React.useMemo(() => data || undefined, [data]);

  const pagination = React.useMemo(
    () => ({
      pageIndex: Number(searchParams.get('page') ?? 1) - 1,
      pageSize: Number(searchParams.get('size') ?? 10),
    }),
    [searchParams]
  );

  const defaultOptions = {
    enableRowSelection: true,
    manualExpanding: true,
    manualPagination: manualPagination,
    onRowSelectionChange: setRowSelection,
    onExpandedChange: setExpanded,
    onSortingChange: setSorting,
    // rowCount: meta?.itemCount,
    pageCount: meta ?? -1,
    onPaginationChange: manualPagination
      ? updater => {
          if (typeof updater === 'function') {
            const nextState = updater(pagination);
            setSearchParams(
              prev => {
                prev.set('size', String(nextState.pageSize));
                prev.set('page', String(nextState.pageIndex + 1));
                return prev;
              },
              {
                replace: true,
              }
            );
          }
        }
      : undefined,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  } as Partial<TableOptions<TData>>;

  let state = {
    expanded,
    sorting,
    pagination,
    columnVisibility,
    rowSelection,
    columnFilters,
  };
  if ('state' in options) {
    state = {
      ...state,
      ...state,
    };
  }

  const _options = {
    ...defaultOptions,
    state,
    data: _data,
    columns: _columns,
    ...otherOptions,
  };

  const table = useReactTable(_options as TableOptions<TData>);
  return {
    table,
    columns: _columns,
  };
}
