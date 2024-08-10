// import React, { useEffect, useRef, useState } from 'react'
// import { Editor, Frame, Element, useEditor } from '@craftjs/core'
// import { ResizableComponent } from '@/components/resizableComponent'
// import { ResizablePanelLayout } from '@/components/resizablePanelLayout'
// import { BasicPanelLayout } from '@/components/BasicPanelLayout'
// import { SideMenu } from '@/components/side-menu'
// import { Canvas } from '@/components/canvas'
// import { NodeButton } from '@/components/node/button'
// import {
// 	NodeCardHeader,
// 	NodeCard,
// 	NodeCardContent,
// 	NodeCardDescription,
// 	NodeCardTitle,
// 	NodeCardFooter
// } from '@/components/node/card'
// import { NodeAlertDialog } from '@/components/node/alert-dialog'
// import { NodeCalendar } from '@/components/node/calendar'
// import { ReactIframe } from '@/components/react-iframe'
// import { ControlPanel } from '@/components/control-panel'
// import { Viewport } from '@/components/viewport'
// import { RenderNode } from '@/components/render-node'
// import { componentsMap } from '@/components/node/components-map'
// import { NodeOneBlock, NodeTwoBlocks } from '@/components/node/layout'
// import { NodeAccordion } from '@/components/node/accordion'
// import { NodeAvatar } from '@/components/node/avatar'
// import { NodeAlert } from '@/components/node/alert'
// import { NodeAspectRatio } from '@/components/node/aspect-ratio'
// import { NodeBadge } from '@/components/node/badge'
// import { NodeCheckbox } from '@/components/node/checkbox'
// import { NodeCollapsible } from '@/components/node/collapsible'
// import { NodeCommand } from '@/components/node/command'
// import { NodeContextMenu } from '@/components/node/context-menu'
// import { NodeDialog } from '@/components/node/dialog'

// import { renderComponents } from '@/lib/componentRenderer'

// const buttonString1 = `
// <ResizableComponent width="95%" height="10%">
//   <div className="bg-gray-800 text-white p-4">
//     <h1 className="text-2xl font-bold">My Application</h1>
//   </div>
// </ResizableComponent>
// <ResizableComponent width="32%" height="50%">
//   <NodeCalendar className="p-4"></NodeCalendar>
// </ResizableComponent>
// <ResizableComponent width="20%" height="50%">
//   <NodeButton className="bg-red-500 text-white px-4 py-2 rounded">
//     Button 1
//   </NodeButton>
// </ResizableComponent>
// <ResizableComponent width="20%" height="50%">
//   <NodeButton>Button 2</NodeButton>
//   <ResizableComponent width="10%" height="10%">
//     <NodeButton className="bg-red-500 text-white px-4 py-2 rounded">
//       Button 1
//     </NodeButton>
//   </ResizableComponent>
// </ResizableComponent>
// <ResizableComponent width="20%" height="50%">
//   <NodeButton>Button 3</NodeButton>
// </ResizableComponent>
// <ResizableComponent width="95%" height="35%">
//   <NodeCard className="p-6 m-2">
//     <NodeCardHeader>
//       <NodeCardTitle className="bg-blue-500 text-white px-4 py-2 rounded">
//         Card Title
//       </NodeCardTitle>
//       <NodeCardDescription className="bg-blue-500 text-white px-4 py-2 rounded">
//         Card Description
//       </NodeCardDescription>
//     </NodeCardHeader>
//     <NodeCardContent></NodeCardContent>
//     <NodeCardFooter>
//       <NodeButton>Footer button</NodeButton>
//     </NodeCardFooter>
//   </NodeCard>
// </ResizableComponent>
// `

// const placeholderString = '<div>Loading...</div>'

// const LoadingComponent = () => <div>Loading...</div>

// const predefinedComponents = [
// 	{
// 		type: ResizableComponent,
// 		props: { width: '95%', height: '10%' },
// 		children: (
// 			<div className="bg-gray-800 text-white p-4">
// 				<h1 className="text-2xl font-bold">My Application</h1>
// 			</div>
// 		)
// 	},
// 	{
// 		type: ResizableComponent,
// 		props: { width: '32%', height: '50%' },
// 		children: <NodeCalendar className="p-4" />
// 	},
// 	{
// 		type: ResizableComponent,
// 		props: { width: '20%', height: '50%' },
// 		children: (
// 			<NodeButton className="bg-red-500 text-white px-4 py-2 rounded">
// 				Button 1
// 			</NodeButton>
// 		)
// 	}
// 	// ... 其他组件定义 ...
// ]

