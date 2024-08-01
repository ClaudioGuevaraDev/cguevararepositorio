import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Select,
  SelectItem
} from '@nextui-org/react';
import { useQueryClient } from '@tanstack/react-query';
import { doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useState } from 'react';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

import { TOPICS_COLORS } from '@/config';
import { firestore, storage } from '@/libs/firebase';

function TopicCreateForm() {
  const [name, setName] = useState('');
  const [color, setColor] = useState(new Set([]));
  const [logo, setLogo] = useState(null);
  const [saving, setSaving] = useState(false);

  const queryClient = useQueryClient();

  const handleCreateTopic = async (e) => {
    e.preventDefault();

    setSaving(true);

    try {
      const id = uuidv4();

      const storageRef = ref(storage, `topics/${id}`);
      await uploadBytes(storageRef, logo[0]);
      const url = await getDownloadURL(storageRef);

      const topicRef = doc(firestore, 'topics', id);
      const topic = {
        id: id,
        name: name,
        image: url,
        resources: [],
        color: Array.from(color)[0]
      };
      await setDoc(topicRef, topic);

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

            <Select
              label="Color"
              items={TOPICS_COLORS}
              className="mb-4"
              selectedKeys={color}
              onSelectionChange={setColor}>
              {(color) => (
                <SelectItem key={color.name} value={color.name}>
                  {color.name}
                </SelectItem>
              )}
            </Select>

            <Input type="file" label="Logo" size="sm" onChange={(e) => setLogo(e.target.files)} />
          </CardBody>
          <CardFooter>
            <Button
              type="submit"
              color="primary"
              className="w-full"
              isDisabled={
                name === '' || logo == null || logo.length === 0 || Array.from(color).length === 0
              }
              isLoading={saving}>
              Añadir tópico
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

export default TopicCreateForm;
