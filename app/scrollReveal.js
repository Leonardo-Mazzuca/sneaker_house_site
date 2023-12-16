

ScrollReveal({
  reset: false,
  distance: '80px',
  duration: 2000,
  delay: 200
});

export function loginScrollReveal() {



    ScrollReveal().reveal('.from__wrapper', {origin: 'top' ,duration: 800});
    
    ScrollReveal().reveal('#username-input-gp .form-label', {   origin: 'bottom' ,duration: 1000});
    ScrollReveal().reveal('#username-input-gp', { origin: 'bottom',duration: 1200 });
  
    ScrollReveal().reveal('#password-input-gp .form-label', {  origin: 'bottom',duration: 1400 });
    ScrollReveal().reveal('#password-input-gp', { origin: 'bottom' ,duration: 1600});
  
    ScrollReveal().reveal('.esqueceu__senha__btn', { origin: 'bottom' ,duration: 1800});
    ScrollReveal().reveal('#login-enviar', { origin: 'bottom' ,duration: 2000});

    ScrollReveal().reveal('.svg-inner', { origin: 'bottom' ,duration: 2200});

    ScrollReveal().reveal('.fazer__login__diferente p', { origin: 'left' ,duration: 2250});
    ScrollReveal().reveal('.fazer__login__diferente .a-google', { origin: 'left' ,duration: 2300});
    ScrollReveal().reveal('.fazer__login__diferente .a-facebook', { origin: 'left' ,duration: 2350});

    setTimeout(()=>{
        ScrollReveal().reveal('.fazer__login__diferente .a-google .google', { origin: 'left' ,duration: 2450});
        ScrollReveal().reveal('.fazer__login__diferente .a-facebook .facebook', { origin: 'left' ,duration: 2500});
    },1000)




}

function bgLoginIMGScrollReveal(){

    ScrollReveal().reveal('.bg__img__container', {origin: 'bottom' ,duration: 800});
  
    

}
bgLoginIMGScrollReveal();

export function registerScrollReveal() {

    ScrollReveal().reveal('#create-user-input-gp .form-label', {  origin: 'top' ,duration: 1000});
    ScrollReveal().reveal('#create-user-input-gp', {  origin: 'top' ,duration: 1100});

    ScrollReveal().reveal('#create-email-input-gp .form-label', {  origin: 'top' ,duration: 1200});
    ScrollReveal().reveal('#create-email-input-gp', {  origin: 'top' ,duration: 1300});

    ScrollReveal().reveal('#create-data-input-gp .form-label', {  origin: 'top' ,duration: 1400});
    ScrollReveal().reveal('#create-data-input-gp', {  origin: 'top' ,duration: 1500});

    ScrollReveal().reveal('#create-pass-input-gp .form-label', {  origin: 'top' ,duration: 1600});
    ScrollReveal().reveal('#create-pass-input-gp', {  origin: 'top' ,duration: 1700}); 

    ScrollReveal().reveal('#create-telefone-input-gp .form-label', {  origin: 'top' ,duration: 1800});
    ScrollReveal().reveal('#create-telefone-input-gp', {  origin: 'top' ,duration: 1900}); 

    ScrollReveal().reveal('#criar-conta-btn', {  origin: 'top' ,duration: 2000}); 
    
    
    ScrollReveal().reveal('.svg-inner', { origin: 'top' ,duration: 2200});

    

}




export function destroyScrollReveal () {
    ScrollReveal().destroy();
}



  





