// ✅ TEMA: salvar e aplicar ao carregar
const html = document.documentElement;
const toggleThemeBtn = document.getElementById('toggleTheme');

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  html.setAttribute('data-theme', 'dark');
  toggleThemeBtn.classList.remove('bi-sun');
  toggleThemeBtn.classList.add('bi-moon');
} else {
  html.removeAttribute('data-theme');
  toggleThemeBtn.classList.remove('bi-moon');
  toggleThemeBtn.classList.add('bi-sun');
}

if (toggleThemeBtn) {
  toggleThemeBtn.addEventListener('click', function () {
    if (html.getAttribute('data-theme') === 'dark') {
      html.removeAttribute('data-theme');
      toggleThemeBtn.classList.remove('bi-moon');
      toggleThemeBtn.classList.add('bi-sun');
      localStorage.setItem('theme', 'light');
    } else {
      html.setAttribute('data-theme', 'dark');
      toggleThemeBtn.classList.remove('bi-sun');
      toggleThemeBtn.classList.add('bi-moon');
      localStorage.setItem('theme', 'dark');
    }
  });
}

// ✅ MENU MOBILE
const menuHamburger = document.getElementById('menuHamburger');
const menuMobile = document.getElementById('menuMobile');

if (menuHamburger && menuMobile) {
  menuHamburger.addEventListener('click', function (e) {
    e.stopPropagation();
    menuMobile.classList.toggle('active');
  });

  document.addEventListener('click', function (e) {
    if (
      menuMobile.classList.contains('active') &&
      !menuMobile.contains(e.target) &&
      e.target !== menuHamburger
    ) {
      menuMobile.classList.remove('active');
    }
  });

  menuMobile.querySelectorAll('.menu-link').forEach(link => {
    link.addEventListener('click', () => menuMobile.classList.remove('active'));
  });
}

/* BARRA DE PESQUISA PÁGINA DE PRODUTOS */
function filtrarProdutos() {
  let input = document.getElementById("pesquisaProduto").value.toLowerCase();
  let cards = document.querySelectorAll(".produto-card");
  let mensagem = document.getElementById("mensagemNaoEncontrado");
  let botao = document.getElementById("botaoContatoNaoEncontrado");

  let encontrou = false;

  cards.forEach(card => {
    let titulo = card.querySelector(".produto-titulo").innerText.toLowerCase();

    if (titulo.includes(input)) {
      card.style.display = "flex";
      encontrou = true;
    } else {
      card.style.display = "none";
    }
  });

  // Mostra mensagem e botão apenas se não encontrar nada E houver texto digitado
  if (!encontrou && input.trim() !== "") {
    mensagem.style.display = "flex";
    botao.style.display = "flex";
  } else {
    mensagem.style.display = "none";
    botao.style.display = "none";
  }
}

