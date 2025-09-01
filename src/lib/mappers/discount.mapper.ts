import type { DiscountDetails } from "$lib/types";
import type { AppliedDiscountDTO } from "commercify-api-client";

export const discountDetailsMapper = (
    dto: AppliedDiscountDTO | undefined
): DiscountDetails | undefined => {
    if (!dto) return undefined;

    const validTypes = ['percentage', 'fixed'];
    if (!validTypes.includes(dto.type)) {
        console.warn(`Invalid discount type: ${dto.type}. Defaulting to 'fixed'.`);
        dto.type = 'fixed';
    }

    const validMethods = ['basket', 'item'];

    if (!validMethods.includes(dto.method)) {
        console.warn(`Invalid discount method: ${dto.method}. Defaulting to 'basket'.`);
        dto.method = 'basket';
    }

    return {
        code: dto.code,
        amount: dto.amount,
        value: dto.value,
        type: dto.type as 'percentage' | 'fixed',
        method: dto.method as 'basket' | 'item'
    };
};
