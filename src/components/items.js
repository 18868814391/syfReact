import React,{Component} from 'react'
import '../style/components.css'
class Items extends Component{

  constructor(props){
    super(props)
    // this.delItem=this.delItem.bind(this)
  }

  // shouldComponentUpdate(nextProps,nextState){
  //   if(nextProps.content !== this.props.content){ //阻止无意义的组件渲染
  //     console.log('组件渲染')
  //       return true
  //   }else{
  //       return false
  //   }
  // }  
    render(){
        return  (
               <div className="item-con">
                   {
                     this.props.content.map((v,i)=>{
                        return (
                          <div className="item-box" onClick={this.goDetail.bind(this,v.id)} key={v.id}>
                            {v.title}
                          </div>
                        )
                        // <li key={i} onClick={this.delItem.bind(this,i)}>{v.title}</li>
                     })
                   }
                </div>
        )
    }

    goDetail(i){
      this.props.goNodeDetail(i)
    }
}
export default Items  