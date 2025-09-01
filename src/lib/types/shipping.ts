export interface ShippingOption {
	methodId: number;
	name: string;
	description: string;
	cost: number;
	estimatedDelivery: number;
	freeShipping: boolean;
}

export interface ShippingMethod {
	id: number;
	name: string;
	description: string;
	active: boolean;
	createdAt: string;
	updatedAt: string;
}

export interface ShippingZone {
	id: string;
	name: string;
	description: string;
	countries: string[];
	active: boolean
	createdAt: string;
	updated_at: string;
}

export interface ShippingRate {
	id: string;
	shipping_method_id: number;
	shipping_method: ShippingMethod;
	shipping_zone_id: string;
	shipping_zone: ShippingZone;
	base_rate: number;
	min_order_value: number;
	free_shipping_threshold: number;
	weight_based_rates: WeightBasedRate[];
	value_based_rates: ValueBasedRate[];
	active: string
	created_at: string;
	updated_at: string;
}

export interface WeightBasedRate {
	min_weight: number;
	max_weight: number;
	rate: number;
}

export interface ValueBasedRate {
	min_value: number;
	max_value: number;
	rate: number;
}