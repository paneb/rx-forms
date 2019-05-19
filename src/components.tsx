export const renderComponents = (model:any, components:{String:any}) => {

    return model.groups.map((component:any)=>{
        return components[component.type]
    });
}
