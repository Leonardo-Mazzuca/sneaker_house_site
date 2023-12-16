import { pegarDadosSQL } from "../pegarDadosSQL";
import { $ } from "../utilidades";


function verificarCampoUsuario(formContainer) {

    const campoUser = formContainer.querySelector('#criar-username');
    const errorDiv = formContainer.querySelector('.error-user');

    campoUser.addEventListener('focusout', () => {

        if (campoUser.value === '') {

            errorDiv.textContent = 'O campo não pode estar vazio';
            errorDiv.classList.remove('invisible');
            campoUser.classList.add('border-danger')

        } else {
    
            errorDiv.classList.add('invisible');
            campoUser.classList.remove('border-danger')
        }

    });
}

export function verificarCampoDeEmail (formContainer) {

    const campoEmail = formContainer.querySelector('#criar-email');
    const errorDiv = formContainer.querySelector('.error-email');


    campoEmail.addEventListener('focusout' ,()=> {

        if (campoEmail.value === '') {
    
            errorDiv.textContent = 'O campo não pode estar vazio';
            errorDiv.classList.remove('invisible');
            campoEmail.classList.add('border-danger');
    
        } else {
    
            errorDiv.classList.add('invisible');
            campoEmail.classList.remove('border-danger');
        }

    });


}

function verificarCampoDeData(formContainer) {
    const campoData = formContainer.querySelector('#criar-data');
    const errorDiv = formContainer.querySelector('.error-data');
    campoData.setAttribute("text","");
    campoData.addEventListener('focus',function() {
        this.type='date';
    })

    campoData.addEventListener('focusout', function(){
        this.type='text';

        if (campoData.value === '') {
            errorDiv.textContent = 'O campo não pode estar vazio';
            errorDiv.classList.remove('invisible');
            campoData.classList.add('border-danger');

        } else {
          
            let dataInserida = new Date(campoData.value);
            let dataAtual = new Date();

            if (dataInserida > dataAtual) {
                errorDiv.textContent = 'A data não pode ser superior à data atual';
                errorDiv.classList.remove('invisible');
                campoData.classList.add('border-danger');

            } else {
                errorDiv.classList.add('invisible');
                campoData.classList.remove('border-danger');
            }
        }
    });

}

function verificarCampoDeTelefone(formContainer) {


    const campoTelefone = formContainer.querySelector('#criar-telefone');
    const errorDiv = formContainer.querySelector('.error-telefone');


    campoTelefone.addEventListener('focusout' ,()=> {

        if (campoTelefone.value === '') {
    
            errorDiv.textContent = 'O campo não pode estar vazio';
            errorDiv.classList.remove('invisible');
            campoTelefone.classList.add('border-danger');
    
        } else {
    
            errorDiv.classList.add('invisible');
            campoTelefone.classList.remove('border-danger');

        }

    });

}


