import { Observable } from "rxjs/Observable";
import { Action, Meta } from "../actions/";

export type Actions<A = Action<any, Meta>> = Observable<A>;
