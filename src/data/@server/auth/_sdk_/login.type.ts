export type LoginRequest = {
  body: {
    username: string;
    password: string;
    rememberMe: boolean;
    domain: string;
  };
};
export type LoginError = {
  500: {
    Data: null;
    IsSuccess: false;
    Message: string;
    Errors: null;
  };
  400: {
    Data: null;
    IsSuccess: false;
    Message: string;
    Errors: null;
  };
};

export type LoginResponse = {
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
    };
  };
};
