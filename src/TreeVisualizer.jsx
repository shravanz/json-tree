import React, { useRef, useEffect, useState } from 'react';
import Tree from 'react-d3-tree';
import './custom-tree.css';

const TreeVisualizer = ({ data, pathFunc }) => {
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const treeContainerRef = useRef(null);

  useEffect(() => {
    // Calculate the center of the tree container and set translate state
    if (treeContainerRef.current) {
      const { width, height } = treeContainerRef.current.getBoundingClientRect();
      // Set x close to the left (10% of width) and y centered vertically
      setTranslate({ x: width / 4, y: height / 2 }); // Adjust x or y values as necessary
    }
  }, []);

  const containerStyles = {
    width: '100%',
    height: '100%',
  };

  const pathClassFunc = () => 'custom-link';

  return (
    <div style={containerStyles} ref={treeContainerRef}>
      <Tree
        data={data}
        pathFunc={pathFunc} // Customizable path function
        translate={translate} // Position the root node on the left and center vertically
        orientation="horizontal" // Make the tree grow horizontally from left to right
        rootNodeClassName="node__root"
        branchNodeClassName="node__branch"
        leafNodeClassName="node__leaf"
        pathClassFunc={pathClassFunc} // Apply custom link class for lines
      />
    </div>
  );
};

export default TreeVisualizer;