// const SimpleDiv = ({ children, ...props }) => {
// 	return <div {...props}>{children}</div>
// }

// const DynamicContent = () => {
// 	const { actions, query } = useEditor()

// 	useEffect(() => {
// 		const addComponentsSafely = async () => {
// 			try {
// 				console.log('Starting to add components...')

// 				actions.clearEvents()

// 				// 添加一个简单的 div
// 				try {
// 					await new Promise((resolve, reject) => {
// 						actions.add(
// 							<Element canvas is={SimpleDiv} background="blue" padding={20}>
// 								This is a simple div
// 							</Element>,
// 							'ROOT'
// 						)
// 						const addedNode = query.node('simple-div').get()
// 						if (addedNode) {
// 							resolve(addedNode)
// 						} else {
// 							reject(new Error('Failed to add simple div'))
// 						}
// 					})
// 					console.log('Successfully added simple div')
// 				} catch (error) {
// 					console.error('Error adding simple div:', error)
// 				}

// 				console.log('Finished adding components')
// 			} catch (error) {
// 				console.error('Error in addComponentsSafely:', error)
// 			}
// 		}

// 		setTimeout(addComponentsSafely, 100)
// 	}, [actions, query])

// 	return null
// }

// export default function Home() {
// 	const [buttonString, setButtonString] = useState(placeholderString)
// 	const iframeRef = useRef(null)

// 	useEffect(() => {
// 		// 模拟加载过程
// 		setTimeout(() => {
// 			setButtonString(buttonString1)
// 		}, 100) // 100ms 延迟，模拟很短的加载时间
// 	}, [])

// 	const components = renderComponents(buttonString1)

// 	useEffect(() => {
// 		const handleMessage = (event) => {
// 			if (
// 				event.data.type === 'RESIZABLE_COMPONENT_MOUNTED' &&
// 				iframeRef.current
// 			) {
// 				const iframe = iframeRef.current
// 				const iframeDocument =
// 					iframe.contentDocument || iframe.contentWindow.document

// 				const initResize = (direction) => (e) => {
// 					e.preventDefault()
// 					const startX = e.clientX
// 					const startY = e.clientY
// 					iframe.contentWindow.postMessage(
// 						{ type: 'INIT_RESIZE', direction, startX, startY },
// 						'*'
// 					)
// 				}

// 				const resizeHandles = iframeDocument.querySelectorAll('.resize-handle')
// 				resizeHandles.forEach((handle) => {
// 					if (handle.classList.contains('right')) {
// 						handle.addEventListener('mousedown', initResize('horizontal'))
// 					} else if (handle.classList.contains('bottom')) {
// 						handle.addEventListener('mousedown', initResize('vertical'))
// 					} else if (handle.classList.contains('corner')) {
// 						handle.addEventListener('mousedown', initResize('both'))
// 					}
// 				})
// 			}
// 		}

// 		window.addEventListener('message', handleMessage)

// 		return () => {
// 			window.removeEventListener('message', handleMessage)
// 		}
// 	}, [])

