



async function pegarProdutos () {

    const produtos = await fetch ('http://localhost:4001/produtos');
    const produtosConvertidos = await produtos.json();
    return produtosConvertidos;

}


export const produtosAPI = {pegarProdutos};