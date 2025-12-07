import React from 'react';
import { useGameState } from '../game/store';

type IconProps = {
    value: number;
};

export default function IconIndicator({ value }: IconProps) {
    const { gameEnd } = useGameState();

    if (gameEnd) return <span className="bg-transparent text-gray-600">•</span>;

    if (value > 0) return <span className="bg-transparent text-green-600">▲</span>;
    if (value < 0) return <span className="bg-transparent text-red-600">▼</span>;
    return <span className="bg-transparent text-gray-600">•</span>;
}
