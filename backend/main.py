from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict

app = FastAPI()

# CORS configuration
origins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:5174",  # Vite alternate port
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Node(BaseModel):
    id: str

class Edge(BaseModel):
    source: str
    target: str

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

def is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    # Build adjacency list
    adj = {node.id: [] for node in nodes}
    for edge in edges:
         if edge.source in adj: # Ensure source exists
            adj[edge.source].append(edge.target)
    
    # 0 = unvisited, 1 = visiting, 2 = visited
    state = {node.id: 0 for node in nodes}
    
    def dfs(node_id):
        state[node_id] = 1 # Mark as visiting
        
        # Check neighbors
        if node_id in adj:
            for neighbor in adj[node_id]:
                if neighbor in state:
                    if state[neighbor] == 1:
                        return False # Cycle detected
                    if state[neighbor] == 0:
                        if not dfs(neighbor):
                            return False
        
        state[node_id] = 2 # Mark as visited
        return True

    # Run DFS for every node
    for node in nodes:
        if state[node.id] == 0:
            if not dfs(node.id):
                return False # Cycle detected
                
    return True # No cycles found

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    is_dag_result = is_dag(pipeline.nodes, pipeline.edges)
    
    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_dag_result
    }
