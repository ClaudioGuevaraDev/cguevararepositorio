import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input
} from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

import { createResource } from '@/services/resources';
import { getAllTopics, getTopic, updateTopic } from '@/services/topics';

function ResourceCreateForm() {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [topic, setTopic] = useState('');
  const [saving, setSaving] = useState(false);

  const { data: topics } = useQuery({
    queryKey: ['topics'],
    queryFn: getAllTopics
  });

  const handleCreateResource = async (e) => {
    e.preventDefault();

    setSaving(true);

    try {
      const foundTopic = await getTopic(topic);
      if (foundTopic == null) {
        console.log('hola');
        throw new Error();
      }

      const resource = {
        id: uuidv4(),
        name: name,
        link: link,
        topic: topic
      };

      await createResource(resource);

      await updateTopic(topic, { ...foundTopic, resources: [...foundTopic.resources, topic] });

      toast.success('Recurso creado con éxito');
    } catch (error) {
      toast.error('Error al crear el recurso');
    }

    setSaving(false);
  };

  return (
    <div className="col-span-12 md:col-span-3">
      <form onSubmit={handleCreateResource}>
        <Card>
          <CardHeader>
            <h4 className="text-gray-900 text-xl font-bold mx-auto">Añadir Recurso</h4>
          </CardHeader>
          <CardBody>
            <Input
              type="text"
              label="Nombre"
              size="sm"
              className="mb-4"
              value={name}
              onValueChange={setName}
            />

            <Input
              type="text"
              label="Link"
              size="sm"
              className="mb-4"
              value={link}
              onValueChange={setLink}
            />

            <Autocomplete
              label="Tópico"
              defaultItems={topics ?? []}
              selectedKey={topic}
              onSelectionChange={setTopic}
            >
              {(topic) => (
                <AutocompleteItem key={topic.id} value={topic.id}>
                  {topic.name}
                </AutocompleteItem>
              )}
            </Autocomplete>
          </CardBody>
          <CardFooter>
            <Button
              type="submit"
              color="primary"
              className="w-full"
              isDisabled={name === '' || link === '' || topic === '' || topic == null}
              isLoading={saving}
            >
              Añadir recurso
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

export default ResourceCreateForm;
