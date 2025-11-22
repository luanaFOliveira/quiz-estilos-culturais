import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const userInfoSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres").max(100),
  email: z.string().email("Email inválido").max(255),
  company: z.string().min(2, "Empresa deve ter pelo menos 2 caracteres").max(100),
  position: z.string().min(2, "Cargo deve ter pelo menos 2 caracteres").max(100),
});

export type UserInfo = z.infer<typeof userInfoSchema>;

interface UserInfoFormProps {
  onSubmit: (data: UserInfo) => void;
}

export const UserInfoForm = ({ onSubmit }: UserInfoFormProps) => {
  const form = useForm<UserInfo>({
    resolver: zodResolver(userInfoSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      position: "",
    },
  });

  return (
    <div className="min-h-screen p-4 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-md">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold">
            <img 
              src="/images/id_da_cultura_logo.png" 
              alt="ID da CULTURA Logo" 
              className="h-auto max-h-80 md:max-h-96 mx-auto"
            />
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl mb-8">
              Diagnóstico: Estilos Culturais
          </p>
        </header>

        <div className="card-glass p-6 md:p-8 rounded-lg">
          <h2 className="text-xl font-bold mb-6 text-center">Informações do Participante</h2>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Completo</FormLabel>
                    <FormControl>
                      <Input placeholder="Seu nome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="seu@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Empresa</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome da empresa" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cargo</FormLabel>
                    <FormControl>
                      <Input placeholder="Seu cargo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg py-6 shadow-lg mt-6"
              >
                Iniciar Questionário
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
