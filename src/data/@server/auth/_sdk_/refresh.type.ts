export type RefreshRequest = {
  
    body: {
        refreshToken: string;
        domain: string;
    }
}
export type RefreshResponse = {
    200: {
        Errors: null;
        IsSuccess: true;
        Message: string;
        Data: {
            AccessToken: string;
            RefreshToken: string;
            ExpiresAt: string;
            RequiresTwoFactor: boolean;
            User: {
                Active: boolean;
                CreateDate: string;
                Departments: string[] | null;
                Domain: string;
                Email: string;
                EmailConfirmed: boolean;
                FirstName: string;
                GoogleImageUrl: string | null;
                GoogleRefreshToken: string | null;
                Id: string;
                LastLoginAt: string;
                LastName: string;
                Permissions: string[] | null;
                PhoneNumber: string;
                Roles: string[];
                TwoFactorEnabled: boolean;
                Username: string;
            };
        }
    }
}
export type RefreshError = {
    [key:number]: {
        Data: null;
        IsSuccess: false;
        Message: string;
        Errors: null;
    }
}