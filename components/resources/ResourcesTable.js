import {
  Input,
  Link,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';

import { ROWS_PER_PAGE } from '@/config';
import { getAllResources } from '@/services/resources';

function ResourcesTable() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { data: resources, isLoading: isLoadingResources } = useQuery({
    queryKey: ['resources'],
    queryFn: getAllResources
  });

  const parserResources =
    resources
      ?.filter((resource) => resource.name.toLowerCase().includes(search.toLowerCase()))
      .slice(ROWS_PER_PAGE * (page - 1), ROWS_PER_PAGE * page) ?? [];

  return (
    <div className="col-span-12 md:col-span-9">
      <Table
        aria-label="topics"
        topContent={
          <div className="flex justify-between items-center gap-2 flex-wrap">
            <Input
              type="search"
              startContent={<IoSearchOutline className="w-4 h-4" />}
              placeholder="Buscar recurso por nombre"
              className="md:max-w-sm truncate"
              value={search}
              onValueChange={setSearch}
            />
          </div>
        }
        bottomContent={
          resources && (
            <Pagination
              total={Math.ceil(resources.length / ROWS_PER_PAGE)}
              page={page}
              onChange={setPage}
              showControls
              loop
              className="mx-auto"
            />
          )
        }
      >
        <TableHeader>
          <TableColumn>NOMBRE</TableColumn>
          <TableColumn>LINK</TableColumn>
          <TableColumn>RECURSO</TableColumn>
        </TableHeader>
        <TableBody
          items={parserResources}
          emptyContent="Sin recursos"
          isLoading={isLoadingResources}
          loadingContent={<Spinner label="Cargando..." className="mt-8" />}
        >
          {(resource) => (
            <TableRow key={resource.id}>
              <TableCell>{resource.name}</TableCell>
              <TableCell>
                <Link href={resource.link}>Link</Link>
              </TableCell>
              <TableCell>{resource.topic_name}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default ResourcesTable;
