import {Component} from "react";
import './FileComponent.css'
import {File} from "../../models/models";

interface IProps {
    data: File,
    path: string
}

class FileComponent extends Component<IProps> {
    render() {
        const {data, path} = this.props;

        return (
            <div
                className='file-component'
                onClick={() => console.log(`${path}/${data.name}`)}
            >
                <b>{data.name}</b> <i>{data.mime}</i>
            </div>
        )
    }
}

export default FileComponent
