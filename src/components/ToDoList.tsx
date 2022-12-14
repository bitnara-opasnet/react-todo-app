import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, categoriesState, categoryState, toDoSelector, toDoState } from "../atoms";
import {CreateToDo, Form} from "./CreateToDo";
import ToDo from "./ToDo";

interface ICategoryForm {
    item: string;
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 480px;
    width: 100%;
    margin: auto;
    padding: 50px;
    row-gap: 10px;
`;

const Title = styled.h1`
	font-size: 30px;
	font-weight: 600;
    margin-bottom: 2rem;
    line-height: 1em;
    color: white;
    text-align: center;
`;

const SelectContainer = styled.div`
    display: inline-block;
    justify-content: space-between;
`;

const Btn = styled.button`
    position: absolute;
    width: 20px;
    height: 20px;
    align-content: center;
    border: transparent;
    background-color: transparent;
    img {
        position: absolute;
        top: 0;
        left: 0;
        width: 20px;
        height: 20px;
        filter: opacity(0.5) drop-shadow(0 0 0 #757CD1); // https://developer.mozilla.org/en-US/docs/Web/CSS/filter
    }
`;

const Select = styled.select`
    width: 90%;
    height: 40px;
    padding: 0 20px;
    border: none;
    font-size: 16px;
    border-radius: 20px;
    appearance: none;
    option {
        border: none;
    }
`;


const ToDoContainer = styled.div`
    margin-top: 10px;
    width: 100%;
    background-color: white;
    padding: 40px 30px;
    border-radius: 20px;
`;



function ToDoList() {
    // const toDos = useRecoilValue(toDoState); // atom에서 value만 불러오고 싶을 때 사용
    // const [toDos, setToDos] = useRecoilState(toDoState); // value와 변경함수를 둘다 불러오고 싶을 때 사용

    // const [toDo, doing, done] = useRecoilValue(toDoSelector);
    const toDos = useRecoilValue(toDoSelector);
    const [category, setCategory] = useRecoilState(categoryState);

    const onInput = (event:React.FormEvent<HTMLSelectElement>) => {
        setCategory(event.currentTarget.value as any);
    };
    const [categories, setCategories] = useRecoilState(categoriesState);
    const { register, handleSubmit, setValue } = useForm<ICategoryForm>();
    const handleValid = ({ item }: ICategoryForm) => {
        setCategories((currVal) => { 
            return {...currVal as any, [item]:item};
        })
        setValue("item", "");
    };
    console.log(categories)
    localStorage.setItem("categories", JSON.stringify(categories));
    return (
        <Container>
            <Title>일정관리</Title>
            <SelectContainer>
                <Select value={category} onInput={onInput}>
                    <option value={Categories.TO_DO}>{Categories.TO_DO}</option>
                    <option value={Categories.DOING}>{Categories.DOING}</option>
                    <option value={Categories.DONE}>{Categories.DONE}</option>
                </Select>
            </SelectContainer>
            <Form onSubmit={handleSubmit(handleValid)}>
                <input
                    {...register("item", { required: "항목을 입력해야합니다.", 
                    })} 
                    placeholder={`리스트에 항목을 추가해보세요`}
                />
                <button></button>
            </Form>  
            <CreateToDo />
            <ToDoContainer>
                {toDos.map((toDo) => (
                    <ToDo key={toDo.id} {...toDo}></ToDo>
                ))}
            </ToDoContainer>
            {/* <h2>To Do</h2>
            <ul>
                {toDo.map((toDo) => (
                    <ToDo key={toDo.id} {...toDo} />
                ))}
            </ul>
            <hr />
            <h2>Doing</h2>
            <ul>
                {doing.map((toDo) => (
                    <ToDo key={toDo.id} {...toDo} />
                ))}
            </ul>
            <hr />
            <h2>Done</h2>
            <ul>
                {done.map((toDo) => (
                    <ToDo key={toDo.id} {...toDo} />
                ))}
            </ul> */}
        </Container>
    );
};

export default ToDoList;