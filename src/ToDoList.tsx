import React, { useState } from "react";
import { useForm } from "react-hook-form";

// function ToDoList() {
//     const [toDo, setToDo] = useState("");
//     const [toDoError, setToDoError] = useState("");
//     const onChange = (event:React.FormEvent<HTMLInputElement>) => {
//         const {currentTarget: {value},} = event;
//         setToDoError("");
//         setToDo(value);
//     };
//     const onSubmit = (event:React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//         if (toDo.length < 10) {
//             return setToDoError("To do should be longer");
//         }
//         console.log("submit");
//     };

//     return (
//         <div>
//             <form onSubmit={onSubmit}>
//                 <input type="text" value={toDo} onChange={onChange} />
//                 <button>Add</button>
//                 {toDoError !== "" ? toDoError : null}
//             </form>
//         </div>
//     );
// };

function ToDoList() {
    const { register, watch, handleSubmit, formState } = useForm();
    const onValid = (data:any) => {
        console.log(data);
    };
    console.log(formState.errors);
    // console.log(watch());
    return (
        <div>
            <form
                style={{display: "flex", flexDirection: "column"}} 
                onSubmit={handleSubmit(onValid)}
            >
                {/* <input {...register("toDo")} placeholder="Write a to do"  /> */}
                <input {...register("email", { required: true })} placeholder="Email" />
                <input {...register("firstName")} placeholder="First Name" />
                <input {...register("lastName")} placeholder="Last Name" />
                <input {...register("username", { required: true, minLength: 5 })} placeholder="Username" />
                <input {...register("password", { required: "Password is required", minLength: {value: 5, message: "Your password is too short.",} })} placeholder="Password" />
                <input {...register("password1", { required: true, minLength: 8 })} placeholder="Password1" />
                <button>Add</button>
            </form>
        </div>
    );
};

export default ToDoList;