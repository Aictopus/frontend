import { ReactElement, ReactNode } from 'react'
import { Button } from '../ui/button'
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter
} from '../ui/card'
import { Calendar } from '../ui/calendar' // 导入 Calendar UI 组件
import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent
} from '../ui/accordion' // 导入 Accordion UI 组件

import { OneBlock, NodeOneBlock, NodeTwoBlocks } from '@/components/node/layout'
import { NodeButton } from './button'
import { NodeCard } from './card'
import { NodeCalendar } from './calendar' // 导入 NodeCalendar 组件
import { NodeAccordion } from './accordion'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { NodeAvatar } from './avatar'
import { NodeAlertDialog } from '@/components/node/alert-dialog'
import {
	AlertDialog,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogAction,
	AlertDialogCancel
} from '@/components/ui/alert-dialog'
import { ResizableComponent } from '../resizableComponent'
import { Element } from '@craftjs/core'
import { NodeAlert } from '../node/alert'
import { Alert, AlertTitle, AlertDescription } from '../ui/alert'
import { NodeAspectRatio } from './aspect-ratio'
import { AspectRatio } from '../ui/aspect-ratio'
import { Badge } from '../ui/badge'
import { NodeBadge } from './badge'
import { Checkbox } from '../ui/checkbox'
import { NodeCheckbox } from './checkbox'
import {
	Collapsible,
	CollapsibleTrigger,
	CollapsibleContent
} from '../ui/collapsible'
import { NodeCollapsible } from './collapsible'
import {
	Command,
	CommandInput,
	CommandList,
	CommandGroup,
	CommandItem,
	CommandEmpty
} from '../ui/command'
import { NodeCommand } from './command'
import {
	ContextMenu,
	ContextMenuTrigger,
	ContextMenuContent,
	ContextMenuItem
} from '../ui/context-menu'
import { NodeContextMenu } from './context-menu'
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter
} from '../ui/dialog'
import { NodeDialog } from './dialog'
import { NodeHoverCard } from '@/components/node/hover-card';
import { HoverCardSettings } from '@/components/settings/hover-card';
import { NodeInput } from '@/components/node/input';
import { InputSettings } from '@/components/settings/input';
import { HoverCard } from '@ui/'

export type Components = {
	name: string
	items: {
		name: string
		props?: {
			variant?:
				| 'link'
				| 'default'
				| 'destructive'
				| 'outline'
				| 'secondary'
				| 'ghost'
				| null
				| undefined
			className?: string
			children?: ReactNode | string
		}
		node: ReactElement
		demo?: ReactNode
	}[]
}

