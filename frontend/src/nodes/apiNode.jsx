// apiNode.js

import { BaseNode } from './BaseNode.jsx';
import { useState } from 'react';

export const APINode = ({ id, data }) => {
    const [url, setUrl] = useState(data?.url || 'https://api.example.com');
    const [method, setMethod] = useState(data?.method || 'GET');

    const config = {
        nodeType: 'api',
        title: 'API Call',
        inputs: [{ id: `${id}-input` }],
        outputs: [{ id: `${id}-output` }],
        fields: [
            {
                label: 'URL',
                type: 'text',
                defaultValue: url,
                onChange: (e) => setUrl(e.target.value)
            },
            {
                label: 'Method',
                type: 'select',
                defaultValue: method,
                options: [
                    { value: 'GET', label: 'GET' },
                    { value: 'POST', label: 'POST' }
                ],
                onChange: (e) => setMethod(e.target.value)
            }
        ],
        width: 200, // Reduced from 300
        height: 80,
        style: {}
    };

    return <BaseNode id={id} data={data} config={config} />;
}
