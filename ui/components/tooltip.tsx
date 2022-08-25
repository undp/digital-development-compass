import * as TooltipPrimitive from "@radix-ui/react-tooltip"

export const Tooltip = ({ children, side = "top", text, className = "", ...props }: {
  children: React.ReactNode,
  text: string,
  side?: "top" | "bottom" | "left" | "right",
  className?: string,
}) => {

  return (
    <TooltipPrimitive.Root delayDuration={0}>
      <TooltipPrimitive.Trigger asChild>
        {children}
      </TooltipPrimitive.Trigger>
      <TooltipPrimitive.Content side={side} sideOffset={6} className={`relative bg-black text-white p-3 py-1 rounded-lg shadow-lg text-sm ${className}`} {...props}>
        {text}
        <TooltipPrimitive.Arrow className="border-black" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Root>
  )
}