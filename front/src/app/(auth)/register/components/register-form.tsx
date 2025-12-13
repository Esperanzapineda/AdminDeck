"use client"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import z from 'zod'
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { axiosApiBack } from '@/services/utils';
import axios from 'axios';
import { toast } from 'sonner';
import { AuthCard } from '@/components/auth/AuthCard';
import Link from 'next/link';

const formSchema = z.object({
    name: z.string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres" })
    .max(50, { message: "El nombre no puede tener más de 50 caracteres" }),

    email: z.string()
    .trim()
    .email("El email no es válido"),

    password: z.string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
    .max(15, { message: "La contraseña no puede tener más de 15 caracteres" }),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
});

const RegisterForm = () => {
    const router = useRouter();
    


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema), 
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    })

    const { isSubmitting } = form.formState;

    async function onSubmit(data: z.infer<typeof formSchema>) {
        console.log("Datos del formulario:", data);

        try{
            const {confirmPassword, ...dataToSend} = data;
            const response = await axiosApiBack.post('/auth/register', dataToSend)
            console.log("Registro exitoso:", response.data);
            toast.success("Cuenta creada exitosamente",{
                description: "Serás redirigido al inicio de sesión en unos segundos",
                duration: 2000,
            });
            setTimeout(() => {
                router.push('/login');
            }, 3000);
            

        }catch(error){
            if(axios.isAxiosError(error)){
                const errorMessage = error.response?.data?.message || "Error en el registro";
                toast.error("Error al registrar la cuenta",{
                    description: errorMessage,
                })
            }else{
            toast.error("Error de inesperado", {
                description: "Intétalo más tarde"
            })
            }
        }
        
    }
    return (
        <AuthCard title='Crear Cuenta'>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 w80'>
                <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) =>(
                        <FormItem>
                            <FormLabel>Nombre</FormLabel>
                            <FormControl>
                                <Input placeholder='Escribe tu nombre' {...field}
                                className='text-foreground'
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='email'
                    render={({ field}) =>(
                        <FormItem>
                            <FormLabel>Correo electronico</FormLabel>
                            <FormControl>
                                <Input placeholder='Escribe tu correo' {...field}
                                className='text-foreground'
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='password'
                    render={({ field}) =>(
                        <FormItem>
                            <FormLabel>Contraseña</FormLabel>
                            <FormControl>
                                <Input type='password' placeholder='Escribe tu contraseña' {...field}
                                className='text-foreground'
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='confirmPassword'
                    render={({ field}) =>(
                        <FormItem>
                            <FormLabel>Confirma tu contraseña</FormLabel>
                            <FormControl>
                                <Input type='password' placeholder='Escribe tu contraseña' {...field}
                                className='text-foreground'
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button 
                    type='submit' 
                    disabled={isSubmitting} 
                    className='w-full mt-4'
                >
                    {isSubmitting ? "Registrando.." : "Registrarse"}
                </Button>
            </form>
        </Form>

        <p className='text-foreground text-center mt-4'>
        Ya tienenes cuenta
        <Link href={'/login'}> <span className='text-red-500 hover:text-foreground'> Iniciar sesión</span></Link>
        </p>

        </AuthCard>
    )
}

export default RegisterForm