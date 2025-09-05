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

/* SCROLL */

// script.js
// Scrollspy com IntersectionObserver (recomendado)
// ===== Scrollspy (substituir o bloco antigo) =====
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section[id]");
  // seleciona apenas anchors do menu que linkam para hash (#)
  const navLinks = document.querySelectorAll('a.menu-link[href^="#"]');
  const header = document.getElementById('header');

  function onScroll() {
    // soma a altura do header fixo para compensar o offset
    const offset = (header ? header.offsetHeight : 100) + 10;
    const scrollY = window.scrollY + offset;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => link.classList.remove("active"));
        const targetLink = document.querySelector(`a.menu-link[href="#${sectionId}"]`);
        if (targetLink) targetLink.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", onScroll);
  // chama uma vez no carregamento para marcar a seção inicial (útil se abrir com hash ou estiver no topo)
  onScroll();
});



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

/* CONTATO */

/* NUMERO E MAIL */
  const form = document.getElementById("formContato");
  const emailInput = document.getElementById("email");
  const telInput = document.getElementById("telefone");
  const emailError = document.getElementById("emailError");
  const telError = document.getElementById("telError");

  // Regex genérico para e-mail válido
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Regex para telefone brasileiro: (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
  const telRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;

  // --- Validação do formulário ---
  form.addEventListener("submit", function (e) {
    let valid = true;

    // Validação e-mail
    if (!emailRegex.test(emailInput.value.trim())) {
      emailInput.classList.add("error");
      emailError.style.display = "block";
      emailError.textContent = "Digite um e-mail válido (ex: usuario@dominio.com)";
      valid = false;
    } else {
      emailInput.classList.remove("error");
      emailError.style.display = "none";
    }

    // Validação telefone
    if (!telRegex.test(telInput.value.trim())) {
      telInput.classList.add("error");
      telError.style.display = "block";
      telError.textContent = "Digite um telefone válido (ex: (11) 91234-5678)";
      valid = false;
    } else {
      telInput.classList.remove("error");
      telError.style.display = "none";
    }

    if (!valid) {
      e.preventDefault(); // impede envio
    }
  });

  // --- Máscara dinâmica para telefone BR ---
  telInput.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, ""); // remove tudo que não for número

    if (value.length > 11) value = value.slice(0, 11); // limita a 11 dígitos

    if (value.length <= 10) {
      // Formato fixo (XX) XXXX-XXXX
      value = value.replace(/^(\d{2})(\d{4})(\d{0,4})$/, "($1) $2-$3");
    } else {
      // Formato celular (XX) XXXXX-XXXX
      value = value.replace(/^(\d{2})(\d{5})(\d{0,4})$/, "($1) $2-$3");
    }

    e.target.value = value;
  });
