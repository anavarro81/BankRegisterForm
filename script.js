import {
  validarPassword,
  validarDni,
  validarConfirmarEmail,
  validarEmail,
  validarDireccion,
  validarApellidos,
  validarNombre,
} from "./validator.js";

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

// Al cargar la página le agregamos la función validarField a los inputs y el text area.
// Se agrega el evento para enviar el formulario al boton registrar.

const loadData = () => {
  location?.href.includes("index") ? addEvenOnLoad() : loadUserData();
};

const loadUserData = () => {
  const user = localStorage.getItem("user");

  

  const userUlEl = document.getElementById("user-data");
  userUlEl.innerHTML = "";

  if (user) {
    let userData = JSON.parse(user);

    

    for (const field in userData) {
      userUlEl.innerHTML += `<li><strong>${field}:</strong> ${userData[field]}</li> `;
    }
  } else {
    userUlEl.innerHTML = "No hay información del usuario";
  }
};

const addEvenOnLoad = () => {
  

  // Limpieza de localStorage entre llamadas.
  localStorage.removeItem("user");

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

  const submitBtnEl = document
    .getElementById("btn-registrar")
    .addEventListener("click", (event) => {
      saveDatoToLocalStorage(event.target);
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

function saveDatoToLocalStorage(e) {
  const user = {
    nombre: document.getElementById("nombre").value || "No informado",
    apellidos: document.getElementById("apellidos").value || "No inforado",
    direccion: document.getElementById("direccion").value || "No informado",
    email: document.getElementById("confirmEmail").value || "No informado",
    intereres: document.getElementById("intereses").value || "No informado",
    dni: document.getElementById("dni").value || "No informado",
  };

  localStorage.setItem("user", JSON.stringify(user));
  window.location.href = "successfullRegister.html";
}
/* Comprueba que todos los campos sean validos */
// Si alguna clave (campo) no es true, el formulario es incorrecto.
const isValidForm = (form) => {
  for (const clave in form) {
    if (!form[clave]) {
      return true;
    }
  }

  return false;
};

// Los nombres deben empezar por mayúsculas y el campo no admite números o símbolos, sólo letras.

window.onload = loadData;
