import React from 'react';

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  categories, 
  activeCategory, 
  onCategoryChange 
}) => {
  return (
    <div className="flex flex-wrap gap-4 mb-8">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-6 py-3 rounded-full border transition-all duration-300 ${
            activeCategory === category
              ? 'bg-[#cc73f8] border-[#cc73f8] text-white'
              : 'border-white/20 text-white hover:border-purple-500/50 hover:bg-purple-500/10'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};