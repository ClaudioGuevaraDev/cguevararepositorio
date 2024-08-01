import {
  Input,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  User
} from '@nextui-org/react';
import { useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';

import { ROWS_PER_PAGE } from '@/config';

const topics = [];

function TopicsTable() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const parserTopics =
    topics
      ?.filter((topic) => topic.name.toLowerCase().includes(search.toLowerCase()))
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
              placeholder="Buscar tópico por nombre"
              className="md:max-w-sm truncate"
              value={search}
              onValueChange={setSearch}
            />
          </div>
        }
        bottomContent={
          topics && (
            <Pagination
              total={Math.ceil(topics.length / ROWS_PER_PAGE)}
              page={page}
              onChange={setPage}
              showControls
              loop
              className="mx-auto"
            />
          )
        }>
        <TableHeader>
          <TableColumn>NOMBRE</TableColumn>
          <TableColumn>RECURSOS</TableColumn>
          <TableColumn>COLOR</TableColumn>
        </TableHeader>
        <TableBody
          items={parserTopics}
          emptyContent="Sin tópicos"
          //   isLoading={isLoadingTopics}
          loadingContent={<Spinner label="Cargando..." className="mt-8" />}>
          {(topic) => (
            <TableRow key={topic.id}>
              <TableCell>
                <User
                  name={topic.name}
                  avatarProps={{
                    src: topic.image
                  }}
                />
              </TableCell>
              <TableCell>{topic.resources.length}</TableCell>
              <TableCell>{topic.color}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default TopicsTable;
