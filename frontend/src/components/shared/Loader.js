import React from 'react';
import { TailSpin } from 'react-loader-spinner';

function Loader() {
  return (
    <TailSpin  type="Puff" color="#3084a4ff" height={80} width={80} />
  );
}

export default Loader;
