import React from "react";
import { styled } from "../stitches.config";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { Box } from "./Box";
import { Text } from "./Text";

type TooltipPrimitiveProps = React.ComponentProps<typeof TooltipPrimitive.Root>;
type TooltipContentProps = React.ComponentProps<typeof TooltipPrimitive.Content>;

type TooltipProps = TooltipPrimitiveProps & 
  Omit<TooltipContentProps, 'content'> & {
    children: React.ReactElement;
    content: React.ReactNode;
    multiline?: boolean;
  };

const StyledContent = styled(TooltipPrimitive.Content, {
  backgroundColor: "$transparentPanel",
  borderRadius: "$1",
  padding: "$1 $2",

  variants: {
    multiline: {
      true: {
        maxWidth: 250,
        pb: 7,
      },
    },
  },
});

export const Tooltip = React.forwardRef<
  React.ComponentRef<typeof StyledContent>,
  TooltipProps
>(({
  children,
  content,
  open,
  defaultOpen,
  onOpenChange,
  delayDuration,
  disableHoverableContent,
  multiline,
  ...props
}, forwardedRef) => {
  const rootProps = {
    open,
    defaultOpen,
    onOpenChange,
    delayDuration,
    disableHoverableContent,
  };
  
  return (
    <TooltipPrimitive.Root {...rootProps}>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <StyledContent
          ref={forwardedRef}
          side="top"
          align="center"
          sideOffset={5}
          {...props}
          multiline={multiline}
        >
          <Text
            size="1"
            as="p"
            css={{
              color: "$loContrast",
              lineHeight: multiline ? "20px" : undefined,
            }}
          >
            {content}
          </Text>
          <Box css={{ color: "$transparentExtreme" }}>
            <TooltipPrimitive.Arrow
              offset={5}
              width={11}
              height={5}
              style={{
                fill: "currentColor",
              }}
            />
          </Box>
        </StyledContent>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
});

Tooltip.displayName = 'Tooltip';
