import React, { useRef, useEffect, useState } from 'react';
import { useNode, useEditor } from '@craftjs/core';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

export const ResizableComponent = ({ children }) => {
  const { connectors: { connect, drag }, nodeProps, actions: { setProp } } = useNode((node) => ({
    nodeProps: node.data.props
  }));
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled
  }));
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (containerRef.current) {
      const updateSize = () => {
        const { offsetWidth, offsetHeight } = containerRef.current.parentElement;
        setContainerSize({ width: offsetWidth, height: offsetHeight });
      };
      updateSize();
      window.addEventListener('resize', updateSize);
      return () => window.removeEventListener('resize', updateSize);
    }
  }, []);

  const getPixelValue = (value, dimension) => {
    if (typeof value === 'string' && value.endsWith('%')) {
      return (parseInt(value) / 100) * containerSize[dimension];
    }
    return parseInt(value) || (dimension === 'width' ? 100 : 50); // Default sizes
  };

  const pixelWidth = getPixelValue(nodeProps.width, 'width');
  const pixelHeight = getPixelValue(nodeProps.height, 'height');

  return (
    <ResizableBox
      width={pixelWidth}
      height={pixelHeight}
      minConstraints={[50, 30]} // Minimum size
      onResize={(e, { size }) => {
        setProp((props) => {
          props.width = `${size.width}px`;
          props.height = `${size.height}px`;
        });
      }}
      resizeHandles={['se']} // Only allow resizing from the bottom-right corner
      draggableOpts={{ grid: [1, 1] }}
    >
      <div
        ref={(ref) => {
          if (enabled) {
            connect(drag(ref));
          }
        }}
        style={{
          width: '100%',
          height: '100%',
          border: '1px solid #ccc',
          padding: '5px',
          boxSizing: 'border-box',
          overflow: 'auto',
          position: 'relative'
        }}
      >
        {children}
      </div>
    </ResizableBox>
  );
};

export const ResizableComponentSettings = () => {
  const { actions: { setProp }, width, height } = useNode((node) => ({
    width: node.data.props.width,
    height: node.data.props.height,
  }));

  return (
    <div>
      <label>
        Width:
        <input
          type="text"
          value={width}
          onChange={(e) => setProp((props) => props.width = e.target.value)}
        />
      </label>
      <label>
        Height:
        <input
          type="text"
          value={height}
          onChange={(e) => setProp((props) => props.height = e.target.value)}
        />
      </label>
    </div>
  );
};

ResizableComponent.craft = {
  props: {
    width: '100%',
    height: '100%',
  },
  related: {
    toolbar: ResizableComponentSettings,
  },
  rules: {
    canMoveIn: () => true,
  },
};