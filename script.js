// 🎥 ANIMACIÓN CANVAS "TE AMO"
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const texto = "TE AMO   TE AMO   TE AMO   TE AMO   TE AMO   TE AMO   TE AMO   TE AMO   TE AMO   ";
const fontSize = 12;
const filas = Math.ceil(canvas.height / fontSize);
const posiciones = Array.from({ length: filas }, (_, i) => i * fontSize);

function draw() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = `${fontSize}px sans-serif`;
  ctx.shadowColor = "magenta";
  ctx.shadowBlur = 8;

  for (let i = 0; i < filas; i++) {
    ctx.fillStyle = "hsla(303, 88.8%, 50%, 0.9)";
    const repeat = Math.ceil(canvas.width / ctx.measureText(texto).width) + 1;
    for (let j = 0; j < repeat; j++) {
      ctx.fillText(texto, j * ctx.measureText(texto).width, posiciones[i]);
    }
    posiciones[i] += 4;
    if (posiciones[i] > canvas.height + fontSize) posiciones[i] = 0;
  }

  // ❤️ Agregado aquí para combinar animaciones
}
setInterval(draw, 33);

// 🎵 MÚSICA Y LOGIN
let musicaActivada = false;

function activarMusica() {
  const audio = document.getElementById("musica");
  audio.play().then(() => {
    musicaActivada = true;
    document.getElementById("clave").removeAttribute("readonly");
    const flecha = document.querySelector(".flecha-animada");
    if (flecha) flecha.style.display = "none";
  }).catch(() => {});
}

function agregarNumero(num) {
  if (!musicaActivada) return;
  const clave = document.getElementById("clave");
  if (clave.value.length < 8) clave.value += num;
}

function borrarNumero() {
  if (!musicaActivada) return;
  const clave = document.getElementById("clave");
  clave.value = clave.value.slice(0, -1);
}

// ✅ MOSTRAR CONTENIDO SI LA CLAVE ES CORRECTA
function verificarClave() {
  const clave = document.getElementById("clave").value;
  if (clave === "080625") {
    document.getElementById("login").style.display = "none";
    document.getElementById("matrix").style.display = "block";
    document.querySelector(".mensaje").style.display = "block";
    document.getElementById("volverBtn").style.display = "block";
    document.getElementById("musica").play();
    document.querySelector(".musica-container-horizontal").style.display = "none";
    mostrarContadorDias(); // ✅ Mostrar contador al ingresar correctamente
  } else {
    alert("Noo... esa no es la fecha correcta 💔");
  }
}

// 🔁 BOTÓN VOLVER AL INICIO
document.getElementById("volverBtn").addEventListener("click", () => {
  window.location.reload();
});

// ⏳ CONTADOR DE DÍAS JUNTOS
function mostrarContadorDias() {
  const inicio = new Date(2025, 5, 8); // Junio es 5 (0-based)
  const hoy = new Date();

  // Redondear fechas a medianoche para evitar errores por horas
  const unDia = 1000 * 60 * 60 * 24;
  const diff = Math.floor((hoy.setHours(0, 0, 0, 0) - inicio.setHours(0, 0, 0, 0)) / unDia);

  const contador = document.getElementById("contadorDias");
  if (contador) {
    contador.innerText = `Llevamos ${diff} días juntos 💞`;
    contador.style.display = "block";
  }
}

// ❤️ CORAZONES SUBIENDO DESDE ABAJO
const corazones = [];
const totalCorazones = 800;

for (let i = 0; i < totalCorazones; i++) {
  const esGrande = Math.random() < 0.9;
  const size = esGrande
    ? 60 + Math.random() * 60
    : 30 + Math.random() * 50;

  corazones.push({
    x: Math.random() * canvas.width,
    y: canvas.height + Math.random() * canvas.height,
    size: size,
    speed: 0.3 + Math.random() * 1.2,
    opacity: 0.1 + Math.random() * 0.3
  });
}

function dibujarCorazones() {
  for (const corazon of corazones) {
    ctx.globalAlpha = corazon.opacity;
    ctx.font = `${corazon.size}px Arial`;
    ctx.fillStyle = "#ffffff";
    ctx.fillText("🤍", corazon.x, corazon.y);
    corazon.y -= corazon.speed;

    if (corazon.y < -50) {
      corazon.y = canvas.height + Math.random() * canvas.height;
      corazon.x = Math.random() * canvas.width;
    }
  }
  ctx.globalAlpha = 1;
}
