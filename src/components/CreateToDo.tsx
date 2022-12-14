import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, toDoState } from "../atoms";

interface IForm {
    toDo: string;
}

export const Form = styled.form`
    position: relative;
    width: 100%;
    input {
        width: 100%;
        height: 40px;
        border: none;
        padding: 0 20px;
        border-radius: 20px;
        font-size: 18px;
    }
    button {
        display: none;
    }
`;


export function CreateToDo() {
    const [ToDos, setToDos] = useRecoilState(toDoState);
    // const setToDos = useSetRecoilState(toDoState);
    const category = useRecoilValue(categoryState);
    const { register, handleSubmit, setValue } = useForm<IForm>();
    const handleValid = ({ toDo }: IForm) => {
        setToDos((oldToDos) => [
          { text: toDo, id: Date.now(), category },
          ...oldToDos,
        ]);
        setValue("toDo", "");
    };
    localStorage.setItem("ToDos", JSON.stringify(ToDos)); //localStorage 에 JSON문자열로 변경한 배열 저장

    return (
        <Form onSubmit={handleSubmit(handleValid)}>
            <input 
                {...register("toDo", { required: "일정을 입력해야합니다.", 
                })} 
                placeholder={`${category} 리스트에 일정을 추가해보세요`}
            />
            <button>
            <img
                src="https://uxwing.com/wp-content/themes/uxwing/download/user-interface/plus-round-icon.png"
                alt="plus"
            />
            </button>
        </Form>        
    );
};

// export default CreateToDo;