import { construirSvg } from "../constructors/construirSVG.js";
import { construirFormulario } from "../constructors/formFactory.js";
import { loginScrollReveal, registerScrollReveal } from "../scrollReveal.js";
import { $ } from "../utilidades.js";
import { verificarDadosDoLogin } from "./verificarLogin.js";
import { realizarVerificacoes } from "./verificarRegistro.js";

function controlarBtns() {
  const btnsLogin = document.querySelectorAll(".btn__login");

  btnsLogin[0].classList.add("selected");

  btnsLogin.forEach((btn) => {
    btn.addEventListener("click", () => {
      btnsLogin.forEach((otherBtn) => {
        if (otherBtn !== btn) {
          otherBtn.classList.remove("selected");
        }
      });

      btn.classList.add("selected");
      
    });
  });
}

function contruirFormLogin() {
  const formDom = $("#form-dom");

  formDom.innerHTML = "";

  const formLogin = construirFormulario(
    "login",
    {
      action: "php/verificarLogin.php",
      method: "POST",
      id: "login-form",
    },
    [
      {
        label: "Usuário",
        icon: "<i class='fa-solid fa-circle-user me-2'></i>",
        type: "email",
        name: "email-login",
        id: "username",
        inputId : "login-email",
        autocomplete: "username",
        error : "username-login"
      },
      {
        label: "Senha",
        icon: "<i class='fa-solid fa-unlock-keyhole me-2'></i>",
        type: "password",
        name: "senha-login",
        id: "password",
        inputId : "login-password",
        autocomplete: "current-password",
        error : "username-password"
      },
    ],
    [
      {
        id: "login-enviar",
        label: "Login",
        icon: "<i class='fa-solid fa-arrow-right-long'></i>",
      },
    ],

    true,

  );

  construirSvg();

    if(formLogin){
      const loginVerificado = verificarDadosDoLogin(formLogin);

      if(loginVerificado) {
        
        formLogin.addEventListener("submit",async function(e){
          e.preventDefault();
  
  
        });

      }
    }

  

  formDom.appendChild(formLogin);
  const formInputs = document.querySelectorAll(".form-control");

  formInputs.forEach((input) => {
    input.addEventListener("input", () =>
      removerLabelEnquantoInputEstiverPreenchido(formInputs)
    );
  });
}

let usuarioAutenticado = null;

function gerarIdAleatorio() {
  return Math.floor(Math.random() * 1000000);
}

function construirFormRegistro() {
  const formDom = $("#form-dom");
  formDom.innerHTML = "";

  const formRegistro = construirFormulario(
    "registrar",

    {
      action: "php/coletarDadosRegistro.php",
      method: "POST",
      id: "register-form",
    },
    
    [
      {
        label: "Seu nome de usuário",
        icon: "<i class='fa-solid fa-circle-user me-2'></i>",
        type: "text",
        name: "criar-username",
        id: "create-user",
        inputId: "criar-username",
        autocomplete: "User",
        minlength: 6,
        error : "user",
      },
      {
        label: "Seu e-mail",
        icon: "<i class='fa-regular fa-envelope me-2'></i>",
        type: "email",
        name: "criar-email",
        id: "create-email",
        inputId: "criar-email",
        autocomplete: "e-mail",
        error : "email",
      },
      {
        label: "Data de nascimento",
        icon: "<i class='fa-solid fa-calendar-days me-2 mb-2'></i>",
        type: "text",
        name: "criar-data",
        id: "create-data",
        inputId: "criar-data",
        autocomplete: "data",
        error : "data",
      },
      {
        label: "Número Telefone",
        icon: "<i class='fa-solid fa-phone me-2'></i>",
        type: "tel",
        name: "telefone",
        id: "create-telefone",
        inputId: "criar-telefone",
        autocomplete: "telefone",
        error : "telefone",
      },
      {
        label:
          "Crie uma senha ",
        icon: "<i class='fa-solid fa-lock me-2'></i>",
        type: "password",
        name: "criar-senha",
        id: "create-pass",
        inputId: "criar-senha",
        autocomplete: "senha",
        minlength: 8,
        error : "password",
        iconCheck :"<i id = 'icone-verificacao' class=''></i>",
      }
    ],
    [{ id: "criar-conta-btn", label: "Criar Conta" }],
    {
        quantity : 2,

    },
    false
  );
  
  formDom.appendChild(formRegistro);

  

  const formInputs = document.querySelectorAll(".form-control");

  formInputs.forEach((input) => {

    input.addEventListener("input", () =>{
      removerLabelEnquantoInputEstiverPreenchido(formInputs)
    }

    );
  });

  construirSvg();

  if (formRegistro) {
    const formVerificado = realizarVerificacoes(formRegistro);

    if (formVerificado) {
      formRegistro.addEventListener("submit", async (event) => {
        event.preventDefault();

        usuarioAutenticado = {
          usuario: true,
          id: gerarIdAleatorio(),
        };

        localStorage.setItem(
          "usuario-autenticado",
          JSON.stringify(usuarioAutenticado)
        );
      });
    }
  }
}

function removerLabelEnquantoInputEstiverPreenchido(formInputs) {
  formInputs.forEach((input) => {
    const formLabel = input.closest(".input-container").querySelector(".form-label");
    if (formLabel) {
      formLabel.classList.toggle("filled", input.value !== "");
    }
  });
}



const btnLogin = $("#login-btn");
const registerBtn = $("#sign-up-btn");

if(btnLogin){
  btnLogin.addEventListener("click", () => {
    contruirFormLogin();
    loginScrollReveal();
  });
}

if(registerBtn) {
  registerBtn.addEventListener("click", () => {
    construirFormRegistro();
    registerScrollReveal();
  });
}






contruirFormLogin();
loginScrollReveal();
controlarBtns();
