// inputNode.js

import { BaseNode } from './BaseNode.jsx';
import { useState } from 'react';

export const InputNode = ({ id, data }) => {
    const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_').replace(/-[0-9]+$/, ''));
    const [inputType, setInputType] = useState(data.inputType || 'Text');

    const config = {
        title: 'Input',
        inputs: [],
        outputs: [{ id: `${id}-value` }],
        fields: [
            {
                label: 'Name',
                type: 'text',
                defaultValue: currName,
                onChange: (e) => setCurrName(e.target.value)
            },
            {
                label: 'Type',
                type: 'select',
                defaultValue: inputType,
                options: [
                    { value: 'Text', label: 'Text' },
                    { value: 'File', label: 'File' }
                ],
                onChange: (e) => setInputType(e.target.value)
            }
        ],
        width: 200, // Reduced from 300
        nodeType: 'customInput',
        height: 80,
        style: {}
    };

    return <BaseNode id={id} data={data} config={config} />;
}
