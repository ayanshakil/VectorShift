// BaseNode.js

import { Handle, Position } from 'reactflow';
import { theme } from '../theme.js';

export const BaseNode = ({ id, data, config }) => {
    // Determine background color based on node type from config
    const nodeType = config.nodeType || 'default';
    const backgroundColor = theme.colors.nodes[nodeType] || theme.colors.surface;

    return (
        <div
            className="custom-node"
            style={{
                ...config.style,
                width: config.width || 200,
                height: config.height || 'auto',
                border: `1px solid ${theme.colors.border}`,
                padding: '16px',
                borderRadius: theme.borderRadius.lg,
                background: backgroundColor,
                boxShadow: theme.shadows.md,
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                transition: 'all 0.2s',
                position: 'relative'
            }}
        >

            {/* Inputs */}
            {(config.inputs || []).map((input) => (
                <Handle
                    key={input.id}
                    type="target"
                    position={Position.Left}
                    id={input.id}
                    style={{
                        background: theme.colors.primary,
                        width: '12px',
                        height: '12px',
                        border: `3px solid ${theme.colors.surface}`,
                        boxShadow: '0 2px 4px rgba(99, 102, 241, 0.3)',
                        ...input.style
                    }}
                />
            ))}

            {/* Header */}
            <div style={{
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.text.primary,
                fontSize: theme.typography.fontSize.lg, // Increased from base
                borderBottom: `1px solid ${theme.colors.border}`,
                paddingBottom: '8px'
            }}>
                {config.title}
            </div>

            {/* Fields */}
            {(config.fields || []).map((field) => (
                <div key={field.name} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{
                        fontSize: theme.typography.fontSize.sm, // Increased from xs
                        color: theme.colors.text.secondary,
                        fontWeight: theme.typography.fontWeight.medium
                    }}>
                        {field.label}
                    </label>
                    {field.type === 'text' && (
                        <input
                            type="text"
                            defaultValue={field.defaultValue}
                            onChange={(e) => field.onChange && field.onChange(e, id)}
                            style={{
                                width: '100%',
                                boxSizing: 'border-box',
                                padding: '6px 10px',
                                borderRadius: theme.borderRadius.sm,
                                border: `1px solid ${theme.colors.border}`,
                                fontSize: theme.typography.fontSize.base, // Increased from sm
                                outline: 'none',
                            }}
                            onFocus={(e) => e.target.style.borderColor = theme.colors.primary}
                            onBlur={(e) => e.target.style.borderColor = theme.colors.border}
                        />
                    )}
                    {field.type === 'select' && (
                        <select
                            defaultValue={field.defaultValue}
                            onChange={(e) => field.onChange && field.onChange(e, id)}
                            style={{
                                width: '100%',
                                boxSizing: 'border-box',
                                padding: '6px 10px',
                                borderRadius: theme.borderRadius.sm,
                                border: `1px solid ${theme.colors.border}`,
                                fontSize: theme.typography.fontSize.base, // Increased from sm
                                backgroundColor: 'white'
                            }}
                        >
                            {field.options.map((opt) => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    )}
                    {field.type === 'textarea' && (
                        <textarea
                            ref={field.inputRef}
                            {...(field.value !== undefined
                                ? { value: field.value }
                                : { defaultValue: field.defaultValue })}
                            onChange={(e) => field.onChange && field.onChange(e, id)}
                            onInput={field.autoResize ? (e) => {
                                e.target.style.height = 'auto';
                                e.target.style.height = `${e.target.scrollHeight}px`;
                            } : undefined}
                            style={{
                                width: '100%',
                                boxSizing: 'border-box',
                                minHeight: field.minHeight || '60px',
                                padding: '6px 10px',
                                borderRadius: theme.borderRadius.sm,
                                border: `1px solid ${theme.colors.border}`,
                                fontSize: theme.typography.fontSize.base,
                                fontFamily: 'monospace',
                                resize: field.autoResize ? 'none' : 'vertical',
                                overflow: field.autoResize ? 'hidden' : 'auto',
                                outline: 'none',
                            }}
                            onFocus={(e) => e.target.style.borderColor = theme.colors.primary}
                            onBlur={(e) => e.target.style.borderColor = theme.colors.border}
                        />
                    )}
                </div>
            ))}

            {/* Outputs */}
            {(config.outputs || []).map((output) => (
                <Handle
                    key={output.id}
                    type="source"
                    position={Position.Right}
                    id={output.id}
                    style={{
                        background: theme.colors.primary,
                        width: '12px',
                        height: '12px',
                        border: `3px solid ${theme.colors.surface}`,
                        boxShadow: '0 2px 4px rgba(99, 102, 241, 0.3)',
                        ...output.style
                    }}
                />
            ))}
        </div>
    );
};
