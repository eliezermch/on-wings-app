'use server';

import { type FormState, SignupFormSchema, SigninFormSchema } from '@/validations/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import api from '@/api/api';
import z from 'zod';
import { AxiosError } from 'axios';
import { getRandomHexColor } from '@/utils/functions';

const cookieConfig = {
  maxAge: 60 * 60 * 24 * 7, // 1 week,
  path: '/',
  httpOnly: true, // only accessible by the server
  domain: process.env.HOST ?? 'localhost',
  secure: process.env.NODE_ENV === 'production',
};

export async function registerUserAction(prevState: FormState, formData: FormData): Promise<FormState> {
  const fields = {
    username: formData.get('username') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    firstName: formData.get('firstName') as string,
    lastName: formData.get('lastName') as string,
  };

  const validatedFields = SignupFormSchema.safeParse(fields);

  if (!validatedFields.success) {
    const flattenedErrors = z.flattenError(validatedFields.error);

    return {
      success: false,
      message: 'Validation errors occurred',
      apiErrors: null,
      zodErrors: flattenedErrors.fieldErrors,
      data: {
        avatar: `https://images.placeholders.dev/?text=${fields.firstName.charAt(0).toLocaleUpperCase()}&width=50&height=50&bgColor=${getRandomHexColor()}`,
        ...fields
      },
    };
  }

  try {
    // 1. Register the user
    await api.post('register/', {
      username: fields.username,
      email: fields.email,
      password: fields.password,
      first_name: fields.firstName,
      last_name: fields.lastName,
      avatar: `https://images.placeholders.dev/?text=${fields.firstName.charAt(0).toLocaleUpperCase()}&width=50&height=50&bgColor=${getRandomHexColor()}`
    });

  } catch (error: any) {
    let errorMessage = 'Registration failed. Please try again.';
    let errorDetails = null;

    if (error instanceof AxiosError && error.response) {
      const errorData = error.response.data;
      
      // Handle Django Rest Framework errors
      if (typeof errorData === 'object') {
        errorDetails = errorData;
        // Create a summary message
        const messages = Object.values(errorData).flat().join(', ');
        if (messages) {
          errorMessage = messages;
        }
      }
    }

    return {
      success: false,
      message: errorMessage,
      apiErrors: {
        message: errorMessage,
        details: errorDetails,
      },
      zodErrors: null,
      data: {
        ...fields,
      },
    };
  }

  // 4. Redirect to login
  redirect('/signin');
}

export async function loginUserAction(prevState: FormState, formData: FormData): Promise<FormState> {
  const fields = {
    identifier: formData.get('username') as string, // Using 'username' field from form but validating as identifier
    password: formData.get('password') as string,
  };

  const validatedFields = SigninFormSchema.safeParse(fields);

  if (!validatedFields.success) {
    const flattenedErrors = z.flattenError(validatedFields.error);
    return {
      success: false,
      message: 'Validation errors occurred',
      apiErrors: null,
      zodErrors: flattenedErrors.fieldErrors,
      data: {
        username: fields.identifier,
        password: fields.password,
      },
    };
  }

  try {
    const response = await api.post('login/', {
      username: fields.identifier,
      password: fields.password,
    });

    const { token } = response.data;

    const cookieStore = await cookies();
    cookieStore.set('jwt', token, cookieConfig);

  } catch (error: any) {
    let errorMessage = 'Login failed. Please check your credentials.';
    
    if (error instanceof AxiosError && error.response) {
        const errorData = error.response.data;
        if (errorData.non_field_errors) {
            errorMessage = errorData.non_field_errors[0];
        }
    }

    return {
      success: false,
      message: errorMessage,
      apiErrors: {
        message: errorMessage,
      },
      zodErrors: null,
      data: {
        username: fields.identifier,
        password: fields.password,
      },
    };
  }

  redirect('/');
}

export async function logoutUserAction() {
  const cookieStore = await cookies();
  const token = cookieStore.get('jwt')?.value;

  if (token) {
      try {
          // Optional: Call backend logout to invalidate token
          // await api.post('logout/'); 
          // Note: calling api.post here might fail if api.ts uses cookies() and we are deleting it? 
          // Actually api.ts reads cookies, so it should be fine before we delete it.
          // But for stateless JWT, backend logout might not be strictly necessary unless we blacklist tokens.
          // Let's keep it simple for now and just delete the cookie.
      } catch (error) {
          console.error("Logout error", error);
      }
  }
  
  cookieStore.delete('jwt');
  redirect('/signin');
}

export async function getUser() {
  try {
    const response = await api.get('me/');
    return response.data;
  } catch (error) {
    return null;
  }
}