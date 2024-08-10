import React, { useEffect, useRef, useState } from 'react'
import { Editor, Frame, Element } from '@craftjs/core'
import { ResizableComponent } from '@/components/resizableComponent'
import { ResizablePanelLayout } from '@/components/resizablePanelLayout'
import { BasicPanelLayout } from '@/components/BasicPanelLayout'
import { SideMenu } from '@/components/side-menu'
import { Canvas } from '@/components/canvas'
import { NodeButton } from '@/components/node/button'
import {
  NodeCardHeader,
  NodeCard,
  NodeCardContent,
  NodeCardDescription,
  NodeCardTitle,
  NodeCardFooter
} from '@/components/node/card'
import { NodeAlertDialog } from '@/components/node/alert-dialog'
import { NodeCalendar } from '@/components/node/calendar'
import { ReactIframe } from '@/components/react-iframe'
import { ControlPanel } from '@/components/control-panel'
import { Viewport } from '@/components/viewport'
import { RenderNode } from '@/components/render-node'
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

import { renderComponents } from '@/lib/componentRenderer'

const fullButtonString = `
<ResizableComponent width="95%" height="10%">
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
</ResizableComponent>
<ResizableComponent width="20%" height="50%">
  <NodeButton>Button 2</NodeButton>
  <ResizableComponent width="10%" height="10%">
    <NodeButton className="bg-red-500 text-white px-4 py-2 rounded">
      Button 1
    </NodeButton>
  </ResizableComponent>
</ResizableComponent>
<ResizableComponent width="20%" height="50%">
  <NodeButton>Button 3</NodeButton>
</ResizableComponent>
<ResizableComponent width="95%" height="35%">
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
</ResizableComponent>
`

export default function Home() {
  const [buttonString, setButtonString] = useState('')
  const [components, setComponents] = useState([])
  const iframeRef = useRef(null)

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index < fullButtonString.length) {
        setButtonString(prevString => prevString + fullButtonString[index])
        index++
      } else {
        clearInterval(interval)
      }
    }, 50) // Adjust this value to control the speed of the "stream"

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setComponents(renderComponents(buttonString))
  }, [buttonString])

  useEffect(() => {
    const handleMessage = (event) => {
      if (
        event.data.type === 'RESIZABLE_COMPONENT_MOUNTED' &&
        iframeRef.current
      ) {
        const iframe = iframeRef.current
        const iframeDocument =
          iframe.contentDocument || iframe.contentWindow.document

        const initResize = (direction) => (e) => {
          e.preventDefault()
          const startX = e.clientX
          const startY = e.clientY
          iframe.contentWindow.postMessage(
            { type: 'INIT_RESIZE', direction, startX, startY },
            '*'
          )
        }

        const resizeHandles = iframeDocument.querySelectorAll('.resize-handle')
        resizeHandles.forEach((handle) => {
          if (handle.classList.contains('right')) {
            handle.addEventListener('mousedown', initResize('horizontal'))
          } else if (handle.classList.contains('bottom')) {
            handle.addEventListener('mousedown', initResize('vertical'))
          } else if (handle.classList.contains('corner')) {
            handle.addEventListener('mousedown', initResize('both'))
          }
        })
      }
    }

    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  return (
    <section className="w-full min-h-screen flex flex-col">
      <Editor
        resolver={{
          NodeButton,
          Canvas,
          NodeCardHeader,
          NodeCard,
          NodeCardContent,
          NodeCardDescription,
          NodeCardTitle,
          NodeCardFooter,
          NodeOneBlock,
          NodeTwoBlocks,
          NodeCalendar,
          ResizableComponent,
          ResizablePanelLayout,
          Element,
          div: 'div',
          span: 'span',
          NodeAccordion,
          NodeAvatar,
          NodeAlertDialog,
          NodeAlert,
          NodeAspectRatio,
          NodeBadge,
          NodeCheckbox,
          NodeCollapsible,
          NodeCommand,
          NodeContextMenu,
          NodeDialog
        }}
        onRender={RenderNode}
      >
        <div className="flex flex-1 relative overflow-hidden">
          <SideMenu componentsMap={componentsMap} />
          <Viewport>
            <ReactIframe
              ref={iframeRef}
              title="my frame"
              className="p-4 w-full h-full page-container"
            >
              <Frame>
                <Element
                  is={Canvas}
                  id="ROOT"
                  canvas
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'flex-start'
                  }}
                >
                  {components}
                </Element>
              </Frame>
            </ReactIframe>
          </Viewport>
          <ControlPanel />
        </div>
      </Editor>
    </section>
  )
}