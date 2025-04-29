import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FilterOption {
  value: string;
  label: string;
  checked: boolean;
}

interface FilterCategory {
  id: string;
  name: string;
  options: FilterOption[];
  isOpen: boolean;
}

export interface FilterSidebarProps {
  onFilterChange: (filters: Record<string, string[]>) => void;
}

export default function FilterSidebar({ onFilterChange }: FilterSidebarProps) {
  const [customizableChecked, setCustomizableChecked] = useState(false);
  
  const [categories, setCategories] = useState<FilterCategory[]>([
    {
      id: "idealFor",
      name: "IDEAL FOR",
      options: [
        { value: "men", label: "Men", checked: false },
        { value: "women", label: "Women", checked: false },
        { value: "kids", label: "Baby & Kids", checked: false }
      ],
      isOpen: false,
    },
    {
      id: "occasion",
      name: "OCCASION",
      options: [
        { value: "casual", label: "Casual", checked: false },
        { value: "formal", label: "Formal", checked: false },
        { value: "party", label: "Party", checked: false }
      ],
      isOpen: false,
    },
    {
      id: "work",
      name: "WORK",
      options: [
        { value: "office", label: "Office", checked: false },
        { value: "field", label: "Field Work", checked: false },
        { value: "home", label: "Work from Home", checked: false }
      ],
      isOpen: false,
    },
    {
      id: "fabric",
      name: "FABRIC",
      options: [
        { value: "cotton", label: "Cotton", checked: false },
        { value: "polyester", label: "Polyester", checked: false },
        { value: "silk", label: "Silk", checked: false }
      ],
      isOpen: false,
    },
    {
      id: "segment",
      name: "SEGMENT",
      options: [
        { value: "premium", label: "Premium", checked: false },
        { value: "value", label: "Value", checked: false },
        { value: "budget", label: "Budget", checked: false }
      ],
      isOpen: false,
    },
    {
      id: "suitableFor",
      name: "SUITABLE FOR",
      options: [
        { value: "winter", label: "Winter", checked: false },
        { value: "summer", label: "Summer", checked: false },
        { value: "allseason", label: "All Season", checked: false }
      ],
      isOpen: false,
    },
    {
      id: "rawMaterials",
      name: "RAW MATERIALS",
      options: [
        { value: "organic", label: "Organic", checked: false },
        { value: "synthetic", label: "Synthetic", checked: false },
        { value: "mixed", label: "Mixed", checked: false }
      ],
      isOpen: false,
    },
    {
      id: "pattern",
      name: "PATTERN",
      options: [
        { value: "solid", label: "Solid", checked: false },
        { value: "printed", label: "Printed", checked: false },
        { value: "striped", label: "Striped", checked: false }
      ],
      isOpen: false,
    },
  ]);

  const toggleCategory = (categoryId: string): void => {
    setCategories(
      categories.map((category) => (category.id === categoryId ? { ...category, isOpen: !category.isOpen } : category)),
    );
  };

  const toggleOption = (categoryId: string, optionValue: string): void => {
    setCategories(
      categories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            options: category.options.map((option) => 
              option.value === optionValue ? { ...option, checked: !option.checked } : option
            )
          };
        }
        return category;
      })
    );
  };

  const unselectAll = (categoryId: string): void => {
    setCategories(
      categories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            options: category.options.map((option) => ({ ...option, checked: false }))
          };
        }
        return category;
      })
    );
  };

  const selectAll = (categoryId: string): void => {
    setCategories(
      categories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            options: category.options.map((option) => ({ ...option, checked: true }))
          };
        }
        return category;
      })
    );
  };

  const getSelectedOptionsText = (categoryId: string): string => {
    const category = categories.find(cat => cat.id === categoryId);
    if (!category) return "All";
    
    const selectedOptions = category.options.filter(option => option.checked);
    
    if (selectedOptions.length === 0) {
      return "All";
    } else if (selectedOptions.length === category.options.length) {
      return "All";
    } else {
      return selectedOptions.map(option => option.label).join(", ");
    }
  };

  useEffect(() => {
    const activeFilters: Record<string, string[]> = {};
    
    if (customizableChecked) {
      activeFilters.customizable = ["yes"];
    }
    
    categories.forEach(category => {
      const selectedValues = category.options
        .filter(option => option.checked)
        .map(option => option.value);
      
      if (selectedValues.length > 0) {
        activeFilters[category.id] = selectedValues;
      }
    });
    
    onFilterChange(activeFilters);
  }, [categories, customizableChecked, onFilterChange]);

  return (
    <div className="space-y-4">
      <div className="border-b border-gray-200 pb-4">
        <label className="flex w-full items-center py-2 text-sm font-medium text-gray-900 cursor-pointer">
          <input 
            type="checkbox" 
            className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black mr-2"
            checked={customizableChecked}
            onChange={() => setCustomizableChecked(!customizableChecked)}
          />
          CUSTOMIZABLE
        </label>
      </div>
      
      {categories.map((category) => (
        <div key={category.id} className="border-b border-gray-200 pb-4">
          <button
            className="flex w-full items-center justify-between py-2 text-sm font-medium text-gray-900"
            onClick={() => toggleCategory(category.id)}
          >
            {category.name}
            {category.isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          
          <div className="py-2 text-sm text-gray-600">
            {getSelectedOptionsText(category.id)}
          </div>

          <AnimatePresence>
            {category.isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="pt-2 space-y-3">
                  <div 
                    className="flex items-center text-sm text-gray-600 cursor-pointer"
                    onClick={() => selectAll(category.id)}
                  >
                    <span className="ml-6">All</span>
                  </div>
                  
                  <button 
                    className="ml-6 text-xs text-blue-600"
                    onClick={() => unselectAll(category.id)}
                  >
                    Unselect All
                  </button>
                  
                  {category.options.map((option) => (
                    <label key={option.value} className="flex items-center text-sm text-gray-600 cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                        checked={option.checked}
                        onChange={() => toggleOption(category.id, option.value)}
                      />
                      <span className="ml-2">{option.label}</span>
                    </label>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}