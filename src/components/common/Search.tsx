import React, { useState, forwardRef } from "react";
import { cn } from "@/src/lib/utils";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Input } from "../ui/input";
import { useTranslations } from "next-intl";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch: (query: string) => void;
}

const SearchBar = forwardRef<HTMLInputElement, InputProps>(
  ({ className, onSearch, ...props }, ref) => {
    const t = useTranslations("Search");
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setInputValue(value);

      // Ejecuta búsqueda automáticamente si el campo queda vacío
      if (value.trim() === "") {
        onSearch("");
      }
    };

    const handleSearchClick = () => {
      onSearch(inputValue.trim());
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        handleSearchClick();
      }
    };

    const handleBlur = () => {
      // Ejecuta búsqueda general si el input está vacío al perder el foco
      if (inputValue.trim() === "") {
        onSearch("");
      }
    };

    return (
      <div className="relative w-full">
        <MagnifyingGlassIcon className="absolute top-1/2 left-3 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
        <Input
          type="text"
          className={cn("pl-10", className)}
          ref={ref}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          placeholder={t("searchPlaceholder")}
          {...props}
        />
        <button
          onClick={handleSearchClick}
          className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
        >
          {t("search")}
        </button>
      </div>
    );
  }
);
SearchBar.displayName = "SearchBar";

export { SearchBar };
