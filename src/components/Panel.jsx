import React from 'react';
import PropTypes from 'prop-types';
import Note from './Note.jsx';
import '../stylesheets/panel.less';

export default class Panel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	render() {
		const {people} = this.props;
		
		return (
			<div className="panel">
				<h3>{this.props.parentName}</h3>
				{people.map((item, i) => <Note key={i} data={item} path={this.props.path} checkFilled={this.props.checkFilled} checkSelected={this.props.checkSelected} noteClick={this.props.noteClick} />)}
			</div>
		)
	}
}

Panel.propTypes = {
  checkFilled: PropTypes.func,
  checkSelected: PropTypes.func,
  noteClick: PropTypes.func,
  parentName: PropTypes.string,
  path: PropTypes.array,
  people: PropTypes.array
}
