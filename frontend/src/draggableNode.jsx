import { useState } from 'react';
import { theme } from './theme.js';

export const DraggableNode = ({ type, label }) => {
    const [isHovered, setIsHovered] = useState(false);

    const onDragStart = (event, nodeType) => {
        const appData = { nodeType }
        event.target.style.cursor = 'grabbing';
        event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <div
            className={type}
            onDragStart={(event) => onDragStart(event, type)}
            onDragEnd={(event) => (event.target.style.cursor = 'grab')}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                cursor: 'grab',
                minWidth: '60px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                borderRadius: '8px',
                backgroundColor: '#1C2536',
                border: `1px solid ${theme.colors.border}`,
                justifyContent: 'center',
                flexDirection: 'column',
                transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)', // Bouncy transition
                transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                zIndex: isHovered ? 10 : 1
            }}
            draggable
        >
            <span style={{
                color: '#fff',
                fontSize: '16px', // Increased from 12px
                pointerEvents: 'none'
            }}>{label}</span>
        </div>
    );
};
