import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginFormSchema } from "@/components/organisms/Login/schema";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function Login() {
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "admin",
      password: "admin@123",
    },
  });

  const navigate = useNavigate();

  const onSubmit = (values: z.infer<typeof loginFormSchema>) => {
    console.log("Submit", values);

    const { username, password } = values;

    if (username === "admin" && password === "admin@123") {
      console.log("Correct login details");
      navigate("/dashboard");
    } else {
      setError("wrong credentials!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-80">
          <h1 className="mb-4">PVX ADMIN DASHBOARD</h1>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className="text-red-800 my-2">{error}</p>
          <Button className="mt-2" type="submit">
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
}
