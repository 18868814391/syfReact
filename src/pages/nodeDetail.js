import React,{Component} from 'react'
import '../style/style.css'
import {_noteDetail} from '../utils/api.js'

class NodeDetail extends Component{

  constructor(props){
    super(props)
    this.state={
      id:'',
      con:{'title':'loading','adm':'loading','updatatime':'','content':''},
    }
  }
  componentDidMount(){
    const self=this;
    this.setState({
      id:this.props.match.params.id 
    })
    _noteDetail({
      id:self.props.match.params.id 
    }).then((d)=>{
      self.setState({
        con:d.data
      },()=>{
        console.log(self.state.con)
      })
    })
  }
    render(){
        return  (
               <div className="nd-con">
                  <div className="nd-tit">
                    {this.state.con.title}
                  </div>
                  <div className="nd-tim">
                    由用户{this.state.con.adm}在{this.state.con.updatatime}上传
                  </div>  
                  <div className="nd-rich" dangerouslySetInnerHTML = {{ __html:this.state.con.content}}>

                  </div>  
                </div>
        )
    }
}
export default NodeDetail 