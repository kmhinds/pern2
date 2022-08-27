import Form from "./Form";

const { useState } = require("react")

export const Todo = ({description, priority, id}) => {

    // Form is not pre filling with existing description data

    const [isEdit, setIsEdit] = useState(false);

    if (isEdit) {
        return <Form description={description} priority={priority} id={id}/>
    }
    console.log(description)
    return (
        <>
        <li>Description: {description} Priority: {priority}</li>
        <button onClick={e => setIsEdit(true)}>Edit</button>
        </>
    )
} 


