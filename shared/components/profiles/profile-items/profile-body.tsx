import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import React from 'react'

interface Props {
	profileDescription?: string
	profileFollowers: number
	profileFollowing?: number
	hasUser: boolean
	className?: string
}

export const ProfileBody: React.FC<Props> = ({
	                                             profileDescription,
	                                             profileFollowers,
	                                             profileFollowing,
	                                             hasUser,
	                                             className
                                             }) => {
	return (
		<div className={cn('mx-6', className)}>
			<p className='text-md mt-2'>{profileDescription}</p>
			<div className='flex flex-1 items-center mt-2'>
				<p className='text-md font-bold'>{profileFollowers} подписчиков</p>
				{hasUser && <p className='ml-4 text-md font-bold'>{profileFollowing} подписки</p>}
			</div>
			<div className='flex mt-2'>
				<Button
					variant='secondary'
					className='h-10 w-26 text-md font-bold mt-auto hover:border-blue-600 border-b-4 rounded-none px-0'
					type='button'
					// onClick={() => router.push('/write')}
				>
					Посты
				</Button>
				{hasUser &&
					<>
						<Button
							variant='secondary'
							className='h-10 w-26 text-md font-bold mt-auto hover:border-blue-600 border-b-4 ml-8 rounded-none px-0'
							type='button'
							// onClick={() => router.push('/write')}
						>
							Комментарии
						</Button>
					</>
				}
				{!hasUser &&
					<>
						<Button
							variant='secondary'
							className='h-10 w-26 text-md font-bold mt-auto hover:border-blue-600 border-b-4 ml-8 rounded-none px-0'
							type='button'
							// onClick={() => router.push('/write')}
						>
							Команда
						</Button>
					</>
				}
			</div>
		</div>
	)
}
