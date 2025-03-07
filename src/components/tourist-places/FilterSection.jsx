import React from 'react';

const FilterSection = ({ selectedCategory, selectedSeason, setSelectedCategory, setSelectedSeason, categories, seasons }) => {
    return (
        <div className="mb-6 flex flex-wrap gap-4">
            <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="p-2 border rounded-md"
            >
                {categories.map(category => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>

            <select 
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(e.target.value)}
                className="p-2 border rounded-md"
            >
                {seasons.map(season => (
                    <option key={season.id} value={season.id}>
                        {season.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default FilterSection; 