// transformerNode.js

import { BaseNode } from './BaseNode.jsx';
import { useState } from 'react';

export const TransformerNode = ({ id, data }) => {
    const [currText, setCurrText] = useState(data?.text || '');
    const [transformType, setTransformType] = useState(data?.transformType || 'Uppercase');

    const config = {
        nodeType: 'transformer',
        title: 'Transformer',
        inputs: [{ id: `${id}-input` }],
        outputs: [{ id: `${id}-output` }],
        fields: [
            {
                label: 'Input Type',
                type: 'select',
                defaultValue: transformType,
                options: [
                    { value: 'Uppercase', label: 'Uppercase' },
                    { value: 'Lowercase', label: 'Lowercase' },
                    { value: 'Reverse', label: 'Reverse' }
                ],
                onChange: (e) => setTransformType(e.target.value)
            }
        ],
        width: 200, // Reduced from 300
        height: 80,
        style: {}
    };

    return <BaseNode id={id} data={data} config={config} />;
}
