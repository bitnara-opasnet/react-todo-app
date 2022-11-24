import { setDefaultResultOrder } from "dns";
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

interface IForm {
    [key: string]: string;
    }

function ToDoList() {
    const { register, watch, handleSubmit, formState: {errors}, setError, } 
            = useForm<IForm>({defaultValues: {email: "@naver.com"}});

    const onValid = (data:IForm) => {
        console.log(data);
        if (data.password != data.password1) {
            setError("password1", { message: "Password are not the same" }, { shouldFocus: true })
        }
        setError("extraError", { message: "Server offline." })
    };

    console.log(errors);
    // console.log(watch());
    return (
        <div>
            <form
                style={{display: "flex", flexDirection: "column"}} 
                onSubmit={handleSubmit(onValid)}
            >
                {/* <input {...register("toDo")} placeholder="Write a to do"  /> */}
                <input 
                    {...register("email", 
                        { required: "email required", pattern: {value: /^[A-Za-z0-9._%+-]+@naver.com$/, message: "only naver.com emails allowed"}})} 
                    placeholder="Email" 
                />
                <span>{errors?.email?.message }</span>

                <input 
                    {...register("firstName", 
                        {required: "write here", validate: {
                            noNico: (value) =>value.includes("nico") ? "no nicos allowed" : true,
                            noNick: (value) =>value.includes("nick") ? "no nick allowed" : true,
                        }}
                    )} 
                    placeholder="First Name" 
                />
                <span>{errors?.firstName?.message }</span>

                <input {...register("lastName")} placeholder="Last Name" />

                <input {...register("username", { required: "Username is required"})} placeholder="Username" />
                <span>{errors?.username?.message }</span>

                <input 
                    {...register("password", 
                        { required: "Password is required", minLength: {value: 8, message: "Your password is too short."}}
                    )} 
                    placeholder="Password" 
                />
                <span>{errors?.password?.message }</span>
                <input 
                    {...register("password1", 
                        { required: "Password1 is required", minLength: {value: 8, message: "Your password is too short."}}
                        )} 
                    placeholder="Password1" 
                />
                <span>{errors?.password1?.message }</span>

                <button>Add</button>
                <span>{errors?.extraError?.message }</span>
            </form>
        </div>
    );
};

export default ToDoList;