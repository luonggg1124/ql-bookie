export type GetMyPermissionRequest = {
    params: {
        domain: string;
    };
    headers: {
        accessToken:string;
    }
}
export type GetMyPermissionResponse = {
    200: {
        success: boolean;
        data: string;
        message: string;
    }
}
export type GetMyPermissionError = {
    [key: number]: {
        message: string;
        error: string;
    }
}