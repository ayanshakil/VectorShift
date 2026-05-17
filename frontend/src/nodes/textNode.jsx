// textNode.jsx

import { useState, useEffect, useMemo, useRef, useLayoutEffect } from 'react';
import { BaseNode } from './BaseNode.jsx';

const MIN_WIDTH = 220;
const MAX_WIDTH = 480;
const CHAR_WIDTH = 8;
const PADDING_X = 60;

const VAR_REGEX = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

export const TextNode = ({ id, data }) => {
    const [currText, setCurrText] = useState(data?.text || '{{input}}');
    const textareaRef = useRef(null);

    const variables = useMemo(() => {
        const found = new Set();
        let match;
        VAR_REGEX.lastIndex = 0;
        while ((match = VAR_REGEX.exec(currText)) !== null) {
            found.add(match[1]);
        }
        return [...found];
    }, [currText]);

    // Compute node width from longest line.
    const nodeWidth = useMemo(() => {
        const lines = currText.split('\n');
        const longest = lines.reduce((m, l) => Math.max(m, l.length), 10);
        return Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, longest * CHAR_WIDTH + PADDING_X));
    }, [currText]);

    // Resync textarea height whenever text or width changes (re-wrap).
    useLayoutEffect(() => {
        const ta = textareaRef.current;
        if (!ta) return;
        ta.style.height = 'auto';
        ta.style.height = `${ta.scrollHeight}px`;
    }, [currText, nodeWidth]);

    const dynamicInputs = variables.map((variable, idx) => ({
        id: `${id}-${variable}`,
        style: {
            top: `${(100 / (variables.length + 1)) * (idx + 1)}%`,
        },
    }));

    const config = {
        nodeType: 'text',
        title: 'Text',
        inputs: dynamicInputs,
        outputs: [{ id: `${id}-output` }],
        fields: [
            {
                label: 'Text',
                type: 'textarea',
                value: currText,
                inputRef: textareaRef,
                autoResize: true,
                minHeight: '40px',
                onChange: (e) => setCurrText(e.target.value),
            },
        ],
        width: nodeWidth,
        height: 'auto',
        style: {},
    };

    return <BaseNode id={id} data={data} config={config} />;
};
