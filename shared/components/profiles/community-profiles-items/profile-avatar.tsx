'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar'
import { cn } from '@/shared/lib/utils'
import { CircleUser } from 'lucide-react'
import React from 'react'

interface Props {
	avatarImage: string
	avatarSize?: number
	className?: string
}

export const ProfileAvatar: React.FC<Props> = ({
	                                               avatarImage,
	                                               avatarSize,
	                                               className
                                               }) => {
	
	return (
		<Avatar
			className={cn('border-[1px] border-transparent rounded-full hover:bg-blue-700', className)}>
			<AvatarImage
				className='m-auto rounded-full'
				src={avatarImage}
				style={{ width: avatarSize, height: avatarSize }}
			/>
			<AvatarFallback>
				<CircleUser />
			</AvatarFallback>
		</Avatar>
	)
}
