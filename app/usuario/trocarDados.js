import { $, coletarEmail } from "../utilidades";



function trocarEmailDoUsuario () {

    const emailInput = $("#user-email");
    const chageEmailButton = $("#change-email-btn");
    let emailOriginal;


    const showModal = () => {
        const myModal = new bootstrap.Modal(document.getElementById('confirmationModal'));
        myModal.show();
    };


    const reiniciarTarefa = (botao) => {
        emailInput.value = emailOriginal; 
        emailInput.setAttribute("readonly", true);
        emailInput.classList.toggle("disabled");
        botao.textContent = "Trocar email";
    }

    chageEmailButton.addEventListener("click", function() {
        
        if (emailInput.classList.contains("disabled")) {
        
            emailInput.classList.toggle("disabled");
            emailInput.removeAttribute("readonly");
            emailOriginal = emailInput.value; 
            this.textContent = "cancelar";
      
        } 
        else {

          reiniciarTarefa(chageEmailButton);

        }
    });





       emailInput.addEventListener("focusout", function() {
           if (this.value === emailOriginal) {
               reiniciarTarefa(chageEmailButton);
               return;
   
           } else {
   
               const emailNovo = this.value;
   
               showModal();
               $("#confirmar-btn").addEventListener("click",async function(){
   
              
                   const url = "../php/alterarDados.php";
                   const errorEmailElement = $(".error-email");
           
                   try {
       
                       const formData = new FormData();
                       formData.append('email-original', emailOriginal);
                       formData.append('email-novo', emailNovo);
               
                       const response = await fetch(url, {
                           method: 'POST',
                           body: formData,
                       });
           
                       const data = await response.json();
       
                       if (data.success && data.updateSuccess) {
                         
                           window.location.href = "../login.html";
       
                       } else {
                           
          
                           errorEmailElement.textContent = data.message;
       
                       }
       
                       } catch (error) {
                       
                       
                       errorEmailElement.textContent = `Erro na transferencia de dados: ${error}`;
   
                   }
   
   
               });
   
               $("#cancelar-btn").addEventListener("click", function(){
   
                   reiniciarTarefa(chageEmailButton);
   
               });
   
   
         
           }
       });
   
    

}






async function trocarNomeDoUsuario() {
    const userNameInput = $("#user-name");
    let nomeOriginal;
    const email = coletarEmail();
    


    userNameInput.addEventListener("click", function () {
        this.removeAttribute("readonly");
        nomeOriginal = this.value;
    });

    $("#user__datas").addEventListener("submit", async function (e) {
        e.preventDefault();
        if (userNameInput.value === nomeOriginal) {
            userNameInput.setAttribute("readonly", true);
            return;
        } else {

            const novoNome = userNameInput.value;
            const url = "../php/alterarDados.php";
            const errorNomeElement = $(".error-name");

            try {
                const formData = new FormData();
                formData.append('novo-nome', novoNome);
                formData.append('email', email);

                const response = await fetch(url, {
                    method: 'POST',
                    body: formData,
                });

                const data = await response.json();

                if (data.success && data.updateSuccess) {
                    userNameInput.setAttribute("readonly", true);

                    
                } else {
                    errorNomeElement.textContent = data.message;
                }

            } catch (error) {
                errorNomeElement.textContent = `Erro na transferência de dados: ${error}`;
            }
        }
    });
}

function trocarNumeroDeTelefone() {
    const userTelInput = $("#user-tel");
    let telefoneOriginal;
    
    userTelInput.addEventListener("click", function () {
        this.removeAttribute("readonly");
        telefoneOriginal = this.value;
    });

    $("#user__datas").addEventListener("submit", async function (e) {
        e.preventDefault();

        if (userTelInput.value === telefoneOriginal) {
            userTelInput.setAttribute("readonly", true);
            return;
        } else {
            const novoTelefone = userTelInput.value;
            const url = "../php/alterarDados.php";
            const errorTelElement = $(".error-tel");

            try {
                const formData = new FormData();
                formData.append('novo-telefone', novoTelefone);
                formData.append('telefone-original', telefoneOriginal);

                const response = await fetch(url, {
                    method: 'POST',
                    body: formData,
                });

                const data = await response.json();

                if (data.success && data.updateSuccess) {
                    userTelInput.setAttribute("readonly", true);
                    return data.success && data.updateSuccess;
                } else {
                    errorTelElement.textContent = data.message;
                }

            } catch (error) {
                errorTelElement.textContent = `Erro na transferência de dados: ${error}`;
            }
        }
    });
}



trocarEmailDoUsuario();
trocarNomeDoUsuario();
trocarNumeroDeTelefone();



