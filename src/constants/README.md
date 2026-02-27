# Constants

Thư mục chứa các hằng số dùng chung trong ứng dụng: cookie, permission và điểm xuất tập trung qua `index.ts`.

## Cấu trúc

```
constants/
├── index.ts        # Xuất tập trung CONSTANTS, GLOBAL_COOKIES, PERMISSION_ACTIONS
├── cookie.ts       # Cấu hình key & options cho cookie
├── permission.ts   # Định nghĩa mã hành động quyền (permission actions)
└── README.md
```

## Sử dụng

```ts
import { CONSTANTS, GLOBAL_COOKIES, PERMISSION_ACTIONS } from "@/constants";
// hoặc
import CONSTANTS from "@/constants";
```

---

## 1. `cookie.ts` — Cookie

Định nghĩa **key** và **options** cho các cookie toàn cục (auth, sidebar, …).

### Types

- **`CookieOptions`**: `path`, `domain`, `maxAge`, `secure`, `sameSite`, `httpOnly`
- **`CookieKeyConfig`**: `{ KEY: string; OPTIONS: CookieOptions }`
- **`GlobalCookieKey`**: cấu trúc cây cho từng nhóm cookie

### `GLOBAL_COOKIES`

| Nhóm   | Key                | Mô tả                          |
|--------|--------------------|---------------------------------|
| AUTH   | TOKEN              | Token xác thực (httpOnly)      |
| AUTH   | USER               | Thông tin user (client đọc được) |
| AUTH   | AUTHORIZATION      | Chuỗi authorization (client đọc được) |
| SIDEBAR| HISTORY            | Lịch sử sidebar (30 ngày)       |

Auth cookie dùng `maxAge` 3 ngày. Dùng `GLOBAL_COOKIES.AUTH.TOKEN.KEY` khi đọc/ghi cookie, và `OPTIONS` khi set cookie (path, maxAge, httpOnly, …).

---

## 2. `permission.ts` — Permission actions

**`PERMISSION_ACTIONS`** là object cố định (`as const`) chứa **mã hành động quyền** (string) dùng để:

- Kiểm tra quyền trên UI (ví dụ: ẩn/hiện menu, nút)
- Gửi lên API / RBAC khi cần
- Gán quyền cho role (trong màn hình vai trò / permission)

### Cấu trúc

Mã có dạng `"domain.action"` hoặc `"domain.sub.action"`, nhóm theo module:

| Module         | Ví dụ key                          | Ví dụ action string           |
|----------------|-------------------------------------|-------------------------------|
| HOME           | `PERMISSION_ACTIONS.HOME.VIEW`      | `"home.view"`                 |
| PERMISSION     | ACCOUNT, ROLE, LIST                 | `"accounts.view"`, `"roles.manage"`, `"role.assignments"` |
| BOOKING        | CLIENT, PATIENT, APPOINTMENT, BRANCH, PROVIDER, SERVICE, … | `"booking.client.view"`, `"booking.branch.create"` |
| CLINIC         | DASHBOARD, PATIENT, APPOINTMENT     | `"clinic.patient.treatment.create"` |
| CUSTOMER_CARE  | FEEDBACK, MINI_GAME, VOUCHER        | `"customer_care.voucher.update"` |
| SYSTEM         | PROVINCE, CONFIGURATION, CONNECTION, TASK | `"system.configuration.update"` |
| CMS            | SERVICE, SERVICE_CATEGORY, NEWS_CATEGORY, NEWS, DOCTOR | `"cms.service.delete"` |

### Ví dụ

```ts
import { PERMISSION_ACTIONS } from "@/constants";

// Kiểm tra quyền (tuỳ cách bạn implement hasPermission)
if (hasPermission(user, PERMISSION_ACTIONS.PERMISSION.ROLE.MANAGE)) {
  // Hiển thị nút "Quản lý vai trò"
}

// Gán quyền cho role (payload API)
const permissionsToAssign = [
  PERMISSION_ACTIONS.BOOKING.BRANCH.VIEW,
  PERMISSION_ACTIONS.BOOKING.BRANCH.CREATE,
];
```

**Lưu ý:** Các giá trị trong `PERMISSION_ACTIONS` phải trùng với mã quyền mà backend/RBAC đang dùng. Khi thêm action mới, cập nhật cả `permission.ts` và backend.

---

## 3. `index.ts`

Xuất lại toàn bộ:

- **`CONSTANTS`**: object gộp `{ GLOBAL_COOKIES, PERMISSION_ACTIONS }`
- **`GLOBAL_COOKIES`**, **`PERMISSION_ACTIONS`**: xuất trực tiếp để import theo tên
- **default export**: `CONSTANTS`

Nên import theo tên (`GLOBAL_COOKIES`, `PERMISSION_ACTIONS`) để code rõ ràng và tree-shaking tốt hơn.
