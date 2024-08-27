'use client'

import { CommentItem, CommentItemProps } from '@/shared/components/comments/comments-items/comment-item'
import { cn } from '@/shared/lib/utils'
import Link from 'next/link'
import React from 'react'
import { Skeleton } from '../../ui/skeleton'

type Item = CommentItemProps

interface Props {
	items: Item[]
	limit?: number
	loading?: boolean
	maxLengthHeader?: number
	maxLengthBody?: number
	className?: string
}

export const CommentForm: React.FC<Props> = ({
	                                             items,
	                                             limit = 5,
	                                             loading,
	                                             maxLengthHeader,
	                                             maxLengthBody,
	                                             className
                                             }) => {
	
	if (loading) {
		return (
			<div className={className}>
				{...Array(limit)
					.fill(0)
					.map((_, index) => (
						<Skeleton key={index} className='h-6 mb-4 rounded-[8px]' />
					))}
			</div>
		)
	}
	
	return (
		<div className={cn('', className)}>
			<div className='flex flex-col pr-2 overflow-auto scrollbar'>
				{items.map((item, index) => (
					<Link
						key={index}
						href={String(item.postUrl)}>
						<CommentItem
							endAdornment={item.endAdornment}
							postTitle={item.postTitle}
							content={item.content}
							authorName={item.authorName}
							authorUrl={item.authorUrl}
							authorAvatar={item.authorAvatar}
							maxLengthHeader={maxLengthHeader}
							maxLengthBody={maxLengthBody}
							className='bg-secondary/25 hover:bg-primary/5 mb-4'
						/>
					</Link>
				))}
			</div>
		</div>
	)
}
