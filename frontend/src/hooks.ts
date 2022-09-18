import { useState } from "react";

export function useForm<S>(fields: S) {
  const [state, setState] = useState<S>(fields);

  function updateByKey({ key, value }: { key: string; value: string }) {
      setState((currState) => ({
        ...currState,
        [key]: value,
      }));
  }

  function reset() {
    setState(fields);
  }

  return {
    state,
    updateByKey,
    reset,
    setState
  };
}
