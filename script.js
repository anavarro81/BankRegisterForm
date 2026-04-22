import { validarPassword } from "./validator.js";

const validForm = {
  nombre: false,
  apellidos: false,
  direccion: false,
  email: false,
  confirmEmail: false,
  dni: false,
  password: false,
};

const validarField = (field) => {
  let validField = {};

  console.log("field  ", field);
  console.log("field value ", field.value);
  console.log("field name ", field.name);

  switch (field.name) {
    case "nombre":
      validField = validarNombre(field.value);
      break;
    case "apellidos":
      validField = validarApellidos(field.value);
      break;
    case "direccion":
      validField = validarDireccion(field.value);
      break;
    case "email":
      validField = validarEmail(field.value);
      break;
    case "confirmEmail":
      validField = validarConfirmarEmail(field.value);
      break;
    case "dni":
      validField = validarDni(field.value);
      break;
    case "password":
      validField = validarPassword(field.value);
      break;

    default:
      break;
  }

  validForm[field.name] = validField.isValid;

  setFieldError(field, validField.message);

  // Actualiza el botón register
  const btnRegistrar = document.getElementById("btn-registrar");
  btnRegistrar.disabled = isValidForm(validForm);
};

// Al cargar la página le agregamos la función validarField al evento onBlur
const addEvenToInput = () => {
  const inputsEl = document.getElementsByTagName("input");

  for (let index = 0; index < inputsEl.length; index++) {
    inputsEl[index].addEventListener("blur", (event) => {
      validarField(event.target);
    });
  }

  const descriptionEl = document
    .getElementById("direccion")
    .addEventListener("blur", () => {
      validarField(event.target);
    });
};

const setFieldError = (field, message) => {
  const container = field.parentElement;

  let FieldLabelEl = container.getElementsByTagName("label")[0];
  let FieldSpanEl = container.getElementsByTagName("span")[0];

  if (message) {
    FieldLabelEl.classList.add("text-red");
    FieldSpanEl.innerText = message;
    FieldSpanEl.classList.add("visible");
  } else {
    FieldLabelEl.classList.remove("text-red");
    FieldSpanEl.innerText = "";
    FieldSpanEl.classList.remove("visible");
  }
};

/* Comprueba que todos los campos sean validos */
// Si alguna clave (campo) no es true, el formulario es incorrecto.
const isValidForm = (form) => {
  console.log("validForm ", validForm);

  for (const clave in form) {
    if (!form[clave]) {
      return true;
    }
  }
  return false;
};

// Los nombres deben empezar por mayúsculas y el campo no admite números o símbolos, sólo letras.

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

const esLetra = (letra) => {
  const letrasValidas = "AZÑÁÉÍÓÚ ";
  const letraM = letra.toUpperCase();
  return (
    (letraM >= letrasValidas[0] && letraM <= letrasValidas[1]) ||
    letrasValidas.includes(letraM)
  );
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

const validarEmail = (email) => {
  const isValidEmail = /^[\w.]+@[\w-]+\.[\w.]+$/;
  const invalidEmailMsg = "Correo no válido";

  return {
    isValid: isValidEmail.test(email),
    message: isValidEmail.test(email) ? "" : invalidEmailMsg,
  };
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

window.onload = addEvenToInput;
