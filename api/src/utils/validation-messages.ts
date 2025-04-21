export const VALIDATION_MESSAGES = {
  isNotEmpty: (field: string) => `${field}: O campo é obrigatório.`,
  isString: (field: string) => `${field}: O campo deve ser uma string.`,
  isNumber: (field: string) => `${field}: O campo deve ser um número.`,
  isBoolean: (field: string) =>
    `${field}: O campo deve ser verdadeiro ou falso.`,
  maxLength: (field: string, max: number) =>
    `${field}: O campo deve ter no máximo ${max} caracteres.`,
  max: (field: string, max: number) =>
    `${field}: O valor deve ser menor ou igual a ${max}.`,
};
