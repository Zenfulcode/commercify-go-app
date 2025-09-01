import type { Address, DiscountDetails, ShippingOption } from '$lib/types';
import type { AddressDTO, AppliedDiscountDTO, ShippingOptionDTO } from 'commercify-api-client';

export const addressMapper = (dto: AddressDTO): Address => {
	if (!dto) return { street1: '', city: '', postalCode: '', country: '' };

	return {
		street1: dto.address_line1,
		street2: dto.address_line2 || undefined,
		city: dto.city,
		state: dto.state || undefined,
		postalCode: dto.postal_code,
		country: dto.country
	};
};