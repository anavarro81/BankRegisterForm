import { validarPassword, validarDni, validarConfirmarEmail, validarEmail, validarDireccion, validarApellidos, validarNombre } from "./validator.js";


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







  



window.onload = addEvenToInput;
