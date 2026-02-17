import { auth } from '@clerk/nextjs/server';
const TestPage = async () => {
	try {
		const { getToken } = await auth();
		const token = await getToken();
		const response = await fetch('http://localhost:8000/test', {
			headers: { Authorization: `Bearer ${token}` },
		});
		const data = await response.json();
		console.log(data);
	} catch (error) {
		console.error('Error fetching test endpoint:', error);
	}

	return (
		<div>
			<h1>Teste</h1>
		</div>
	);
};

export default TestPage;
