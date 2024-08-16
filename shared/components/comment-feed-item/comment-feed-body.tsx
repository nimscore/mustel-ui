import { cn } from '@/shared/lib/utils'
import React from 'react'

export interface CommentItemProps {
	postContent: string
	maxLength: number // Максимальная длина текста для обрезки по символам
	className?: string
}

const truncateText = (text: string, maxLength: number | undefined) => {
	if (maxLength && text.length > maxLength) {
		return text.slice(0, maxLength) + '...'
	}
	return text
}

export const CommentFeedBody: React.FC<CommentItemProps> = ({
	                                                            postContent,
	                                                            maxLength,
	                                                            className
                                                            }) => {
	
	const truncatedContent = truncateText(postContent, maxLength)
	
	return (
		<div className={cn('mt-2', className)}>
			<p>{truncatedContent}</p>
		</div>
	)
}