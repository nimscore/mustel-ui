'use client'

import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command'
import { Search } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface ServerSearchProps {
	data: {
		label: string
		type: 'channel' | 'member'
		data:
			| {
					icon: React.ReactNode
					name: string
					id: string
			  }[]
			| undefined
	}[]
}

export const ServerSearch = ({ data }: ServerSearchProps) => {
	const [open, setOpen] = useState(false)
	const router = useRouter()
	const params = useParams()

	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === ('k' || 'л') && (e.metaKey || e.ctrlKey)) {
				e.preventDefault()
				setOpen(open => !open)
			}
		}

		document.addEventListener('keydown', down)
		return () => document.removeEventListener('keydown', down)
	}, [])

	const onClick = ({
		id,
		type,
	}: {
		id: string
		type: 'channel' | 'member'
	}) => {
		setOpen(false)

		if (type === 'member') {
			return router.push(
				`/community/servers/${params?.serverId}/conversation/${id}`
			)
		}

		if (type === 'channel') {
			return router.push(
				`/community/servers/${params?.serverId}/channels/${id}`
			)
		}
	}

	return (
		<>
			<button
				onClick={() => setOpen(true)}
				className='group px-1 py-[0.3rem] rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-bgColorUiItem transition'
			>
				<Search className='w-4 h-4 text-zinc-500 dark:text-zinc-400' />
				<p className='font-semibold text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition'>
					Поиск
				</p>
				<kbd className='pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded bg-muted dark:bg-bgColorUiItem/60 px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto'>
					<span className='text-xs'>⌘</span>K
				</kbd>
			</button>
			<CommandDialog open={open} onOpenChange={setOpen}>
				<div className='dark:bg-bgColorUiItem/60'>
					<CommandInput placeholder='Поиск среди всех участников и каналов' />
					<CommandList>
						<CommandEmpty>Нет результатов</CommandEmpty>
						{data.map(({ label, type, data }) => {
							if (!data?.length) return null

							return (
								<CommandGroup key={label} heading={label}>
									{data?.map(({ id, icon, name }) => {
										return (
											<CommandItem
												onSelect={() => onClick({ id, type })}
												key={id}
											>
												{icon}
												<span>{name}</span>
											</CommandItem>
										)
									})}
								</CommandGroup>
							)
						})}
					</CommandList>
				</div>
			</CommandDialog>
		</>
	)
}
