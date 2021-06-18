import {Component} from "react";
import {debounce} from 'lodash';
import FolderComponent from "./FolderComponent/FolderComponent";
import {searchFile} from "../helpers/helpers";
import {getData} from "../api/api";

class MyBrowser extends Component {
  state = {
    data: null,
    filteredData: null,
    search: '',
    openAll: false
  }

  componentDidMount = async () => {
    const data = await getData()
    this.setState({data, filteredData: data});
  }

  onSearch = (e) => {
    const search = e.target.value;
    this.setState({
      search,
    }, () => {
      this.searchFunc();
    })
  }

  searchFunc = debounce(() => {
    this.setState((state) => {
      const {search} = state
      if (!search) {
        return {...state, filteredData: state.data, openAll: false}
      }
      return {
        ...state,
        filteredData: searchFile(search, state.data),
        openAll: true
      }
    })
  }, 500)

  render() {
    const {filteredData, search, openAll} = this.state;
    const {extendedFolders} = this.props;
    return <div>
      <input type='text' placeholder='Search file' onChange={this.onSearch} value={search}/>
      {!!filteredData && filteredData.map(item =>
        <FolderComponent
          data={item}
          key={item.name}
          openAll={openAll}
          extendedFolders={extendedFolders}
        />
      )}
    </div>
  }
}

export default MyBrowser
