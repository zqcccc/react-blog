import React from 'react'
import axios from 'axios'
import { preURL, publicURL } from "../config"
import moment from 'moment'
import ClassNames from 'classnames'
import './ArticleList.less'
import { Link } from "react-router-dom";
import {connect} from "react-redux";
import { getList } from 'action/action'
import { sortByDate } from 'reducer'

import { bindActionCreators } from "redux"

class ArticleList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            begin:0,
            pageSize: 8,
            list: []
        }
    }

    async componentDidMount(){
        // TODO：拉取数据
        if(this.props.list && !this.props.list.size) {
          this.props.getList()
        }
        // const res = await axios.get('/api/article')
        // console.log('res: ', res);
        // if(res.data && res.data.code && res.data.data) {
        //   this.setState({
        //     list: res.data.data
        //   })
        // }
    }

    nextPage(){
        this.setState({
            begin: this.state.begin + this.state.pageSize
        })
    }

    lastPage(){
        this.setState({
            begin: this.state.begin - this.state.pageSize
        })
    }

    render() {

        const { list: listMap } = this.props
        const list = sortByDate([...listMap.values()])
        // const list = this.state.list
        // return (
        //   <div>
        //     111
        //   </div>
        // )
        // TODO： 设定 list
        return (
            <div>
                <div className="post-preview-container">
                    {list.slice(this.state.begin, this.state.begin + this.state.pageSize).map((item, index) =>
                        <div className={"post-preview"} key={index}>
                            <div className={"post-time"}>
                                {moment(item.date).format('YYYY-MM-DD')}
                            </div>
                            <div className={"post-info"}>
                                <Link to={'/article/' + item._id}>
                                    <h3>
                                        {item.title}
                                    </h3>
                                </Link>
                                <p>
                                    <span>/</span>
                                    {item.tag.map((tag, tagIndex) =>
                                        <span key={tag + tagIndex}> {tag.name} /</span>
                                    )}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                <ul className={'pager'} >
                    <li className={ClassNames("previous",{'hidden': this.state.begin === 0})} onClick={() => {this.lastPage()}}>
                        <a>&larr; Newer Posts</a>
                    </li>

                    <li  className={ClassNames("next",{'hidden': this.state.begin + this.state.pageSize >= list.length })}  onClick={() => {this.nextPage()}}>
                        <a>Older Posts &rarr;</a>
                    </li>
                </ul>
            </div>
        )
    }
}

const mapStateToProps = ({ status, list }) => ({ status, list })
// const mapDispatchToProps = dispatch => ({
//     // 例如：yourAction:bindActionCreators(yourAction, dispatch),
// })
const mapDispatchToProps = {
    getList
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList)
