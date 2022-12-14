import { atom, selector } from "recoil";

// type categories = "TO_DO" | "DOING" | "DONE";


// enum : 열거형으로 이름이 있는 상수들의 집합을 정의할 수 있는 기능
export enum Categories {
    "TO_DO" = "할일",
    "DOING" = "하는중",
    "DONE" = "완료",
};

export interface IToDo {
    text: string;
    id: number;
    category: Categories;
};


export const categoryState = atom<Categories>({
    key: "category",
    default: Categories.TO_DO,
});


// toDoState 의 default 값을 localStorage 에서 가져온 JSON문자열을 파싱한 값으로 설정.
export const toDoState = atom<IToDo[]>({
    key: "toDO",
    // default: [],
    default: JSON.parse(localStorage.getItem("ToDos") ?? "[]"),
});


export const categoriesState = atom<Categories>({
	key: "categoriesState",
	default: JSON.parse(localStorage.getItem("categories") ?? JSON.stringify(Categories)),
});


export const toDoSelector = selector({
    key: "toDoSelector",
    get: ({get}) => {
        const toDos = get(toDoState);
        const category = get(categoryState);
        return toDos.filter((toDo) => toDo.category === category);
    }
});

