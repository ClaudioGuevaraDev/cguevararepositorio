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
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

import { TOPICS_COLORS } from '@/config';
import { createTopic, uploadTopicLogo } from '@/services/topics';

function TopicCreateForm() {
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [logo, setLogo] = useState(null);
  const [saving, setSaving] = useState(false);

  const queryClient = useQueryClient();

  const handleCreateTopic = async (e) => {
    e.preventDefault();

    setSaving(true);

    try {
      const id = uuidv4();

      const url = await uploadTopicLogo(id, logo[0]);

      const topic = {
        id: id,
        name: name,
        image: url,
        resources: [],
        color: color
      };
      await createTopic(topic);

      queryClient.setQueryData(['topics'], (oldData) => {
        return [topic, ...oldData];
      });

      toast.success('Tópico creado con éxito');
    } catch (error) {
      toast.error('Error al crear el tópico');
    }

    setSaving(false);
  };

  return (
    <div className="col-span-12 md:col-span-3">
      <form onSubmit={handleCreateTopic}>
        <Card>
          <CardHeader>
            <h4 className="text-gray-900 text-xl font-bold mx-auto">Añadir Tópico</h4>
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

            <Autocomplete
              label="Color"
              defaultItems={TOPICS_COLORS}
              selectedKey={color}
              onSelectionChange={setColor}
              className="mb-4"
            >
              {(color) => (
                <AutocompleteItem key={color.name} value={color.name}>
                  {color.name}
                </AutocompleteItem>
              )}
            </Autocomplete>

            <Input type="file" label="Logo" size="sm" onChange={(e) => setLogo(e.target.files)} />
          </CardBody>
          <CardFooter>
            <Button
              type="submit"
              color="primary"
              className="w-full"
              isDisabled={
                name === '' || logo == null || logo.length === 0 || color === '' || color == null
              }
              isLoading={saving}
            >
              Añadir tópico
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

export default TopicCreateForm;