// ✅ MODAL (POP-UP)
const produtos = {
  melao: [
    {
      titulo: "Melão Amarelo",
      descricao: "Doce, suculento e sempre pronto para consumo imediato. Ideal para cafés da manhã e sobremesas leves.",
      imagem: "assets/img/produtos/amarelo.jpg",
      impactCharacters: [
        { icon: "bi-emoji-smile", texto: "Sabor doce" },
        { icon: "bi-brightness-high", texto: "Alta durabilidade" },
        { icon: "bi-box-seam", texto: "Marca premium" }
      ]
    },
    {
      titulo: "Melão Pele de Sapo",
      descricao: "Casca verde rajada e polpa branca adocicada. Versátil, ideal para consumo in natura ou em saladas de frutas.",
      imagem: "assets/img/produtos/sapo.jpg",
      impactCharacters: [
        { icon: "bi-bag-check", texto: "Aceito no atacado" },
        { icon: "bi-droplet", texto: "Polpa suculenta" },
        { icon: "bi-globe", texto: "Popular internacional" }
      ]
    },
    {
      titulo: "Melão Matisse",
      descricao: "De aparência marcante e polpa doce, é valorizado pela qualidade premium e sabor único.",
      imagem: "assets/img/produtos/matisse.jpg",
      impactCharacters: [
        { icon: "bi-patch-check", texto: "Selo premium" },
        { icon: "bi-gem", texto: "Sabor único" },
        { icon: "bi-trophy", texto: "Alta valorização" }
      ]
    },
    {
      titulo: "Melão Gália",
      descricao: "Casca amarelada com polpa esverdeada clara, textura macia e sabor suave. Excelente para dias quentes.",
      imagem: "assets/img/produtos/galia.jpg",
      impactCharacters: [
        { icon: "bi-emoji-sunglasses", texto: "Refrescante" },
        { icon: "bi-droplet-half", texto: "Polpa leve" },
        { icon: "bi-bag-heart", texto: "Aceito no varejo" }
      ]
    },
    {
      titulo: "Melão Cantaloupe",
      descricao: "Um dos mais aromáticos. Casca rendada e polpa firme e doce. Ideal para cafés da manhã.",
      imagem: "assets/img/produtos/charentais.jpg",
      impactCharacters: [
        { icon: "bi-flower3", texto: "Aroma marcante" },
        { icon: "bi-egg-fried", texto: "Pratos sofisticados" },
        { icon: "bi-cup-hot", texto: "Café da manhã" }
      ]
    },
    {
      titulo: "Melão Orange",
      descricao: "Polpa alaranjada, doce e levemente aromática. Rico em vitaminas, perfeito para sucos tropicais.",
      imagem: "assets/img/produtos/orange.jpg",
      impactCharacters: [
        { icon: "bi-star", texto: "Cor vibrante" },
        { icon: "bi-cup-straw", texto: "Ideal para sucos" },
        { icon: "bi-heart", texto: "Rico em nutrientes" }
      ]
    }
  ],
melancia: [
  {
    titulo: "Melancia baby",
    descricao: "A clássica e mais consumida. Polpa vermelha, doce e suculenta, ideal para o dia a dia.",
    imagem: "assets/img/produtos/melancia.png",
    impactCharacters: [
      { icon: "bi-droplet", texto: "Altamente hidratante" },
      { icon: "bi-sun", texto: "Ideal para dias quentes" },
      { icon: "bi-house-heart", texto: "Presença garantida na mesa" }
    ]
  },
  {
    titulo: "Melancia baby",
    descricao: "Prática e saborosa, perfeita para quem busca comodidade sem perder o sabor.",
    imagem: "assets/img/produtos/sem-semente.jpg",
    impactCharacters: [
      { icon: "bi-x-circle", texto: "Sem sementes" },
      { icon: "bi-cup-straw", texto: "Excelente para sucos" },
      { icon: "bi-emoji-smile", texto: "Praticidade no consumo" }
    ]
  },
  {
    titulo: "Melancia baby",
    descricao: "Versão diferenciada com polpa branca, sabor suave e ideal para pratos gourmet.",
    imagem: "assets/img/produtos/branca.jpg",
    impactCharacters: [
      { icon: "bi-lightbulb", texto: "Opção diferenciada" },
      { icon: "bi-flower2", texto: "Sabor delicado" },
      { icon: "bi-award", texto: "Usada por chefs" }
    ]
  },
],
uva: [
  {
    titulo: "Uva Y",
    descricao: "Mesa clássica, baga grande e firme, sabor doce e levemente ácido. Ideal para consumo in natura.",
    imagem: "assets/img/produtos/uva1.jpg",
    impactCharacters: [
      { icon: "bi-apple", texto: "Boa firmeza" },
      { icon: "bi-emoji-smile", texto: "Sabor equilibrado" },
      { icon: "bi-basket", texto: "Mesa premium" }
    ]
  },
  {
    titulo: "Uva X",
    descricao: "Sem sementes, baga verde-clara, doçura intensa. Perfeita para sucos e decoração.",
    imagem: "assets/img/produtos/uva2.jpg",
    impactCharacters: [
      { icon: "bi-x-circle", texto: "Sem sementes" },
      { icon: "bi-cup-straw", texto: "Ótima para sucos" },
      { icon: "bi-palette", texto: "Visual limpo" }
    ]
  }
],
abacaxi: [
  {
    titulo: "Abacaxi Pérola",
    descricao: "Fruta pequena, coroa curta, polpa amarelo-clara, doce e aromática. Ideal para consumo in natura e sucos.",
    imagem: "assets/img/produtos/abacaxi.jpg",
    impactCharacters: [
      { icon: "bi-star", texto: "Sabor doce" },
      { icon: "bi-cup-straw", texto: "Ótimo para sucos" },
      { icon: "bi-emoji-smile", texto: "Aroma marcante" }
    ]
  }
],
manga: [
  {
    titulo: "Manga Keitt",
    descricao: "Pele verde mesmo madura, polpa firme, doce e sem fibras. Perfeita para saladas e sobremesas.",
    imagem: "assets/img/produtos/keitt.jpg",
    impactCharacters: [
      { icon: "bi-check-circle", texto: "Sem fibras" },
      { icon: "bi-egg-fried", texto: "Ideal para saladas" },
      { icon: "bi-heart", texto: "Doçura intensa" }
    ]
  },
  {
    titulo: "Manga Palmer",
    descricao: "Pele avermelhada, polpa suculenta e sabor equilibrado. Excelente para mesa e polpas.",
    imagem: "assets/img/produtos/palmer.jpg",
    impactCharacters: [
      { icon: "bi-palette", texto: "Cor vibrante" },
      { icon: "bi-emoji-smile", texto: "Sabor equilibrado" },
      { icon: "bi-shop", texto: "Sucesso no varejo" }
    ]
  }
]
}

let categoriaAtual = "";
let indiceAtual = 0;

function abrirModal(categoria, indice = 0) {
  categoriaAtual = categoria;
  indiceAtual = indice;
  atualizarModal();
  const modal = document.getElementById("modalProduto");
  if (modal) modal.style.display = "flex";
}

function fecharModal() {
  const modal = document.getElementById("modalProduto");
  if (modal) modal.style.display = "none";
}

function atualizarModal() {
  const produto = produtos[categoriaAtual]?.[indiceAtual];
  if (!produto) return;

  document.getElementById("modalTitulo").innerText = produto.titulo;
  document.getElementById("modalDescricao").innerText = produto.descricao;
  document.getElementById("modalImagem").src = produto.imagem;

  const container = document.querySelector(".impact-characters");
  if (!container) return;

  container.innerHTML = "";
  produto.impactCharacters?.forEach(c => {
    const div = document.createElement("div");
    div.className = "character";
    div.innerHTML = `<i class="bi ${c.icon}"></i><span>${c.texto}</span>`;
    container.appendChild(div);
  });
}

function proximoProduto() {
  if (!produtos[categoriaAtual]) return;
  indiceAtual = (indiceAtual + 1) % produtos[categoriaAtual].length;
  atualizarModal();
}

function anteriorProduto() {
  if (!produtos[categoriaAtual]) return;
  indiceAtual = (indiceAtual - 1 + produtos[categoriaAtual].length) % produtos[categoriaAtual].length;
  atualizarModal();
}