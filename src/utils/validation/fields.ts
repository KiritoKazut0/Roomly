// Valida campos de texto genéricos como nombre, ciudad, estado, etc.
export const text = (text: string) => {
  const regex = /^[a-zA-Z\s]{5,}$/;

  if (!text) {
    return { isValid: false, message: "El campo no puede estar vacío" };
  }

  if (!regex.test(text.trim())) {
    return { isValid: false, message: "Debe contener solo letras y al menos 5 caracteres" };
  }

  return { isValid: true, message: "" };
};

// Valida contraseñas simples (mínimo 4 caracteres)
export const password = (password: string) => {
  if (!password) {
    return { isValid: false, message: "La contraseña no puede estar vacía" };
  }
  if (password.length < 4) {
    return { isValid: false, message: "La contraseña debe tener al menos 4 caracteres" };
  }
  return { isValid: true, message: "" };
};

// Correo electrónico
export const email = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    return { isValid: false, message: "El campo no puede estar vacío" };
  }
  if (!regex.test(email)) {
    return { isValid: false, message: "Ingrese un correo electrónico válido" };
  }
  return { isValid: true, message: "" };
};

// Teléfono (10 dígitos)
export const phone = (phone: string) => {
  const regex = /^\d{10}$/;

  if (!phone) {
    return { isValid: false, message: "El campo no puede estar vacío" };
  }
  if (!regex.test(phone)) {
    return { isValid: false, message: "El número de teléfono debe tener 10 dígitos" };
  }
  return { isValid: true, message: "" };
};

// Título del anuncio
export const title = (title: string) => {
  if (!title) return { isValid: false, message: "El título es obligatorio" };
  if (title.trim().length < 5) return { isValid: false, message: "El título debe tener al menos 5 caracteres" };
  return { isValid: true, message: "" };
};

// Tipo de inmueble
export const propertyType = (propertyType: string) => {
  if (!propertyType) return { isValid: false, message: "Selecciona un tipo de inmueble" };
  return { isValid: true, message: "" };
};

// Ubicación
export const location = (location: string) => {
  if (!location) return { isValid: false, message: "La ubicación es obligatoria" };
  return { isValid: true, message: "" };
};

// Precio
export const price = (price: string) => {
  const numberValue = Number(price);
  if (!price || isNaN(numberValue) || numberValue <= 0) {
    return { isValid: false, message: "El precio debe ser un número mayor a 0" };
  }
  return { isValid: true, message: "" };
};


// Código Postal (5 dígitos)
export const postalCode = (postalCode: string) => {
  const regex = /^\d{5}$/;
  if (!postalCode) return { isValid: false, message: "El código postal es obligatorio" };
  if (!regex.test(postalCode)) return { isValid: false, message: "Debe tener 5 dígitos" };
  return { isValid: true, message: "" };
};

// Número exterior
export const extNumber = (extNumber: string) => {
  if (!extNumber) return { isValid: false, message: "El número exterior es obligatorio" };
  return { isValid: true, message: "" };
};

// Descripción del anuncio
export const description = (description: string) => {
  if (!description || description.trim().length < 10)
    return { isValid: false, message: "La descripción debe tener al menos 10 caracteres" };
  return { isValid: true, message: "" };
};

// Validación de imágenes
