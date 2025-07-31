import React from 'react';
import {
  Controller,
  Control,
  FieldPath,
  FieldValues,
  PathValue,
} from 'react-hook-form';

interface FormControllerInputProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  defaultValue?: PathValue<T, FieldPath<T>>;
  type?: string;
  placeholder?: string;
  className?: string;
}

const FormControllerInput = <T extends FieldValues>({
  name,
  control,
  defaultValue,
  type = 'text',
  placeholder,
  className,
}: FormControllerInputProps<T>) => {
  // Define default classes
  const defaultClasses =
    'w-full mt-3 bg-gray-900 focus:bg-white p-2.5 focus:text-black focus:outline-none text-white placeholder-gray-400 rounded-lg';

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue as PathValue<T, FieldPath<T>>}
      render={({ field, fieldState: { error } }) => (
        <div>
          <input
            {...field}
            type={type}
            placeholder={placeholder}
            className={`${error ? 'border-red-500 border' : ''} ${
              className || defaultClasses
            }`}
          />
          <small
            className={`${error ? 'text-red-300' : 'text-transparent'} ml-3`}
          >
            {error ? error.message : ''}
          </small>
        </div>
      )}
    />
  );
};

export default FormControllerInput;
