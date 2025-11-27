'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { actions } from '@/actions';
import { FormState } from '@/validations/auth';
import Image from 'next/image';

const INITIAL_STATE: FormState = {
  success: false,
  message: undefined,
  apiErrors: null,
  zodErrors: null,
  data: {
    username: '',
    password: '',
  },
};

export default function SignIn() {
  const [formState, formAction] = useActionState(actions.auth.loginUserAction, INITIAL_STATE);

  return (
    <div className="flex items-center justify-center bg-card rounded-xl shadow-lg py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <Image src="/on-wings-high-quality_trimmed.png" alt="On Wings Logo" className="w-[128px] h-[128px] object-contain mb-[-32px]" width={128} height={128} />
          <h2 className="mt-0 text-center text-3xl font-extrabold text-foreground">
            Iniciar Sesión
          </h2>
          <p className="mt-2 text-center text-md text-muted-foreground">
            Or{' '}
            <Link href="/register" className="font-medium text-primary hover:text-primary/80">
             Crear una cuenta
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" action={formAction}>
          <div className="space-y-4">
            <Input
              id="username"
              name="username"
              type="text"
              required
              placeholder="Nombre de Usuario"
              defaultValue={formState.data?.username}
            />
            {formState.zodErrors?.username && (
               <p className="text-red-500 text-xs italic">{formState.zodErrors.username}</p>
            )}
            
            <Input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Contraseña"
              defaultValue={formState.data?.password}
            />
             {formState.zodErrors?.password && (
               <p className="text-red-500 text-xs italic">{formState.zodErrors.password}</p>
            )}
          </div>

          {formState.apiErrors && (
            <div className="text-red-600 text-sm text-center bg-red-50 p-2 rounded">
              {formState.apiErrors.message}
            </div>
          )}

          <Button type="submit" className="w-full text-background">
            Iniciar Sesión
          </Button>
        </form>
      </div>
    </div>
  );
}
