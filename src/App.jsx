// App.jsx
import React, { useState } from 'react';
import TreeVisualizer from './TreeVisualizer';
import './App.css';

const App = () => {
  const [jsonData, setJsonData] = useState('');
  const [treeData, setTreeData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [pathFunc, setPathFunc] = useState('diagonal'); // Default pathFunc

  const handleInputChange = (event) => {
    setJsonData(event.target.value);
  };

  const handlePathFuncChange = (event) => {
    setPathFunc(event.target.value); // Update selected pathFunc
  };

  const transformData = (data, isRoot = true) => {
    if (typeof data !== 'object' || data === null) {
      return null;
    }

    const transformNode = (node, nodeName = '', isRoot = false) => {
      if (typeof node !== 'object' || node === null) {
        return { name: `${nodeName}: ${String(node)}` };
      }

      if (Array.isArray(node)) {
        return {
          name: nodeName,
          children: node.map((item, index) => transformNode(item, `${index}`, false)),
        };
      }

      const children = Object.entries(node).map(([key, value]) => ({
        name: key,
        children: Array.isArray(value)
          ? transformNode(value, key).children
          : typeof value === 'object'
          ? transformNode(value, key).children
          : [{ name: `${key}: ${String(value)}` }],
      }));

      return { name: isRoot ? 'Root' : nodeName, children };
    };

    return transformNode(data, 'Root', isRoot);
  };

  const handleVisualizeClick = () => {
    if (!jsonData.trim()) {
      setErrorMessage('Please enter JSON data.');
      setTreeData(null);
      return;
    }

    try {
      const parsedData = JSON.parse(jsonData);
      const transformedData = transformData(parsedData, true);
      setTreeData(transformedData);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Invalid JSON data. Please check your input and try again.');
      setTreeData(null);
    }
  };

  return (
    <div className="app-container">
      <h1 className="title">JSON Visualizer</h1>
      <div className="content-container">
        <div className="input-container">
          <textarea
            value={jsonData}
            onChange={handleInputChange}
            placeholder="Enter JSON data here.."
          />
          {/* Flex container for the button and select */}
          <div className="button-select-container">
            <button onClick={handleVisualizeClick}>Visualize JSON</button>
            <select value={pathFunc} onChange={handlePathFuncChange}>
              <option value="diagonal">Diagonal</option>
              <option value="straight">Straight</option>
              <option value="elbow">Elbow</option>
              <option value="step">Step</option>
            </select>
          </div>
          {/* {errorMessage && <p className="error-message">{errorMessage}</p>} */}
        </div>

        <div className="tree-container">
          {treeData ? (
            <TreeVisualizer data={treeData} pathFunc={pathFunc} />
          ) : (
            <p className="error-message">{errorMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
