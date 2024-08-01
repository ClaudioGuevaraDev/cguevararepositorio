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
import { useState } from 'react';

import { TOPICS_COLORS } from '@/config';

function TopicCreateForm() {
  const [name, setName] = useState('');
  const [color, setColor] = useState(new Set([]));
  const [saving, setSaving] = useState(false);

  const handleCreateTopic = async (e) => {
    e.preventDefault();
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
                name === '' ||
                logo == null ||
                logo.length === 0 ||
                color === '' ||
                !TOPICS_COLORS.includes(color)
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
