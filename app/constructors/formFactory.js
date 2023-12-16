export function construirFormulario(formType, formAttributes, formInputs, formButtons,formBtnPass) {
    const form = document.createElement("form");
    form.action = formAttributes.action || "";
    form.method = formAttributes.method || "POST";
    form.id = formAttributes.id || "";

    const formContainer = document.createElement("div");
    formContainer.classList.add(`${formType}__container`, "form__element");


    formInputs.forEach((inputConfig) => {
        const inputContainer = document.createElement("div");
        inputContainer.classList.add("input-container", "mb-3");
        inputContainer.id = `${inputConfig.id}-input-gp`; 

        const label = document.createElement("label");
        label.classList.add("form-label");
        label.innerHTML = `<p class = "text-label-${inputConfig.id}">${inputConfig.icon}
        <span class ="l-text-${inputConfig.id}">
         ${inputConfig.label}</span> ${inputConfig.iconCheck ? inputConfig.iconCheck : ""}</p> `;
        label.setAttribute("for", inputConfig.inputId);

        const input = document.createElement("input");
        input.type = inputConfig.type || "text";
        input.name = inputConfig.name || "";
        input.id = inputConfig.inputId || "";
        input.classList.add("form-control");
        input.setAttribute("aria-label", inputConfig.label);
        input.setAttribute('required', '');
        input.setAttribute('minlenght', inputConfig.minlenght ? inputConfig.minlenght : "");
        input.autocomplete = inputConfig.autocomplete || "";
        

        const divError = document.createElement('div');
        divError.classList.add(`error-${inputConfig.error}`,'text-danger')

        inputContainer.appendChild(label);
        inputContainer.appendChild(input);
        if(divError){
            inputContainer.appendChild(divError);
        }

        formContainer.appendChild(inputContainer);
    });


    const btnContainer = document.createElement("div");
    btnContainer.classList.add("btn__container");

    if(formBtnPass && formType === "login"){

        const esqueceuSenhaLink = document.createElement("a");
        esqueceuSenhaLink.classList.add("esqueceu__senha__btn");
        esqueceuSenhaLink.href = "esqueceuSenha.html";
        esqueceuSenhaLink.textContent = "Esqueci minha Senha";
    
        btnContainer.appendChild(esqueceuSenhaLink);
    }

    formButtons.forEach((buttonConfig) => {
        const button = document.createElement("button");
        button.id = buttonConfig.id || "";
        button.innerHTML = `${buttonConfig.label} ${buttonConfig.icon || ""}`;
        button.addEventListener("click", buttonConfig.onClick);

        btnContainer.appendChild(button);
    });



  


    form.appendChild(formContainer);
    form.appendChild(btnContainer);

    return form;
}