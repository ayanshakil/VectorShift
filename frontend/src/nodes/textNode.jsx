// textNode.js

import { useState, useEffect, useRef } from 'react';
import { BaseNode } from './BaseNode.jsx';
import { theme } from '../theme.js';

export const TextNode = ({ id, data }) => {
    const [currText, setCurrText] = useState(data?.text || '{{input}}');
    const [variables, setVariables] = useState([]);

    // Variable detection logic
    useEffect(() => {
        const regex = /\{\{([a-zA-Z_$][a-zA-Z0-9_$]*)\}\}/g;
        const matches = [];
        let match;
        while ((match = regex.exec(currText)) !== null) {
            matches.push(match[1]);
        }
        const uniqueVars = [...new Set(matches)];
        setVariables(uniqueVars);
    }, [currText]);

    // Construct dynamic inputs based on variables
    const dynamicInputs = variables.map((variable, idx) => ({
        id: `${id}-${variable}`,
        style: {
            top: `${(100 / (variables.length + 1)) * (idx + 1)}%`,
            // BaseNode handles common styling, but we can override if needed
        }
    }));

    const config = {
        nodeType: 'text',
        title: 'Text',
        inputs: dynamicInputs,
        outputs: [{ id: `${id}-output` }],
        fields: [
            {
                label: 'Text',
                type: 'textarea', // Use textarea for multiline
                defaultValue: currText,
                onChange: (e) => setCurrText(e.target.value)
            }
        ],
        width: 200,
        height: 'auto', // Allow growth
        style: {}
    };

    return <BaseNode id={id} data={data} config={config} />;
}
