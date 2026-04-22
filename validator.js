// Mínimo 8 caracteres y máximo 20,
// debe contener al menos una mayúscula, al menos una minúscula,
// al menos dos números y al menos un símbolo.
// Se trata de un campo obligatorio

const validarPassword = (password) => {
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

const validarDni = (dni) => {
  const letrasValidcion = "TRWAGMYFPDXBNJZSQVHLCKE";

  if (!dni) {
    return {
      isValid: false,
      message: "El Dni es obligatorio",
    };
  }

  let len = dni.length;

  let letra = dni[len - 1];

  if (!esLetra(letra)) {
    return {
      isValid: false,
      message: "Letra no valida",
    };
  }

  let numerosValidos = /^[0-9]$/;

  let numeros = dni.slice(0, len - 1);

  let index = 0;
  let esNumeroValido = true;

  while (esNumeroValido && index < numeros.length) {
    esNumeroValido = numerosValidos.test(numeros[index]);
    index++;
  }

  if (!esNumeroValido) {
    return {
      isValid: false,
      message: "Solo debe haber numeros y una letra",
    };
  }

  if (letrasValidcion[numeros % 23] == letra.toUpperCase()) {
    return {
      isValid: true,
      message: "",
    };
  } else {
    return {
      isValid: false,
      message: "Letra no valida para el DNI",
    };
  }
};

const esLetra = (letra) => {
  const letrasValidas = "AZÑÁÉÍÓÚ ";
  const letraM = letra.toUpperCase();
  return (
    (letraM >= letrasValidas[0] && letraM <= letrasValidas[1]) ||
    letrasValidas.includes(letraM)
  );
};

const validarConfirmarEmail = (email) => {
  const invalidConfirmEmailMsg = "El correo debe de coincidir";

  return {
    isValid: email == document.getElementById("email").value,
    message:
      email == document.getElementById("email").value
        ? ""
        : invalidConfirmEmailMsg,
  };
};

const validarEmail = (email) => {
  const isValidEmail = /^[\w.]+@[\w-]+\.[\w.]+$/;
  const invalidEmailMsg = "Correo no válido";

  return {
    isValid: isValidEmail.test(email),
    message: isValidEmail.test(email) ? "" : invalidEmailMsg,
  };
};

const validarDireccion = (direccion) => {
  const direccionArr = direccion.split(",");

  let posBarra = direccion.indexOf("/");
  let tipoVia = direccion.slice(0, posBarra);

  if (!tipoVia || tipoVia.trim() === "") {
    return {
      isValid: false,
      message: "Direcion incorrecta: falta tipo de via",
    };
  }

  let restoDireccion = direccion.slice(posBarra + 1);

  const [nombreVia, restoDatos, cp, poblacion, pais] =
    restoDireccion.split(",");

  if (restoDireccion.split(",").length != 5) {
    return {
      isValid: false,
      message: "Direcion incorrecta: falta información",
    };
  } else {
    return {
      isValid: true,
      message: "",
    };
  }
};

const validarApellidos = (apellidos) => {
  // const validApellidos = /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+( [A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$/;

  const invalidApellidosMsg =
    "Deben empezar por mayusculas y solo tener letras";

  if (!apellidos) {
    return {
      isValid: false,
      message: "Los apellidos son obligatorios",
    };
  }

  const apellidosArr = apellidos.split(" ");
  console.log("apellidosArr ", apellidosArr);

  let apellidoValido = true;
  let index = 0;

  while (apellidoValido && index < apellidosArr.length) {
    apellidoValido = nombreApellidosValidos(apellidosArr[index]);
    index++;
  }

  return {
    isValid: apellidoValido,
    message: apellidoValido ? "" : invalidApellidosMsg,
  };
};

const nombreApellidosValidos = (cadena) => {
  console.log("cadena ", cadena);
  soloLetras(cadena);
  console.log("soloLetras(cadena) ", soloLetras(cadena));

  const letrasValidas = "AZÑÁÉÍÓÚ";
  const primera = cadena.charAt(0);
  return (
    soloLetras(cadena) &&
    ((primera >= letrasValidas[0] && primera <= letrasValidas[1]) ||
      letrasValidas.includes(primera))
  );
};

const soloLetras = (cadena) => {
  let i = 0;

  while (i < cadena.length && esLetra(cadena.charAt(i))) {
    i++;
  }
  return i == cadena.length;
};

const validarNombre = (name) => {
  // const validName = /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+$/;

  if (!name) {
    return {
      isValid: false,
      message: "El nombre es obligatorio",
    };
  }

  const invalidNameMsg = "Debe empezar por mayúsculas y solo contener letras";

  return {
    isValid: nombreApellidosValidos(name),
    message: nombreApellidosValidos(name) ? "" : invalidNameMsg,
  };
};


export {validarDni, validarPassword, validarConfirmarEmail, validarEmail, validarDireccion, validarApellidos, validarNombre };