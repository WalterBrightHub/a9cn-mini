module.exports=(collection,field)=>{
  let res={}
  let copy=collection.slice()
  
  for(let item of copy){
    let fieldValue=item[field]
    console.log(field)
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