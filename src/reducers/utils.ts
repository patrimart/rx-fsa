import { Done, Fail } from "../actions/interfaces";

export type Re<S, I = void> = (s: S, r: I) => S;

export type ReDone<S, I, O> = (s: S, r: Done<I, O>) => S;

export type ReFail<S, I, O = Error> = (
  s: S,
  r: Fail<I, O>,
) => S;
