'use client';

import React from 'react';
import Link from 'next/link';
import { useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { actions } from '@/actions';
import { FormState } from '@/validations/auth';

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

export default function LoginPage() {
  const [formState, formAction] = useActionState(actions.auth.loginUserAction, INITIAL_STATE);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
              create a new account
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
              placeholder="Username"
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
              placeholder="Password"
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

          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
}