// 	return (
// 		<section className="w-full min-h-screen flex flex-col">
// 			<Editor
// 				resolver={{
// 					NodeButton,
// 					Canvas,
// 					NodeCardHeader,
// 					NodeCard,
// 					NodeCardContent,
// 					NodeCardDescription,
// 					NodeCardTitle,
// 					NodeCardFooter,
// 					NodeOneBlock,
// 					NodeTwoBlocks,
// 					NodeCalendar,
// 					ResizableComponent,
// 					ResizablePanelLayout,
// 					Element,
// 					div: 'div',
// 					span: 'span',
// 					NodeAccordion,
// 					NodeAvatar,
// 					NodeAlertDialog,
// 					NodeAlert,
// 					NodeAspectRatio,
// 					NodeBadge,
// 					NodeCheckbox,
// 					NodeCollapsible,
// 					NodeCommand,
// 					NodeContextMenu,
// 					NodeDialog,
// 					LoadingComponent,
// 					DynamicContent
// 				}}
// 				onRender={RenderNode}
// 			>
// 				<div className="flex flex-1 relative overflow-hidden">
// 					<SideMenu componentsMap={componentsMap} />
// 					<Viewport>
// 						{/* <ReactIframe
//               ref={iframeRef}
//               title="my frame"
//               className="p-4 w-full h-full page-container"
//             > */}
// 						<Frame>
// 							<Element
// 								is={Canvas}
// 								id="ROOT"
// 								canvas
// 								style={{
// 									display: 'flex',
// 									flexWrap: 'wrap',
// 									alignItems: 'flex-start'
// 								}}
// 							>
// 								{components}
// 								{/* <Element is={LoadingComponent} id="loading" /> */}
// 								{/* <Element is={DynamicContent} id="dynamic" /> */}
// 								{/* <ResizableComponent width="20%" height="50%">
// 									<NodeButton>Button 2</NodeButton>
// 									<ResizableComponent width="10%" height="10%">
// 										<NodeButton className="bg-red-500 text-white px-4 py-2 rounded">
// 											Button 1
// 										</NodeButton>
// 									</ResizableComponent>
// 								</ResizableComponent>
// 								<ResizableComponent width="20%" height="50%">
// 									<NodeButton>Button 3</NodeButton>
// 								</ResizableComponent>
// 								<NodeCard className="p-6 m-2">
// 									<NodeCardHeader>
// 										<NodeCardTitle className="bg-blue-500 text-white px-4 py-2 rounded">
// 											Card Title
// 										</NodeCardTitle>
// 										<NodeCardDescription className="bg-blue-500 text-white px-4 py-2 rounded">
// 											Card Description
// 										</NodeCardDescription>
// 									</NodeCardHeader>
// 									<NodeCardContent></NodeCardContent>
// 									<NodeCardFooter>
// 										<NodeButton>Footer button</NodeButton>
// 									</NodeCardFooter>
// 								</NodeCard> */}
// 							</Element>
// 						</Frame>
// 						{/* </ReactIframe> */}
// 					</Viewport>
// 					<ControlPanel />
// 				</div>
// 			</Editor>
// 		</section>
// 	)
// }

// import React, { useEffect, useState } from 'react'
// import { Editor, Frame, Element, useNode, useEditor } from '@craftjs/core'
// import { NodeButton } from '@/components/node/button'
// import { ResizableComponent } from '@/components/resizableComponent'
// import { Canvas } from '@/components/canvas'
// import { renderComponents } from '@/lib/componentRenderer'
// import { NewContent, DynamicContent, InitialContent } from '@/components/dynamicContent'
// import {
// 	NodeCardHeader,
// 	NodeCard,
// 	NodeCardContent,
// 	NodeCardDescription,
// 	NodeCardTitle,
// 	NodeCardFooter
// } from '@/components/node/card'

// // 文本组件
// const Text = ({ text }) => {
// 	const {
// 		connectors: { connect, drag }
// 	} = useNode()
// 	return (
// 		<div
// 			ref={(ref) => connect(drag(ref))}
// 			className="bg-blue-100 p-2 m-2 rounded"
// 		>
// 			{text}
// 		</div>
// 	)
// }

// // 按钮组件
// const Button = ({ text, onClick }) => {
// 	const {
// 		connectors: { connect, drag }
// 	} = useNode()
// 	return (
// 		<button
// 			ref={(ref) => connect(drag(ref))}
// 			className="bg-green-500 text-white p-2 m-2 rounded"
// 			onClick={onClick}
// 		>
// 			{text}
// 		</button>
// 	)
// }
// const Container = ({ children }) => {
// 	const {
// 		connectors: { connect, drag }
// 	} = useNode()
// 	return (
// 		<div
// 			ref={(ref) => connect(drag(ref))}
// 			className="border-2 border-gray-300 p-4 m-2"
// 		>
// 			{children}
// 		</div>
// 	)
// }

// const StaticContent = ({ children }) => {
// 	return <div className="bg-gray-100 p-2 m-2 rounded">{children}</div>
// }

// // Craft configurations
// Text.craft = {
// 	displayName: 'Text',
// 	props: { text: 'Default Text' }
// }

// Button.craft = {
// 	displayName: 'Button',
// 	props: { text: 'Click me' }
// }

// Container.craft = {
// 	displayName: 'Container'
// }

// StaticContent.craft = {
// 	displayName: 'Static Content'
// }

