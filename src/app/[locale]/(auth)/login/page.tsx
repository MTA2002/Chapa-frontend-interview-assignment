"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useTranslations } from "next-intl";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import toast from "react-hot-toast";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

export default function Login() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations();
  const { isAuthenticated } = useAuthStore();
  // Zustand auth store
  const { login, isLoading } = useAuthStore();

  const currentLocale = pathname.startsWith("/en") ? "en" : "am";

  useEffect(() => {
    if (isAuthenticated) {
      router.push(`/${currentLocale}/dashboard`);
    }
  }, [isAuthenticated, router, currentLocale]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Use Zustand auth store login
      const result = await login(values);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      console.log("Login successful via Zustand store");
      toast.success("Login successful! Redirecting to dashboard...");

      // Redirect to dashboard
      router.push(`/${currentLocale}/dashboard`);
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("An unexpected error occurred during login");
    }
  }

  return (
    <main className="pt-20 px-4 flex items-center justify-center min-h-screen bg-gradient-to-br from-cyan-50 via-white to-teal-50">
      <div className="w-full max-w-md bg-white border shadow-lg rounded-xl p-8 flex flex-col gap-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-600 to-teal-600 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="text-xl font-bold">
              <span className="text-cyan-600">Chapa</span>
              <span className="text-gray-700"> PSP</span>
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            {t("common.welcome")}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Sign in to access your payment dashboard
          </p>
          <div className="text-xs text-gray-400 mt-2 p-2 bg-gray-50 rounded-md">
            <p className="font-medium mb-1">Test Accounts:</p>
            <p>Super Admin: superadmin@chapa.co</p>
            <p>Admin: admin1@chapa.co</p>
            <p>User: merchant1@gmail.com</p>
            <p className="mt-1 text-gray-500">Password: 12345678</p>
          </div>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 w-full"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="superadmin@chapa.co"
                      {...field}
                      disabled={isLoading}
                      autoComplete="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={isPasswordVisible ? "text" : "password"}
                        placeholder="••••••••"
                        {...field}
                        disabled={isLoading}
                        autoComplete="current-password"
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={() => setIsPasswordVisible((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      aria-label={
                        isPasswordVisible ? "Hide password" : "Show password"
                      }
                      disabled={isLoading}
                    >
                      {isPasswordVisible ? <FaEye /> : <FaEyeSlash />}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-cyan-700 hover:bg-cyan-600 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  Signing in...
                </span>
              ) : (
                t("common.login")
              )}
            </Button>
          </form>
        </Form>

        <div className="text-center text-sm">
          <p>
            New to Chapa PSP?{" "}
            <Link
              href={`/${currentLocale}/signup`}
              className="text-cyan-600 hover:text-cyan-700 underline"
            >
              {t("common.signup")}
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
