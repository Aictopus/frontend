import { useEditor, Node } from "@craftjs/core";
import React, { useEffect, useState } from "react";

// Assume these functions are defined elsewhere in your code
const generateComponentCode = (node: Node, query: any, indent: string = ''): string => {
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
    content = props.text;
  } else if (props?.children) {
    content = generateChildString(props.children);
  }

  let childContent = '';
  if (nodes && nodes.length > 0) {
    childContent = nodes.map(childId => {
      const childNode = query.node(childId).get();
      return generateComponentCode(childNode, query, indent + '  ');
    }).join('\n');
  }

  if (linkedNodes) {
    childContent += Object.entries(linkedNodes).map(([, childId]) => {
      const childNode = query.node(childId).get();
      return generateComponentCode(childNode, query, indent + '  ');
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
      }
      return '';
    }).join('');
  }
  return '';
};

const generateRandomTailwindClasses = () => {
  const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'pink'];
  const sizes = ['sm', 'md', 'lg', 'xl'];
  const roundedness = ['rounded', 'rounded-md', 'rounded-lg', 'rounded-full'];

  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
  const randomRoundedness = roundedness[Math.floor(Math.random() * roundedness.length)];

  return `bg-${randomColor}-500 text-white p-${randomSize} ${randomRoundedness}`;
};

export const ControlPanel = () => {
  const { active, related, query, actions } = useEditor((state, query) => {
    const currentlySelectedNodeId = query.getEvent("selected").first();
    return {
      active: currentlySelectedNodeId,
      related:
        currentlySelectedNodeId && state.nodes[currentlySelectedNodeId].related,
    };
  });

  const [code, setCode] = useState('');
  const [variants, setVariants] = useState([]);

  useEffect(() => {
    if (active && active !== 'ROOT') {
      const selectedNode = query.node(active).get();
      const generatedCode = generateComponentCode(selectedNode, query);
      setCode(generatedCode);

      // Generate 5 variants
      const newVariants = Array(5).fill(null).map(() => {
        const variantClasses = generateRandomTailwindClasses();
        return generatedCode.replace(/className="[^"]*"/, `className="${variantClasses}"`);
      });
      setVariants(newVariants);
    } else {
      setCode('');
      setVariants([]);
    }
  }, [active, query]);

  const handleVariantClick = (variantCode) => {
    if (active && active !== 'ROOT') {
      const classMatch = variantCode.match(/className="([^"]*)"/);
      if (classMatch) {
        actions.setProp(active, (props) => {
          props.className = classMatch[1];
        });
      }
    }
  };

  return (
    <div className="w-80 border-l h-auto overflow-auto">
      <h3 className="py-2 px-4 border-b text-md font-semibold text-left">
        Control Panel
      </h3>
      {active && active !== 'ROOT' && (
        <div className="p-4">
          <h4 className="text-sm font-semibold mb-2">Component Code:</h4>
          <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto max-h-60">
            <code>{code}</code>
          </pre>
          <h4 className="text-sm font-semibold mt-4 mb-2">Variants:</h4>
          {variants.map((variant, index) => (
            <div key={index} className="mb-4 border p-2 rounded">
              <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto mb-2">
                <code>{variant}</code>
              </pre>
              <button 
                className="w-full text-left p-2 bg-blue-100 rounded hover:bg-blue-200 text-xs"
                onClick={() => handleVariantClick(variant)}
              >
                Apply This Style
              </button>
            </div>
          ))}
        </div>
      )}
      {active && related.toolbar && React.createElement(related.toolbar)}
    </div>
  );
};