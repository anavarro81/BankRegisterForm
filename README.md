# BankRegisterForm

## Descripción

Aplicación web simple que muestra un formulario de alta y valida los datos del usuario en el navegador antes de permitir el envío.

## Cómo funciona

- Al cargar la página, `script.js` añade validación por evento `blur` a los campos `input`.
- Cada vez que un campo pierde el foco se ejecuta la función de validación correspondiente en `validator.js`.
- Si un campo no es válido se muestra un mensaje junto a la etiqueta y el botón de registro queda deshabilitado hasta que todos los campos sean válidos.
- Cuando todos los campos son correctos y se pulsa en registar se guardan la informacion del usuario en localStorage y se redirige a: `successfullRegister.html`
- En la página de confirmación se leen los datos de localStorage y se muestran. 

## Archivos principales

- [index.html](index.html): formulario y estructura HTML.
- [successfullRegister.html](successfullRegister.html): Página de confirmación de alta. 
- [style.css](style.css): estilos de la página.
- [script.js](script.js): lógica de interacción, añade eventos, controla estados y habilita/deshabilita el botón de registro.
- [validator.js](validator.js): funciones de validación para cada campo.

## Validaciones implementadas

- `nombre`: obligatorio, debe empezar por mayúscula y contener solo letras.
- `apellidos`: obligatorio, mismos requisitos que `nombre` (puede contener varios apellidos separados por espacios).
- `direccion`: formato esperado con una barra (`/`) y luego 5 partes separadas por comas. Ejemplo: `Calle/NombreVia,Numero,CP,Poblacion,Pais`.
- `email`: patrón básico de correo electrónico y `confirmEmail` debe coincidir con el `email`.
- `dni`: formato español: números seguidos de una letra; la letra se comprueba con el algoritmo de módulo 23.
- `password`: entre 8 y 20 caracteres, al menos una mayúscula, una minúscula, al menos dos dígitos y al menos un símbolo.





