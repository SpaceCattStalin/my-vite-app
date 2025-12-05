import React, { useEffect, useState } from 'react';
import { useGameState } from '../game/store';

type IconProps = {
    value: number;
};

const IconIndicator = ({ value }: IconProps) => {
    const [visible, setVisible] = useState(false);
    const { gameEnd } = useGameState();
    // return <span className='bg-gray-500'>•</span>;
    if (gameEnd) return <span className={`bg-transparent text-gray-600`}>•</span>;

    if (value > 0) return <span className={`bg-transparent text-green-600`}>▲</span>;
    if (value < 0) return <span className={`bg-transparent text-red-600`}>▼</span>;
    return <span className={`bg-transparent text-gray-600`}>•</span>;
};

export default IconIndicator;