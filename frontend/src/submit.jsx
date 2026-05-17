// submit.js
import { theme } from './theme.js';
import { useStore } from './store.jsx';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

export const SubmitButton = () => {
    const { nodes, edges } = useStore(state => ({
        nodes: state.nodes,
        edges: state.edges
    }));

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nodes: nodes.map(node => ({ id: node.id })),
                    edges: edges.map(edge => ({ source: edge.source, target: edge.target })),
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            toast.custom((t) => (
                <div
                    style={{
                        padding: '16px', // Reduced from 24
                        background: t.visible ? (data.is_dag ? 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%)' : 'linear-gradient(135deg, #fef2f2 0%, #ffffff 100%)') : 'white',
                        border: '1px solid #e5e7eb',
                        borderLeft: data.is_dag ? '6px solid #10b981' : '6px solid #ef4444',
                        borderRadius: '12px',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
                        minWidth: '450px',
                        fontFamily: '"Inter", sans-serif',
                        animation: t.visible ? 'fadeIn 0.4s ease-out' : 'fadeOut 0.4s ease-in',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px', // Reduced from 16
                        opacity: t.visible ? 1 : 0,
                        transform: t.visible ? 'translateY(0)' : 'translateY(-10px)',
                        transition: 'all 0.3s ease-in-out',
                        pointerEvents: 'auto',
                    }}
                >
                    {/* Header */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingBottom: '12px', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                        <div style={{
                            background: theme.colors.primary,
                            borderRadius: '50%',
                            width: '32px',
                            height: '32px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white'
                        }}>
                            <span style={{ fontSize: '16px' }}>⚡</span>
                        </div>
                        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: theme.colors.primary, letterSpacing: '-0.01em' }}>
                            Pipeline Analysis Results
                        </h3>
                    </div>

                    {/* Stats Row */}
                    <div style={{ display: 'flex', gap: '24px', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <span style={{ fontSize: '13px', color: '#6b7280', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Nodes</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{
                                    background: '#e0e7ff',
                                    color: '#4338ca',
                                    borderRadius: '8px',
                                    padding: '4px 12px',
                                    fontSize: '20px',
                                    fontWeight: '700'
                                }}>
                                    {data.num_nodes}
                                </div>
                                <span style={{ fontSize: '14px', color: '#9ca3af' }}>detected</span>
                            </div>
                        </div>

                        <div style={{ width: '1px', height: '40px', background: '#e5e7eb' }}></div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <span style={{ fontSize: '13px', color: '#6b7280', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Edges</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{
                                    background: '#e0e7ff',
                                    color: '#4338ca',
                                    borderRadius: '8px',
                                    padding: '4px 12px',
                                    fontSize: '20px',
                                    fontWeight: '700'
                                }}>
                                    {data.num_edges}
                                </div>
                                <span style={{ fontSize: '14px', color: '#9ca3af' }}>detected</span>
                            </div>
                        </div>
                    </div>

                    {/* Status Box */}
                    <div style={{
                        marginTop: '4px',
                        padding: '16px',
                        background: data.is_dag ? '#ecfdf5' : '#fef2f2',
                        border: `1px solid ${data.is_dag ? '#bbf7d0' : '#fecaca'}`,
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                    }}>
                        <div style={{
                            background: data.is_dag ? '#10b981' : '#ef4444',
                            borderRadius: '50%',
                            width: '24px',
                            height: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            color: 'white',
                            fontSize: '14px'
                        }}>
                            {data.is_dag ? '✓' : '✕'}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{
                                fontSize: '15px',
                                fontWeight: '600',
                                color: data.is_dag ? '#15803d' : '#991b1b',
                                lineHeight: '1.2'
                            }}>
                                {data.is_dag ? 'Valid Directed Acyclic Graph' : 'Cyclic Dependencies Detected'}
                            </span>
                            <span style={{ fontSize: '13px', color: data.is_dag ? '#166534' : '#b91c1c', marginTop: '2px' }}>
                                {data.is_dag ? 'Pipeline is ready to execute!' : 'Please resolve cycles before running.'}
                            </span>
                        </div>
                    </div>
                </div>
            ), { duration: data.is_dag ? 5000 : 7000 });

        } catch (error) {
            console.error('Error submitting pipeline:', error);
            toast.error('Could not connect to backend.');
        }
    };

    return (
        <button
            type="submit"
            onClick={handleSubmit}
            style={{
                padding: '12px 24px',
                background: theme.colors.primary,
                color: 'white',
                border: 'none',
                borderRadius: theme.borderRadius.md,
                fontSize: theme.typography.fontSize.base,
                fontWeight: theme.typography.fontWeight.medium,
                cursor: 'pointer',
                boxShadow: theme.shadows.md,
                transition: 'all 0.2s',
            }}
            onMouseOver={(e) => {
                e.target.style.background = theme.colors.secondary;
                e.target.style.transform = 'translateY(-1px)';
                e.target.style.boxShadow = theme.shadows.lg;
            }}
            onMouseOut={(e) => {
                e.target.style.background = theme.colors.primary;
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = theme.shadows.md;
            }}
        >
            Run Pipeline
        </button>
    );
}
