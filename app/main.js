
import { atualizarNovidades } from "./creator/atualizarNovidades.js";
import { atualizarQuantidadeTotal, inicializarCarrinho } from "./carrinho/carrinho.js";
import { criarCardsInstagram } from "./creator/criarCardsInstagram.js";
import { criarCardsPromocao } from "./creator/criarCardsPromocao.js";
import { criarProdutosNoTenisContainer } from "./creator/criarProdutosNoTenisContainer.js";
import { renderizarProdutos } from "./creator/criarSecaoTenis.js";
import { filtrarProdutos } from "./controller/filtrarProdutos.js";
import { controlarSelecaoGenero } from "./controller/selecaoGenero.js";
import { controlarAcessoDoUsuario } from "./usuario/controlarUsuario.js";



criarProdutosNoTenisContainer();

renderizarProdutos();

atualizarQuantidadeTotal();

inicializarCarrinho();

filtrarProdutos();

controlarSelecaoGenero();

criarCardsPromocao();

criarCardsInstagram();

atualizarNovidades();

controlarAcessoDoUsuario();



