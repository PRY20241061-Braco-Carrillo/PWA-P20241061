import React from 'react';
import CategoryButton from "./category-button";
import { categoryButtonConfig } from "./category-button-config";


const styleConfig: { [key: string]: string } = {
    SNACK: "col-span-2",
    DRINK: "row-span-2 col-span-2",
    DESSERT: "col-span-2",
    TREND: "row-span-2 col-span-2",
    ENTRY: "col-span-2",
    KIDS: "col-span-2",
    OFFER: "col-span-2",
    PRINCIPAL: "col-span-2",
};

const CategoryButtonsBentoGrid: React.FC = () => {
    
    const boxStyle = 'rounded-xl flex flex-col items-center justify-center';

    return (
        <div className="grid grid-cols-8 gap-4 p-4 auto-rows-auto">
            {Object.entries(categoryButtonConfig).map(([typeStyle, config]) => (
                <div key={typeStyle} className={`${boxStyle} ${styleConfig[typeStyle] || ""} p-2`}>
                    <CategoryButton 
                        typeStyle={typeStyle}
                        iconPosition={"top"}
                    />
                </div>
            ))}
        </div>
    );
}





export default CategoryButtonsBentoGrid;
