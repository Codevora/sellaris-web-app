type RouteMetadata = {
 title: string;
 description?: string;
};

export const routeMetadata: Record<string, RouteMetadata> = {
 "/admin/dashboard": {
  title: "Dashboard",
  description: "Administration panel overview",
 },
 "/admin/dashboard/packages": {
  title: "Package Management",
  description: "Manage service packages",
 },
 "/admin/dashboard/user-management": {
  title: "User Management",
  description: "Manage system users and permissions",
 },
 "/admin/dashboard/payment-methods": {
  title: "Payment Methods",
  description: "Manage payment methods for subscriptions",
 },
 "/admin/dashboard/settings": {
  title: "System Settings",
  description: "Configure application settings",
 },
};
