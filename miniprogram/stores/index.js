import { decorate, observable, 
  // computed, action
 } from 'wechat-weapp-mobx/mobx'


class Store {
  darkMode=false

}

decorate(Store, {
  darkMode: observable,
})

export default new Store;