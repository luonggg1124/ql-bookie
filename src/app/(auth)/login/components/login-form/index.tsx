"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Eye, EyeOff, Lock, User, Globe } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const loginSchema = z.object({
  domain: z.string().min(1, "Vui lòng nhập domain"),
  account: z.string().min(1, "Vui lòng nhập tài khoản"),
  password: z.string().min(1, "Vui lòng nhập mật khẩu"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      // TODO: Implement login logic here
      console.log("Login data:", data);
      // Example: await login(data);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Đăng nhập</CardTitle>
        <CardDescription>
          Nhập thông tin đăng nhập để truy cập hệ thống
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Domain Field */}
          <div className="space-y-2">
            <Label htmlFor="domain">Domain</Label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                id="domain"
                type="text"
                placeholder="Nhập domain"
                className="pl-9"
                {...register("domain")}
                aria-invalid={errors.domain ? "true" : "false"}
              />
            </div>
            {errors.domain && (
              <p className="text-sm text-destructive">{errors.domain.message}</p>
            )}
          </div>

          {/* Account Field */}
          <div className="space-y-2">
            <Label htmlFor="account">Tài khoản</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                id="account"
                type="text"
                placeholder="Nhập tài khoản"
                className="pl-9"
                {...register("account")}
                aria-invalid={errors.account ? "true" : "false"}
              />
            </div>
            {errors.account && (
              <p className="text-sm text-destructive">{errors.account.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password">Mật khẩu</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Nhập mật khẩu"
                className="pl-9 pr-9"
                {...register("password")}
                aria-invalid={errors.password ? "true" : "false"}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-destructive">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
