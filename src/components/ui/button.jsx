import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import './button.css'

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  const classes = `button ${variant || ''} ${size || ''} ${className || ''}`
  return (
    <Comp
      className={classes}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button }
