export const setValue: any = (key: String, value: any) => {
  return {
    type: "SET_VALUE",
    key,
    value
  }
}

export const validationAction: any = (name: String, value: any, errors:any) => {

  console.log(`in validation action with errrors: `, errors);

  return {
    type: "VALIDATION",
    name,
    value,
    errors
  }
}

export const validateAction: any = (name: String, value: any, values: any, validators:any, validatorsList: any, setOnValidation: any) => {


  const validate: any = async (name: String, value: any, values: any, validators: any, validatorsList: any, setOnValidation: any) => {

    console.log(`in async validate`);

    var errors: any = [];
    for (const validator of validators){
  
      console.log(`in validator: `, validator)
          
      if(validatorsList[validator] != undefined){
  
        
        const result = validatorsList[validator](value, name, values);
        var validationState = null;
  
        if(result instanceof Promise){
          console.log(`validator `, validator, ` is promise`);
          setOnValidation(true);
          validationState = await result;
          setOnValidation(false);
        }else{
          console.log(`validator `, validator, ` is sync`);
          validationState = result;
        }

        console.log(`with validationState: `, validationState);
  
        if(!validationState.valid){
          console.log(`validation error`, validationState.valid);
          errors.push(validationState.error);
        }else{
          console.log(`valid`);
        }
      }
    }
    return errors;

  }

  console.log(`in validateAction with thunk with validators: `, validators, ' and globals: ', validatorsList);

    return (dispatch: any) => {

      validate(name, value, values, validators, validatorsList, setOnValidation)
      .then((errors:any)=>{
    
        console.log(`in return`)
        dispatch(validationAction(name, value, errors))
      })
    }

}

export const setInitialValue: any = (key: String, value: any) => {
  return {
    type: "INITIAL_VALUE",
    key,
    value
  }
}