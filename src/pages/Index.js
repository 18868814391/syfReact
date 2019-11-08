import React, { Component,Fragment } from 'react';
import '../style/indexPage.css';
import store from '../store/index'
import Cookies from 'js-cookie'

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admin:Cookies.get('admin')
        }
    }
    componentDidMount(){

    }
    render() { 
        return (  
            <div className="indexPage">
                <div className="index-head">
                    {
                    this.state.admin?
                    <Fragment><span>欢迎你啊{this.state.admin}</span><span onClick={this.loginOut.bind(this)}>退出</span></Fragment>
                    :
                    <Fragment><span onClick={this.goLogin.bind(this)}>登陆</span>
                    <span onClick={this.goRegister.bind(this)}>注册</span></Fragment>
                    }
                    
                </div>

                <div className="index-items" onClick={this.goNodeList.bind(this)}>syf笔记</div>
            </div> 
        );
    }
    goNodeList(){
        this.props.history.push('list')
    }
    goLogin(){
        this.props.history.push('login')   
    }
    goRegister(){
        this.props.history.push('register')    
    }
    loginOut(){
      Cookies.remove('admin')
      window.location.reload();
    }
}
 
export default Index;