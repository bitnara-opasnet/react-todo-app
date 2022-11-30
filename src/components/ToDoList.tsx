import { useForm } from "react-hook-form";
import { atom, useRecoilState, useRecoilValue } from "recoil";



interface IForm {
    toDo: string;
}

interface IToDo {
    text: string;
    id: number;
    category: "TO_DO" | "DOING" | "DONE";
}

const toDoState = atom<IToDo[]>({
    key: "toDO",
    default: [],
})

function ToDoList() {
    // const value = useRecoilValue(toDoState); // atom에서 value만 불러오고 싶을 때 사용
    const [toDos, setToDos] = useRecoilState(toDoState); // value와 변경함수를 둘다 불러오고 싶을 때 사용

    const { register, handleSubmit, setValue } 
            = useForm<IForm>();

    const handleValid = ({toDo} : IForm) => {
        console.log("add to do", toDo);
        setToDos((oldToDos) => [{text: toDo, id: Date.now(), category: "TO_DO"}, ...oldToDos]);
        setValue("toDo", "");
    };

    return (
        <div>
            <form onSubmit={handleSubmit(handleValid)}>
                <input 
                        {...register("toDo", { required: "Please write a To Do", 
                        })} 
                        placeholder="Write a to do" 
                    />
                <button>Add</button>
            </form>
            <ul>
                {toDos.map((toDo) => (
                    <li key={toDo.id}>{toDo.text}</li>
                ))}
            </ul>
        </div>
    );
};

export default ToDoList;