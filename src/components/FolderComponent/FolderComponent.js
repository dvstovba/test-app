import { PureComponent } from 'react'
import FileComponent from '../FileComponent/FileComponent'
import { getCurrentExtended } from '../../helpers/helpers'
import './FolderComponent.css'

class FolderComponent extends PureComponent {
  state = {
    open: false, expandedList: null,
  }

  componentDidMount () {
    if (!this.props.openAll) {
      this.setOpen()
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (!prevState.open && this.props.openAll) {
      this.setState({ open: true })
    }
    if (prevProps.openAll && !this.props.openAll && !this.state.expandedList) {
      this.setOpen()
    }
  }

  setOpen = () => {
    const expandedList = getCurrentExtended(this.props.data.name,
      this.props.extendedFolders)
    let open = !!expandedList
    this.setState({ open, expandedList })
  }

  render () {
    const { data, openAll } = this.props

    const { open, expandedList } = this.state

    return (<div className="folder-component">
        <div className="folder-component-btn-wrapper">
          <button
            className="folder-component-btn"
            disabled={!data?.children?.length}
            onClick={() => {
              this.setState({ open: !open })
            }}>
            {open ? '-' : '+'}
          </button>
          <b>{data.name}</b>
        </div>
        {open && data.children && (<div className="folder-component-list">
            {data.children.map((item) => {
              if (item.type === 'FOLDER') {
                return <FolderComponent data={item} key={item.name}
                                        extendedFolders={expandedList}
                                        openAll={openAll}/>
              }
              if (item.type === 'FILE') {
                return <FileComponent data={item} key={item.name}/>
              }
              return null
            })}
          </div>)}
      </div>)
  }
}

export default FolderComponent
