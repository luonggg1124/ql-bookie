import {
  InternalServerErrorException,
  throwExceptionByStatus,
} from "@/exceptions";
import {
  AdministrativeBoundary,
  AdministrativeBoundarySdk,
  AdministrativeBoundaryType,
} from "../_sdk_";

export interface IAdministrativeBoundary {
  id: string;
  code: string;
  hcType: string;
  active: boolean;
  newData: boolean;
  parent: string | null;
  shortText: string;
  text: string;
  priority: number;
}

const transformAdministrativeBoundary = (
  data: AdministrativeBoundary[]
): IAdministrativeBoundary[] => {
  return data.map((item) => ({
    id: item.Id,
    code: item.Code,
    hcType: item.HCType,
    active: item.Active,
    newData: item.NewData,
    parent: item.Parent,
    shortText: item.ShortText,
    text: item.Text,
    priority: item.UuTien,
  }));
};

export const getAdministrativeBoundary = async ({
  query,
}: {
  query?: {
    newData?: boolean;
    type?: AdministrativeBoundaryType;
    idParent?: string;
  };
}) => {
  const { response, error, data } =
    await AdministrativeBoundarySdk.getAdministrativeBoundary({
      queries: query,
    });

  if (error) {
    throwExceptionByStatus(
      response?.status || 500,
      error?.Message || "Lỗi khi lấy danh sách đơn vị hành chính"
    );
  }

  if (!data) {
    throw new InternalServerErrorException("Không có dữ liệu");
  }

  return transformAdministrativeBoundary(data) || [];
};

