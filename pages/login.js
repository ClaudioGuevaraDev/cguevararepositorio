import { Button, Card, CardBody, CardFooter, CardHeader, Input } from '@nextui-org/react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'sonner';

import { auth } from '@/libs/firebase';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);

      router.push('/', undefined, {
        shallow: true
      });
    } catch (error) {
      toast.error('Error al iniciar sesión');

      setLoading(false);
    }
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
              <Button
                type="submit"
                color="primary"
                className="w-full"
                isLoading={loading}
                isDisabled={email === '' || password === ''}
              >
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
