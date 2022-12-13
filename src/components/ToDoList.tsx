import { useRecoilValue } from "recoil";
import { toDoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";


function ToDoList() {
    const toDos = useRecoilValue(toDoState); // atom에서 value만 불러오고 싶을 때 사용
    // const [toDos, setToDos] = useRecoilState(toDoState); // value와 변경함수를 둘다 불러오고 싶을 때 사용

    return (
        <div>
            <h1>To Dos</h1>
            <hr />
            <CreateToDo />
            <ul>
                {toDos.map((toDo) => (
                    <ToDo key={toDo.id} {...toDo} />
                ))}
            </ul>
        </div>
    );
};

export default ToDoList;