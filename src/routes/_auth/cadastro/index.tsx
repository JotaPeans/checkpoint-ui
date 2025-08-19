import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { motion } from "motion/react";
import { z } from "zod";

import { Button, buttonVariants } from "@/components/ui/button";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";
import FormInputField from "@/components/FormInputField";
import FaultyTerminal from "@/components/FaultyTerminal/FaultyTerminal";

export const Route = createFileRoute("/_auth/cadastro/")({
  component: RouteComponent,
});

const formSchema = z
  .object({
    name: z.string({
      message: "O nome é obrigatório",
    }),
    email: z
      .string({
        message: "O email é obrigatório",
      })
      .email({
        message: "Insira um email válido",
      }),
    password: z.string({
      message: "A senha é obrigatória",
    }),
    confirmPassword: z.string({
      message: "A confirmação da senha é obrigatória",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem!",
    path: ["confirmPassword"],
  });

type FormSchemaType = z.infer<typeof formSchema>;

function RouteComponent() {
  const [isLoading, startLogin] = useTransition();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: FormSchemaType) {
    startLogin(async () => {
      // await signUp.email(
      //   {
      //     name: values.name,
      //     email: values.email,
      //     password: values.password,
      //   },
      //   {
      //     onSuccess: () => {
      //       router.push("/login");
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
    <main className="flex-1 relative flex bg-light_minus_1">
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
            <h5 className="text-start font-semibold text-xl">Cadastro</h5>
            <p className="text-principal">
              Insira suas informações para se cadastrar na plataforma!
            </p>

            <div className="flex flex-col gap-4 mt-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormInputField
                    {...field}
                    label="Nome"
                    required
                    placeholder="Insira seu nome"
                    classNames={{
                      labelClassName: "text-principal",
                    }}
                  />
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormInputField
                    {...field}
                    label="Email"
                    required
                    placeholder="Insira seu email"
                    classNames={{
                      labelClassName: "text-principal",
                    }}
                  />
                )}
              />

              <div className="flex items-center flex-wrap mobile:flex-nowrap justify-between gap-5">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormInputField
                      {...field}
                      label="Senha"
                      type="password"
                      required
                      placeholder="Insira sua senha"
                      classNames={{
                        rootClassName: "w-full",
                        labelClassName: "text-principal",
                      }}
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormInputField
                      {...field}
                      label="Confirma sua senha"
                      type="password"
                      required
                      placeholder="confirme sua senha"
                      classNames={{
                        rootClassName: "w-full",
                        labelClassName: "text-principal",
                      }}
                    />
                  )}
                />
              </div>

              <Button isLoading={isLoading} size="lg" className="mt-2">
                Cadastrar
              </Button>
            </div>

            <p className="w-full text-start mt-2 text-principal">
              Já possui uma conta?{" "}
              <Link
                to="/login"
                className={buttonVariants({
                  variant: "link",
                  className: "!text-mediumBlue p-0 !px-0",
                })}
              >
                Entre Aqui!
              </Link>
            </p>
          </form>
        </Form>
      </motion.div>

      <motion.div
        className="flex-1 bg-neutral-800 hidden lg:flex p-28 relative"
        initial={{ x: -400 }}
        animate={{ x: 0 }}
      >
        <motion.h3
          className="w-72 flex flex-wrap text-6xl font-bricolage text-white font-semibold mt-auto z-10"
          initial={{ y: -100, scale: 0, opacity: 0 }}
          animate={{
            y: 0,
            scale: 1,
            opacity: 1,
            transition: { delay: 0.3, duration: 0.5, type: "spring" },
          }}
        >
          Olá, <span className="text-5xl">tudo bem?</span>
        </motion.h3>

        <div className="w-full h-full top-0 left-0 absolute">
          <FaultyTerminal
            scale={1.9}
            gridMul={[2, 1]}
            digitSize={1.4}
            timeScale={1}
            pause={false}
            scanlineIntensity={1}
            glitchAmount={1}
            flickerAmount={1}
            noiseAmp={1}
            chromaticAberration={0}
            dither={0}
            curvature={0.1}
            tint="#404040"
            mouseReact={true}
            mouseStrength={0.5}
            pageLoadAnimation={false}
            brightness={0.6}
          />
        </div>
      </motion.div>
    </main>
  );
}
