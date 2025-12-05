import React from 'react';

type IconProps = {
    value: number;
    width: number,
    height: number;
};

const IconIndicator = ({ value, width, height }: IconProps) => {
    const getTailwindSize = (size: number) => {
        return `w-${width / 4} h-${height / 4}`;
    };

    const sizeClasses = getTailwindSize(width);
    const style = { width: `${width}px`, height: `${height}px` };
    const baseClasses = "flex items-center justify-center font-bold";

    // if (value > 0) return <span className='bg-green-600'>▲</span>;
    // if (value < 0) return <span className='bg-red-600'>▼</span>;

    // return <span className='bg-gray-500'>•</span>;
    if (value > 0) return <span className={`bg-green-600 ${baseClasses} ${sizeClasses}`} style={style}>▲</span>;
    if (value < 0) return <span className={`bg-red-600 ${baseClasses} ${sizeClasses}`} style={style}>▼</span>;

    return <span className={`bg-gray-500 ${baseClasses} ${sizeClasses}`} style={style}>•</span>;
};

export default IconIndicator;