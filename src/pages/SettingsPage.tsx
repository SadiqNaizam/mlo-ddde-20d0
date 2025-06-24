import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Custom Layout Component Imports
import Header from '@/components/layout/Header';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import Footer from '@/components/layout/Footer';

// Shadcn/ui Component Imports
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

// Zod schema for profile form validation
const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
});

// Zod schema for password form validation
const passwordFormSchema = z.object({
  currentPassword: z.string().min(1, { message: "Current password is required." }),
  newPassword: z.string().min(8, { message: "New password must be at least 8 characters." }),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"], // Point error to the confirm password field
});

const SettingsPage = () => {
    console.log('SettingsPage loaded');

    // react-hook-form setup for profile
    const profileForm = useForm<z.infer<typeof profileFormSchema>>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            name: 'Stellar User',
            email: 'user@stellarstox.com',
        },
    });

    // react-hook-form setup for password
    const passwordForm = useForm<z.infer<typeof passwordFormSchema>>({
        resolver: zodResolver(passwordFormSchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
    });

    // Placeholder submit handlers
    function onProfileSubmit(values: z.infer<typeof profileFormSchema>) {
        console.log("Profile update submitted:", values);
        // In a real application, you would make an API call here.
    }

    function onPasswordSubmit(values: z.infer<typeof passwordFormSchema>) {
        console.log("Password change submitted:", { user: profileForm.getValues().email, ...values });
         // In a real application, you would make an API call here.
    }

    return (
        <div className="flex min-h-screen w-full flex-col bg-background">
            <DashboardSidebar />
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <Header />
                <main className="flex-1 p-4 md:p-8 space-y-8">
                    <header className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">Settings</h1>
                        <p className="text-muted-foreground">Manage your account settings and application preferences.</p>
                    </header>

                    <div className="grid gap-8">
                        {/* Profile Information Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Profile Information</CardTitle>
                                <CardDescription>Update your personal details. This will be visible to others.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Form {...profileForm}>
                                    <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4 max-w-lg">
                                        <FormField control={profileForm.control} name="name" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Name</FormLabel>
                                                <FormControl><Input placeholder="Your Name" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <FormField control={profileForm.control} name="email" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl><Input type="email" placeholder="your@email.com" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <Button type="submit">Save Changes</Button>
                                    </form>
                                </Form>
                            </CardContent>
                        </Card>
                        
                        {/* Change Password Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Change Password</CardTitle>
                                <CardDescription>For your security, we recommend using a strong password.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Form {...passwordForm}>
                                    <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4 max-w-lg">
                                        <FormField control={passwordForm.control} name="currentPassword" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Current Password</FormLabel>
                                                <FormControl><Input type="password" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <FormField control={passwordForm.control} name="newPassword" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>New Password</FormLabel>
                                                <FormControl><Input type="password" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <FormField control={passwordForm.control} name="confirmPassword" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Confirm New Password</FormLabel>
                                                <FormControl><Input type="password" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <Button type="submit">Update Password</Button>
                                    </form>
                                </Form>
                            </CardContent>
                        </Card>

                        {/* Preferences Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Preferences</CardTitle>
                                <CardDescription>Customize your application experience.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6 max-w-2xl">
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-foreground">Notifications</h3>
                                    <div className="flex items-center justify-between rounded-lg border border-border p-4">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="email-notifications" className="text-base">Email Notifications</Label>
                                            <p className="text-sm text-muted-foreground">Receive market summaries and account alerts.</p>
                                        </div>
                                        <Switch id="email-notifications" defaultChecked />
                                    </div>
                                </div>
                                <Separator />
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-foreground">Appearance</h3>
                                    <div className="flex items-center justify-between rounded-lg border border-border p-4">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="enable-animations" className="text-base">Enable UI Animations</Label>
                                            <p className="text-sm text-muted-foreground">Enable transitions and effects for a more dynamic feel.</p>
                                        </div>
                                        <Switch id="enable-animations" defaultChecked />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        
                        {/* Subscription Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Subscription</CardTitle>
                                <CardDescription>Manage your billing and subscription plan.</CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                <div>
                                    <p className="font-semibold text-foreground">Current Plan: <span className="text-primary font-bold">Stellar Pro</span></p>
                                    <p className="text-sm text-muted-foreground">Your plan renews on January 1, 2025.</p>
                                </div>
                                <Button variant="outline">Manage Subscription</Button>
                            </CardContent>
                        </Card>
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default SettingsPage;