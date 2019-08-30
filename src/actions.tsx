export const setValue: any = (key: String, value: any) => {
  return {
    type: "SET_VALUE",
    key,
    value
  }
}
// dispatch({ type: 'VALIDATION', name: name, value: store.getState().values[name.toString()], validators: validators });

export const validationAction: any = (name: String, value: any, validators:any) => {
  return {
    type: "VALIDATION",
    name,
    value,
    validators
  }
}


export const setInitialValue: any = (key: String, value: any) => {
  return {
    type: "INITIAL_VALUE",
    key,
    value
  }
}