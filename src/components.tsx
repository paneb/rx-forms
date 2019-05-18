import { connect } from 'react-redux'
import { setValue } from './actions'

// const mapStateToProps = (state, ownProps) => {
//     return {
      
//     }
//   }
  
const mapDispatchToProps = (dispatch: (arg0: any) => void) => {
    return {
        setValue: (key: String, text: any) => {
            dispatch(setValue(key, text))
        }
    }
}
  
  

export const renderComponents = (model:any, components:{String:any}) => {

    return model.groups.map((component:any)=>{
        return components[component.type]
    });
}

export const injectDataToComponent = (component: any) => {
    return connect(null, mapDispatchToProps)(component);
}
