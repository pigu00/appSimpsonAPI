import "./style.css";

const form = document.getElementById("formulario");
const simpson = document.getElementById("simpson");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nombre = e.target[0].value;
  const edad = Number(e.target[1].value);

  if (!nombre) {
    alert("Agregar un nombre");
  } else if (!edad) {
    alert("Se requiere completar la edad");
  } else if (!(edad >= 1 && edad <= 100)) {
    alert("la edad debe estar entre 1 y 100");
  } else {
    alert(`Tu nombre es ${nombre}
  y tu edad es ${edad}`);
  }

  if (!localStorage.getItem("usuarios")) {
    localStorage.setItem("usuarios", "[]");
  } else {
    const users = JSON.parse(localStorage.getItem("usuarios"));
    users.push({ nombre, edad });
    localStorage.setItem("usuarios", JSON.stringify(users));
  }
});

function getQuoteOnce() {
  let called = false;
  return async () => {
    if (!called) {
      called = true;
      const res = await fetch(
        "https://thesimpsonsquoteapi.glitch.me/quotes"
      ).then((data) => data.json());
      const image = res[0].image;
      const quote = res[0].quote;
      const h2 = document.createElement("h2");
      document.body.appendChild(h2);
      h2.innerText = quote;

      const img = document.createElement("img");
      document.body.appendChild(img);
      img.src = image;
    }
  };
}

simpson.addEventListener("click", getQuoteOnce());
