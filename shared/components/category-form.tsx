'use client'

import { CategoryItem, CategoryItemProps } from '@/shared/components/category-item'
import { Title } from '@/shared/components/title'
import { cn } from '@/shared/lib/utils'
import { ChevronDown, ChevronUp } from 'lucide-react'
import React from 'react'
import { Input } from './ui/input'
import { Skeleton } from './ui/skeleton'

type Item = CategoryItemProps

interface Props {
	title: string
	items: Item[]
	defaultItems?: Item[]
	limit?: number
	loading?: boolean
	searchInputPlaceholder?: string
	name?: string
	hasPost: boolean
	className?: string
}

export const CategoryForm: React.FC<Props> = ({
	                                              title,
	                                              items,
	                                              defaultItems,
	                                              limit = 5,
	                                              searchInputPlaceholder = 'Поиск...',
	                                              name,
	                                              className,
	                                              hasPost,
	                                              loading
                                              }) => {
	const [showAll, setShowAll] = React.useState(false)
	const [searchValue, setSearchValue] = React.useState('')
	const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value)
	}
	
	if (loading) {
		return (
			<div className={className}>
				<Title text={title} size='xs' className='mb-4' />
				
				{...Array(limit)
					.fill(0)
					.map((_, index) => (
						<Skeleton key={index} className='h-6 mb-4 rounded-[8px]' />
					))}
				
				<Skeleton className='w-28 h-6 mb-4 rounded-[8px]' />
			</div>
		)
	}
	
	const list = showAll
		? items.filter(item =>
			item.text.toLowerCase().includes(searchValue.toLocaleLowerCase())
		)
		: (defaultItems || items).slice(0, limit)
	
	return (
		<div className={cn(hasPost ? 'max-w-[200px]' : '', className)}>
			{!hasPost && <Title text={title} size='xs' className='mb-6 font-bold' />}
			{showAll && (
				<div className={cn(hasPost ? 'mb-2]' : 'mb-5', className)}>
					<Input
						onChange={onChangeSearchInput}
						placeholder={searchInputPlaceholder}
						className='bg-secondary'
					/>
				</div>
			)}
			
			<div className='flex flex-col max-h-[245px] pr-2 overflow-auto scrollbar'>
				{list.map((item, index) => (
					<CategoryItem
						key={index}
						text={item.text}
						image={item.image}
						url={item.url}
						value={item.value}
						endAdornment={item.endAdornment}
						name={name}
					/>
				))}
			</div>
			
			{items.length > limit && (
				<div className='border-b border-b-secondary'>
					<button
						onClick={() => setShowAll(!showAll)}
						className='text-primary mb-3 mt-3 w-full'
					>
						{showAll ? (
							<div className='flex flex-1 items-center'>
								<ChevronUp className='mx-3' />
								<p className='font-bold'>Скрыть</p>
							</div>
						) : (
							<div className='flex flex-1 items-center'>
								<ChevronDown className='mx-3' />
								<p className='font-bold'>Показать все</p>
							</div>)}
					</button>
				</div>
			)}
		</div>
	)
}
