/**
 * User model interface
 */
export interface IUser {
    id: string;
    email: string;
    domain: string;
    firstName: string;
    lastName: string;
    permissions: string[] | null;
    roles: string[];
    twoFactorEnabled: boolean;
    username: string;
    active: boolean;
    createdAt: string;
    lastLoginAt: string;
    phoneNumber: string;
    departments: string[] | null;
    googleImageUrl: string | null;
    googleRefreshToken: string | null;
    emailConfirmed: boolean;
  }
  
  
  
  