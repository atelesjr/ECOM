import Link from 'next/link';

const ReturnPage = async ({
	searchParams,
}: {
	searchParams: Promise<{ session_id: string | undefined }>;
}) => {
	const sessionId = (await searchParams)?.session_id;

	if (!sessionId) {
		return <div>No session Id found</div>;
	}

	const res = await fetch(
		`${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL}/sessions/${sessionId}`,
	);
	const data = await res.json();

	console.log('Session data received:', data);

	return (
		<div className="">
			<h1>Payment {data.status}</h1>
			<p>Payment status: {data.paymentStatus}</p>
			<Link href="/orders">See your orders</Link>
		</div>
	);
};

export default ReturnPage;
