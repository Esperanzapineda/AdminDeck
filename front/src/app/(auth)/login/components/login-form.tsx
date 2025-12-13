"use client";

import { AuthCard } from '@/components/auth/AuthCard';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { axiosApiBack } from '@/services/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

const formSchema = z.object({
  email: z.string()
    .trim()
    .email("El email no es válido"),
  password: z.string()
    .min(1, { message: "La contraseña es requerida" }) 
});

const LoginForm = () => {
  const router = useRouter();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  });
  
  const { isSubmitting } = form.formState;

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const response = await axiosApiBack.post('/auth/login', data);
      
      console.log("Login exitoso:", response.data);
      
      toast.success("¡Bienvenido de nuevo!", {
        description: "Redirigiendo al panel de control...",
        duration: 2000,
      });

      setTimeout(() => {
        router.push('/dashboard'); 
      }, 3000); 

    } catch (error) {
      console.error("Error en login:", error);
      if (axios.isAxiosError(error) && error.response) {
        const backendMessage = error.response.data.message;
        let displayMessage = "Credenciales inválidas o error en el servidor";

        if (Array.isArray(backendMessage)) {
            displayMessage = backendMessage[0];
        } else if (typeof backendMessage === 'string') {
            displayMessage = backendMessage;
        }
        toast.error("Error de autenticación", {
          description: displayMessage,
        });

      } else {
        toast.error("Error de conexión", {
            description: "No se pudo conectar con el servidor"
        });
      }
    }
  }

  return (
    <AuthCard title='Inicia Sesión'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} >
          
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo electrónico</FormLabel>
                <FormControl>
                  <Input placeholder='Ingresa tu correo' {...field} 
                  className='text-foreground'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input type='password' placeholder='Ingresa tu contraseña' {...field} 
                  className='text-foreground'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button 
            type='submit' 
            disabled={isSubmitting}
            className='w-full mt-4'
          >
            {isSubmitting ? "Verificando..." : "Ingresar"}
          </Button>
        </form>
      </Form>

      <p className='text-foreground text-center mt-4'>
        Aun no tienes cuenta 
        <Link href={'/register'}> <span className='text-red-500 hover:text-foreground'> Registrate</span></Link>
      </p>
      </AuthCard>
  );
} 

export default LoginForm;