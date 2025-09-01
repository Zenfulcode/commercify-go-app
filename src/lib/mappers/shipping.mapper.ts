import type { ShippingMethod, ShippingOption, ShippingZone } from '$lib/types/shipping';
import type { ListResponseDTO, ResponseDTO, ShippingMethodDetailDTO, ShippingOptionDTO, ShippingZoneDTO } from 'commercify-api-client';

export const shippingOptionsListMapper = (
	dto: ListResponseDTO<ShippingOptionDTO>
): ShippingOption[] => {
	if (!dto.data) {
		return [];
	}

	return dto.data.map(mapShippingOption);
};

export const shippingOptionResponseMapper = (dto: ResponseDTO<ShippingOptionDTO>): {
	data: ShippingOption | null, success: boolean, error?: string
} => {
	if (dto.error || !dto.data) {
		return {
			data: null,
			success: false,
			error: dto.error
		}
	}

	return {
		data: mapShippingOption(dto.data),
		success: dto.success
	}
}

export const shippingMethodResponseMapper = (
	dto: ResponseDTO<ShippingMethodDetailDTO>): { data: ShippingMethodDetailDTO | null, success: boolean, error?: string } => {
	if (dto.error || !dto.data) {
		return { data: null, success: false, error: dto.error };
	}

	return {
		data: dto.data,
		success: true
	};
}

const mapShippingOption = (dto: ShippingOptionDTO): ShippingOption => {
	const result: ShippingOption = {
		methodId: dto.shipping_method_id,
		name: dto.name,
		description: dto.description,
		cost: dto.cost,
		freeShipping: dto.free_shipping,
		estimatedDelivery: dto.estimated_delivery_days
	}

	return result;
}

const mapShippingMethod = (dto: ShippingMethodDetailDTO): ShippingMethod => {
	return {
		id: dto.id,
		name: dto.name,
		description: dto.description,
		active: dto.active,
		createdAt: dto.created_at,
		updatedAt: dto.updated_at
	}
}

const mapShippingZone = (dto: ShippingZoneDTO): ShippingZone => {
	return {
		id: dto.id.toString() || '',
		name: dto.name,
		description: dto.description,
		countries: dto.countries,
		active: dto.active,
		createdAt: dto.created_at,
		updated_at: dto.updated_at
	}
}
