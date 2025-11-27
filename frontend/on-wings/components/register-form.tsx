'use client';

import Link from 'next/link';

import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from '@/components/ui/card';

import { useActionState } from 'react';
import { type FormState } from '@/validations/auth';
import { FormError } from './form-error';
import { Label } from './ui/label';
import { actions } from '@/actions';
import { Input } from './ui/input';
import { Button } from './ui/button';
import Image from 'next/image';

const styles = {
  container: 'w-full max-w-md',
  header: 'space-y-1',
  title: 'text-3xl font-bold text-primary flex justify-between',
  content: 'space-y-4',
  fieldGroup: 'space-y-2',
  footer: 'flex flex-col',
  button: 'w-full',
  prompt: 'mt-4 text-center text-md',
  link: 'ml-2 text-primary',
};

const INITIAL_STATE: FormState = {
  success: false,
  message: undefined,
  apiErrors: null,
  zodErrors: null,
  data: {
    username: '',
    password: '',
    email: '',
  },
};

export function RegisterForm() {
  const [formState, formAction] = useActionState(actions.auth.registerUserAction, INITIAL_STATE);

  return (
    <div className={styles.container}>
      <form action={formAction}>
        <Card>
          <CardHeader className={styles.header}>
            <CardTitle className={styles.title}>Registrarse <Image src="/on-wings-high-quality_trimmed.png" alt="On Wings Logo" className="w-[48px] h-[48px] object-contain mb-[-32px]" width={48} height={48} /></CardTitle>
            <CardDescription className='text-md'>Ingresa tus datos para crear una nueva cuenta</CardDescription>
          </CardHeader>
          <CardContent className={styles.content}>
            <div className={styles.fieldGroup}>
              <Label htmlFor="firstName">Nombre</Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Nombre"
                defaultValue={formState.data?.firstName ?? ''}
              />
              <FormError error={formState.zodErrors?.firstName} />
            </div>
            <div className={styles.fieldGroup}>
              <Label htmlFor="lastName">Apellido</Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Apellido"
                defaultValue={formState.data?.lastName ?? ''}
              />
              <FormError error={formState.zodErrors?.lastName} />
            </div>
            <div className={styles.fieldGroup}>
              <Label htmlFor="username">Nombre de Usuario</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Nombre de Usuario"
                defaultValue={formState.data?.username ?? ''}
              />
              <FormError error={formState.zodErrors?.username} />
            </div>
            <div className={styles.fieldGroup}>
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                defaultValue={formState.data?.email ?? ''}
              />
              <FormError error={formState.zodErrors?.email} />
            </div>
            <div className={styles.fieldGroup}>
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Contraseña"
                defaultValue={formState.data?.password ?? ''}
              />
              <FormError error={formState.zodErrors?.password} />
            </div>
          </CardContent>
          <CardFooter className={styles.footer}>
            <Button className={styles.button}>Registrarse</Button>
            {formState.apiErrors && (
              <p className="text-pink-500 text-xs italic mt-1 py-2">{formState.apiErrors.message}</p>
            )}
          </CardFooter>
        </Card>
        <div className={styles.prompt}>
          ¿Tienes una cuenta?
          <Link className={styles.link} href="signin">
            Iniciar Sesión
          </Link>
        </div>
      </form>
    </div>
  );
}