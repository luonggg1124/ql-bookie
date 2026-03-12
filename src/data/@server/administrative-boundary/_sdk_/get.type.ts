export interface AdministrativeBoundary {
  Active: boolean;
  Code: string;
  HCType: string;
  Id: string;
  NewData: boolean;
  Parent: string | null;
  ShortText: string;
  Text: string;
  UuTien: number;
}

export type AdministrativeBoundaryType = "XaPhuong" | "TinhThanh";

export type GetAdministrativeBoundaryRequest = {
  queries?: {
    newData?: boolean;
    type?: AdministrativeBoundaryType;
    idParent?: string;
  };
};

export type GetAdministrativeBoundaryResponse = {
  200: AdministrativeBoundary[];
};

export type GetAdministrativeBoundaryError = {
  400: {
    Message: string;
    Success: boolean;
  };
  401: {
    Message: string;
    Success: boolean;
  };
  500: {
    Message: string;
    Success: boolean;
  };
};