export const componentsMap: Components[] = [
	{
		name: 'Buttons',
		items: [
			{
				name: 'Default',
				demo: <Button>Default</Button>,
				node: <NodeButton>Default</NodeButton>
			},
			{
				name: 'Outline',
				props: { variant: 'outline', children: 'Outline' },
				demo: <Button variant={'outline'}>Outline</Button>,
				node: <NodeButton variant={'outline'}>Outline</NodeButton>
			},
			{
				name: 'Destructive',
				props: { variant: 'destructive', children: 'Destructive' },
				demo: <Button variant={'destructive'}>Destructive</Button>,
				node: <NodeButton variant={'destructive'}>Destructive</NodeButton>
			}
		]
	},
	{
		name: 'Cards',
		items: [
			{
				name: 'Default',
				demo: (
					<Card className="w-full">
						<CardHeader>
							<CardTitle>Card Title</CardTitle>
							<CardDescription>Card Description</CardDescription>
						</CardHeader>
						<CardContent>Empty Container</CardContent>
						<CardFooter>
							<Button className="w-full">Footer button</Button>
						</CardFooter>
					</Card>
				),
				node: <NodeCard></NodeCard>
			}
		]
	},
	{
		name: 'Date',
		items: [
			{
				name: 'Calendar',
				demo: (
					<div style={{ display: 'flex', width: 'max-content' }}>
						<Calendar />
					</div>
				),
				node: <Element is={NodeCalendar} canvas />
			}
		]
	},
	{
		name: 'Layout',
		items: [
			{
				name: 'One Block',
				demo: (
					<OneBlock className="text-center italic p-4 bg-yellow-100 outline-dashed outline-amber-400">
						One Block
					</OneBlock>
				),
				node: (
					<Element
						canvas
						is={NodeOneBlock as typeof NodeOneBlock & string}
						id="one-block"
					/>
				)
			},
			{
				name: 'Two Blocks',
				demo: (
					<OneBlock className="text-center italic p-4 bg-yellow-100 outline-dashed outline-amber-400 flex flex-row">
						<OneBlock className="text-center italic bg-yellow-100 outline-dashed outline-amber-400">
							First Block
						</OneBlock>
						<OneBlock className="text-center italic bg-yellow-100 outline-dashed outline-amber-400">
							Second Block
						</OneBlock>
					</OneBlock>
				),
				node: <NodeTwoBlocks></NodeTwoBlocks>
			}
		]
	},
	{
		name: 'Containers',
		items: [
			{
				name: 'Resizable Container',
				demo: (
					<div
						style={{
							width: '200px',
							height: '100px',
							border: '1px solid #ccc',
							padding: '10px'
						}}
					>
						Resizable Container
					</div>
				),
				node: (
					<Element is={ResizableComponent} canvas>
						Resizable Content
					</Element>
				)
			}
		]
	},
	{
		name: 'Accordion',
		items: [
			{
				name: 'Accordion',
				demo: (
					<Accordion type="multiple" className="w-full max-w-md mx-auto">
						<AccordionItem value="item-1" className="border-b">
							<AccordionTrigger className="text-lg font-semibold">
								Is it accessible?
							</AccordionTrigger>
							<AccordionContent className="text-gray-600">
								Yes. It adheres to the WAI-ARIA design pattern.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-2" className="border-b">
							<AccordionTrigger className="text-lg font-semibold">
								Is it styled?
							</AccordionTrigger>
							<AccordionContent className="text-gray-600">
								Yes. It comes with default styles that matches the other
								components aesthetic.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-3">
							<AccordionTrigger className="text-lg font-semibold">
								Is it animated?
							</AccordionTrigger>
							<AccordionContent className="text-gray-600">
								Yes. Its animated by default, but you can disable it if you
								prefer.
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				),
				node: (
					<Element
						is={NodeAccordion}
						canvas
						type="multiple"
						className="w-full max-w-md mx-auto"
						items={[
							{
								triggerText: 'Is it accessible?',
								contentText: 'Yes. It adheres to the WAI-ARIA design pattern.',
								className: 'border-b'
							}
						]}
					/>
				)
			}
		]
	},
	{
		name: 'Avatar',
		items: [
			{
				name: 'Avatar',
				demo: (
					<div className="flex items-center space-x-4">
						<Avatar>
							<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
						<Avatar>
							<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
						<Avatar>
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
					</div>
				),
				node: <Element is={NodeAvatar} canvas />
			}
		]
	},
	{
		name: 'Dialog',
		items: [
			{
				name: 'Alert Dialog',
				demo: (
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button variant="outline">Open</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
								<AlertDialogDescription>
									This action cannot be undone. This will permanently delete
									your account and remove your data from our servers.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<AlertDialogAction>Continue</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				),
				node: <NodeAlertDialog />
			}
		]
	},
	{
		name: 'Feedback',
		items: [
			{
				name: 'Alert',
				demo: (
					<Alert>
						<AlertTitle>Heads up!</AlertTitle>
						<AlertDescription>
							You can add components to your app using the shadcn/ui CLI.
						</AlertDescription>
					</Alert>
				),
				node: <NodeAlert />
			}
		]
	},
	{
		name: 'Layout',
		items: [
			// ... (existing layout components)
			{
				name: 'Aspect Ratio',
				demo: (
					<AspectRatio ratio={16 / 9}>
						<img
							src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
							alt="Image"
						/>
					</AspectRatio>
				),
				node: <NodeAspectRatio />
			}
		]
	},
	{
		name: 'Data Display',
		items: [
			{
				name: 'Badge',
				demo: <Badge>Badge</Badge>,
				node: <NodeBadge>Badge</NodeBadge>
			}
		]
	},
	{
		name: 'Forms',
		items: [
			// ... (existing form components)
			{
				name: 'Checkbox',
				demo: (
					<div className="flex items-center space-x-2">
						<Checkbox id="terms" />
						{/* <Label htmlFor="terms">Accept terms and conditions</Label> */}
					</div>
				),
				node: <NodeCheckbox />
			}
		]
	},
	{
		name: 'Disclosure',
		items: [
			{
				name: 'Collapsible',
				demo: (
					<Collapsible>
						<CollapsibleTrigger>Toggle</CollapsibleTrigger>
						<CollapsibleContent>Content that can be toggled</CollapsibleContent>
					</Collapsible>
				),
				node: <NodeCollapsible />
			}
		]
	},
	{
		name: 'Command',
		items: [
			{
				name: 'Command',
				demo: (
					<Command>
						<CommandInput placeholder="Type a command or search..." />
						<CommandList>
							<CommandEmpty>No results found.</CommandEmpty>
							<CommandGroup heading="Suggestions">
								<CommandItem>Calendar</CommandItem>
								<CommandItem>Search</CommandItem>
								<CommandItem>Graphs</CommandItem>
							</CommandGroup>
							<CommandGroup heading="Settings">
								<CommandItem>Profile</CommandItem>
								<CommandItem>Billing</CommandItem>
								<CommandItem>Settings</CommandItem>
							</CommandGroup>
						</CommandList>
					</Command>
				),
				node: <NodeCommand />
			}
		]
	},
	{
		name: 'Overlay',
		items: [
			{
				name: 'Context Menu',
				demo: (
					<ContextMenu>
						<ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
							Right click here
						</ContextMenuTrigger>
						<ContextMenuContent>
							<ContextMenuItem>Profile</ContextMenuItem>
							<ContextMenuItem>Billing</ContextMenuItem>
							<ContextMenuItem>Team</ContextMenuItem>
							<ContextMenuItem>Subscription</ContextMenuItem>
						</ContextMenuContent>
					</ContextMenu>
				),
				node: <NodeContextMenu />
			},
			{
				name: 'Dialog',
				demo: (
					<Dialog>
						<DialogTrigger asChild>
							<Button variant="outline">Open Dialog</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Are you sure absolutely sure?</DialogTitle>
								<DialogDescription>
									This action cannot be undone. This will permanently delete
									your account and remove your data from our servers.
								</DialogDescription>
							</DialogHeader>
							<DialogFooter>
								<Button type="submit">Confirm</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				),
				node: <NodeDialog />
			}
		]
	},
  {
    name: 'Overlay',
    items: [
      // ... (existing overlay components)
      {
        name: 'Hover Card',
        demo: (
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="link">Hover me</Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">@nextjs</h4>
                <p className="text-sm">
                  The React Framework – created and maintained by @vercel.
                </p>
              </div>
            </HoverCardContent>
          </HoverCard>
        ),
        node: <NodeHoverCard />,
      },
    ],
  },
  {
    name: 'Forms',
    items: [
      // ... (existing form components)
      {
        name: 'Input',
        demo: (
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" />
          </div>
        ),
        node: <NodeInput />,
      },
    ],
  },
]
