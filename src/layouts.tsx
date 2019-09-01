import * as React from 'react'

export const renderLayout: React.SFC<{model:any, formComponent:any, layouts:any, components:any, validators:any, buttonsComponent:any, events: any, store: any}> = (props) => {

    const ButtonsComponent = props.buttonsComponent;

    if(props.layouts['default'] == undefined){
        return (
        <span>No valid layout</span>
        )
    }else{
        const Layout = props.layouts['default']

        if (props.formComponent){

            const FormComponent = props.formComponent;

            return (
                <FormComponent>
                    <Layout model={props.model} events={props.events} components={props.components} store={props.store} validators={props.validators}/>
                    <ButtonsComponent model={props.model} events={props.events}/>
                </FormComponent>    
            )
    
        }else{

            return (
                <form>
                    <Layout model={props.model} components={props.components} store={props.store} validators={props.validators}/>
                    <ButtonsComponent model={props.model} events={props.events}/>
                </form>
            )
    
        }

    }
}

export const BasicButtons: React.SFC<any> = (props) => {

  const buttons = props.model.buttons;
  console.log(`found buttons: `, buttons);
  return (
    <React.Fragment>
      {buttons.map((button:any, index: number)=>{
        return <input key={index} type={`${button.type}`} value={`${button.label}`} onClick={(e:any)=>{e.preventDefault(); props.events.onButtonPress(e, button.name);}} />
      })}
    </React.Fragment>
  )
}

export const BasicLayout: React.SFC<any> = (props) => {
    return (
      <div>
  
            {props.model.groups.map((input:any, index: Number)=> {
            
            const Component = props.components[input.type] ? props.components[input.type] : props.components["default"];
  
            return (
              <div key={`${index}`}>
                <label htmlFor={`${input.name}`}>{props.events.onLocalize(input.label)}</label>
                    <div>
                        <Component model={input} store={props.store} />
                    </div>
              </div>
              
            )})}

      </div>
    )
  }

export const BasicForm : React.SFC<any> = (props) => {
    return (
      <React.Fragment>
  
        <span style={{color: 'darkgray', marginTop: 40, marginBottom: 40, display: 'block'}}>RXForm Basic</span>
  
        <div style={{backgroundColor: "#eeeeee", padding:10}}>
          <form>
            {props.children}
          </form>
  
        </div>
  
      </React.Fragment>
    )
  }