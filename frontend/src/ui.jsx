
// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store.jsx';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode.jsx';
import { LLMNode } from './nodes/llmNode.jsx';
import { OutputNode } from './nodes/outputNode.jsx';
import { TextNode } from './nodes/textNode.jsx';
import { TransformerNode } from './nodes/transformerNode.jsx';
import { FilterNode } from './nodes/filterNode.jsx';
import { AggregatorNode } from './nodes/aggregatorNode.jsx';
import { ValidatorNode } from './nodes/validatorNode.jsx';
import { APINode } from './nodes/apiNode.jsx';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
    customInput: InputNode,
    llm: LLMNode,
    customOutput: OutputNode,
    text: TextNode,
    transformer: TransformerNode,
    filter: FilterNode,
    aggregator: AggregatorNode,
    validator: ValidatorNode,
    api: APINode,
};

const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
});

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode, getNodeID } = useStore(
        (state) => ({
            nodes: state.nodes,
            edges: state.edges,
            onNodesChange: state.onNodesChange,
            onEdgesChange: state.onEdgesChange,
            onConnect: state.onConnect,
            addNode: state.addNode,
            getNodeID: state.getNodeID,
        }),
        shallow
    );

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
            if (event?.dataTransfer?.getData('application/reactflow')) {
                const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
                const type = appData?.nodeType;

                // check if the dropped element is valid
                if (typeof type === 'undefined' || !type) {
                    return;
                }

                const position = reactFlowInstance.project({
                    x: event.clientX - reactFlowBounds.left,
                    y: event.clientY - reactFlowBounds.top,
                });

                const nodeID = getNodeID(type);
                const newNode = {
                    id: nodeID,
                    type,
                    position,
                    data: {},
                };

                addNode(newNode);
            }
        },
        [reactFlowInstance, addNode, getNodeID]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    return (
        <>
            <div ref={reactFlowWrapper} style={{ width: '100%', height: '100%' }}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    onInit={setReactFlowInstance}
                    nodeTypes={nodeTypes}
                    proOptions={proOptions}
                    snapGrid={[gridSize, gridSize]}
                    connectionLineType='smoothstep'
                    defaultEdgeOptions={{
                        type: 'smoothstep',
                        animated: true,
                        style: { stroke: '#6366f1', strokeWidth: 2 }
                    }}
                >
                    <Background color="#aaa" gap={gridSize} />
                    <Controls />
                    <MiniMap />
                </ReactFlow>
            </div>
        </>
    )
}