// const buttonString1 = `
// <DynamicContent></DynamicContent>
// <ResizableComponent width='25%' height='25%'>
// <ResizableComponent width='20%' height='20%'>
//               <NodeButton className="bg-purple-500 text-white px-4 py-2 rounded">
//                 Static Container Button
//               </NodeButton>
// 						</ResizableComponent>
// 						</ResizableComponent>
// 						<ResizableComponent width='20%' height='20%'>
//               <NodeButton className="bg-purple-500 text-white px-4 py-2 rounded">
//                 Static Container Button
//               </NodeButton>
// 						</ResizableComponent>
// 					<NodeCard className="p-6 m-2">
//    <NodeCardHeader>
//      <NodeCardTitle className="bg-blue-500 text-white px-4 py-2 rounded">
//        Card Title
//      </NodeCardTitle>
//     <NodeCardDescription className="bg-blue-500 text-white px-4 py-2 rounded">
//        Card Description
//      </NodeCardDescription>
//    </NodeCardHeader>
//    <NodeCardContent></NodeCardContent>
//    <NodeCardFooter>
//      <NodeButton>Footer button</NodeButton>
//  </NodeCardFooter>
//  </NodeCard>`

// export default function Home() {
// 	const components = renderComponents(buttonString1)

// 	const [showNewContent, setShowNewContent] = useState(false)

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setShowNewContent(true)
//     }, 2000)

//     return () => clearTimeout(timer)
//   }, [])

// 	return (
// 		<div className="p-4">
// 			<h1 className="text-2xl font-bold mb-4">
// 				Craft.js Drag and Drop with Dynamic and Static Content Demo
// 			</h1>
// 			<Editor
// 				resolver={{
// 					Text,
// 					Button,
// 					Container,
// 					DynamicContent,
// 					NodeButton,
// 					StaticContent,
// 					Canvas,
// 					ResizableComponent,
// 					Element,
// 					NodeCardHeader,
// 					NodeCard,
// 					NodeCardContent,
// 					NodeCardDescription,
// 					NodeCardTitle,
// 					NodeCardFooter,
// 					NewContent,
// 					InitialContent,
// 				}}
// 			>
// 				<Frame>
// 					<Element
// 						is={Canvas}
// 						id="ROOT"
// 						canvas
// 						style={{
// 							display: 'flex',
// 							flexWrap: 'wrap',
// 							alignItems: 'flex-start'
// 						}}
// 					>
// 						{components}
// 						<Element is={ResizableComponent} canvas width="25%" height="25%">
// 							<ResizableComponent width="20%" height="20%">
// 								<NodeButton className="bg-purple-500 text-white px-4 py-2 rounded">
// 									Static Container Button
// 								</NodeButton>
// 							</ResizableComponent>
// 						</Element>
// 						<ResizableComponent width="25%" height="25%">
// 								<NodeButton className="bg-purple-500 text-white px-4 py-2 rounded">
// 									Static Container Button
// 								</NodeButton>
// 						</ResizableComponent>
// 						<Element is={DynamicContent} canvas>
// 							{/* {showNewContent ? <NewContent /> : 'Initial Content'} */}

// 						</Element>
// 					</Element>
// 					{/* <Element id="ROOT" is={Canvas} canvas>
// 					<DynamicContent></DynamicContent>
// 					<DynamicContent></DynamicContent>
// 					<NodeButton className="bg-purple-500 text-white px-4 py-2 rounded">
// 					<NodeButton className="bg-green-500 text-white px-4 py-2 rounded">
//                 Static Container Button
//               </NodeButton>
//               </NodeButton>

// 							</Element> */}
// 				</Frame>
// 			</Editor>
// 		</div>
// 	)
// }
import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { Editor, Frame, Element, useEditor, useNode } from '@craftjs/core'
import { NodeButton } from '@/components/node/button'
import { ResizableComponent } from '@/components/resizableComponent'
import { renderComponents } from '@/lib/componentRenderer'
import { Canvas } from '@/components/canvas'
import { Wrapper } from '@/components/wrapper'
import {
	NodeCardHeader,
	NodeCard,
	NodeCardContent,
	NodeCardDescription,
	NodeCardTitle,
	NodeCardFooter
} from '@/components/node/card'
import { SideMenu } from '@/components/side-menu'
import { ControlPanel } from '@/components/control-panel'
import { Viewport } from '@/components/viewport'
import { componentsMap } from '@/components/node/components-map'
import { NodeOneBlock, NodeTwoBlocks } from '@/components/node/layout'
import { NodeAccordion } from '@/components/node/accordion'
import { NodeAvatar } from '@/components/node/avatar'
import { NodeAlert } from '@/components/node/alert'
import { NodeAspectRatio } from '@/components/node/aspect-ratio'
import { NodeBadge } from '@/components/node/badge'
import { NodeCheckbox } from '@/components/node/checkbox'
import { NodeCollapsible } from '@/components/node/collapsible'
import { NodeCommand } from '@/components/node/command'
import { NodeContextMenu } from '@/components/node/context-menu'
import { NodeDialog } from '@/components/node/dialog'
import { NodeCalendar } from '@/components/node/calendar'

