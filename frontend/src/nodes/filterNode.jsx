// filterNode.js

import { BaseNode } from './BaseNode.jsx';
import { useState } from 'react';

export const FilterNode = ({ id, data }) => {
    const [condition, setCondition] = useState(data?.condition || '');
    const [operator, setOperator] = useState(data?.operator || 'contains');

    const config = {
        nodeType: 'filter',
        title: 'Filter',
        inputs: [{ id: `${id}-input` }],
        outputs: [{ id: `${id}-output` }],
        fields: [
            {
                label: 'Condition',
                type: 'text',
                defaultValue: condition,
                onChange: (e) => setCondition(e.target.value)
            },
            {
                label: 'Operator',
                type: 'select',
                defaultValue: operator,
                options: [
                    { value: 'contains', label: 'Contains' },
                    { value: 'equals', label: 'Equals' },
                    { value: 'starts_with', label: 'Starts with' }
                ],
                onChange: (e) => setOperator(e.target.value)
            }
        ],
        width: 200, // Reduced from 300
        height: 80,
        style: {}
    };

    return <BaseNode id={id} data={data} config={config} />;
}
