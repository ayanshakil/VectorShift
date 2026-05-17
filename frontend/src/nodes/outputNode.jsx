// outputNode.js

import { BaseNode } from './BaseNode.jsx';
import { useState } from 'react';

export const OutputNode = ({ id, data }) => {
    const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_').replace(/-[0-9]+$/, ''));
    const [outputType, setOutputType] = useState(data.outputType || 'Text');

    const config = {
        title: 'Output',
        inputs: [{ id: `${id}-value` }],
        outputs: [],
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
                defaultValue: outputType,
                options: [
                    { value: 'Text', label: 'Text' },
                    { value: 'Image', label: 'Image' }
                ],
                onChange: (e) => setOutputType(e.target.value)
            }
        ],
        width: 200, // Reduced from 300
        nodeType: 'customOutput',
        height: 80,
        style: {}
    };

    return <BaseNode id={id} data={data} config={config} />;
}
