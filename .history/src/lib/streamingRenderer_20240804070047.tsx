import React, { useState, useEffect } from 'react';
import { Editor, Frame, Element } from '@craftjs/core';
import { renderComponents } from '@/lib/componentRenderer';

const StreamingRenderer = ({ streamingString }) => {
  const [components, setComponents] = useState([]);
  const [buffer, setBuffer] = useState('');

  useEffect(() => {
    const processBuffer = () => {
      const closingTagIndex = buffer.indexOf('</ResizableComponent>');
      if (closingTagIndex !== -1) {
        const completeComponent = buffer.slice(0, closingTagIndex + '</ResizableComponent>'.length);
        const newComponents = renderComponents(completeComponent);
        setComponents(prevComponents => [...prevComponents, ...newComponents]);
        setBuffer(buffer.slice(closingTagIndex + '</ResizableComponent>'.length));
      }
    };

    setBuffer(prevBuffer => prevBuffer + streamingString);
    processBuffer();
  }, [streamingString]);

  return (
    <Editor
      resolver={{
        // ... (include all your component resolvers here)
      }}
      onRender={RenderNode}
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
    </Editor>
  );
};

export default StreamingRenderer;