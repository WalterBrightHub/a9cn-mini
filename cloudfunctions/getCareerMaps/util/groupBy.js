module.exports=(collection,field)=>{
  let res={}
  
  for(let item of collection){
    let fieldValue=item[field]
    delete item[field]
    if(res[fieldValue]){
      res[fieldValue].push(item)
    }
    else{
      res[fieldValue]=[item]
    }
  }
  console.log(res)
  return res
}

