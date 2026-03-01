export const validators = {
  email: (value: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  },

  phone: (value: string): string => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return value;
  },

  required: (value: any): boolean => {
    if (typeof value === "string") return value.trim().length > 0;
    return value !== null && value !== undefined;
  },

  url: (value: string): boolean => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  },

  number: (value: string): boolean => {
    return !isNaN(Number(value)) && value.trim() !== "";
  },

  minLength: (value: string, min: number): boolean => {
    return value.length >= min;
  },

  maxLength: (value: string, max: number): boolean => {
    return value.length <= max;
  },
};

export function getValidationError(field: string, value: any, rules: string[]): string | null {
  for (const rule of rules) {
    if (rule === "required" && !validators.required(value)) {
      return `${field} is required`;
    }
    if (rule === "email" && value && !validators.email(value)) {
      return `${field} must be a valid email`;
    }
    if (rule === "url" && value && !validators.url(value)) {
      return `${field} must be a valid URL`;
    }
    if (rule === "number" && value && !validators.number(value)) {
      return `${field} must be a number`;
    }
  }
  return null;
}
