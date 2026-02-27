import apiPaths from "@/paths/api";
import { RefreshResponse } from "../_sdk_/refresh";
import { useAuthStore } from "./auth";


export async function refresh() {
  try {
    const response = await fetch(apiPaths.client.auth.refresh.getPath(), {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      console.log(response,'res err refresh');
      return null;
    }
    
    const data = (await response.json()) as RefreshResponse;

    if (data?.user) {
      useAuthStore.getState().setUser(data.user);
      useAuthStore.getState().setPermissions(data.permissions ?? []);
      return data;
    }

    return null;
  } catch {
    useAuthStore.getState().clear();
    return null;
  }
}
