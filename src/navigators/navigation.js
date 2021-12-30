import * as React from 'react';

export const navigationRef = React.createRef();

export const globalNavigate =(name,params)=>{
    navigationRef.current?.navigate(name,params)
}