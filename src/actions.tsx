export const setValue: any = (key: String, value: any) => {
  return {
    type: "SET_VALUE",
    key,
    value
  }
}

export const setInitialValue: any = (key: String, value: any) => {
  return {
    type: "INITIAL_VALUE",
    key,
    value
  }
}