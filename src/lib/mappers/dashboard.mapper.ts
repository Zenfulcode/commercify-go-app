import type { AdminDashboardStats, AdminPercentageChange, AdminRecentOrderSummary, AdminTopProductSummary } from "$lib/types/dashboard";
import type { DashboardStats, PercentageChange, RecentOrderSummary, ResponseDTO, TopProductSummary } from "commercify-api-client";

export const dashboardStatsMapper = (
    dto: ResponseDTO<DashboardStats>
): {
    data: AdminDashboardStats | null;
    success: boolean;
    error?: string;
} => {
    if (!dto.success || !dto.data) {
        return {
            data: null,
            success: false,
            error: dto.error || 'Category not found'
        };
    }

    return {
        data: statsMapper(dto.data),
        success: true,
        error: undefined
    };
};

const statsMapper = (dto: DashboardStats): AdminDashboardStats => {
    return {
        totalRevenue: dto.total_revenue,
        totalOrders: dto.total_orders,
        totalCustomers: dto.total_customers,
        newCustomers: dto.new_customers,
        totalProducts: dto.total_products,
        lowStockProducts: dto.low_stock_products,
        revenueChange: mapPercentageChange(dto.revenue_change),
        ordersChange: mapPercentageChange(dto.orders_change),
        recentOrders: recentOrderSummaryMapper(dto.recent_orders),
        topProducts: topProductSummaryMapper(dto.top_products),
        periodStart: dto.period_start,
        periodEnd: dto.period_end
    };
}

const mapPercentageChange = (dto?: PercentageChange): AdminPercentageChange => {
    let change = {
        value: dto?.value || 0,
        direction: dto?.direction || 'up'
    };

    if (dto?.direction === 'stable') {
        change = { value: 0, direction: 'up' };
    }

    return change;
};

const recentOrderSummaryMapper = (dto: RecentOrderSummary[]): AdminRecentOrderSummary[] => {
    return dto.map(item => ({
        id: item.id,
        orderNumber: item.order_number,
        customerName: item.customer_name,
        customerEmail: item.customer_email,
        totalAmount: item.total_amount,
        status: item.status,
        createdAt: item.created_at
    }));
};

const topProductSummaryMapper = (dto: TopProductSummary[]): AdminTopProductSummary[] => {
    return dto.map(item => ({
        productId: item.product_id,
        productName: item.product_name,
        variantId: item.variant_id,
        variantName: item.variant_name,
        quantitySold: item.quantity_sold,
        revenue: item.revenue
    }));
};
