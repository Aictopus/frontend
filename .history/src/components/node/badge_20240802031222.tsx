import React from 'react';
import { useNode } from '@craftjs/core';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';


export const NodeBadge = ({
  children = 'Badge',
  variant = 'default',
  className,
  ...props
}) => {
  const { connectors: { connect, drag } } = useNode();

  return (
    <Badge
      ref={(ref) => connect(drag(ref))}
      variant={variant}
      className={cn(className)}
      {...props}
    >
      {children}
    </Badge>
  );
};

NodeBadge.craft = {
  displayName: 'Badge',
  props: {
    children: 'Badge',
    variant: 'default',
  },
  related: {
    toolbar: BadgeSettings,
  },
};