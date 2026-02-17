import { auth } from '@clerk/nextjs/server';
const TestPage = async () => {
	try {
		const { getToken } = await auth();
		const token = await getToken();
		const resProduct = await fetch('http://localhost:8000/test', {
			headers: { Authorization: `Bearer ${token}` },
		});
		const dataProduct = await resProduct.json();
		console.log(dataProduct);
	} catch (error) {
		console.error('Error fetching product endpoint:', error);
	}

	try {
		const { getToken } = await auth();
		const token = await getToken();
		const resOrder = await fetch('http://localhost:8001/test', {
			headers: { Authorization: `Bearer ${token}` },
		});
		const dataOrder = await resOrder.json();
		console.log(dataOrder);
	} catch (error) {
		console.error('Error fetching order endpoint:', error);
	}

	// try {
	// 	const { getToken } = await auth();
	// 	const token = await getToken();
	// 	const resPayment = await fetch('http://localhost:8002/test', {
	// 		headers: { Authorization: `Bearer ${token}` },
	// 	});
	// 	const dataPayment = await resPayment.json();
	// 	console.log(dataPayment);
	// } catch (error) {
	// 	console.error('Error fetching payment endpoint:', error);
	// }

	return (
		<div>
			<h1>Teste</h1>
		</div>
	);
};

export default TestPage;
