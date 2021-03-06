import React, { Component,Fragment } from 'react';
import '../style/style.css';
import store from '../store/index'
import { Input, Button,Spin,message  } from 'antd';
import md5 from 'js-md5'
import Cookies from 'js-cookie'
import {_Login} from '../utils/api.js'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          admin:'',
          code:'',
          loading:false,
          adminName:'',
        }
        this.storeChange = this.storeChange.bind(this)  //转变this指向
        store.subscribe(this.storeChange) //订阅Redux的状态   
    }
    render() { 
        return (  
          <Spin spinning={this.state.loading}>
            <div className="loginPage">
              <Input placeholder="输入用户名" allowClear onChange={this.onChange.bind(this)}/>
              <br></br>
              <Input.Password placeholder="输入密码" type="password" allowClear onChange={this.onChange2.bind(this)}/>
              <br></br>
              <Button type="primary" onClick={this.loginUp.bind(this)}>登录</Button>
              {this.state.adminName?<span>{this.state.adminName}登录成功</span>:null}
            </div> 
            </Spin>  
        );
    }
    storeChange(){
      this.setState({
        adminName:store.getState().admin
      })
    }      
    onChange = e => {
      console.log(e.target.value);
      this.setState({
        admin:e.target.value
      })      
    };
    onChange2 = e => {
      console.log(e.target.value);
      this.setState({
        code:e.target.value
      })       
    };
    loginUp(){
      const self=this;
      console.log(this.state.admin,md5(this.state.code))
      this.setState({
        loading:true,
      })
      _Login({
        admin:self.state.admin,
        code:md5(self.state.code)
      }).then((d)=>{
        self.setState({
          loading:false,
        })
        if(d.errcode==0){
          message.success(`欢迎你啊，${d.data.Thename}`);
          const action ={
            type:'loginName',
            value:d.data.Thename
          }   
          store.dispatch(action)
          Cookies.set('admin', d.data.Thename, { expires: 60 })
          setTimeout(()=>{
            window.history.go(-1);
          },500)
        }else{
          message.error(d.errmsg);
        }
      }).catch((d)=>{
        self.setState({
          loading:false,
        })  
        message.error(d.errmsg);      
      })
    }
}
 
export default Login;