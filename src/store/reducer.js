const defaultState = {
  inputValue : 'Write Something',
  list:[
      '早上4点起床，锻炼身体',
      '中午下班游泳一小时',
  ],
  admin:'',
}  //默认数据
export default (state = defaultState,action)=>{
  if(action.type === 'changeInput'){
      let newState = JSON.parse(JSON.stringify(state)) //深度拷贝state
      // newState.inputValue = action.value
      newState.list = [...newState.list,action.value]
      return newState
  }
  if(action.type === 'deleteItem'){
    let newState = JSON.parse(JSON.stringify(state)) //深度拷贝state
    // newState.inputValue = action.value
    // let arr= newState.list
    // arr.splice(action.value,1)
    newState.list.splice(action.value,1)
    return newState    
  }
  if(action.type ==='loginName'){
    let newState = JSON.parse(JSON.stringify(state)) //深度拷贝state
    newState.admin=action.value
    return newState 
  }
  return state
}