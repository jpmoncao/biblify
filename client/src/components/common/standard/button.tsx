import * as React from "react"
import { Link } from "react-router"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

interface StandardButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactElement
  to?: string
  asChild?: boolean
}

export const StandardButton = React.forwardRef<
  HTMLButtonElement,
  StandardButtonProps
>(({ icon, to, children, className, asChild = false, ...props }, ref) => {
  // Verifica se há texto suficiente para mostrar
  const hasContent =
    typeof children === "string"
      ? children.trim().length > 1
      : React.Children.count(children) > 0;

  // Ícone com estilo para group-hover
  const styledIcon = icon
    ? React.cloneElement(icon, {
        className: cn(
          "size-4 shrink-0 text-primary transition-colors group-hover:text-primary-foreground",
          icon.props.className
        ),
        "aria-hidden": true,
      })
    : null

  const baseClasses = cn(buttonVariants({ variant: "standard" }), "group", className)

  // Texto truncado com limite de largura
  const content = hasContent ? (
    <span className={`truncate max-w-full ${icon ? "hidden @[2rem]:block" : "block"} `}>{children}</span>
  ) : null

  if (to) {
    return (
      <Link to={to} className={baseClasses}>
        {styledIcon}
        {content}
      </Link>
    )
  }

  const Comp = asChild ? Slot : "button"

  return (
    <Comp className={baseClasses} ref={ref} {...props}>
      {styledIcon}
      {content}
    </Comp>
  )
})

StandardButton.displayName = "StandardButton"
