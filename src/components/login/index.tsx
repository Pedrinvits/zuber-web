"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { useState } from "react";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Loader2 } from "lucide-react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "../ui/form";
import { useToast } from "@/components/ui/use-toast"

const Login = () => {
    const [isLoading,setIsLoading] = useState(false)

    const { toast } = useToast()

    const formSchema = z.object({
        code : z
        .string({
          required_error : "Seu código precisa ter mais de 10 caracteres",
        })
        .trim()
        .min(10,"Campo Obrigatório"),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            code: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        toast({
            title: `Sucesso`,
            description: `Dispositivo ${values.code} encontrado`,
        })
    }

    return ( 
        <section className="container mt-40 flex items-center justify-center">
             	     <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Entre como o código do seu dispositivo</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Código</FormLabel>
                        <FormControl>
                            <Input placeholder="Digite seu código" {...field} />
                        </FormControl>
                        </FormItem>
                    )}
                    />
                  <CardFooter className="flex justify-center">
                    <Button disabled={isLoading} type="submit">
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Confirmar</Button>
                </CardFooter>
                </form>
                </Form>
                </CardContent>
                
                </Card>
        </section>
     );
}
 
export default Login;