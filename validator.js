// Mínimo 8 caracteres y máximo 20,
// debe contener al menos una mayúscula, al menos una minúscula,
// al menos dos números y al menos un símbolo.
// Se trata de un campo obligatorio

export const validarPassword = (password) => {
  if (password.length < 8 || password.length > 20) {
    return {
      isValid: false,
      message: "La password debe de tener entre 8 y 20 caracteres",
    };
  }

  let contMay = 0;
  let contMinus = 0;
  let contNumeros = 0;
  let contSimbolos = 0;

  for (let index = 0; index < password.length; index++) {
    let codigo = password.charCodeAt(index);

    switch (true) {
      case codigo >= 65 && codigo <= 90:
        contMay++;
        break;
      case codigo >= 97 && codigo <= 122:
        contMinus++;
        break;
      case codigo >= 48 && codigo <= 57:
        contNumeros++;
        break;
      default:
        contSimbolos++;
        break;
    }
  }

  if (contMay > 0 && contMinus > 0 && contNumeros > 1 && contSimbolos > 0) {
    return {
      isValid: true,
      message: "",
    };
  } else {
    return {
      isValid: false,
      message: "contraseña no válida. Debe tener 1 mayuscula, 1 minuscula...",
    };
  }
};
