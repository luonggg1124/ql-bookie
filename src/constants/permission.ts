export const PERMISSION_ACTIONS = {
  DEPARTMENTS: {
    VIEW: "departments.view",
    MANAGE: "departments.manage",
    CREATE: "departments.create",
    UPDATE: "departments.update",
    DELETE: "departments.delete",
  },
  ACCOUNTS: {
    VIEW: "accounts.view",
    MANAGE: "accounts.manage",
    DELETE: "accounts.delete",
  },
  PATIENTS: {
    VIEW: "patients.view",
    MANAGE: "patients.manage",
    CREATE: "patients.create",
    UPDATE: "patients.update",
    DELETE: "patients.delete",
    VIEW_SENSITIVE: "patients.view_sensitive",
    IMPORT: "patients.import",
    EXPORT: "patients.export",
    SEARCH: "patients.search",
    TAGS_MANAGE: "patients.tags.manage",
  },
  APPOINTMENTS: {
    VIEW: "appointments.view",
    MANAGE: "appointments.manage",
    CREATE: "appointments.create",
    UPDATE: "appointments.update",
    DELETE: "appointments.delete",
    BOOK: "appointments.book",
    CANCEL: "appointments.cancel",
    RESCHEDULE: "appointments.reschedule",
    CONFIRM: "appointments.confirm",
  },
  TREATMENTS: {
    VIEW: "treatments.view",
    MANAGE: "treatments.manage",
    CREATE: "treatments.create",
    UPDATE: "treatments.update",
    DELETE: "treatments.delete",
    COMPLETE: "treatments.complete",
  },
  PRESCRIPTIONS: {
    VIEW: "prescriptions.view",
    MANAGE: "prescriptions.manage",
    CREATE: "prescriptions.create",
    UPDATE: "prescriptions.update",
    DELETE: "prescriptions.delete",
  },
  MEDICAL_RECORDS: {
    VIEW: "medical_records.view",
    MANAGE: "medical_records.manage",
    CREATE: "medical_records.create",
    UPDATE: "medical_records.update",
  },
  EHR_DATA: {
    VIEW: "ehr_data.view",
    MANAGE: "ehr_data.manage",
    IMPORT: "ehr_data.import",
    EXPORT: "ehr_data.export",
  },
  FINANCE: {
    VIEW: "finance.view",
    MANAGE: "finance.manage",
  },
  INVOICES: {
    VIEW: "invoices.view",
    MANAGE: "invoices.manage",
    CREATE: "invoices.create",
    UPDATE: "invoices.update",
    DELETE: "invoices.delete",
  },
  PAYMENTS: {
    VIEW: "payments.view",
    MANAGE: "payments.manage",
    PROCESS: "payments.process",
  },
  RCM: {
    VIEW: "rcm.view",
    MANAGE: "rcm.manage",
  },
  RECEIPTS: {
    VIEW: "receipts.view",
    MANAGE: "receipts.manage",
    CREATE: "receipts.create",
  },
  DISBURSEMENTS: {
    VIEW: "disbursements.view",
    MANAGE: "disbursements.manage",
    CREATE: "disbursements.create",
  },
  INVENTORY: {
    VIEW: "inventory.view",
    MANAGE: "inventory.manage",
  },
  STOCK: {
    VIEW: "stock.view",
    MANAGE: "stock.manage",
  },
  STOCK_ITEMS: {
    VIEW: "stock_items.view",
    MANAGE: "stock_items.manage",
  },
  STOCK_TRANSACTIONS: {
    VIEW: "stock_transactions.view",
    MANAGE: "stock_transactions.manage",
  },
  STOCK_ITEM_CATEGORIES: {
    VIEW: "stock_item_categories.view",
    MANAGE: "stock_item_categories.manage",
  },
  DICTIONARY: {
    VIEW: "dictionary.view",
    MANAGE: "dictionary.manage",
    CREATE: "dictionary.create",
    UPDATE: "dictionary.update",
    DELETE: "dictionary.delete",
  },
  SERVICES: {
    VIEW: "services.view",
    MANAGE: "services.manage",
  },
  SERVICE_GROUPS: {
    VIEW: "service_groups.view",
    MANAGE: "service_groups.manage",
  },
  MEDICINES: {
    VIEW: "medicines.view",
    MANAGE: "medicines.manage",
  },
  TAGS: {
    VIEW: "tags.view",
    MANAGE: "tags.manage",
  },
  NOTE_TEMPLATES: {
    VIEW: "note_templates.view",
    MANAGE: "note_templates.manage",
  },
  PROVIDERS: {
    VIEW: "providers.view",
    MANAGE: "providers.manage",
  },
  CLIENTS: {
    VIEW: "clients.view",
    MANAGE: "clients.manage",
    CREATE: "clients.create",
    UPDATE: "clients.update",
    DELETE: "clients.delete",
  },
  HOSPITALS: {
    VIEW: "hospitals.view",
    MANAGE: "hospitals.manage",
  },
  SCHEDULE: {
    VIEW: "schedule.view",
    MANAGE: "schedule.manage",
  },
  SCHEDULE_SETTINGS: {
    VIEW: "schedule_settings.view",
    MANAGE: "schedule_settings.manage",
  },
  RESOURCES: {
    VIEW: "resources.view",
    MANAGE: "resources.manage",
  },
  RESOURCE_FOLDERS: {
    VIEW: "resource_folders.view",
    MANAGE: "resource_folders.manage",
  },
  BRANCHES: {
    VIEW: "branches.view",
    MANAGE: "branches.manage",
  },
  NOTIFICATIONS: {
    VIEW: "notifications.view",
    MANAGE: "notifications.manage",
    SEND: "notifications.send",
  },
  NOTIFICATION_TEMPLATES: {
    VIEW: "notification_templates.view",
    MANAGE: "notification_templates.manage",
  },
  REPORTS: {
    VIEW: "reports.view",
    GENERATE: "reports.generate",
    EXPORT: "reports.export",
  },
  ANALYTICS: {
    VIEW: "analytics.view",
    GENERATE: "analytics.generate",
  },
  STATISTICS: {
    VIEW: "statistics.view",
  },
  CRM: {
    VIEW: "crm.view",
    MANAGE: "crm.manage",
  },
  REVIEWS: {
    VIEW: "reviews.view",
    MANAGE: "reviews.manage",
    DELETE: "reviews.delete",
  },
  INSIGHTS: {
    VIEW: "insights.view",
    MANAGE: "insights.manage",
  },
  VOUCHERS: {
    VIEW: "vouchers.view",
    MANAGE: "vouchers.manage",
  },
  MINIGAMES: {
    VIEW: "minigames.view",
    MANAGE: "minigames.manage",
  },
  CONTENT: {
    VIEW: "content.view",
    MANAGE: "content.manage",
    PUBLISH: "content.publish",
    DELETE: "content.delete",
  },
  NEWS: {
    VIEW: "news.view",
    MANAGE: "news.manage",
    PUBLISH: "news.publish",
  },
  NEWS_CATEGORIES: {
    VIEW: "news_categories.view",
    MANAGE: "news_categories.manage",
  },
  WEBSITE_TEMPLATES: {
    VIEW: "website_templates.view",
    MANAGE: "website_templates.manage",
  },
  BOOKING: {
    VIEW: "booking.view",
    MANAGE: "booking.manage",
  },
  BOOKING_SETTINGS: {
    VIEW: "booking_settings.view",
    MANAGE: "booking_settings.manage",
  },
  PATIENT_PORTAL: {
    VIEW: "patient_portal.view",
    MANAGE: "patient_portal.manage",
  },
  QUEUE: {
    VIEW: "queue.view",
    MANAGE: "queue.manage",
  },
  REMINDERS: {
    VIEW: "reminders.view",
    MANAGE: "reminders.manage",
    SEND: "reminders.send",
  },
  INTEGRATIONS: {
    VIEW: "integrations.view",
    MANAGE: "integrations.manage",
    CONFIGURE: "integrations.configure",
  },
  CLOUD_SERVICES: {
    VIEW: "cloud_services.view",
    MANAGE: "cloud_services.manage",
  },
  ZALO_OA: {
    VIEW: "zalo_oa.view",
    MANAGE: "zalo_oa.manage",
  },
  ROLES: {
    VIEW: "roles.view",
    MANAGE: "roles.manage",
    CREATE: "roles.create",
    UPDATE: "roles.update",
    DELETE: "roles.delete",
    ASSIGNMENTS: "roles.assignments",
  },
  PERMISSIONS: {
    VIEW: "permissions.view",
    MANAGE: "permissions.manage",
    ASSIGN: "permissions.assign",
  },
  MENUS: {
    VIEW: "menus.view",
    MANAGE: "menus.manage",
    CREATE: "menus.create",
    UPDATE: "menus.update",
    DELETE: "menus.delete",
  },
  SYSTEM_CONFIG: {
    VIEW: "system.config.view",
    MANAGE: "system.config.manage",
    UPDATE: "system.config.update",
  },
  COMPANY_SETTINGS: {
    VIEW: "company.settings.view",
    MANAGE: "company.settings.manage",
    UPDATE: "company.settings.update",
  },
  COMPANIES: {
    VIEW: "companies.view",
    MANAGE: "companies.manage",
    CREATE: "companies.create",
    UPDATE: "companies.update",
    DELETE: "companies.delete",
  },
  SUPERADMIN: {
    ACCESS: "superadmin.access",
  },
  SYSTEM_USERS: {
    VIEW: "system.users.view",
    MANAGE: "system.users.manage",
  },
  DOMAINS: {
    VIEW: "domains.view",
    MANAGE: "domains.manage",
    CREATE: "domains.create",
    UPDATE: "domains.update",
    DELETE: "domains.delete",
  },
  SUBSCRIPTIONS: {
    VIEW: "subscriptions.view",
    MANAGE: "subscriptions.manage",
    CREATE: "subscriptions.create",
    UPDATE: "subscriptions.update",
    DELETE: "subscriptions.delete",
  },
  FILES: {
    VIEW: "files.view",
    MANAGE: "files.manage",
    UPLOAD: "files.upload",
    DOWNLOAD: "files.download",
    DELETE: "files.delete",
  },
  PARTNERS: {
    VIEW: "partners.view",
    MANAGE: "partners.manage",
    CREATE: "partners.create",
    UPDATE: "partners.update",
    DELETE: "partners.delete",
  },
  REGISTRATION: {
    VIEW: "registration.view",
    MANAGE: "registration.manage",
    APPROVE: "registration.approve",
    REJECT: "registration.reject",
  },
  EMAILS: {
    VIEW: "emails.view",
    MANAGE: "emails.manage",
    SEND: "emails.send",
  },
  CONNECTIONS: {
    VIEW: "connections.view",
    MANAGE: "connections.manage",
    TEST: "connections.test",
  },
  PROXY: {
    VIEW: "proxy.view",
    MANAGE: "proxy.manage",
    CONFIGURE: "proxy.configure",
  },
  SETUP: {
    VIEW: "setup.view",
    MANAGE: "setup.manage",
    CONFIGURE: "setup.configure",
  },
  CONFIG: {
    VIEW: "config.view",
    MANAGE: "config.manage",
    UPDATE: "config.update",
  },
} as const;