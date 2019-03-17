import React from 'react';
import PropTypes from 'prop-types';
import '../stylesheets/note.less';
import _ from 'lodash';

export default class Note extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			filled: ""
		}
	}

	componentDidMount() {
		const filled = this.props.checkFilled(this.props.data.id);
		this.setState({filled: filled});
	}

	noteClick = () => {
		if (this.state.filled) {
			this.props.noteClick(this.props.data);
			
		}
	}

	checkInPath = () => {
		const pathIndex = _.findIndex(this.props.path, (o) => o.id === this.props.data.id);
		if (pathIndex > -1) {
			return "selected";
		}
		
return "";
	}

	render() {
		const {data} = this.props,
			selected = this.checkInPath();

	return (
			<div className={`note ${this.state.filled} ${selected}`} onClick={this.noteClick}>
				<h3 className="note-name">{data.name}</h3>
				<h3 className="note-age">{data.age}</h3>
			</div>
		)
	}
}

Note.propTypes = {
	checkFilled: PropTypes.func,
	data: PropTypes.object,
	noteClick: PropTypes.func,
	path: PropTypes.array
}
