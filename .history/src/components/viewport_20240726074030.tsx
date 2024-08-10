import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { useEditor } from "@craftjs/core";
import { useState, useCallback, useEffect } from "react";

interface NodeData {
  displayName?: string;
  props?: Record<string, any>;
  nodes?: string[];
  linkedNodes?: Record<string, string>;
  custom?: {
    componentName?: string;
  };
}

interface Node {
  data: NodeData;
}

export const generateComponentCode = (node: Node, indent: string = ''): string => {
  if (!node || !node.data) {
    console.warn(`Node or node.data is undefined`);
    return '';
  }

  const { displayName, props, nodes, linkedNodes, custom } = node.data;
  const componentName = custom?.componentName || displayName || 'UnknownComponent';

  const openingTag = `<${componentName}${generatePropsString(props || {})}>`;
  const closingTag = `</${componentName}>`;

  let content = '';
  if (props?.text) {
    // Handle text content
    content = props.text;
  } else if (props?.children) {
    // Handle children as string
    content = generateChildString(props.children);
  }

  let childContent = '';
  if (nodes && nodes.length > 0) {
    // Handle child components
    childContent += nodes.map(childId => {
      const childNode = node.data.nodes?.[childId];
      return childNode ? generateComponentCode(childNode, indent + '  ') : '';
    }).join('\n');
  }

  if (linkedNodes && Object.keys(linkedNodes).length > 0) {
    // Handle linked nodes
    childContent += Object.entries(linkedNodes).map(([key, childNode]) => {
      return generateComponentCode(childNode as Node, indent + '  ');
    }).join('\n');
  }

  if (childContent) {
    return `${indent}${openingTag}\n${childContent}\n${indent}${closingTag}`;
  } else {
    return `${indent}${openingTag}${content}${closingTag}`;
  }
};

const generatePropsString = (props: Record<string, any>): string => {
  const propsArray = Object.entries(props)
    .filter(([key]) => key !== 'children' && key !== 'text')
    .map(([key, value]) => `${key}=${JSON.stringify(value)}`);
  return propsArray.length > 0 ? ` ${propsArray.join(' ')}` : '';
};

const generateChildString = (children: any): string => {
  if (typeof children === 'string') {
    return children;
  } else if (Array.isArray(children)) {
    return children.map(child => {
      if (typeof child === 'string') {
        return child;
      } else if (child && typeof child === 'object' && 'type' in child) {
        // This is a React element
        return generateComponentCode(child as unknown as Node);
      }
      return '';
    }).join('');
  }
  return '';
};

const generatePropsString = (props: Record<string, any>): string => {
  const propsArray = Object.entries(props)
    .filter(([key]) => key !== 'children' && key !== 'text')
    .map(([key, value]) => `${key}=${JSON.stringify(value)}`);
  return propsArray.length > 0 ? ` ${propsArray.join(' ')}` : '';
};

const generateChildString = (children: any): string => {
  if (typeof children === 'string') {
    return children;
  } else if (Array.isArray(children)) {
    return children.map(child => {
      if (typeof child === 'string') {
        return child;
      } else if (child && typeof child === 'object' && 'type' in child) {
        // This is a React element
        return generateComponentCode(child as unknown as Node);
      }
      return '';
    }).join('');
  }
  return '';
};
export const Viewport = ({ children }: { children: React.ReactNode }) => {
  const { selected, query } = useEditor((state) => ({
    selected: state.events.selected,
  }));

  const [code, setCode] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleComponentClick = useCallback(() => {
    if (selected.size > 0) {
      const selectedNodeId = Array.from(selected)[0];
      const selectedNode = query.node(selectedNodeId).get();
      const generatedCode = generateComponentCode(selectedNode);
      setCode(generatedCode);
      setIsDrawerOpen(true);
    }
  }, [selected, query]);

  useEffect(() => {
    const viewport = document.querySelector('.viewport');
    if (viewport) {
      viewport.addEventListener('click', handleComponentClick);
      return () => {
        viewport.removeEventListener('click', handleComponentClick);
      };
    }
  }, [handleComponentClick]);

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <div className="viewport w-full overflow-y-auto overflow-x-hidden" onClick={handleComponentClick}>
        <div className={"craftjs-renderer flex-1 h-full w-full"}>{children}</div>
      </div>
      <DrawerContent>
        <pre className="p-4 bg-gray-100 rounded overflow-auto">
          <code>{code}</code>
        </pre>
      </DrawerContent>
    </Drawer>
  );
};