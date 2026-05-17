// validatorNode.js

import { BaseNode } from './BaseNode.jsx';
import { useState } from 'react';

export const ValidatorNode = ({ id, data }) => {
    const [validationType, setValidationType] = useState(data?.validationType || 'email');

    const config = {
        nodeType: 'validator',
        title: 'Validator',
        inputs: [{ id: `${id}-input` }],
        outputs: [
            { id: `${id}-valid`, style: { top: '30%' } },
            { id: `${id}-invalid`, style: { top: '70%' } }
        ],
        fields: [
            {
                label: 'Type',
                type: 'select',
                defaultValue: validationType,
                options: [
                    { value: 'email', label: 'Email' },
                    { value: 'url', label: 'URL' },
                    { value: 'number', label: 'Number' }
                ],
                onChange: (e) => setValidationType(e.target.value)
            }
        ],
        width: 200, // Reduced from 300
        height: 80,
        style: {}
    };

    return <BaseNode id={id} data={data} config={config} />;
}