// ====== Contato (Formspree) ======
(function () {
  const form = document.getElementById("formContato");
  if (!form) return;

  const alertBox = document.getElementById("formAlert");
  const btn = document.getElementById("btnEnviar");
  const btnText = btn ? btn.querySelector(".btn-texto") : null;

  function showAlert(type, msg) {
    if (!alertBox) return;
    alertBox.className = "form-alert " + type; 
    alertBox.textContent = msg;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Validação simples
    if (!form.checkValidity()) {
      showAlert("error", "Por favor, preencha os campos obrigatórios.");
      return;
    }

    // Estado de carregando
    if (btn) {
      btn.disabled = true;
      if (btnText) btnText.textContent = "Enviando...";
    }

    try {
      const endpoint = form.getAttribute("action"); // https://formspree.io/f/SEU_ID
      const data = Object.fromEntries(new FormData(form));

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        showAlert("success", "Mensagem enviada com sucesso! Em breve entraremos em contato.");
        form.reset();
      } else {
        showAlert("error", "Não foi possível enviar agora. Tente novamente em instantes.");
        console.error("Formspree error", await res.text());
      }
    } catch (err) {
      showAlert("error", "Falha de conexão. Verifique sua internet e tente novamente.");
      console.error(err);
    } finally {
      if (btn) {
        btn.disabled = false;
        if (btnText) btnText.textContent = "Enviar Mensagem";
      }
    }
  });
})();


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
  itaueira: [
  // ===== MELÃO AMARELO =====
  {
    titulo: "Melão Amarelo Rei",
    descricao: "Doce, suculento e sempre pronto para consumo imediato.",
    imagem: "assets/img/produtos/am-rei.jpg",
    impactCharacters: [
      { icon: "bi-emoji-smile", texto: "Sabor doce" },
      { icon: "bi-brightness-high", texto: "Alta durabilidade" },
      { icon: "bi-award", texto: "Linha premium" }
    ]
  },
  {
    titulo: "Melão Amarelo Cepi",
    descricao: "Variedade selecionada, com textura macia e frescor prolongado.",
    imagem: "assets/img/produtos/melao-amarelo-cepi.jpg",
    impactCharacters: [
      { icon: "bi-emoji-smile", texto: "Sabor suave" },
      { icon: "bi-sun", texto: "Cultivo especial" },
      { icon: "bi-award", texto: "Linha premium" }
    ]
  },

  // ===== MELANCIA =====
  {
    titulo: "Melancia Magali",
    descricao: "Refrescante, doce e perfeita para compartilhar em momentos especiais.",
    imagem: "assets/img/produtos/sem-semente.jpg",
    impactCharacters: [
      { icon: "bi-droplet", texto: "Extremamente suculenta" },
      { icon: "bi-emoji-laughing", texto: "Sabor marcante" },
      { icon: "bi-award", texto: "Seleção premium" }
    ]
  },
  {
    titulo: "Melancia Cepi",
    descricao: "Com equilíbrio perfeito entre doçura e frescor.",
    imagem: "assets/img/produtos/melancia-cepi.jpg",
    impactCharacters: [
      { icon: "bi-droplet-half", texto: "Frescor garantido" },
      { icon: "bi-heart", texto: "Fonte natural de hidratação" },
      { icon: "bi-award", texto: "Linha premium" }
    ]
  },
  {
    titulo: "Melancia Cepi Branca",
    descricao: "Com equilíbrio perfeito entre doçura e frescor.",
    imagem: "assets/img/produtos/branca.jpg",
    impactCharacters: [
      { icon: "bi-droplet-half", texto: "Frescor garantido" },
      { icon: "bi-heart", texto: "Fonte natural de hidratação" },
      { icon: "bi-award", texto: "Linha premium" }
    ]
  },

  // ===== MATISSE =====
  {
    titulo: "Melão Matisse Rei",
    descricao: "Variedade sofisticada, com sabor adocicado e aroma diferenciado.",
    imagem: "assets/img/produtos/matisse-rei.jpg",
    impactCharacters: [
      { icon: "bi-star", texto: "Sabor sofisticado" },
      { icon: "bi-emoji-heart-eyes", texto: "Aroma marcante" },
      { icon: "bi-award", texto: "Edição premium" }
    ]
  },
  {
    titulo: "Melão Matisse Cepi",
    descricao: "Fruto de polpa firme e ideal para experiências gastronômicas.",
    imagem: "assets/img/produtos/matisse-cepi.jpg",
    impactCharacters: [
      { icon: "bi-star", texto: "Textura diferenciada" },
      { icon: "bi-sun", texto: "Cultivo especial" },
      { icon: "bi-award", texto: "Edição premium" }
    ]
  },

  // ===== PELE DE SAPO =====
  {
    titulo: "Melão Pele de Sapo Rei",
    descricao: "Tradicional e com doçura equilibrada, perfeito para consumo diário.",
    imagem: "assets/img/produtos/sapo-rei.jpg",
    impactCharacters: [
      { icon: "bi-emoji-smile", texto: "Sabor equilibrado" },
      { icon: "bi-brightness-high", texto: "Boa conservação" },
      { icon: "bi-award", texto: "Premium selecionado" }
    ]
  },
  {
    titulo: "Melão Pele de Sapo Cepi",
    descricao: "Textura firme e aroma fresco, ideal para feiras e mercados.",
    imagem: "assets/img/produtos/pele-sapo-cepi.jpg",
    impactCharacters: [
      { icon: "bi-emoji-smile", texto: "Sabor suave" },
      { icon: "bi-check-circle", texto: "Qualidade garantida" },
      { icon: "bi-award", texto: "Premium selecionado" }
    ]
  },

  // ===== PIMENTÃO =====
   {
  titulo: "Pimentão Amarelo",
    descricao: "Doce e delicado, ótimo para consumo cru, recheado ou em pratos leves.",
    imagem: "assets/img/produtos/pamarelo.jpg",
    impactCharacters: [
      { icon: "bi-brightness-high", texto: "Cor vibrante" },
      { icon: "bi-emoji-heart-eyes", texto: "Sabor suave" },
      { icon: "bi-box-seam", texto: "Categoria especial" }
    ]
  },
  {
    titulo: "Pimentão Vermelho",
    descricao: "Adocicado e suculento, perfeito para grelhados, molhos e pratos sofisticados.",
    imagem: "assets/img/produtos/pvermelho.jpg",
    impactCharacters: [
      { icon: "bi-fire", texto: "Sabor intenso" },
      { icon: "bi-star", texto: "Fonte de antioxidantes" },
      { icon: "bi-award", texto: "Selecionado premium" }
    ]
  },
  {
    titulo: "Pimentão Laranja",
    descricao: "Equilíbrio entre doçura e frescor, ideal para saladas coloridas e receitas criativas.",
    imagem: "assets/img/produtos/plaranja.jpg",
    impactCharacters: [
      { icon: "bi-palette", texto: "Cor diferenciada" },
      { icon: "bi-emoji-smile", texto: "Sabor equilibrado" },
      { icon: "bi-check-circle", texto: "Alta qualidade" }
    ]
  },

  
  // ===== GALIA =====
  {
    titulo: "Melão Galia Rei",
    descricao: "Polpa doce, macia e extremamente aromática.",
    imagem: "assets/img/produtos/galia-rei.jpg",
    impactCharacters: [
      { icon: "bi-emoji-smile", texto: "Sabor adocicado" },
      { icon: "bi-brightness-high", texto: "Aroma diferenciado" },
      { icon: "bi-award", texto: "Premium selecionado" }
    ]
  },
  {
    titulo: "Melão Galia Cepi",
    descricao: "Textura cremosa e sabor intenso, ideal para sobremesas.",
    imagem: "assets/img/produtos/galia-cepi.jpg",
    impactCharacters: [
      { icon: "bi-emoji-smile", texto: "Sabor intenso" },
      { icon: "bi-star", texto: "Textura cremosa" },
      { icon: "bi-award", texto: "Premium selecionado" }
    ]
  },
  
  // ===== CANTALOUPE =====
  {
    titulo: "Melão Cantaloupe Rei",
    descricao: "Tradicional e suculento, com aroma tropical inconfundível.",
    imagem: "assets/img/produtos/cantaloupe-rei.jpg",
    impactCharacters: [
      { icon: "bi-star", texto: "Aroma tropical" },
      { icon: "bi-emoji-heart-eyes", texto: "Sabor único" },
      { icon: "bi-award", texto: "Seleção premium" }
    ]
  },
  {
    titulo: "Melão Cantaloupe Cepi",
    descricao: "Doçura equilibrada e textura macia, perfeito para pratos leves.",
    imagem: "assets/img/produtos/cantaloupe-cepi.jpg",
    impactCharacters: [
      { icon: "bi-emoji-smile", texto: "Sabor equilibrado" },
      { icon: "bi-check-circle", texto: "Qualidade especial" },
      { icon: "bi-award", texto: "Seleção premium" }
    ]
  },
  // ===== MEL =====
  {
    titulo: "Mel em Bisnaga 275g",
    descricao: "Prático e saboroso, ideal para o dia a dia. Perfeito para adoçar chás, cafés e receitas rápidas.",
    imagem: "assets/img/produtos/melb.jpg",
    impactCharacters: [
      { icon: "bi-lightning", texto: "Praticidade no consumo" },
      { icon: "bi-heart", texto: "100% natural" },
      { icon: "bi-box-seam", texto: "Embalagem segura" }
    ]
  },
  {
    titulo: "Mel Pote de Vidro 500g",
    descricao: "Puro e natural, preservado em embalagem de vidro que mantém a qualidade e o sabor do mel por mais tempo.",
    imagem: "assets/img/produtos/melv.jpg",
    impactCharacters: [
      { icon: "bi-award", texto: "Sabor premium" },
      { icon: "bi-shield-check", texto: "Qualidade garantida" },
      { icon: "bi-recycle", texto: "Embalagem sustentável" }
    ]
  },
],
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
pimentao: [
  {
    titulo: "Pimentão Amarelo",
    descricao: "Doce e delicado, ótimo para consumo cru, recheado ou em pratos leves.",
    imagem: "assets/img/produtos/pamarelo.jpg",
    impactCharacters: [
      { icon: "bi-brightness-high", texto: "Cor vibrante" },
      { icon: "bi-emoji-heart-eyes", texto: "Sabor suave" },
      { icon: "bi-box-seam", texto: "Categoria especial" }
    ]
  },
  {
    titulo: "Pimentão Vermelho",
    descricao: "Adocicado e suculento, perfeito para grelhados, molhos e pratos sofisticados.",
    imagem: "assets/img/produtos/pvermelho.jpg",
    impactCharacters: [
      { icon: "bi-fire", texto: "Sabor intenso" },
      { icon: "bi-star", texto: "Fonte de antioxidantes" },
      { icon: "bi-award", texto: "Selecionado premium" }
    ]
  },
  {
    titulo: "Pimentão Laranja",
    descricao: "Equilíbrio entre doçura e frescor, ideal para saladas coloridas e receitas criativas.",
    imagem: "assets/img/produtos/plaranja.jpg",
    impactCharacters: [
      { icon: "bi-palette", texto: "Cor diferenciada" },
      { icon: "bi-emoji-smile", texto: "Sabor equilibrado" },
      { icon: "bi-check-circle", texto: "Alta qualidade" }
    ]
  }
],
mel: [
  {
    titulo: "Mel em Bisnaga 275g",
    descricao: "Prático e saboroso, ideal para o dia a dia. Perfeito para adoçar chás, cafés e receitas rápidas.",
    imagem: "assets/img/produtos/melb.jpg",
    impactCharacters: [
      { icon: "bi-lightning", texto: "Praticidade no consumo" },
      { icon: "bi-heart", texto: "100% natural" },
      { icon: "bi-box-seam", texto: "Embalagem segura" }
    ]
  },
  {
    titulo: "Mel Pote de Vidro 500g",
    descricao: "Puro e natural, preservado em embalagem de vidro que mantém a qualidade e o sabor do mel por mais tempo.",
    imagem: "assets/img/produtos/melv.jpg",
    impactCharacters: [
      { icon: "bi-award", texto: "Sabor premium" },
      { icon: "bi-shield-check", texto: "Qualidade garantida" },
      { icon: "bi-recycle", texto: "Embalagem sustentável" }
    ]
  }
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
],

