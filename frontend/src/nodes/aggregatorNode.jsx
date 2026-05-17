// aggregatorNode.js

import { BaseNode } from './BaseNode.jsx';
import { useState } from 'react';

export const AggregatorNode = ({ id, data }) => {
    const [aggMethod, setAggMethod] = useState(data?.aggMethod || 'average');

    const config = {
        nodeType: 'aggregator',
        title: 'Aggregator',
        inputs: [
            { id: `${id}-input1`, style: { top: '30%' } },
            { id: `${id}-input2`, style: { top: '50%' } },
            { id: `${id}-input3`, style: { top: '70%' } }
        ],
        outputs: [{ id: `${id}-output` }],
        fields: [
            {
                label: 'Method',
                type: 'select',
                defaultValue: aggMethod,
                options: [
                    { value: 'average', label: 'Average' },
                    { value: 'sum', label: 'Sum' },
                    { value: 'concat', label: 'Concatenate' }
                ],
                onChange: (e) => setAggMethod(e.target.value)
            }
        ],
        width: 200, // Reduced from 300
        height: 80,
        style: {}
    };

    return <BaseNode id={id} data={data} config={config} />;
}
