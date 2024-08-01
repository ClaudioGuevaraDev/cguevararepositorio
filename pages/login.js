import { Button, Card, CardBody, CardFooter, CardHeader, Input } from '@nextui-org/react';
import { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <h4 className="text-2xl text-gray-900 font-semibold mx-auto">Iniciar sesión</h4>
            </CardHeader>
            <CardBody className="space-y-6">
              <Input
                type="email"
                label="Correo electrónico"
                value={email}
                onValueChange={setEmail}
                isRequired
              />

              <Input
                type="password"
                label="Contraseña"
                value={password}
                onValueChange={setPassword}
                isRequired
              />
            </CardBody>

            <CardFooter>
              <Button type="submit" color="primary" className="w-full" isLoading={loading}>
                Iniciar sesión
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default Login;
