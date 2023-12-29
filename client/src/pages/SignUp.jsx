import React from "react";
import axios from "axios";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z
  .object({
    firstName: z
      .string()
      .min(1, { message: "First name must be 1 or more character(s)." })
      .max(50, {
        message: "First name must not be longer than 50 characters.",
      }),
    lastName: z
      .string()
      .min(1, { message: "Last name must be 1 or more character(s)." })
      .max(50, { message: "Last name must not be longer than 50 characters." }),
    username: z
      .string()
      .min(1, { message: "Username must be 1 or more character(s)." })
      .max(50, { message: "Username must not be longer than 50 characters." }),
    password: z
      .string()
      .min(1, { message: "Password must be 1 or more character(s)." })
      .max(50, { message: "Password must not be longer than 50 characters." }),
    confirmPassword: z
      .string()
      .min(1, { message: "Password must be 1 or more character(s)." })
      .max(50, { message: "Password must not be longer than 50 characters." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match, please try again",
    path: ["confirmPassword"],
  });

function SignUp() {
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
    const baseUrl = import.meta.env.VITE_BASE_URL;
    axios
      .get(`${baseUrl}/get-users`)
      .then((res) => {
        // array of current users in the database
        const usersArr = res.data;
        if (usersArr.includes(values.username)) {
          form.setError("username", {
            type: "manual",
            message: "Sorry, that username already exists!",
          });
        } else {
          axios.post(`${baseUrl}/insert-user`, values).then(() =>
            // reset form after successfully creating new user
            form.reset({
              firstName: "",
              lastName: "",
              username: "",
              password: "",
              confirmPassword: "",
            })
          );
        }
      })
      .catch((err) => console.log(err));
  }
  return (
    <div>
      <Header />
      <div className="content-container flex flex-col justify-center items-center content-container h-screen">
        <Card className="w-96">
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="first name..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="last name..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="username..." {...field} />
                      </FormControl>
                      <FormMessage />
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="confirm password..."
                          {...field}
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Sign Up</Button>
              </form>
              <Link to="/login" className="flex flex-row justify-center pt-3">
                <p className="text-secondary">
                  Already have an account? Login here!
                </p>
              </Link>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default SignUp;
