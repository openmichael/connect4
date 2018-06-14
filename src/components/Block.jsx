import React from 'react';

import '../css/block.scss'

const Block = (props) => {
  const { row, column, value } = props;
  
  const handleClick = () => {
    props.handleClick(column);
  }

  const renderCircle = () => {
    if (value === 0) return (<div className="circle"></div>);
    if (value === 1) return (<div className="circle firstPlayer"></div>);
    if (value === 2) return (<div className="circle secondPlayer"></div>);
  }

  return(
    <div className="block" onClick={handleClick}>
      {renderCircle()}
    </div>
  );
};

export default Block;
