document.addEventListener('DOMContentLoaded', function () {
  // Alternância de tema
  const toggleThemeBtn = document.getElementById('toggleTheme');
  const html = document.documentElement;
  toggleThemeBtn.addEventListener('click', function () {
    if (html.getAttribute('data-theme') === 'dark') {
      html.removeAttribute('data-theme');
      toggleThemeBtn.classList.remove('bi-moon');
      toggleThemeBtn.classList.add('bi-sun');
    } else {
      html.setAttribute('data-theme', 'dark');
      toggleThemeBtn.classList.remove('bi-sun');
      toggleThemeBtn.classList.add('bi-moon');
    }
  });

  // Menu mobile
  const menuHamburger = document.getElementById('menuHamburger');
  const menuMobile = document.getElementById('menuMobile');

  // Abrir/fechar ao clicar no hambúrguer
  menuHamburger.addEventListener('click', function (e) {
    e.stopPropagation();
    menuMobile.classList.toggle('active');
  });

  // Fechar ao clicar fora do menu
  document.addEventListener('click', function (e) {
    if (
      menuMobile.classList.contains('active') &&
      !menuMobile.contains(e.target) &&
      e.target !== menuHamburger
    ) {
      menuMobile.classList.remove('active');
    }
  });

  // Fechar ao clicar em um item do menu
  menuMobile.querySelectorAll('.menu-link').forEach(function (link) {
    link.addEventListener('click', function () {
      menuMobile.classList.remove('active');
    });
  });
});