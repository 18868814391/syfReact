import React,{Component,Fragment} from 'react'
import './style/style.css'
import Items from './components/items.js'
import {_noteList} from './utils/api.js'
import { Input, Button  } from 'antd'
import store from './store/index'

class App extends Component{

    //js的构造函数，由于其他任何函数执行
    constructor(props){
      super(props) //调用父类的构造函数，固定写法
      this.state={
          inputValue:'' , // input中的值
          list:[],   //服务列表
          noteArray:[],
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
      _noteList({

      }).then((d)=>{
        self.setState({
          noteArray:[...this.state.noteArray,d.data]
        },()=>{
          console.log('123',self.state.noteArray)
        })

      }).catch(()=>{

      })
    }
    render(){
        return  (
            <Fragment>
               <div>
                 <input className="input" value={this.state.inputValue} onChange={this.inputChange.bind(this)} /> 
                 <Input placeholder='syf' value={this.state.inputValue} onChange={this.inputChange.bind(this)} style={{ width:'250px',border:'3px solid #666'}}/>
                 <Button type="primary" onClick={this.addList.bind(this)}>增加</Button>
                </div>
               {/* <ul>
                   {
                     this.state.list.map((v,i)=>{
                        return (
                          <li key={i} onClick={this.deleteItem.bind(this,i)}>
                          {v}
                          </li>                          
                        )

                     })
                   }
               </ul>  */}
               <Items content={this.state.list} dele={this.deleteItem.bind(this)}></Items>
            </Fragment>
        )
    }

    inputChange(e){
      console.log(e.target.value);
        this.setState({
          inputValue:e.target.value
      })
    };
    addList(){
      //   this.setState({
      //     list:[...this.state.list,this.state.inputValue]
      // })   
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
      // let newList=this.state.list
      // newList.splice(i,1)
      // this.setState({
      //   list:newList
      // })
      const action ={
        type:'deleteItem',
        value:i
      }   
      store.dispatch(action)      
    };
}
export default App