// Updated NewContent component

const NewContent = ({ buttonStrings, stage }) => {
  const {
    connectors: { connect, drag }
  } = useNode()

  const renderContent = () => {
    const combinedString = buttonStrings.slice(0, stage + 1).join('\n')
    const ButtonComponent = renderComponents(combinedString)
    return (
      <Element id="dynamic_content_container" is={Container} canvas={true}>
        {ButtonComponent}
      </Element>
    )
  }

  return (
    <div
      ref={(ref) => connect(drag(ref))}
      className="p-2 m-1 border border-dashed border-gray-300"
    >
      {renderContent()}
    </div>
  )
}

NewContent.craft = {
  displayName: 'Dynamic Content Container',
  props: {
    buttonStrings: [],
    stage: 0
  }
}
// DynamicContent component
const DynamicContent = ({ children }) => {
	const {
		connectors: { connect, drag }
	} = useNode()

	return (
		<div
			ref={(ref) => connect(drag(ref))}
			// className="bg-yellow-100 p-4 min-h-[100px] m-2 border border-dashed border-yellow-300"
		>
			<h3 className="text-lg font-bold mb-2">Dynamic Content Container</h3>
			{children}
		</div>
	)
}

DynamicContent.craft = {
	displayName: 'Dynamic Content'
}

// TextBox component
const TextBox = ({ text, className }) => {
	const {
		connectors: { connect, drag }
	} = useNode()

	return (
		<div
			ref={(ref) => connect(drag(ref))}
			className={`bg-blue-100 p-2 m-2 border border-dashed border-blue-300 ${className}`}
		>
			{text}
		</div>
	)
}

TextBox.craft = {
	displayName: 'Text Box',
	props: {
		text: 'Draggable Text Box',
		className: ''
	}
}

import { MonitorPlay, Smartphone, Code, Redo, Undo } from 'lucide-react'
import { getOutputCode, getOutputHTMLFromId } from '@/lib/code-gen'
import { CodeView } from '@/components/code-view'
import { DrawerTrigger, DrawerContent, Drawer } from '@/components/ui/drawer'

// Container component
const Container = ({ children, className }) => {
	const {
		connectors: { connect, drag }
	} = useNode()

	return (
		<div
			ref={(ref) => connect(drag(ref))}
			className={` p-4 min-h-[100px] m-2 border border-dashed border-green-300 ${className}`}
		>
			{children}
		</div>
	)
}

Container.craft = {
	displayName: 'Container',
	props: {
		className: ''
	}
}

const StageContent = ({ buttonString }) => {
  const {
    connectors: { connect, drag }
  } = useNode()

  const ButtonComponent = renderComponents(buttonString)

  return (
    <div ref={(ref) => connect(drag(ref))}>
      {ButtonComponent}
    </div>
  )
}

StageContent.craft = {
  displayName: 'Stage Content',
  props: {
    buttonString: ''
  }
}

// 修改后的NewContent组件，现在作为一个容器
const NewContent = ({ children }) => {
  const {
    connectors: { connect, drag }
  } = useNode()

  return (
    <div
      ref={(ref) => connect(drag(ref))}
      className="p-2 m-1 border border-dashed border-gray-300"
    >
      {children}
    </div>
  )
}

NewContent.craft = {
  displayName: 'Dynamic Content Container',
  props: {},
  rules: {
    canDrag: () => false
  }
}

