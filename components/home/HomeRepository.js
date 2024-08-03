import { Avatar, Link, Pagination, Select, SelectItem } from '@nextui-org/react';
import clsx from 'clsx';
import { useState } from 'react';

import { RESOURCES_PER_PAGE } from '@/config';

function HomeRepository({ resources, topics }) {
  const [topic, setTopic] = useState(new Set([]));
  const [page, setPage] = useState(1);

  const parserResources =
    resources
      ?.filter((resource) =>
        Array.from(topic).length === 0 || topic == null
          ? resource
          : resource.topic === Array.from(topic)[0]
      )
      .slice(RESOURCES_PER_PAGE * (page - 1), RESOURCES_PER_PAGE * page) ?? [];

  return (
    <div className="mt-14 pb-6">
      <div className="mb-4 flex flex-wrap">
        <Select
          label="Tópico"
          items={topics ?? []}
          className="md:max-w-56"
          selectedKeys={topic}
          onSelectionChange={setTopic}
        >
          {(topic) => (
            <SelectItem
              startContent={<Avatar alt={topic.name} src={topic.image} className="w-6 h-6" />}
              key={topic.id}
              value={topic.id}
            >
              {topic.name}
            </SelectItem>
          )}
        </Select>
      </div>

      <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {parserResources.map((resource) => (
          <li
            key={resource.id}
            className="col-span-1 rounded-xl bg-white shadow-md border border-gray-200"
          >
            <div className="flex w-full items-center justify-between space-x-6 p-6 py-8">
              <div className="flex-1 truncate">
                <div className="flex items-center space-x-3">
                  <h3 className="truncate text-base font-medium text-gray-900">{resource.name}</h3>
                  <span
                    className={clsx(
                      'inline-flex flex-shrink-0 items-center rounded-full px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset',
                      {
                        'bg-blue-50 text-blue-700 ring-blue-600/20':
                          resource.topic_color === 'blue',
                        'bg-slate-50 text-slate-700 ring-slate-600/20':
                          resource.topic_color === 'slate',
                        'bg-gray-50 text-gray-700 ring-gray-600/20':
                          resource.topic_color === 'gray',
                        'bg-zinc-50 text-zinc-700 ring-zinc-600/20':
                          resource.topic_color === 'zinc',
                        'bg-neutral-50 text-neutral-700 ring-neutral-600/20':
                          resource.topic_color === 'neutral',
                        'bg-stone-50 text-stone-700 ring-stone-600/20':
                          resource.topic_color === 'stone',
                        'bg-red-50 text-red-700 ring-red-600/20': resource.topic_color === 'red',
                        'bg-orange-50 text-orange-700 ring-orange-600/20':
                          resource.topic_color === 'orange',
                        'bg-amber-50 text-amber-700 ring-amber-600/20':
                          resource.topic_color === 'amber',
                        'bg-yellow-50 text-yellow-700 ring-yellow-600/20':
                          resource.topic_color === 'yellow',
                        'bg-lime-50 text-lime-700 ring-lime-600/20':
                          resource.topic_color === 'lime',
                        'bg-green-50 text-green-700 ring-green-600/20':
                          resource.topic_color === 'green',
                        'bg-emerald-50 text-emerald-700 ring-emerald-600/20':
                          resource.topic_color === 'emerald',
                        'bg-teal-50 text-teal-700 ring-teal-600/20':
                          resource.topic_color === 'teal',
                        'bg-cyan-50 text-cyan-700 ring-cyan-600/20':
                          resource.topic_color === 'cyan',
                        'bg-sky-50 text-sky-700 ring-sky-600/20': resource.topic_color === 'sky',
                        'bg-indigo-50 text-indigo-700 ring-indigo-600/20':
                          resource.topic_color === 'indigo',
                        'bg-violet-50 text-violet-700 ring-violet-600/20':
                          resource.topic_color === 'violet',
                        'bg-purple-50 text-purple-700 ring-purple-600/20':
                          resource.topic_color === 'purple',
                        'bg-fuchsia-50 text-fuchsia-700 ring-fuchsia-600/20':
                          resource.topic_color === 'fuchsia',
                        'bg-pink-50 text-pink-700 ring-pink-600/20':
                          resource.topic_color === 'pink',
                        'bg-rose-50 text-rose-700 ring-rose-600/20': resource.topic_color === 'rose'
                      }
                    )}
                  >
                    {resource.topic_name}
                  </span>
                </div>
                <Link
                  href={resource.link}
                  isExternal
                  showAnchorIcon
                  className="mt-1"
                  size="sm"
                  color="primary"
                >
                  Ver más de {resource.name}
                </Link>
              </div>
              <Avatar src={resource.topic_image} />
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex justify-center">
        {resources && (
          <Pagination
            total={Math.ceil(resources.length / RESOURCES_PER_PAGE)}
            showControls
            loop
            page={page}
            onChange={setPage}
          />
        )}
      </div>
    </div>
  );
}

export default HomeRepository;
