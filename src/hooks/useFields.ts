
import * as validateField from "../utils/validation/fields";
import { useState } from 'react';
import type { ChangeEvent, FocusEvent } from 'react';


interface ValidationResult {
  message: string;
  isValid?: boolean;
}

interface UseFieldProps {
  type: string;
}

interface UseFieldReturn {
  type: string;
  value: string;
  messageError: string;
  onBlur: (event: FocusEvent<HTMLInputElement>) => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

type ValidateFieldModule = {
  [key: string]: (value: string) => ValidationResult;
};

const useField = ({ type }: UseFieldProps): UseFieldReturn => {
    
  const [value, setValue] = useState<string>('');
  const [messageError, setMessageError] = useState<string>('');

  const onBlur = (event: FocusEvent<HTMLInputElement>): void => {
    const inputValue = event.target.value;
    setValue(inputValue);
    
    const validator = (validateField as ValidateFieldModule)[type];
    if (validator) {
      setMessageError(validator(inputValue).message);
    } else {
      console.warn(`Validator for type "${type}" not found`);
      setMessageError('');
    }
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    messageError,
    onBlur,
    onChange
  };
};

export default useField;