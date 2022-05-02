# just-forms

This is a really simple (uncotrolled) React Form component, designed to be a simple wrapper for working with and validating forms. 
There are a lot of complicated libs for working with forms out there that you might not need.

Because this is an uncontrolled component implementation, there should be minimal UI redraws when you change data in the form.
It should be fast but you see if this fits your use case.

This example uses Yup for validation: [link](https://github.com/jquense/yup)
## Usage
```js
import Form from './Form';

const { Schema } = Form;

const ExampleApp = (props) => {
    const initialData = {
        text: 'Sample text',
        dateFrom: new Date(),
        dateTo: new Date()
    }

    // define your validation schema
    const schema = Schema.object({
        text: Schema.string().required("Text is a required field"),
        dateFrom: Schema.date().required('Date from is a required field'),
        dateTo: Schema.date().required('Date to is a required field')
        .min(
            Schema.ref("dateFrom"),
            "Date to must be greater than Date from"
        ),
    });

    const handleSubmit = (formData) => {
        // get your form input if the validation checks out
    }

    return (
        <Form model={schema} defaultValue={initialData} onSubmit={handleSubmit}>
            <input type="date" name="dateFrom" />
            <input type="date" name="dateTo" />
            <input type="text" name="text" />
        
            <button type="submit" color="primary">Submit</button>
        </Form>
    )
}
// get your data that will be mapped to children components by name prop

```