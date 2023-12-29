import React from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Username must be 1 or more characters." })
    .max(50, { message: "Username must not be longer than 50 characters." }),
  password: z
    .string()
    .min(1, { message: "Password must be 1 or more characters." })
    .max(50, { message: "Password must not be longer than 50 characters." }),
});

function Login() {
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <div>
      <Header />
      <div className="content-container flex flex-col justify-center items-center content-container h-screen">
        <Card className="w-96">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            {/* <CardDescription>Card Description</CardDescription> */}
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="username..." {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="mt-3">
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="password..."
                          {...field}
                          type="password"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit" className="mt-3">
                  Submit
                </Button>
              </form>
              <Link to="/sign-up" className="flex flex-row justify-center pt-3">
                <p className="text-secondary">
                  Don't have an account? Sign up here!
                </p>
              </Link>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Login;
