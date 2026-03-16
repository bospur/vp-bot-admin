import { useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  type ColumnDef,
} from '@tanstack/react-table';
import type { CategoryRow } from '../../domain/types';

interface UseCategoriesTableLogicProps {
  data: CategoryRow[];
  onEdit: (category: CategoryRow) => void;
  onDelete: (category: CategoryRow) => void;
}

export function useCategoriesTableLogic({ data, onEdit, onDelete }: UseCategoriesTableLogicProps) {
  const columns = useMemo<ColumnDef<CategoryRow>[]>(
    () => [
      { accessorKey: 'sort_order', header: '№', size: 60 },
      { accessorKey: 'icon', header: 'Иконка', size: 80 },
      { accessorKey: 'name', header: 'Название' },
      { accessorKey: 'slug', header: 'Slug' },
      { accessorKey: 'animalName', header: 'Животное' },
      { id: 'actions', header: '', size: 100, meta: { onEdit, onDelete } },
    ],
    [onEdit, onDelete],
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: { sorting: [{ id: 'sort_order', desc: false }] },
  });

  return { table };
}
