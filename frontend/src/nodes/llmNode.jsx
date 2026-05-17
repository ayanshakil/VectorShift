// llmNode.js

import { BaseNode } from './BaseNode.jsx';
import { useState } from 'react';

export const LLMNode = ({ id, data }) => {
    const [model, setModel] = useState(data?.model || 'gpt-3.5');

    const config = {
        title: 'LLM',
        inputs: [
            { id: `${id}-system`, style: { top: `${100 / 3}%` } },
            { id: `${id}-prompt`, style: { top: `${200 / 3}%` } }
        ],
        outputs: [{ id: `${id}-response` }],
        fields: [
            {
                label: 'Model',
                type: 'select',
                defaultValue: model,
                options: [
                    { value: 'gpt-3.5', label: 'GPT-3.5' },
                    { value: 'gpt-4', label: 'GPT-4' },
                    { value: 'gemini-pro', label: 'Gemini Pro' }
                ],
                onChange: (e) => setModel(e.target.value)
            }
        ],
        width: 200, // Reduced from 300
        nodeType: 'llm',
        height: 80,
        style: {}
    };

    return <BaseNode id={id} data={data} config={config} />;
}
