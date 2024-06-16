import React, { useState, forwardRef } from "react";
import { cn } from "@/src/lib/utils";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Input } from "../ui/input";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch: (query: string) => void;
}

const SearchBar = forwardRef<HTMLInputElement, InputProps>(({ className, onSearch, ...props }, ref) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSearchClick = () => {
    onSearch(inputValue.trim());
  };

  return (
    <div className="relative w-full max-w-xs">
      <MagnifyingGlassIcon className="absolute top-1/2 left-3 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
      <Input
        type="text"
        className={cn("pl-10", className)}
        ref={ref}
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search..."
        {...props}
      />
      <button onClick={handleSearchClick} className="absolute top-1/2 right-3 transform -translate-y-1/2">
        Search
      </button>
    </div>
  );
});
SearchBar.displayName = "SearchBar";

export { SearchBar };
