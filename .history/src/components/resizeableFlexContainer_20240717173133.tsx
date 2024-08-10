import React, { useRef, useEffect, useState } from 'react';
import { useNode, useEditor } from '@craftjs/core';

// Resizable Container Component
export const ResizableContainer = ({ children }) => {
  const { connectors: { connect, drag } } = useNode();
  const containerRef = useRef(null);

  return (
    <div 
      ref={ref => connect(drag(ref))} 
      style={{ 
        display: 'flex', 
        width: '100%', 
        minHeight: '100px',
        border: '1px solid #ccc',
        position: 'relative'
      }}
    >
      {children}
    </div>
  );
};

// Resizable Item Component
export const ResizableItem = ({ children }) => {
  const { connectors: { connect }, actions: { setProp } } = useNode();
  const [width, setWidth] = useState('33.33%');

  return (
    <div
      ref={connect}
      style={{
        flex: `0 0 ${width}`,
        padding: '10px',
        backgroundColor: '#f0f0f0',
        position: 'relative'
      }}
    >
      {children}
      <Resizer 
        onResize={(newWidth) => {
          setWidth(newWidth);
          setProp(props => props.width = newWidth);
        }} 
      />
    </div>
  );
};

// Resizer Component
const Resizer = ({ onResize }) => {
  const resizerRef = useRef(null);
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled
  }));

  useEffect(() => {
    const resizer = resizerRef.current;
    if (!resizer || !enabled) return;

    let startX, startWidth, nextElementStartWidth;

    const onMouseDown = (e) => {
      startX = e.clientX;
      const rect = resizer.parentNode.getBoundingClientRect();
      startWidth = rect.width;
      if (resizer.parentNode.nextElementSibling) {
        nextElementStartWidth = resizer.parentNode.nextElementSibling.getBoundingClientRect().width;
      }
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (e) => {
      const dx = e.clientX - startX;
      const newWidth = ((startWidth + dx) / resizer.parentNode.parentNode.getBoundingClientRect().width) * 100;
      const nextElementNewWidth = ((nextElementStartWidth - dx) / resizer.parentNode.parentNode.getBoundingClientRect().width) * 100;

      if (newWidth > 10 && nextElementNewWidth > 10) {  // Minimum width constraint
        onResize(${newWidth}%);
        if (resizer.parentNode.nextElementSibling) {
          resizer.parentNode.nextElementSibling.style.flex = 0 0 ${nextElementNewWidth}%;
        }
      }
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    resizer.addEventListener('mousedown', onMouseDown);

    return () => {
      resizer.removeEventListener('mousedown', onMouseDown);
    };
  }, [enabled, onResize]);

  if (!enabled) return null;

  return (
    <div
      ref={resizerRef}
      style={{
        width: '10px',
        position: 'absolute',
        right: '-5px',
        top: 0,
        bottom: 0,
        cursor: 'col-resize',
        backgroundColor: '#ddd'
      }}
    />
  );
};

// Usage Example
export const ResizableLayout = () => {
  return (
    <ResizableContainer>
      <ResizableItem>
        <h2>Item 1</h2>
        <p>Content for item 1</p>
      </ResizableItem>
      <ResizableItem>
        <h2>Item 2</h2>
        <p>Content for item 2</p>
      </ResizableItem>
      <ResizableItem>
        <h2>Item 3</h2>
        <p>Content for item 3</p>
      </ResizableItem>
    </ResizableContainer>
  );
};

ResizableContainer.craft = {
  displayName: 'Resizable Container',
};

ResizableItem.craft = {
  displayName: 'Resizable Item',
  props: {
    width: '33.33%',
  },
  related: {
    toolbar: () => (
      <div>
        {/* Add any toolbar items specific to ResizableItem here */}
      </div>
    ),
  },
};

