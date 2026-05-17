// toolbar.js

import { DraggableNode } from './draggableNode.jsx';
import { theme } from './theme.js';

export const PipelineToolbar = () => {

    return (
        <div style={{ padding: '20px', flex: 1, overflowY: 'auto' }}>
            <h2 style={{
                fontSize: theme.typography.fontSize.sm,
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.text.secondary,
                textTransform: 'uppercase',
                marginBottom: '16px',
                whiteSpace: 'nowrap'
            }}>
                Available Nodes
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <div style={{ height: '1px', background: theme.colors.border, margin: '8px 0' }}></div>
                <DraggableNode type='transformer' label='Transformer' />
                <DraggableNode type='filter' label='Filter' />
                <DraggableNode type='aggregator' label='Aggregator' />
                <DraggableNode type='validator' label='Validator' />
                <DraggableNode type='api' label='API' />
            </div>
        </div>
    );
};
