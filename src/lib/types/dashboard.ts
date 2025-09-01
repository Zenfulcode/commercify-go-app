export type AdminDashboardStats = {
    totalRevenue: number /* int64 */; // in cents
    totalOrders: number /* int64 */;
    totalCustomers: number /* int64 */;
    newCustomers: number /* int64 */;
    totalProducts: number /* int64 */;
    lowStockProducts: number /* int64 */;
    revenueChange?: AdminPercentageChange; // vs previous period
    ordersChange?: AdminPercentageChange; // vs previous period
    recentOrders: AdminRecentOrderSummary[];
    topProducts: AdminTopProductSummary[];
    periodStart: string;
    periodEnd: string;
}

export type AdminRecentOrderSummary = {
    id: number /* uint */;
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    totalAmount: number /* int64 */; // in cents
    status: string;
    createdAt: string;
}

export type AdminTopProductSummary = {
    productId: number /* uint */;
    productName: string;
    variantId?: number /* uint */;
    variantName?: string;
    quantitySold: number /* int64 */;
    revenue: number /* int64 */; // in cents
}

export type AdminPercentageChange = {
    value: number;
    direction: string; //'up' | 'down';
}