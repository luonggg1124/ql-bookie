import { BadRequestException } from "@/exceptions";


/**
 * Validate required string field
 */
const validateRequired = (value: unknown, fieldName: string, message: string): void => {
  if (!value || (typeof value === "string" && !value.trim())) {
    throw new BadRequestException(message || `${fieldName} không được để trống`);
  }
};

/**
 * Validate login request data
 * @throws {BadRequestException} Nếu validation fail
 */
type LoginRequest = {
  username: string;
  password: string;
  domain: string;
  rememberMe: boolean;
};
export const validate = (request: LoginRequest): void => {
  validateRequired(request.username, "Tài khoản", "Tài khoản không được để trống");
  validateRequired(request.password, "Mật khẩu", "Mật khẩu không được để trống");
  validateRequired(request.domain, "Domain", "Domain không được để trống");
};
