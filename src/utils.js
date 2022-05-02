import React from "react";

export const yupToFormErrors = (errors) => {
    let formErrors = {}
    errors.forEach(e => {
        formErrors[e.path] = e.message
    })

    return formErrors
}

export const recursiveMap = (children, fn) => {
    return React.Children.map(children, child => {
      if (!React.isValidElement(child)) {
        return child;
      }
  
      if (child.props.children) {
        child = React.cloneElement(child, {
          children: recursiveMap(child.props.children, fn)
        });
      }
  
      return fn(child);
    });
}
