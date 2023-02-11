import {Select} from '../js/select'
import '../css/style.scss'

const select = new Select('#select', {
  placeholder: 'Выбери элемент',
  selectedId: '3',
  data:[
    {id:'1',value:'Football'},
    {id:'2',value:'Basketball'},
    {id:'3',value:'Hockey'}
  ] 
})

window.check = select