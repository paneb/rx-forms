import { BasicLayout } from './layouts';
import { BasicInputComponent, BasicNumberComponent } from './components';

export const baseLayouts = {
    default: BasicLayout
  }
  
export const baseComponents = {
    default: BasicInputComponent,
    text: BasicInputComponent,
    number: BasicNumberComponent
  }
  
export const baseValidators = {
  
}
export const baseEvents = {
    onButtonPress: (_e:any, _name:String)=>{},
    onValidation: (_errors:any)=>{},
    onValuesChange: (_values:any)=>{}
}