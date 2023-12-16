


export function construirTabela () {
    return `
    <h2>
    Seu carrinho
  </h2>

  <article class="dados__produto row ">
    
    <div class="produtos__adicionados col-lg-8">

      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">produto</th>
            <th scope="col">preco</th>
            <th scope="col">quantidade</th>
            <th scope="col">total</th>
          </tr>
        </thead>

        <tbody class="tabela__produtos">

         

        </tbody>
      
      </table>


    </div>

    <div class="detalhes__pedido col-lg-4">
        <div class="dados__pedido__final">

            <h2>
              Detalhes do pedido
            </h2>
          <hr>

          <div class="dados__preco">
            <p >
              Subtotal <span id="subtotal">0</span>
            </p>
            <p>
              Frete <span id="frete">Grátis</span>
            </p>
            <a href="#" id="cumpom-desconto">
              Adicionar cupom de desconto <i class="ps-2 fa-solid fa-arrow-right-long"></i>
            </a>

 
     
          </div>

          
          <div class="dados__total">
            
            <h5 id="total-carrinho">
              Total: $0
            </h5>
          </div>

   

        </div>

        <div class = "finalizar__btn__container">
            <a href = "${localStorage.getItem("produtos-comprados") ? 'checkout-confirmar.html' : 'checkout.html'}" class="btn text-light finalizar__btn">
            CHEKCOUT <i class="fa-solid fa-arrow-right-long"></i>
            </a>
        </div>

    </div> 




  </article> 
    

    `;
}
