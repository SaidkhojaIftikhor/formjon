export function FormValidator(value: any) {
  return {
    required(message: string) {
      if (value.trim().length === 0) {
        throw new Error(message);
      }
      return this;
    },
    string(message: string) {
      if (!isNaN(value)) {
        throw new Error(message);
      }
      return this;
    },
    max(max: number, message: string) {
      if (value.length > max) {
        throw new Error(message);
      }
      return this;
    },
    min(min: number, message: string) {
      if (value.length < min) {
        throw new Error(message);
      }
      return this;
    },
    email(message: string) {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        throw new Error(message);
      }
      return this;
    },
    number(message: string) {
      if (isNaN(value)) {
        throw new Error(message);
      }
      return this;
    },
  };
}
