// theme.js

export const theme = {
    colors: {
        primary: '#6366f1', // Indigo-500
        secondary: '#4f46e5', // Indigo-600 for hover
        background: '#f8fafc', // Slate-50
        text: {
            primary: '#1e293b',
            secondary: '#64748b',
        },
        nodes: {
            bg: '#ffffff',
            border: '#e2e8f0',
            borderSelected: '#6366f1',
            handle: '#6366f1',
            handleBg: '#ffffff',
            default: '#ffffff',
            customInput: '#fff7ed', // Orange-ish white
            llm: '#eff6ff', // Blue-ish white
            customOutput: '#f0fdf4', // Green-ish white
            text: '#faf5ff', // Purple-ish white
            transformer: '#f0f9ff', // Sky
            filter: '#fdf2f8', // Pink
            aggregator: '#fefce8', // Yellow
            validator: '#ecfdf5', // Emerald
            api: '#f5f3ff', // Violet
        },
        success: '#22c55e',
        error: '#ef4444',
        warning: '#f59e0b',
    },
    typography: {
        fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
        fontSize: {
            xs: '12px',
            sm: '13px',
            base: '14px',
            lg: '16px',
            xl: '20px',
        },
        fontWeight: {
            normal: 400,
            medium: 500,
            bold: 600,
        },
    },
    shadows: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    },
    borderRadius: {
        sm: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        full: '9999px',
    },
    spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
    },
    transitions: {
        default: 'all 0.2s ease-in-out',
    }
};
