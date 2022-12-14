import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, IToDo, toDoState } from "../atoms";

const Li = styled.li`
    display: flex;
    justify-content: space-between;
    list-style: none;
    color: black;
    margin-bottom: 15px;
    padding: 15px 0;
    border-bottom: 3px dashed #464A7E;
    span {
      font-size: 16px;
    }    
`;

const BtnContainer = styled.div`
    display: flex;
    button {
        background-color: white;
        color: black;
        border: 2px solid #e7e7e7;
        border-radius: 20px;
    } //https://www.w3schools.com/css/css3_buttons.asp
`;

function ToDo({text, category, id}:IToDo) {
    const setToDos = useSetRecoilState(toDoState);
    const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {currentTarget: {name}} = event;
        setToDos((oldToDos) => {
            const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
            const newToDo = { text, id, category: name as any };
            return [...oldToDos.slice(0, targetIndex), newToDo, ...oldToDos.slice(targetIndex+1)];
        });
    };
    const onDelete = () => {
        setToDos((oldToDos) => {
        return oldToDos.filter((toDo) => toDo.id !== id);
    })};

    return (
        <Li>
            <span>{text}</span>
            <BtnContainer>
                {category !== Categories.TO_DO && (
                    <button name={Categories.TO_DO} onClick={onClick}>{Categories.TO_DO}</button>
                )}
                {category !== Categories.DOING && (
                    <button name={Categories.DOING} onClick={onClick}>{Categories.DOING}</button>
                )}
                {category !== Categories.DONE && (
                    <button name={Categories.DONE} onClick={onClick}>{Categories.DONE}</button>
                )}
                <button onClick={onDelete}>삭제</button>
            </BtnContainer>
        </Li>
    );
};

export default ToDo;