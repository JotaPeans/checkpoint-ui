import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useTransition } from "react";
import { ChevronLeft } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import FormInputField from "@/components/FormInputField";
import { Form, FormField } from "@/components/ui/form";
import { Button, buttonVariants } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/_auth/login/")({
  component: RouteComponent,
});

const formSchema = z.object({
  email: z.email({
    message: "O email é obrigatório",
  }),
  password: z.string({
    message: "A senha é obrigatória",
  }),
});

type FormSchemaType = z.infer<typeof formSchema>;

function RouteComponent() {
  const [isLoading, startLogin] = useTransition();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: FormSchemaType) {
    startLogin(async () => {
      // await signIn.email(
      //   {
      //     email: values.email,
      //     password: values.password,
      //   },
      //   {
      //     onSuccess: () => {
      //       router.push("/app");
      //     },
      //     onError: (ctx) => {
      //       toast({
      //         description: ctx.error.message,
      //         duration: 1000,
      //       });
      //     },
      //   }
      // );
    });
  }

  return (
    <main className="flex-1 relative flex">
      <motion.div
        className="flex-1 bg-neutral-800 hidden lg:flex p-28 relative"
        initial={{ x: 400 }}
        animate={{ x: 0 }}
      >
        <Link
          to="/"
          className="text-zinc-100 flex items-center justify-center transition-all rounded-lg hover:bg-mediumBlue size-10"
        >
          <ChevronLeft size={24} />
        </Link>
        <motion.h3
          className="w-96 text-wrap text-6xl font-bricolage text-white font-semibold mt-auto z-10"
          initial={{ y: -100, scale: 0, opacity: 0 }}
          animate={{
            y: 0,
            scale: 1,
            opacity: 1,
            transition: { delay: 0.3, duration: 0.5, type: "spring" },
          }}
        >
          Bem-Vindo <span className="text-5xl">de volta!</span>
        </motion.h3>
        <div className="w-full h-full top-0 left-0 bg-[url(/landing-page-pattern.svg)] bg-cover absolute pointer-events-none"></div>
      </motion.div>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          transition: {
            type: "spring",
            delay: 0.5,
            duration: 0.6,
          },
        }}
        className="flex flex-col items-center justify-center gap-10 flex-1 max-w-[725px] px-4 py-10"
      >
        <div className="flex flex-col gap-4 items-center">
          <img src="/logo.png" alt="Checkpoint" width={100} height={93} />
          <h1 className="text-3xl font-bold">Checkpoint</h1>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <h5 className="text-start font-semibold text-xl">Login</h5>
            <p className="text-principal">
              Bem vindo de volta! Faça login para acessar sua conta.
            </p>

            <div className="flex flex-col gap-4 mt-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormInputField
                    {...field}
                    label="Email"
                    required
                    placeholder="professor@school.com"
                    classNames={{
                      labelClassName: "text-principal",
                    }}
                  />
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormInputField
                    {...field}
                    type="password"
                    label="Senha"
                    required
                    placeholder="***"
                  />
                )}
              />
            </div>

            <Button
              size="lg"
              isLoading={isLoading}
              className="mt-4"
            >
              Entrar
            </Button>

            <p className="w-full text-start mt-2 text-principal">
              Ainda não possui uma conta?{" "}
              <Link
                to="/cadastro"
                className={buttonVariants({
                  variant: "link",
                  className: "p-0 !px-0",
                })}
              >
                Cadastre-se!
              </Link>
            </p>
          </form>
        </Form>
      </motion.div>
    </main>
  );
}
