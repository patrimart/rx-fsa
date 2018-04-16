import "jest";
import { actionCreatorFactory } from "../../src";

test("Empty Action", () => {
  const fooActionFactory = actionCreatorFactory("FOO");
  const emptyFoo = fooActionFactory("EMPTY", { foo: true });
  const emptyFooAction = emptyFoo(undefined, { bar: true });

  expect(emptyFooAction.meta).toMatchObject({ $$typeChain: [], foo: true, bar: true });
});

test("Syncronous Action", () => {
  const fooActionFactory = actionCreatorFactory("FOO");
  const syncFoo = fooActionFactory<string, { foo: true }>("SYNC", { foo: true });
  const syncFooAction = syncFoo("Hello", { bar: true });

  expect(syncFooAction.meta).toMatchObject({ $$typeChain: [], foo: true, bar: true });
});

test("Async Actions", () => {
  const fooActionFactory = actionCreatorFactory("FOO");
  const asyncFoo = fooActionFactory.async<string, number, Error, { foo: true }>("ASYNC", { foo: true });
  const asyncFooStart = asyncFoo.started("Hello", { bar: 1 });
  const asyncFooDone = asyncFoo.done({ result: 2, params: "Hello" }, { bar: 2 });
  const asyncFooFail = asyncFoo.failed({ error: new Error("Oops"), params: "Hello" }, { bar: 3 });

  expect(asyncFooStart.meta).toMatchObject({ $$typeChain: [], foo: true, bar: 1 });

  expect(asyncFooDone.meta).toMatchObject({ $$typeChain: [], foo: true, bar: 2 });

  expect(asyncFooFail.meta).toMatchObject({ $$typeChain: [], foo: true, bar: 3 });
});
