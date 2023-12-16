
const selecaoGenero = document.querySelectorAll('[data-filtrar-genero]');

export function controlarSelecaoGenero() {
    selecaoGenero.forEach((s, index) => {
  
      if (index === 0) {
        s.classList.add('selected');
      }
  
      s.addEventListener('click', () => {
        const isSelected = s.classList.contains('selected');
  
        if (!isSelected) {
          s.classList.add('selected');
        }
  

        selecaoGenero.forEach((otherItem) => {
          if (otherItem !== s) {
            otherItem.classList.remove('selected');
          }
        });
      });
    });
  }