export async function verificarSenha(formContainer, campoSenhaEl) {
    return new Promise((resolve) => {
        const campoSenha = formContainer.querySelector(campoSenhaEl);
        const errorDiv = formContainer.querySelector('.error-password');
        const iconVerificacao = formContainer.querySelector('#icone-verificacao');

        const mensagens = {
            comprimento: 'Comprimento insuficiente',
            numero: 'Falta número',
            minuscula: 'Falta letra minúscula',
            maiuscula: 'Falta letra maiúscula',
            especial: 'Falta caractere especial',
        };

        let requisitos = {};

        const validarRequisitosSenha = (senha) => {
            const comprimentoMinimo = 8;

            requisitos = {
                comprimento: senha.length >= comprimentoMinimo,
                numero: /[0-9]/.test(senha),
                minuscula: /[a-z]/.test(senha),
                maiuscula: /[A-Z]/.test(senha),
                especial: /[$*&@#]/.test(senha),
            };

            return Object.values(requisitos).every((requisito) => requisito);
        };

        const exibirMensagemErro = (mensagem) => {
            errorDiv.textContent = `Senha fraca: ${mensagem}`;
            errorDiv.classList.remove('invisible');
            campoSenha.classList.add('border-danger');
        };

        const exibirMensagemSucesso = () => {
            errorDiv.textContent = '';
            errorDiv.classList.add('invisible');
            campoSenha.classList.remove('border-danger');
        };

        const iconeCheck = () => {
            iconVerificacao.classList.remove('text-danger', 'fa-solid', 'fa-xmark');
            iconVerificacao.classList.add('text-success', 'fa-solid', 'fa-circle-check');
        };

        const iconeX = () => {
            iconVerificacao.classList.remove('text-success', 'fa-solid', 'fa-circle-check');
            iconVerificacao.classList.add('text-danger', 'fa-solid', 'fa-xmark');
        };

        const realizarValidacoes = () => {
            const senha = campoSenha.value;
            const erro = Object.keys(mensagens).find(
                (requisito) => !validarRequisitosSenha(senha) && !requisitos[requisito]
            );

            if (erro) {
                exibirMensagemErro(mensagens[erro]);
                iconeX();
                resolve(false);
            } else {
                exibirMensagemSucesso();
                iconeCheck();
                resolve(true);
            }
        };

        campoSenha.addEventListener('input', realizarValidacoes);

        campoSenha.addEventListener('focusout', function () {
            const senha = this.value;

            if (senha === '') {
                exibirMensagemErro('O campo não pode estar vazio');
                iconeX();
                resolve(false);
            } else {
                realizarValidacoes();
            }
        });

        formContainer.addEventListener('submit', (event) => {
            const senha = campoSenha.value;

            if (!validarRequisitosSenha(senha)) {
                event.preventDefault();
                exibirMensagemErro('A senha não atende aos requisitos mínimos.');
                resolve(false);
            }
        });
    });
}


async function verificarDadosJaExistente(formContainer) {

    if (formContainer) {
        formContainer.addEventListener('submit', async (e) => {
            e.preventDefault();

            const emailInput = $('#criar-email');
            const telefoneInput = $('#criar-telefone');
            const errorDivTelefone = formContainer.querySelector('.error-telefone');
            const errorDivEmail = formContainer.querySelector('.error-email');

            try {
               
  

                const dadosDoBanco = await pegarDadosSQL();

                
                const emailJaCadastrado = dadosDoBanco.some(item => item.email === emailInput.value);
                const telefoneJaCadastrado = dadosDoBanco.some(item => item.telefone === telefoneInput.value);

                
                if (emailJaCadastrado) {
                    errorDivEmail.textContent = "Email já está cadastrado!";
                    errorDivEmail.classList.remove('invisible');
                    emailInput.classList.add('border-danger');
                    return;

                } else {
    
                    errorDivEmail.classList.add('invisible');
                    emailInput.classList.remove('border-danger');
        
                }


                if (telefoneJaCadastrado) {

                    errorDivTelefone.textContent = "Telefone já está cadastrado!";
                    errorDivTelefone.classList.remove('invisible');
                    telefoneInput.classList.add('border-danger');
                    return;

                } else {
    
                    errorDivTelefone.classList.add('invisible');
                    telefoneInput.classList.remove('border-danger');
        
                }

               
                if (!emailJaCadastrado && !telefoneJaCadastrado) {
                    formContainer.submit();
                    formContainer.reset()
                }

            } catch (erro) {
                console.error('Erro ao verificar dados existentes:', erro);
            }
        });
    }
}

export function realizarVerificacoes (formContainer) {
    
    
    verificarCampoUsuario(formContainer);
    verificarCampoDeEmail(formContainer);
    verificarSenha(formContainer,"#criar-senha");
    verificarCampoDeData(formContainer);
    verificarCampoDeTelefone(formContainer);
    verificarDadosJaExistente(formContainer);

}

