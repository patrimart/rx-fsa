import { actionCreatorFactory } from "../src";

const fooActionFactory = actionCreatorFactory("FOO");

const emptyFoo = fooActionFactory("EMPTY");
const emptyFooAction = emptyFoo(undefined);

const syncFoo = fooActionFactory<string>("SYNC");
const syncFooAction = fooActionFactory("Hello");

const asyncFoo = fooActionFactory.async<string, number, Error, any>("ASYNC");
const asyncFooStart = asyncFoo.started("Hello");
const asyncFooDone = asyncFoo.done({ result: 2, params: "Hello" });
const asyncFooStartError = asyncFoo.failed({ error: new Error("Oops"), params: "Hello" });

