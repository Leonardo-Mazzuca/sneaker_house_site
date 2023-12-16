import { $, coletarEmail } from "../utilidades";

const userEmail = coletarEmail();

async function alterarFoto () {

    const fileInput = this;
    const img = $(".user-img");
    

    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();

        reader.onload = async function (e) {
            
            img.src = e.target.result;
            await salvarFotoDoUsuario(fileInput.files[0]);

        };

        reader.readAsDataURL(fileInput.files[0]);
    }

}



async function salvarFotoDoUsuario(arquivoFoto) {


    const formData = new FormData();
    formData.append("foto", arquivoFoto);
    formData.append("email", userEmail);

    try {
        const response = await fetch("../php/salvarFoto.php", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();


        if (data.success) {

            return data;
           
        } else {
            console.error("Falha ao salvar a foto do usuário:", data.message);
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
    }
}


async function deletarFoto () {

    
    const img = document.querySelectorAll(".user-img");
    img.forEach(i => {
        i.src = "../assets/user-default.png";
        $('#upload').value = '';
    });





    try {
        const formData = new FormData();
        formData.append("email", userEmail);

        const response = await fetch("../php/excluirFoto.php", {
            method: "POST",
            body: formData
            
        });
    
        const data = await response.json();
    
        if (data.success) {
            console.log(data);
        } else {
            console.error("Falha ao excluir a foto do usuário:", data.message);
        }

    } catch (e) {

        console.error("Erro na requisição:", e);

    }


}

$("#upload").addEventListener("change", alterarFoto);
$("#excluir-foto").addEventListener("click", deletarFoto);

const form = $("#form-photo");
form.addEventListener("submit", function(e){
    e.preventDefault();

});

