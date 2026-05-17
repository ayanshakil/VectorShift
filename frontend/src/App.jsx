import { PipelineToolbar } from './toolbar.jsx';
import { PipelineUI } from './ui.jsx';
import { SubmitButton } from './submit.jsx';
import { theme } from './theme.js';
import { Toaster } from 'react-hot-toast';

function App() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            width: '100vw',
            background: theme.colors.background,
            overflow: 'hidden'
        }}>
            <Toaster position="top-center" />
            {/* Header */}
            <header style={{
                background: 'white',
                padding: '0 20px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                boxShadow: theme.shadows.sm,
                zIndex: 10
            }}>
                <h1 style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: theme.colors.primary,
                    margin: 0
                }}>
                    Pipeline Builder
                </h1>
            </header>

            {/* Main Content */}
            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                <div style={{
                    width: '280px',
                    borderRight: `1px solid ${theme.colors.border}`,
                    background: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    zIndex: 5
                }}>
                    <PipelineToolbar />
                </div>

                <div style={{ flex: 1, position: 'relative' }}>
                    <PipelineUI />
                    <div style={{
                        position: 'absolute',
                        bottom: '30px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 100
                    }}>
                        <SubmitButton />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
