import { Button } from '@nextui-org/react';

export function Sidebar() {
	const sidebarSections = [
		{
			text: 'new chat',
			icon: <i className='ri-ai-generate ri-xl'></i>,
		},
		{
			text: 'threads',
			icon: <i className='ri-arrow-up-line ri-xl'></i>,
		},
		{
			text: 'settings',
			icon: <i className='ri-arrow-up-circle-fill ri-xl'></i>,
		},
	];
	return (
		<div className='h-full max-w-[260px] border-small px-1 py-6 border-default-200 dark:border-default-100'>
			<div className='h-full flex flex-col justify-between'>
				{sidebarSections.map((section, i) => {
					return (
						<div key={i} className='w-full mx-auto flex flex-row justify-center leading-4'>
							<Button className='w-full' color='primary' variant='light'>
								{section.icon}&nbsp;<p>{section.text}</p>
							</Button>
						</div>
					);
				})}
			</div>
		</div>
	);
}
