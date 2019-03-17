import ReactDOM from 'react-dom';
import React from 'react';
import PanelPage from './components/PanelPage.jsx';
import TicketsState from './store/panelAppStore';

window.panelApp = function(htmlid, source) {
	const store = new TicketsState(source);
	ReactDOM.render(React.createElement(PanelPage, {store: store}), document.getElementById(htmlid));
}