morango: [
  {
    titulo: "Morango San Andreas",
    descricao: "Variedade de alto rendimento, com sabor adocicado e excelente firmeza. Ideal para transporte e consumo in natura.",
    imagem: "assets/img/produtos/morango.jpg",
    impactCharacters: [
      { icon: "bi-graph-up", texto: "Alta produtividade" },
      { icon: "bi-truck", texto: "Bom transporte" },
      { icon: "bi-emoji-smile", texto: "Sabor doce" }
    ]
  },
  {
    titulo: "Morango Albion",
    descricao: "Fruto de coloração intensa, formato alongado e aroma marcante. Muito utilizado em confeitaria e sobremesas.",
    imagem: "assets/img/produtos/morango-albion.jpg",
    impactCharacters: [
      { icon: "bi-brush", texto: "Cor intensa" },
      { icon: "bi-cake2", texto: "Perfeito para doces" },
      { icon: "bi-flower1", texto: "Aroma marcante" }
    ]
  },
  {
    titulo: "Morango Camino Real",
    descricao: "Morangos firmes, grandes e de coloração vibrante. Ótima resistência no transporte e conservação.",
    imagem: "assets/img/produtos/morango-caminoreal.jpg",
    impactCharacters: [
      { icon: "bi-bounding-box", texto: "Frutos grandes" },
      { icon: "bi-hourglass-split", texto: "Alta durabilidade" },
      { icon: "bi-box-seam", texto: "Resistente ao transporte" }
    ]
  },
  {
    titulo: "Morango Monterey",
    descricao: "Variedade muito doce e produtiva, perfeita para consumo direto e ideal para climas mais quentes.",
    imagem: "assets/img/produtos/morango-monterey.jpg",
    impactCharacters: [
      { icon: "bi-emoji-heart-eyes", texto: "Extremamente doce" },
      { icon: "bi-sun", texto: "Adaptado a calor" },
      { icon: "bi-bar-chart", texto: "Alta produtividade" }
    ]
  }
],


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

/* CONFIG, PARA POUP-UP DE UMA FOTO  */

function atualizarModal() {
  const produto = produtos[categoriaAtual]?.[indiceAtual];
  if (!produto) return;

  document.getElementById("modalTitulo").innerText = produto.titulo;
  document.getElementById("modalDescricao").innerText = produto.descricao;
  document.getElementById("modalImagem").src = produto.imagem;

  // Renderiza os impact characters
  const container = document.querySelector(".impact-characters");
  if (!container) return;
  container.innerHTML = "";
  produto.impactCharacters?.forEach(c => {
    const div = document.createElement("div");
    div.className = "character";
    div.innerHTML = `<i class="bi ${c.icon}"></i><span>${c.texto}</span>`;
    container.appendChild(div);
  });

  // Oculta ou exibe os botões Anterior/Próximo
  const botoes = document.querySelector(".modal-botoes");
  if (botoes) {
    botoes.style.display = produtos[categoriaAtual]?.length > 1 ? "flex" : "none";
  }
}