import { useState, useEffect } from 'react';

function useOrderForm() {
	const initialOrderForm = window?.API?.orderForm;

	const [loading, setLoading] = useState(false);
	const [orderForm, setOrderForm] = useState(initialOrderForm);
	const [shippingData, setShippingData] = useState(
		initialOrderForm?.shippingData
	);

	const orderFormUpdatedCb = (_, orderForm) => {
		setOrderForm(orderForm);
		setShippingData(orderForm?.shippingData);
	};

	const checkoutRequestBeginCb = () => {
		setLoading(true);
	};

	const checkoutRequestEndCb = () => {
		setTimeout(() => {
			setLoading(false);
		}, 1000);
	};

	useEffect(() => {
		$(window).on('orderFormUpdated.vtex', orderFormUpdatedCb);
		$(window).on('checkoutRequestBegin.vtex', checkoutRequestBeginCb);
		$(window).on('checkoutRequestEnd.vtex', checkoutRequestEndCb);

		return () => {
			$(window).off('orderFormUpdated.vtex', orderFormUpdatedCb);
			$(window).off('checkoutRequestBegin.vtex', checkoutRequestBeginCb);
			$(window).off('checkoutRequestEnd.vtex', checkoutRequestEndCb);
		};
	}, []);

	return { loading, orderForm, shippingData };
}
export default useOrderForm;
