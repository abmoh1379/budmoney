import { useReducer } from "react";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "ON_INPUT_CHANGE":
        return {
          ...state,
          inputValue: action.value,
        };

    case "INPUT_TOUCHED_TRUE":
        return {
          ...state,
          inputTouched: true,
        };
    default:
      return state;
  }
};
const useInput = (
  value = "",
  inputValidatorFunc,
  inputRegxValidatorFunc = null
) => {
  const inputInitialState = {
    inputValue: value,
    inputTouched: false,
  };

  const [{ inputValue, inputTouched }, inputDispatcher] = useReducer(
    inputReducer,
    inputInitialState
  );

  let isInputValid = false;
  let error = inputValidatorFunc(inputValue);

  if (!inputTouched) {
    // for handling when user writes in description input without removing his focus, so as the result the button even though it should be disable = false, its still disable = true
    if(!!inputValue && !error) {
        isInputValid = true;
    } else {
        error = "";
    }
  } else if (inputTouched && !error) {
    isInputValid = true;
  }

  const onInputChange = (e) => {
    if (inputRegxValidatorFunc === null) {
      inputDispatcher({ type: "ON_INPUT_CHANGE", value: e.target.value });
    } else {
      if (inputRegxValidatorFunc(inputValue)) {
        inputDispatcher({ type: "ON_INPUT_CHANGE", value: e.target.value });
      }
    }
  };

  const onInputBlur = () => {
    inputDispatcher({ type: "INPUT_TOUCHED_TRUE" });
  };
  return {
    inputValue,
    onInputChange,
    onInputBlur,
    error,
    isInputValid,
    inputDispatcher,
  };
};

export default useInput;
