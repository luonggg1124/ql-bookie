'use client';
import { useState } from "react";

import { IUser } from "@/data/models/user";


import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { AuthSdk } from "@/data/@client/auth/_sdk_";
import { useQueryClient } from "@tanstack/react-query";

const AUTH_STORAGE_KEY = "auth-store";
function getInitialState(): Pick<AuthStore, "user" | "permissions"> {
  if (typeof window === "undefined") {
    return {
      user: undefined,
      permissions: [],
    };
  }


  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);


    if (!raw) {
      return {
        user: undefined,
        permissions: [],
      };
    }
    const parsed = JSON.parse(raw);

    return {
      user: parsed?.state?.user ?? undefined,
      permissions: Array.isArray(parsed?.state?.permissions)
        ? parsed.state.permissions
        : [],
    };
  } catch {
    return {
      user: undefined,
      permissions: [],
    };
  }
}
const initialState = getInitialState();



type AuthStore = {
  user?: IUser;
  permissions: string[];
  setUser: (next?: IUser) => void;
  setPermissions: (next: string[]) => void;
  clear: () => void;
};

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set) => ({
        user: initialState?.user,
        permissions: initialState?.permissions,

        setUser: (next) =>
          set({ user: next }, false, "auth/setUser"),

        setPermissions: (next) =>
          set({ permissions: next }, false, "auth/setPermissions"),

        clear: () =>
          set(
            { user: undefined, permissions: [] },
            false,
            "auth/clear"
          ),
      }),
      {
        name: AUTH_STORAGE_KEY,
        // CHỈ tăng version khi sửa những thứ ảnh hưởng tới dữ liệu đã persist
        version: 2,
        partialize: (s) => ({
          user: s.user,
          permissions: s.permissions,
        }),
        migrate: (persistedState, oldVersion) => {
          const state = persistedState as Partial<AuthStore>;
          if (oldVersion < 2) {
            return {
              user: state.user ?? undefined,
              permissions: Array.isArray(state.permissions)
                ? state.permissions
                : [],
            };
          }
          return {
            user: state.user ?? undefined,
            permissions: state.permissions ?? [],
          };
        },
      }
    ),
    { name: "auth-store-devtools" }
  )
);
const useAuth = () => {
  const queryClient = useQueryClient();
  const user = useAuthStore((s) => s.user);
  const permissions = useAuthStore((s) => s.permissions);
  const setUser = useAuthStore((s) => s.setUser);
  const setPermissions = useAuthStore((s) => s.setPermissions);
  const clear = useAuthStore((s) => s.clear);
  const [loading, setLoading] = useState<boolean>(false);
  const [logoutLoading, setLogoutLoading] = useState<boolean>(false);

  const login = async (request: {
    username: string;
    password: string;
    rememberMe: boolean;
    domain: string;
  }) => {
    try {
      setLoading(true);
      const { error, data } = await AuthSdk.login({ body: request });

      if (error) {
        throw new Error("Đăng nhập không thành công!");
      }


      if (data?.user) {

        setUser(data.user);
      }
      if (data?.permissions) {


        setPermissions(data.permissions);
      }
    } catch (error) {
      throw new Error((error as Error)?.message || "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLogoutLoading(true);
      await AuthSdk.logout();
    } finally {
      clear();
      useAuthStore.persist.clearStorage();
      queryClient.clear();
      setLogoutLoading(false);
    }
  };

  return {
    login,
    logout,
    loading,
    logoutLoading,
    user: user ?? undefined,
    permissions,
  };
};

export { useAuth };
