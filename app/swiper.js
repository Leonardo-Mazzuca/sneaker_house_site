
const swiperProdutosQueimaEstoque = new Swiper('.produtos__queima__estoque .swiper', {
  slidesPerView: 2,  
  spaceBetween: 10, 
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  autoplay: {
    delay: 7000,
  },


  breakpoints: {
    320 : {
      slidesPerView: 1,
      spaceBetween: 20
    },

    768 : {
      slidesPerView: 2,  
      spaceBetween: 20
    },
    1000 : {
      slidesPerView: 2,
      spaceBetween: 20
    }
  },

});

window.addEventListener('resize', () => {
  swiperProdutosQueimaEstoque.update();
});




const swiperTenisContainer = new Swiper('.tenis__container .swiper', {
  autoplay: {
    delay: 5000,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});




