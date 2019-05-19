import * as React from 'react'

export const renderLayout: React.SFC<{model:any, layouts:{String:any}, components:{String:any}, store: any}> = (props) => {

    if(props.layouts['default'] == undefined){
        return (
        <span>No valid layout</span>
        )
    }else{
        const Layout = props.layouts['default']

        return (
            <Layout model={props.model} components={props.components} store={props.store} />
        )
    }
}