const ContentUpdater = () => {
  const { actions, query } = useEditor()
  const [stage, setStage] = useState(0)

  const buttonStrings = [
    `<ResizableComponent width="95%" height="10%">
      <div className="bg-gray-800 text-white p-4">
        <h1 className="text-2xl font-bold">My Application</h1>
      </div>
    </ResizableComponent>
    <ResizableComponent width="32%" height="50%">
      <NodeCalendar className="p-4"></NodeCalendar>
    </ResizableComponent>
    <ResizableComponent width="20%" height="50%">
      <NodeButton className="bg-red-500 text-white px-4 py-2 rounded">
        Button 1
      </NodeButton>
    </ResizableComponent>`,
    
    `<ResizableComponent width="20%" height="50%">
      <NodeButton>Button 2</NodeButton>
      <ResizableComponent width="10%" height="10%">
        <NodeButton className="bg-red-500 text-white px-4 py-2 rounded">
          Button 1
        </NodeButton>
      </ResizableComponent>
    </ResizableComponent>
    <ResizableComponent width="20%" height="50%">
      <NodeButton>Button 3</NodeButton>
    </ResizableComponent>`,
    
    `<ResizableComponent width="95%" height="35%">
      <NodeCard className="p-6 m-2">
        <NodeCardHeader>
          <NodeCardTitle className="bg-blue-500 text-white px-4 py-2 rounded">
            Card Title
          </NodeCardTitle>
          <NodeCardDescription className="bg-blue-500 text-white px-4 py-2 rounded">
            Card Description
          </NodeCardDescription>
        </NodeCardHeader>
        <NodeCardContent></NodeCardContent>
        <NodeCardFooter>
          <NodeButton>Footer button</NodeButton>
        </NodeCardFooter>
      </NodeCard>
    </ResizableComponent>`
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      try {
        if (stage >= buttonStrings.length) {
          clearInterval(timer)
          return
        }

        const currentState = query.serialize()
        const parsedCurrentState = JSON.parse(currentState)

        const findDynamicContent = (nodeId) => {
          const node = parsedCurrentState[nodeId]
          if (node.type.resolvedName === 'DynamicContent') {
            return nodeId
          }
          for (const childId of node.nodes || []) {
            const result = findDynamicContent(childId)
            if (result) return result
          }
          return null
        }

        const dynamicContentId = findDynamicContent('ROOT')

        if (!dynamicContentId) {
          throw new Error('Could not find DynamicContent node')
        }

        let newContentId = parsedCurrentState[dynamicContentId].nodes.find(
          nodeId => parsedCurrentState[nodeId].type.resolvedName === 'NewContent'
        )

        if (!newContentId) {
          newContentId = `NewContent_${Date.now()}`
          parsedCurrentState[dynamicContentId].nodes.push(newContentId)
          parsedCurrentState[newContentId] = {
            type: { resolvedName: 'NewContent' },
            isCanvas: true,
            props: {},
            displayName: 'Dynamic Content Container',
            custom: {},
            hidden: false,
            nodes: [],
            linkedNodes: {},
            parent: dynamicContentId
          }
        }

        const newStageId = `Stage_${stage}_${Date.now()}`
        parsedCurrentState[newContentId].nodes.push(newStageId)
        parsedCurrentState[newStageId] = {
          type: { resolvedName: 'StageContent' },
          isCanvas: false,
          props: {
            buttonString: buttonStrings[stage]
          },
          displayName: `Stage ${stage + 1} Content`,
          custom: {},
          hidden: false,
          nodes: [],
          linkedNodes: {},
          parent: newContentId
        }

        console.log(`Adding Stage ${stage + 1}`)
        actions.deserialize(parsedCurrentState)

        setStage(stage + 1)
      } catch (error) {
        console.error('Error updating content:', error)
        clearInterval(timer)
      }
    }, 2000)

    return () => clearInterval(timer)
  }, [actions, query, stage, buttonStrings])

  return null
}
// App component
const App = () => {
	return (
		<div className="p-4">
			{/* <h1 className="text-2xl font-bold mb-4">Dynamic Button Rendering Demo</h1> */}
			<Editor
				resolver={{
					DynamicContent,
					TextBox,
					Container,
					NewContent,
					NodeButton,
					Canvas,
					ResizableComponent,
					NodeCardHeader,
					NodeCard,
					NodeCardContent,
					NodeCardDescription,
					NodeCardTitle,
					NodeCardFooter,
					Wrapper,
					Element,
					div: 'div',
					span: 'span',
					NodeAccordion,
					NodeAvatar,
					// NodeAlertDialog,
					NodeAlert,
					NodeAspectRatio,
					NodeBadge,
					NodeCheckbox,
					NodeCollapsible,
					NodeCommand,
					NodeContextMenu,
					NodeDialog,
					NodeCalendar,
					StageContent
					// LoadingComponent,
				}}
			>
				<div className="flex flex-1 relative overflow-hidden">
					<SideMenu componentsMap={componentsMap} />
					<Viewport>
						<Frame>
							<Element is={Wrapper}>
								<Element is={DynamicContent}></Element>
							</Element>
						</Frame>
					</Viewport>
					<ControlPanel />
				</div>
				<ContentUpdater />
			</Editor>
		</div>
	)
}

export default App
