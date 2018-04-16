import "jest";
import { actionCreatorFactory, isType } from "../../src";

test("Empty Action", () => {
  const fooActionFactory = actionCreatorFactory("FOO");
  const emptyFoo = fooActionFactory("EMPTY");
  const emptyFooAction = emptyFoo(undefined);

  expect(emptyFoo.type).toBe("FOO/EMPTY");
  expect(emptyFooAction.error).toBeFalsy();
  expect(emptyFooAction.meta).toMatchObject({ $$typeChain: [] });
  expect(emptyFooAction.payload).toBeUndefined();
  expect(emptyFooAction.type).toBe("FOO/EMPTY");

  expect(isType(emptyFoo)(emptyFooAction)).toBeTruthy();
  expect(emptyFoo.match(emptyFooAction)).toBeTruthy();
});

test("Syncronous Action", () => {
  const fooActionFactory = actionCreatorFactory("FOO");
  const syncFoo = fooActionFactory<string>("SYNC");
  const syncFooAction = syncFoo("Hello");

  expect(syncFoo.type).toBe("FOO/SYNC");
  expect(syncFooAction.error).toBeFalsy();
  expect(syncFooAction.meta).toMatchObject({ $$typeChain: [] });
  expect(syncFooAction.payload).toBe("Hello");
  expect(syncFooAction.type).toBe("FOO/SYNC");

  expect(isType(syncFoo)(syncFooAction)).toBeTruthy();
  expect(syncFoo.match(syncFooAction)).toBeTruthy();
});

test("Async Actions", () => {
  const fooActionFactory = actionCreatorFactory("FOO");
  const asyncFoo = fooActionFactory.async<string, number, Error, any>("ASYNC");
  const asyncFooStart = asyncFoo.started("Hello");
  const asyncFooDone = asyncFoo.done({ result: 2, params: "Hello" });
  const asyncFooFail = asyncFoo.failed({ error: new Error("Oops"), params: "Hello" });

  expect(asyncFoo.type).toBe("FOO/ASYNC");

  expect(asyncFooStart.error).toBeFalsy();
  expect(asyncFooStart.meta).toMatchObject({ $$typeChain: [] });
  expect(asyncFooStart.payload).toBe("Hello");
  expect(asyncFooStart.type).toBe("FOO/ASYNC_STARTED");
  expect(isType(asyncFoo.started)(asyncFooStart)).toBeTruthy();
  expect(isType(asyncFoo.failed)(asyncFooStart)).toBeFalsy();
  expect(asyncFoo.started.match(asyncFooStart)).toBeTruthy();
  expect(asyncFoo.failed.match(asyncFooStart)).toBeFalsy();

  expect(asyncFooDone.error).toBeFalsy();
  expect(asyncFooDone.meta).toMatchObject({ $$typeChain: [] });
  expect(asyncFooDone.payload).toMatchObject({ result: 2, params: "Hello" });
  expect(asyncFooDone.type).toBe("FOO/ASYNC_DONE");
  expect(isType(asyncFoo.done)(asyncFooDone)).toBeTruthy();
  expect(isType(asyncFoo.failed)(asyncFooDone)).toBeFalsy();
  expect(asyncFoo.done.match(asyncFooDone)).toBeTruthy();
  expect(asyncFoo.failed.match(asyncFooDone)).toBeFalsy();

  expect(asyncFooFail.error).toBeTruthy();
  expect(asyncFooFail.meta).toMatchObject({ $$typeChain: [] });
  expect(asyncFooFail.payload).toMatchObject({ error: new Error("Oops"), params: "Hello" });
  expect(asyncFooFail.type).toBe("FOO/ASYNC_FAILED");
  expect(isType(asyncFoo.failed)(asyncFooFail)).toBeTruthy();
  expect(isType(asyncFoo.started)(asyncFooFail)).toBeFalsy();
  expect(asyncFoo.failed.match(asyncFooFail)).toBeTruthy();
  expect(asyncFoo.started.match(asyncFooFail)).toBeFalsy();
});
