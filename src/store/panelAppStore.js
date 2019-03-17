import {observable} from 'mobx';
const json = require("../../sample.json");
export default class TicketsState {
	@observable people = [];

	constructor() {
		this.people = json;
	}


	readFile = (file) => {
		const reader = new FileReader();
		reader.onload = (event) => {
			const parsedObj = JSON.parse(event.target.result);
			this.people = parsedObj;

		}
		reader.readAsText(file);


	}



}
