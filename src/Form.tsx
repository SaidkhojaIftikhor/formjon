import React from "react";

interface FormData<T> {
  values: T;
  errors: T;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  validateOnBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

interface FormProps<T> {
  initialData: T;
  validations: Record<keyof T, (value: T[Extract<keyof T, string>]) => void>;
  onSubmit: (data: T) => void;
  onChange?: (data: T) => void;
  children: (formData: FormData<T>) => JSX.Element;
}

function Form<T>({
  initialData,
  validations,
  onSubmit,
  onChange,
  children,
}: FormProps<T>): JSX.Element {
  const [data, setData] = React.useState<T>(initialData);
  const [errors, setErrors] = React.useState<T>({} as T);

  const validate = React.useMemo(
    () =>
      (data: T): boolean => {
        for (let name in data) {
          const validation = validations[name];

          if (validation) {
            try {
              validation(data[name]);
            } catch (e: any) {
              setErrors((errors) => ({ ...errors, [name]: e.message }));
              continue;
            }
          }
          setErrors({ ...errors, [name]: undefined });
        }
        return true;
      },

    [validations, errors]
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validate(data)) {
      onSubmit(data);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });

    if (onChange) {
      onChange(data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {children({
        values: data,
        errors,
        onChange: handleChange,
        validateOnBlur: () => validate(data),
      })}
    </form>
  );
}

export default Form;
