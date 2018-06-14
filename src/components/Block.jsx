import React from 'react';

import '../css/block.scss'

const Block = (props) => {
  // console.log(props);
  const { row, column, value } = props;

  const renderCircle = () => {
    if (value === 0) return (<div className="circle"></div>);
    if (value === 1) return (<div className="circle firstPlayer"></div>);
    if (value === 2) return (<div className="circle secondPlayer"></div>);    
  }

  return(
    <div className="block">
      {renderCircle()}
    </div>
  );
};

export default Block;
