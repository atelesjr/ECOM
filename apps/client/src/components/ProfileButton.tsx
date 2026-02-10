'use client';

import { UserButton } from '@clerk/nextjs';
import { ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/dist/client/components/navigation';

const ProfileButton = () => {
	const router = useRouter();
	return (
		<UserButton>
			<UserButton.MenuItems>
				<UserButton.Action
					label="See Others"
					labelIcon={<ShoppingBag />}
					onClick={() => router.push('/orders')}
				/>
			</UserButton.MenuItems>
		</UserButton>
	);
};

export default ProfileButton;
