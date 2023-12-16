import { pegarDadosDeUmUsuario } from "../pegarDadosSQL";
import { $, coletarEmail } from "../utilidades";

export async function controlarAcessoDoUsuario() {
    const email = coletarEmail();

    if (email) {
        const path = await liberarAcessoSeEstiverLogado(email);

        try {
            const dadosDoUsuario = await pegarDadosDeUmUsuario(email);
            const userLogin = $("#login-user");

            if (email && path) {
                userLogin.innerHTML = `
                    <a href="${path}">Entrar <img class="user-img" src="${coletarCaminhoDaFoto(dadosDoUsuario.caminhoFoto)}" 
                    alt="imagem do usuário ${dadosDoUsuario.nome}"></a>`;
            } else {
                userLogin.innerHTML = `
                    <a href="login.html">login <i class="fa-solid fa-circle-user"></i></a>`;
            }
        } catch (e) {
            console.error('Erro ao processar os dados do usuário:', e);
        }
    }
}

async function liberarAcessoSeEstiverLogado(email) {
    try {
        const response = await fetch(`php/usuarioPage.php?email-login=${email}`);

        
        if (response.ok) {
          
            return "php/usuarioPage.php";
            
        } else {
        
            console.error('Resposta não OK:', response.status);

        }
    } catch (error) {
        console.error('Erro ao processar a solicitação:', error);
  
    }
}

function sairDaConta () {

    localStorage.removeItem("usuario-logado");
    localStorage.removeItem("carrinho");
    window.location.href = "../index.html";

   

}

const btnLogout = $("#btn-logout")
btnLogout  ? btnLogout.addEventListener("click", sairDaConta): "";




function coletarCaminhoDaFoto(caminhoFoto) {
    const caminhoAbsoluto = caminhoFoto.replace(/^\.\.\//, "");
    return caminhoAbsoluto;
}

