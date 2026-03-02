'use client';

import { ShippingFormInputs } from '@repo/types';
import { PaymentElement, useCheckout } from '@stripe/react-stripe-js/checkout';
import { ConfirmError } from '@stripe/stripe-js';
import { useState } from 'react';

const CheckoutForm = ({
	shippingForm,
}: {
	shippingForm: ShippingFormInputs;
}) => {
	const checkout = useCheckout();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<ConfirmError | null>(null);

	const handleClick = async () => {
		if (checkout.type !== 'success') return;

		setLoading(true);

		await checkout.checkout.updateEmail(shippingForm.email);
		await checkout.checkout.updateShippingAddress({
			name: 'shipping_address',
			address: {
				line1: shippingForm.address,
				city: shippingForm.city,
				country: 'US',
			},
		});

		console.log('Shipping address updated:', {
			line1: shippingForm.address,
			city: shippingForm.city,
			country: 'US',
		});

		const res = await checkout.checkout.confirm();
		if (res.type === 'error') {
			setError(res.error);
		}

		setLoading(false);
	};

	return (
		<form>
			<PaymentElement options={{ layout: 'accordion' }} />
			<button disabled={loading} onClick={handleClick}>
				{loading ? 'Loading...' : 'Pay'}
			</button>
			{error && <div className="">{error.message}</div>}
		</form>
	);
};

export default CheckoutForm;
