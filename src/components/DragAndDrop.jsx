import React from 'react';
import PropTypes from 'prop-types';
import '../stylesheets/dragZone.less';

export default class DragAndDrop extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			drag: false
		}
	}
  
  dropRef = React.createRef();

  handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      this.setState({drag: true})
    }
  }

  handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter--;
    if (this.dragCounter === 0) {
      this.setState({drag: false});
    }
  }

  handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({drag: false});
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      this.props.handleDrop(e.dataTransfer.files);
      e.dataTransfer.clearData();
      this.dragCounter = 0;   
    }
  }

  componentDidMount() {
    const div = this.dropRef.current;
    div.addEventListener('dragenter', this.handleDragIn);
    div.addEventListener('dragleave', this.handleDragOut);
    div.addEventListener('dragover', this.handleDrag);
    div.addEventListener('drop', this.handleDrop);
  }

  componentWillUnmount() {
    const div = this.dropRef.current;
    div.removeEventListener('dragenter', this.handleDragIn);
    div.removeEventListener('dragleave', this.handleDragOut);
    div.removeEventListener('dragover', this.handleDrag);
    div.removeEventListener('drop', this.handleDrop);
  }

  render() {
    return (
      <div className="drag-zone" ref={this.dropRef}>
        {this.state.drag &&
          <div className="drag-zone-overlay">
            <div className="drag-zone-text">
              <div>drop file here</div>
            </div>
          </div>
        }
        {this.props.children}
      </div>
    )
  }
}

DragAndDrop.propTypes = {
  children: PropTypes.element,
  handleDrop: PropTypes.func
}
