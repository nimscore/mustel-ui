import { prisma } from '@/prisma/prisma-client'
import {
	CategoryGroup,
	Container,
	FeedUserMenu,
	NavigationMenuForm,
	NewPostButton,
	SideFooter,
	SocialMenu,
	Title
} from '@/shared/components/'
import { CommentFeedGroup } from '@/shared/components/comment-feed-item/comment-feed-group'
import Header from '@/shared/components/header'
import type { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
	title: 'Stormic Community | Главная'
}

export default async function HomeLayout({
	                                         children,
	                                         modal
                                         }: Readonly<{
	children: React.ReactNode
	modal: React.ReactNode
}>) {
	
	const menu = await prisma.navigationMenu.findMany()
	
	return (
		<main className='min-h-screen'>
			<Suspense>
				<Header />
			</Suspense>
			<Container className='mt-4'>
				<div className='flex gap-4'>
					{/* Левая часть */}
					<div className='w-1/4'>
						<FeedUserMenu />
						<SocialMenu className='my-2' />
						<NewPostButton className='my-4' />
						<NavigationMenuForm className='mt-4' data={menu} />
						<CategoryGroup className='mt-4' />
						<SideFooter className='mt-4' />
					</div>
					
					{/* Центральная часть */}
					<div className='w-2/4'>
						{children}
					</div>
					
					
					{/* Правая часть */}
					<div className='w-1/4'>
						<Title
							text='Сейчас обсуждают'
							size='sm'
							className='font-bold flex items-center w-full h-12 rounded-[6px] bg-secondary/50 pl-2'
						/>
						<CommentFeedGroup />
					</div>
				</div>
			</Container>
			{modal}
		</main>
	)
}
