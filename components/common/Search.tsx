
import { forwardRef } from "react"
import { cn } from "@/lib/utils"

import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import { Input } from "../ui/input"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const SearchBar = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <div className="relative w-full max-w-xs">
      <MagnifyingGlassIcon className="absolute top-1/2 left-3 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
      <Input
        type="text"
        className={cn(
          "pl-10", 
          className
        )}
        ref={ref}
        placeholder="Search..."
        {...props}
      />
    </div>
  )
})
SearchBar.displayName = "SearchBar"

export { SearchBar }
