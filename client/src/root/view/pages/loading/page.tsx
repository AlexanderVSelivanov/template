import React from 'react';
import InProgress from '../../components/InProgress';

const LoadingPage: React.FC<{text?: string}> = React.memo(({text = 'Loading...'}) => <InProgress text={text}/>);

export default LoadingPage;
