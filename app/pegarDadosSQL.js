export async function pegarDadosSQL() {

    try {

        const resposta = await fetch('./php/coletarDadosSQL.php');
        const conteudoResposta = await resposta.json();
        
        const dadosSimplificados = conteudoResposta.map(item => ({
            email: item.email,
            telefone: item.telefone,
            senha : item.senha,
            nome : item.nome,
            caminhoFoto : item.caminhoFoto
        }));

        return dadosSimplificados;

    } catch (erro) {
        console.error('Erro ao processar a solicitação:', erro);
        return null;
    }

}

export async function pegarDadosDeUmUsuario(email) {
    try {
        const response = await fetch('./php/coletarDadosSQL.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `email=${encodeURIComponent(email)}`,
        });

        const conteudoResposta = await response.json();

        return conteudoResposta;
        
    } catch (erro) {
        console.error('Erro ao processar a solicitação:', erro);
        return null;
    }
}

