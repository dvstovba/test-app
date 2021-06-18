import {Component} from "react";
import './FileComponent.css'

class FileComponent extends Component {
  render() {
    const {data} = this.props;

    return <div className='file-component'>
      <b>{data.name}</b> <i>{data.mime}</i>
    </div>
  }
}

export default FileComponent
