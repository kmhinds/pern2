import Form from "./Form";

const { useState } = require("react")

export const Todo = ({description, priority, id}) => {

    // Form is not pre filling with existing description data
    // work on the Delete button
    const [isEdit, setIsEdit] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    if (isEdit) {
        return <Form description={description} priority={priority} id={id}/>
    }

    if (isDeleted) {
        return <Form description={!description} priority={!priority} id={!id} />
    }
    
    return (
        <>
        <li>Description: {description} Priority: {priority}</li>
        <button onClick={e => setIsEdit(true)}>Edit</button>
        <button onClick={e => setIsDeleted(true)}>Delete</button>
        </>
    )
} 


