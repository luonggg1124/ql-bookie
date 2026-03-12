
export type AdministrativeBoundaryType = "XaPhuong" | "TinhThanh";

export interface IAdministrativeBoundaryLite {
  id: string;
  text: string;
  shortText: string;
}

export type GetAdministrativeBoundaryRequest = {
  query?: {
    newData?: boolean;
    type?: AdministrativeBoundaryType;
    idParent?: string;
  };
};

export type GetAdministrativeBoundaryResponse = {
  data: {
    data: IAdministrativeBoundaryLite[];
  };
};

export type GetAdministrativeBoundaryError = {
  400: {
    error: string;
  };
  401: {
    error: string;
  };
  500: {
    error: string;
  };
};

