import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-secondary-foreground placeholder:text-muted-foreground bg-background selection:bg-primary selection:text-primary-foreground border border-solid border-muted-foreground h-9 w-full min-w-0 rounded-md px-3 py-1 text-secondary-foreground shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-solid file:border-muted-foreground file:bg-transparent file:text-md file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-md",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
