import React, {useState} from "react";
import { recursiveMap, yupToFormErrors } from "./utils";
import * as Yup from 'yup';
import "./Form.css"

const Form = ({onSubmit, defaultValue, onError, model, children, ...props}) => {
    const [errors, setErrors] = useState()

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrors(null)
        const form = new FormData(event.target);
        const data = Object.fromEntries(form.entries()); 

        try {
            await model.validate(data, { abortEarly: false });
            onSubmit(data)
        }
        catch(error) {
            const formErrors = yupToFormErrors(error.inner)
            console.error("[just-form] has validation errors:", formErrors)
            setErrors(formErrors)
            onError && onError(formErrors)
        }
    }

    return (
        <form onSubmit={handleSubmit} {...props}>
            <>
                {recursiveMap(children, (child) => {
                    const hasErrors = errors && errors[child.props.name] || null
                    return (<>
                        {React.cloneElement(child, {...child.props, defaultValue: defaultValue && defaultValue[child.props.name] || null, className: hasErrors &&  `${props.className || ''} form-control--has-error` || props.className })}
                        {hasErrors && <div className="form-control__error">{hasErrors}</div> || null}
                    </>)
                })}
            </>
        </form>
    )
}

Form.Schema = Yup;

export default Form;