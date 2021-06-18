import {PureComponent} from 'react'
import FileComponent from '../FileComponent/FileComponent'
import './FolderComponent.css'
import {Folder} from "../../models/models";

interface IProps {
    data: Folder;
    path?: string
    openAll: boolean;
    extendedFolders: string[] | null
}

interface IState {
    open: boolean;
    path: string;
}

class FolderComponent extends PureComponent<IProps, IState> {
    state = {
        open: false,
        path: ''
    }

    componentDidMount() {
        const path = this.props.path ? `${this.props.path}/${this.props.data.name}` : this.props.data.name
        this.setState({
            path
        })
        if (!this.props.openAll) {
            this.setOpen(path)
        }
    }

    componentDidUpdate(prevProps: IProps, prevState: IState) {
        if (!prevState.open && this.props.openAll) {
            this.setState({open: true})
        }
        if (prevProps.openAll && !this.props.openAll) {
            this.setOpen(this.state.path)
        }
    }

    setOpen = (path: string): void => {
        this.setState({
            open: !!this.props.extendedFolders?.find(item => item.includes(path))
        })
    }

    render() {
        const {data, openAll, extendedFolders} = this.props

        const {open, path} = this.state

        return (<div className="folder-component">
            <div className="folder-component-btn-wrapper">
                <button
                    className="folder-component-btn"
                    disabled={!data?.children?.length}
                    onClick={() => {
                        this.setState({open: !open})
                    }}>
                    {open ? '-' : '+'}
                </button>
                <b
                    onClick={() => console.log(path)}
                >
                    {data.name}
                </b>
            </div>
            {open && data.children && (<div className="folder-component-list">
                {data.children.map((item) => {
                    if (item.type === 'FOLDER') {
                        return (
                            <FolderComponent
                                data={item}
                                key={item.name}
                                path={path}
                                extendedFolders={extendedFolders}
                                openAll={openAll}/>
                        )
                    }
                    if (item.type === 'FILE') {
                        return <FileComponent
                            data={item}
                            path={path}
                            key={item.name}/>
                    }
                    return null
                })}
            </div>)}
        </div>)
    }
}

export default FolderComponent
