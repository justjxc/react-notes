import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import Home from './components/Home/Home';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Home />
	</React.StrictMode>
);
