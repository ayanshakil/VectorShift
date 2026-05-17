# Run Pipeline

A node-based pipeline editor built with React and FastAPI. It provides a drag-and-drop canvas for creating and analyzing data pipelines.

![Pipeline Builder](https://img.shields.io/badge/Status-Complete-success)
![React](https://img.shields.io/badge/React-18.2-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Latest-green)
![ReactFlow](https://img.shields.io/badge/ReactFlow-11.10-purple)

## 🎯 Features

### ✨ **9 Different Node Types**
- **Input Node** - Define pipeline inputs with type selection
- **Output Node** - Define pipeline outputs with type selection
- **LLM Node** - Large Language Model processing with system/prompt inputs
- **Text Node** - Advanced text processing with variable detection
- **Transformer Node** - Text transformation (Uppercase/Lowercase/Reverse)
- **Filter Node** - Data filtering with conditions and operators
- **Aggregator Node** - Combine multiple inputs (Average/Sum/Concatenate)
- **Validator Node** - Validate data (Email/URL/Number) with valid/invalid outputs
- **API Node** - Make HTTP requests (GET/POST)

### 🎨 **Professional UI/UX**
- Modern design with Inter font
- Color-coded node types
- Smooth animations and transitions
- Responsive layout
- Professional hover effects

### 🔧 **Advanced Text Node**
- **Auto-resize**: Node dimensions adjust based on content
- **Variable detection**: Detects `{{variableName}}` patterns
- **Dynamic handles**: Creates input handles for each detected variable
- **Visual feedback**: Shows detected variables as badges

### 🔌 **Backend Integration**
- FastAPI backend for pipeline analysis
- DAG (Directed Acyclic Graph) detection
- Node and edge counting
- CORS-enabled API

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Installation

#### 1. Backend Setup
```bash
cd backend
python -m pip install -r requirements.txt
```

#### 2. Frontend Setup
```bash
cd frontend
npm install
```

### Running the Application

#### Start Backend (Terminal 1)
```bash
cd backend
uvicorn main:app --reload --port 8000
```

Backend will be available at: `http://localhost:8000`  
API docs at: `http://localhost:8000/docs`

#### Start Frontend (Terminal 2)
```bash
cd frontend
npm run dev
```

Frontend will be available at: `http://localhost:5173`

## 📖 Usage

### Creating a Pipeline
1. **Drag nodes** from the left toolbar onto the canvas
2. **Connect nodes** by dragging from an output handle to an input handle
3. **Configure nodes** using the input fields in each node
4. **Click "Run Pipeline"** to analyze your pipeline

### Text Node Variables
Type variables in the format `{{variableName}}` in the Text node:
- `{{name}}` - Creates a handle labeled "name"
- `{{email}}` - Creates a handle labeled "email"
- Handles automatically appear and disappear based on your text

### Pipeline Analysis
When you click "Run Pipeline", the backend will:
- Count the number of nodes
- Count the number of edges/connections
- Detect if the pipeline is a valid DAG (no cycles)
- Display results in an alert

## 🏗️ Architecture

### Frontend Stack
- **React 18.2** - UI framework
- **ReactFlow 11.10** - Node editor library
- **Zustand 4.4** - State management
- **Vite 5.0** - Build tool

### Backend Stack
- **FastAPI** - Web framework
- **Pydantic** - Data validation
- **Uvicorn** - ASGI server

### Project Structure
```
Run_Pipeline/
├── backend/
│   ├── main.py              # FastAPI application
│   └── requirements.txt     # Python dependencies
│
├── frontend/
│   ├── src/
│   │   ├── nodes/
│   │   │   ├── BaseNode.jsx     # Generic node component
│   │   │   ├── inputNode.jsx    # Input node
│   │   │   ├── outputNode.jsx   # Output node
│   │   │   ├── llmNode.jsx      # LLM node
│   │   │   ├── textNode.jsx     # Advanced text node
│   │   │   ├── transformerNode.jsx
│   │   │   ├── filterNode.jsx
│   │   │   ├── aggregatorNode.jsx
│   │   │   ├── validatorNode.jsx
│   │   │   └── apiNode.jsx
│   │   ├── theme.js         # Design system
│   │   ├── ui.jsx           # ReactFlow canvas
│   │   ├── toolbar.jsx      # Node toolbar
│   │   ├── submit.jsx       # Submit button + API
│   │   ├── App.jsx          # Main app
│   │   ├── store.jsx        # Zustand store
│   │   └── index.css        # Global styles
│   └── package.json
│
├── IMPLEMENTATION_SUMMARY.md   # Detailed implementation docs
├── VERIFICATION_GUIDE.md       # Testing checklist
└── README.md                   # This file
```

## 🎨 Design System

### Colors
- **Primary**: Indigo (#6366f1)
- **Secondary**: Dark Indigo (#4f46e5)
- **Background**: Light Gray (#f3f4f6)
- **Surface**: White (#ffffff)

### Node Colors
- **Transformer**: Light Blue (#e0f2fe)
- **Filter**: Light Orange (#ffedd5)
- **Aggregator**: Light Purple (#f3e8ff)
- **Validator**: Light Green (#dcfce7)
- **API**: Light Pink (#fce7f3)

### Typography
- **Font**: Inter (Google Fonts)
- **Sizes**: 0.75rem → 1.125rem
- **Weights**: 400, 500, 700

## 🔧 API Endpoints

### `GET /`
Health check endpoint.

**Response:**
```json
{
  "Ping": "Pong"
}
```

### `POST /pipelines/parse`
Analyze a pipeline.

**Request Body:**
```json
{
  "nodes": [
    { "id": "node-1" },
    { "id": "node-2" }
  ],
  "edges": [
    { "source": "node-1", "target": "node-2" }
  ]
}
```

**Response:**
```json
{
  "num_nodes": 2,
  "num_edges": 1,
  "is_dag": true
}
```

## 🧪 Testing

### Manual Testing Checklist

**Part 1: Node Abstraction**
- [ ] All 9 nodes appear in toolbar
- [ ] Can drag each node onto canvas
- [ ] Nodes have correct inputs/outputs
- [ ] Dropdowns and fields work

**Part 2: Styling**
- [ ] App looks professional
- [ ] Nodes have color-coded backgrounds
- [ ] Hover effects work
- [ ] Inter font is loaded

**Part 3: Text Node**
- [ ] Type `{{name}}` → handle appears
- [ ] Type `{{email}}` → second handle appears
- [ ] Delete variable → handle disappears
- [ ] Node resizes with content
- [ ] Variables shown as badges

**Part 4: Backend**
- [ ] Create pipeline with 3 nodes
- [ ] Click "Run Pipeline"
- [ ] Correct counts displayed
- [ ] DAG detection works
- [ ] Cycle detection works

## 📝 Implementation Highlights

### 1. BaseNode Abstraction
Created a generic `BaseNode` component that eliminated ~70% code duplication across node types. New nodes can be created with just a config object.

### 2. Color-Coded Architecture
Each node type has a unique pastel color for instant visual recognition:
```javascript
config = {
  nodeType: 'transformer',  // Maps to theme color
  title: 'Transformer',
  inputs: [...],
  outputs: [...],
  fields: [...]
}
```

### 3. Dynamic Variable Detection
Text node uses regex to detect variables in real-time:
```javascript
/\{\{([a-zA-Z_$][a-zA-Z0-9_$]*)\}\}/g
```
Creates handles dynamically as user types.

### 4. DAG Detection Algorithm
Efficient cycle detection using DFS with state tracking:
- **Time Complexity**: O(V + E)
- **Space Complexity**: O(V)
- **States**: 0=unvisited, 1=visiting, 2=visited

## 🐛 Known Issues
None! All bugs from initial implementation have been fixed:
- ✅ Handle positioning corrected
- ✅ Node color coding implemented
- ✅ All features working as expected

## 📄 License
This is a technical assessment project.

## 👨‍💻 Author
Built for VectorShift Frontend Technical Assessment

---

**Status**: ✅ Complete and ready for submission!
# Run_Pipeline
# Run_Pipeline
