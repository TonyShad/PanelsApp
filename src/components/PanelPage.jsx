import React from 'react';
import PropTypes from 'prop-types';
import DragAndDrop from './DragAndDrop.jsx';
import Panel from './Panel.jsx';
import {observer} from 'mobx-react';
import _ from 'lodash';
import '../stylesheets/panelPage.less';

@observer
class PanelPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			ageSort: false,
			nameSort: false,
			path: []
		}
	}

	checkFilled = (noteId) => {
		const childIndex = _.findIndex(this.props.store.people, (o) => o.parentId === noteId);
		if (childIndex >= 0) {
			return "filled";
		}

		return "";
	}

	noteClick = (note) => {

		const pathIndex = _.findIndex(this.state.path, (o) => o.parentId === note.parentId);
		if (pathIndex < 0) {
			this.setState((prevState) => ({
				path: [
					...prevState.path,
					note
				]
			}));
		} else {
			const isSameNote = this.state.path[pathIndex].id === note.id;
			this.setState({
				path: this.state.path.filter((item, i) => i < pathIndex)
			}, () => {
				if (!isSameNote) {
					this.setState((prevState) => ({
						path: [
							...prevState.path,
							note
						]
					}));
				}
			});

		}

	}

	toggleSortByName = () => {
		this.setState({nameSort: !this.state.nameSort});
	}

	toggleSortByAge = () => {
		this.setState({ageSort: !this.state.ageSort});
	}

	applySorts = (data) => {
		let res = data;
		if (this.state.nameSort) {
			res = _.sortBy(data, ['name']);
		}
		if (this.state.ageSort) {
			res = _.sortBy(data, ['age']);
		}

		return res;
	}

	filterPeopleByNullParentId = () => {
		let {people} = this.props.store;
		people = this.applySorts(people);

		return _.filter(people, {'parentId': null});
	}

	filterPeopleByParentId = (parentId) => {
		let {people} = this.props.store;
		people = this.applySorts(people);

		return _.filter(people, {'parentId': parentId});
	}

	handleNewFile = (files) => {
		this.props.store.readFile(files[0]);

	}


	render() {
		const {path} = this.state;
		let ageSort = "",
			nameSort = "";
		if (this.state.nameSort) {
			nameSort = "enabled";
		}
		if (this.state.ageSort) {
			ageSort = "enabled";
		}

		return (
			<div className="page-layout">
				<div className="page-menu">
					<h3>Sort</h3>
					<button className={`btn ${nameSort}`} onClick={this.toggleSortByName}>By name</button>
					<button className={`btn ${ageSort}`} onClick={this.toggleSortByAge}>By age</button>
				</div>
				<DragAndDrop handleDrop={this.handleNewFile}>
					<div className="panels-container">
						<Panel key={-1} parentName={"Root"} path={this.state.path} people={this.filterPeopleByNullParentId()} checkFilled={this.checkFilled} checkSelected={this.checkSelected} noteClick={this.noteClick} />
						{path.map((note, i) => <Panel key={i} parentName={note.name} path={this.state.path} people={this.filterPeopleByParentId(note.id)} checkFilled={this.checkFilled} checkSelected={this.checkSelected} noteClick={this.noteClick} />)}
					</div>
				</DragAndDrop>
			</div>
		)
	}
}

PanelPage.propTypes = {
	store: PropTypes.object

}

export default PanelPage;
