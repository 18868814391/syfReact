import React,{Component,Fragment} from 'react'
import '../style/style.css'
import Items from '../components/items.js'
import {_noteList,_noteSearch,_noteTabs} from '../utils/api.js'
import { Input, Button,Spin } from 'antd'
import store from '../store/index'
import InfiniteScroll from 'react-infinite-scroller';
import { Scrollbars } from 'react-custom-scrollbars';

class noteList extends Component{

    //js的构造函数，由于其他任何函数执行
    constructor(props){
      super(props) //调用父类的构造函数，固定写法
      this.state={
          inputValue:'' , // input中的值
          list:[],   //服务列表
          noteArray:[],
          loading: false,
          hasMore: true,
          isAll:true,
          tabas:["js", "vue", "php", "yii", "nginx", "mysql", "nuxt", "linux", "node"],
          tabNum:{},
          pages:25,
          start_page:-1,
      }
      this.storeChange = this.storeChange.bind(this)  //转变this指向
      store.subscribe(this.storeChange) //订阅Redux的状态      
    }
    componentDidMount(){
      console.log(store.getState())
      this.setState({
        list:store.getState().list
      })
      const self=this;
      self.getData();
      _noteTabs({
        tab:self.state.tabas
      }).then((d)=>{
        self.setState({
          tabNum:d.data
        })
        console.log(self.state.tabNum)
      })
    }
    render(){
        return  (
            <Fragment>
              <Spin spinning={this.state.loading}>
               <div className="head-Inp">
                 <Input placeholder='输入搜索内容' value={this.state.inputValue} onChange={this.inputChange.bind(this)} style={{ width:'250px',border:'3px solid #666'}}/>
                 &nbsp;
                 <Button type="primary" onClick={this.searchList.bind(this,'nomal')}>搜索</Button>
                 &nbsp;
                 {this.state.isAll?null:<Button type="primary" onClick={this.searchList.bind(this,'all')}>返回全部</Button>}
                 &nbsp;
                </div>
                <div className="nl-tabs">
                  {this.state.tabas.map((v,i)=>{
                      return (
                        <div className="nl-tab" onClick={this.searchTab.bind(this,v)} key={v}>
                          {v}(
                            {this.state.tabNum?<span>
                              {
                              <span>{this.state.tabNum[v]}</span>
                            }
                          </span>:null}
                          )
                        </div>
                      )                    
                  })}
                </div>
                <Scrollbars id='list-scrollbars' style={{height: "calc(100vh - 130px)"}} autoHide >
                  <InfiniteScroll
                        className="list-contents"
                        initialLoad={false}
                        pageStart={0}
                        loadMore={this.getData.bind(this)}
                        hasMore={this.state.hasMore}
                        useWindow={false}
                      >           
                    <Items content={this.state.noteArray} dele={this.deleteItem.bind(this)} goNodeDetail={this.detailPage.bind(this)}></Items>
                  </InfiniteScroll>
               </Scrollbars>
               </Spin>
            </Fragment>
        )
    }
    getData(){
      const self=this;
      self.setState({
        start_page:++self.state.start_page, 
        loading:true
      })
      _noteList({
        pages: self.state.pages,
        start_page: self.state.start_page, 
      }).then((d)=>{
        self.setState({
          noteArray:self.state.noteArray.concat(d.data),
          loading:false,
          hasMore:(d.total_page*1)<self.state.noteArray.length
        },()=>{
          console.log('123',self.state.noteArray)
        })

      })           
    }
    detailPage(id){
      this.props.history.push(  '/nodeDetail/'+id  )
      // this.props.history.push({pathname:'/nodeDetail',query:{ids:id}})
    }
    inputChange(e){
      console.log(e.target.value);
        this.setState({
          inputValue:e.target.value
      })
    };
    searchTab(dd){
      console.log(dd);
      const self=this;
      this.setState({
        loading:true
      })
      _noteSearch({
        keyword: dd
      }).then((d)=>{
        self.setState({
          noteArray:d.data,
          loading:false,
          isAll:dd==='all'?true:false,
        },()=>{
          console.log('123',self.state.noteArray)
        })        
      })      
    };
    searchList(mo){
      const self=this;
      this.setState({
        loading:true
      })
      _noteSearch({
        keyword: mo==='all'?'':self.state.inputValue
      }).then((d)=>{
        self.setState({
          noteArray:d.data,
          loading:false,
          isAll:mo==='all'?true:false,
        },()=>{
          console.log('123',self.state.noteArray)
        })        
      })
    };
    addList(){  
      const action ={
        type:'changeInput',
        value:this.state.inputValue
      }   
      store.dispatch(action)
    };
    storeChange(){
      this.setState({
        list:store.getState().list
      })
    }    
    deleteItem(i){
      const action ={
        type:'deleteItem',
        value:i
      }   
      store.dispatch(action)      
    };
}
export default noteList