

function controlarBarraDeProgresso(paginaAtual) {
  const itensProgresso = document.querySelectorAll(".progressbar li");

  itensProgresso.forEach((item) => {
    item.classList.remove("active", "complete");
  });

  itensProgresso[paginaAtual].classList.add("active");

  for (let i = 0; i < paginaAtual; i++) {
    itensProgresso[i].classList.add("complete");
  }
}

if (window.location.href.includes("checkout.html")) {
  controlarBarraDeProgresso(1);
} else if (window.location.href.includes("checkout-dados-pessoais.html")) {
  controlarBarraDeProgresso(2);
} else {
    controlarBarraDeProgresso(3);
}
