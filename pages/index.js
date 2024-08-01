import { Autocomplete, AutocompleteItem, Avatar, Link, Pagination } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { useState } from 'react';

import { RESOURCES_PER_PAGE } from '@/config';
import { getAllResources } from '@/services/resources';
import { getAllTopics } from '@/services/topics';

function Home() {
  const [topic, setTopic] = useState('');
  const [page, setPage] = useState(1);

  const { data: resources } = useQuery({
    queryKey: ['resources'],
    queryFn: getAllResources
  });
  const { data: topics } = useQuery({
    queryKey: ['topics'],
    queryFn: getAllTopics
  });

  const parserResources =
    resources
      ?.filter((resource) => (topic === '' || topic == null ? resource : resource.topic === topic))
      .slice(RESOURCES_PER_PAGE * (page - 1), RESOURCES_PER_PAGE * page) ?? [];

  return (
    <div className="w-full h-full min-h-screen">
      <div className="max-w-screen-xl mx-auto px-6 pt-10 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Mis recursos para desarrollo de software
          </h1>
        </div>

        <div className="mt-14 pb-6">
          <div className="mb-4 flex flex-wrap">
            <Autocomplete
              label="Tópico"
              defaultItems={topics ?? []}
              className="max-w-56"
              selectedKey={topic}
              onSelectionChange={setTopic}
            >
              {(topic) => (
                <AutocompleteItem
                  key={topic.id}
                  value={topic.id}
                  startContent={<Avatar alt={topic.name} src={topic.image} className="w-6 h-6" />}
                >
                  {topic.name}
                </AutocompleteItem>
              )}
            </Autocomplete>
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
                      <h3 className="truncate text-base font-medium text-gray-900">
                        {resource.name}
                      </h3>
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
                            'bg-red-50 text-red-700 ring-red-600/20':
                              resource.topic_color === 'red',
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
                            'bg-sky-50 text-sky-700 ring-sky-600/20':
                              resource.topic_color === 'sky',
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
                            'bg-rose-50 text-rose-700 ring-rose-600/20':
                              resource.topic_color === 'rose'
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
      </div>

      <div
        aria-hidden="true"
        className="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
      >
        <div
          style={{
            clipPath:
              'polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)'
          }}
          className="aspect-[801/850] w-[50.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
        />
      </div>
    </div>
  );
}

export default Home;
