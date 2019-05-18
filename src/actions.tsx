export const setValue: any = (key: String, value: any) => {
  console.log('in setvalue with ', value);
  return {
    type: 'UPDATE_VALUE',
    key,
    value
  }
}