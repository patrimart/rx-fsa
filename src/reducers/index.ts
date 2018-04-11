import { Handler, ReducerBuilder } from "./interfaces";
import {
    reducerWithInitialState,
    reducerWithoutInitialState,
    upcastingReducer,
} from "./makeReducer";

// import actionCreatorFactory from "typescript-fsa";
import { caseFn, casesFn, reducerDefaultFn, reducerFn } from "./fns";

export {
    Handler,
    ReducerBuilder,
    reducerWithInitialState,
    reducerWithoutInitialState,
    upcastingReducer,
    caseFn, casesFn, reducerDefaultFn, reducerFn,
};

// const actionCreator = actionCreatorFactory();

// interface State {
//     data: string;
// }

// interface StateWithCount extends State {
//     count: number;
// }

// // const initialState: State = { data: "hello" };

// const sliceData = actionCreator<number>("SLICE_DATA");
// function sliceDataHandler(state: State, fromIndex: number): State {
//     return { data: state.data.slice(fromIndex) };
// }

// const dataToUpperCase = actionCreator<void>("DATA_TO_UPPERCASE");
// function dataToUpperCaseHandler(state: State): State {
//     return { data: state.data.toUpperCase() };
// }

// // const toBasicState = actionCreator<void>("TO_BASIC_STATE");
// // function toBasicStateHandler(state: StateWithCount): State {
// //     return { data: state.data };
// // }

// const reducer = reducerFn(
//     caseFn(sliceData, sliceDataHandler),
//     caseFn(dataToUpperCase, dataToUpperCaseHandler),
// );
