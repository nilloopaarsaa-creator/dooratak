/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { Door } from '../types';

interface ObjectCardProps {
    door: Door;
    isSelected: boolean;
    onClick?: () => void;
}

const ObjectCard: React.FC<ObjectCardProps> = ({ door, isSelected, onClick }) => {
    const cardClasses = `
        bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 h-full flex flex-col
        ${onClick ? 'cursor-pointer hover:shadow-xl hover:scale-105' : ''}
        ${isSelected ? 'border-2 border-blue-500 shadow-xl scale-105' : 'border border-zinc-200'}
    `;

    return (
        <div className={cardClasses} onClick={onClick}>
            <div className="aspect-square w-full bg-zinc-100 flex items-center justify-center flex-grow">
                <img src={door.imageUrl} alt={door.name} className="w-full h-full object-contain" />
            </div>
            <div className="p-3 text-center flex-shrink-0">
                <h4 className="text-sm font-semibold text-zinc-700 truncate">{door.name}</h4>
            </div>
        </div>
    );
};

export default ObjectCard;