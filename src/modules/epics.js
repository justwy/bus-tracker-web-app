import { combineEpics } from "redux-observable";
import { sayHelloEpic } from "./helloWorld";

export default combineEpics(
    sayHelloEpic,
);
