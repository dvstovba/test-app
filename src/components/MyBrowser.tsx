import {Component} from 'react'
import {debounce} from 'lodash'
import FolderComponent from './FolderComponent/FolderComponent'
import {searchFile} from '../helpers/helpers'
import {getData} from '../api/api'
import {File, Folder} from "../models/models";

interface IProps {
  extendedFolders: string[] | null
}

interface IState {
  data: (Folder | File)[];
  filteredData: (Folder | File)[] | null;
  search: string;
  openAll: boolean;
}

class MyBrowser extends Component<IProps, IState> {
  state = {
    data: [], filteredData: [], search: '', openAll: false,
  }

  searchFunc = debounce((search: string) => {
    this.setState((state: IState): IState => {
      if (!search) {
        return {
          ...state,
          filteredData: state.data,
          openAll: false
        }
      }
      return {
        ...state,
        filteredData: searchFile(search, state.data),
        openAll: true,
      }
    })
  }, 500)

  componentDidMount = async () => {
    const data = await getData()
    this.setState({data, filteredData: data})
  }

  onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value
    this.setState({
      search,
    }, () => {
      this.searchFunc(search)
    })
  }

  render() {
    const {filteredData, search, openAll} = this.state
    const {extendedFolders} = this.props
    return <div>
      <input type="text" placeholder="Search file" onChange={this.onSearch}
             value={search}/>
      {filteredData?.map((item: Folder) => <FolderComponent
        data={item}
        key={item.name}
        openAll={openAll}
        extendedFolders={extendedFolders}
      />)}
    </div>
  }
}

export default MyBrowser
