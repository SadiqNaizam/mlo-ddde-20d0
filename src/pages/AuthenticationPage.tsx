import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { CircuitBoard } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from '@/components/ui/use-toast';

// Login Schema
const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

// Registration Schema
const registrationSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters.' }),
});

const AuthenticationPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log('AuthenticationPage loaded');
  }, []);

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const registrationForm = useForm<z.infer<typeof registrationSchema>>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  function onLoginSubmit(values: z.infer<typeof loginSchema>) {
    console.log('Login attempt:', values);
    // In a real app, you'd handle authentication here.
    // On success, navigate to the dashboard.
    toast({
      title: 'Login Successful',
      description: 'Redirecting to your dashboard...',
    });
    setTimeout(() => navigate('/'), 1000); // Redirect to dashboard after a short delay
  }

  function onRegisterSubmit(values: z.infer<typeof registrationSchema>) {
    console.log('Registration attempt:', values);
    // In a real app, you'd handle registration here.
    toast({
      title: 'Account Created',
      description: 'You can now log in with your new credentials.',
    });
    // Here you might automatically log them in or switch to the login tab
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="mb-6 flex flex-col items-center text-center">
            <Link to="/" className="mb-4 flex items-center gap-2 text-foreground">
                <CircuitBoard className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold">StellarStox</h1>
            </Link>
            <p className="text-muted-foreground">The future of stock analysis is here.</p>
        </div>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <Card className="border-border/40 bg-card/50">
              <CardHeader>
                <CardTitle>Welcome Back</CardTitle>
                <CardDescription>
                  Enter your credentials to access your dashboard.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-6">
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="user@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="********" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full">
                      Login
                    </Button>
                  </form>
                </Form>
                 <div className="mt-4 text-center text-sm">
                    <Link to="#" className="underline text-muted-foreground hover:text-primary">
                        Forgot your password?
                    </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="register">
            <Card className="border-border/40 bg-card/50">
              <CardHeader>
                <CardTitle>Create an Account</CardTitle>
                <CardDescription>
                  Join us and start your journey into advanced stock analysis.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...registrationForm}>
                  <form onSubmit={registrationForm.handleSubmit(onRegisterSubmit)} className="space-y-6">
                    <FormField
                      control={registrationForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registrationForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="user@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registrationForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="********" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full">
                      Create Account
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        <div className="mt-4">
            <Alert variant="default" className="border-accent/30 bg-accent/10">
                <AlertTitle className="text-accent">Demo Mode</AlertTitle>
                <AlertDescription className="text-accent/80">
                    You can log in with any credentials. This is a demonstration.
                </AlertDescription>
            </Alert>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationPage;