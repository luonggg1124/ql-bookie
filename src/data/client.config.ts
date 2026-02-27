/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */

import {
    type ClientOptions,
    type Config,
    createClient,
    createConfig,
} from "./client";

import { getToken } from "@/data/utils/cookie";
import { IToken } from "./models/auth";
import { refresh } from "./@client/auth";

export type ClientOptions2 = {
    baseUrl: string;
};

type CreateClientConfig<T extends ClientOptions = ClientOptions2> = (
    override?: Config<ClientOptions & T>
) => Config<Required<ClientOptions> & T>;
//Server SideCreateClientConfig
const apiClient = createClient(
    createConfig<ClientOptions2>({
        baseUrl: process.env.API_BASE_URL,
    })
);

apiClient.interceptors.request.use(async (request) => {
    // If Authorization header is already set (e.g. during refresh flow using new token),
    // do not overwrite it with the stale token from cookies.
    if (request.headers.has("Authorization")) {
        return request;
    }

    const token: IToken | null = await getToken();
    if (token?.access?.value) {
        request.headers.set("Authorization", `Bearer ${token.access.value}`);
    }


    return request;
});

// Client Side
const client = createClient(
    createConfig<ClientOptions2>({
        baseUrl:
            process.env.NODE_ENV === "production"
                ? process.env.NEXT_PUBLIC_BASE_URL
                : "http://localhost:3000",
        credentials: "include"
    })
);


let refreshPromise: Promise<any> | null = null;
// Add refresh token logic to client interceptor


client.interceptors.response.use(async (response, request: any) => {
    if (response.status !== 401) {
        return response;
    }

    if (request.options?.headers?.["x-retried"]) {
        return response;
    }

    if (!refreshPromise) {
        refreshPromise = refresh().finally(() => {
            refreshPromise = null;
        });
    }

    const data = await refreshPromise;

    if (!data) {
        return response;
    }
    const retried = await client.request({
        ...request.options,
        headers: {
            ...request.options.headers,
            "x-retried": "1",
        },
    });

    return retried.response;
});

export { apiClient, client, type CreateClientConfig };
