export function actionCreatorFactory(
  prefix?: string | null,
  defaultIsError: (payload: any) => boolean = p => p instanceof Error,
): ActionCreatorFactory {
  const actionTypes: { [type: string]: boolean } = {};

  const base = prefix ? `${prefix}/` : "";

  function actionCreator<P>(
    type: string,
    commonMeta?: Meta,
    isError: ((payload: P) => boolean) | boolean = defaultIsError,
  ): ActionCreator<P> {
    const fullType = base + type;

    return Object.assign(
      (payload: P, meta?: Meta) => {
        const action: Action<P> = {
          type: fullType,
          payload,
        };

        if (commonMeta || meta) {
          action.meta = Object.assign({}, commonMeta, meta);
        }

        if (isError && (typeof isError === "boolean" || isError(payload))) {
          action.error = true;
        }

        return action;
      },
      {
        type: fullType,
        toString: () => fullType,
        match: (action: Action): action is Action<P> => action.type === fullType,
      },
    );
  }

  function asyncActionCreators<P, S, E>(type: string, commonMeta?: Meta): AsyncActionCreators<P, S, E> {
    return {
      type: base + type,
      started: actionCreator<P>(`${type}_STARTED`, commonMeta, false),
      done: actionCreator<Success<P, S>>(`${type}_DONE`, commonMeta, false),
      failed: actionCreator<Failure<P, E>>(`${type}_FAILED`, commonMeta, true),
    };
  }

  return Object.assign(actionCreator, { async: asyncActionCreators });
}

export default actionCreatorFactory;
