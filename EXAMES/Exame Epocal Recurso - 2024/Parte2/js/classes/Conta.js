/**
 * @class Conta
 * @description Classe que representa uma conta de rede social
 * @param {string} nome - Nome do usuário
 * @param {number} idade - Idade do usuário
*/

export default class Conta {
  constructor(nome, idade) {
    this.nome = nome;
    this.idade = idade;
    this.seguidores = [];
    this.publicacoes = [];
  }

  // 1.a. Adicionar um seguidor à lista de seguidores
  adicionarSeguidor(seguidor) {
    this.seguidores.push(seguidor);
  }

  // 2.a. Obter a média de idades dos seguidores
  obterMediaIdades() {
    if (this.seguidores.length === 0) return 0;
    const totalIdade = this.seguidores.reduce(
      (acc, seguidor) => acc + seguidor.idade,
      0
    );
    return totalIdade / this.seguidores.length;
  }

  // 2.c. Remover um seguidor da lista de seguidores pelo ID
  removerSeguidor(idConta) {
    const index = this.seguidores.findIndex(
      (seguidor) => seguidor.id === idConta
    );

    if (index !== -1) {
      this.seguidores.splice(index, 1);
    }
  }

  // 2.d. Listar o número de seguidores angariados no último ano
  obterNumeroSeguidoresUltimoAno() {
    const umAnoAtras = new Date();
    umAnoAtras.setFullYear(umAnoAtras.getFullYear() - 1);
    return this.seguidores.filter(
      (seguidor) => seguidor.dataSeguidor > umAnoAtras
    ).length;
  }

  // 2.e. Adicionar uma publicação
  adicionarPublicacao(publicacao) {
    this.publicacoes.push(publicacao);
  }

  // 2.f. Obter o nome do seguidor com mais publicações
  obterNomeSeguidorMaisPublicacoes() {
    const contagemPublicacoes = {};

    // Contar publicações por autor
    for (const publicacao of this.publicacoes) {
      const nomeAutor = publicacao.autor.nome;
      if (!contagemPublicacoes[nomeAutor]) {
        contagemPublicacoes[nomeAutor] = 0;
      }
      contagemPublicacoes[nomeAutor]++;
    }

    // Encontrar o seguidor com mais publicações
    let seguidorMaisPublicacoes = "";
    let maxPublicacoes = 0;
    for (const [nome, contagem] of Object.entries(contagemPublicacoes)) {
      if (contagem > maxPublicacoes) {
        seguidorMaisPublicacoes = nome;
        maxPublicacoes = contagem;
      }
    }

    return seguidorMaisPublicacoes;
  }

  // 2.g. Listar o título de publicações de um determinado gênero
  listarPublicacoes(genero) {
    return this.publicacoes
      .filter((publicacao) => publicacao.genero === genero)
      .map((publicacao) => publicacao.titulo);
  }

  // 2.h. Curtir uma publicação
  gostarPublicacao(titulo) {
    const publicacao = this.publicacoes.find((pub) => pub.titulo === titulo);
    if (publicacao) {
      publicacao.gostos++;
    }
  }

  // 2.i. Obter a publicação mais curtida
  obterPublicacaoMaisGostada() {
    return this.publicacoes.reduce(
      (max, pub) => (pub.gostos > max.gostos ? pub : max),
      { gostos: -1 }
    );
  }

  // 2.j. Obter o gênero de publicações mais curtido
  obterGeneroMaisGostado() {
    const generoContagem = {};

    // Contar gostos por gênero
    for (const publicacao of this.publicacoes) {
      const genero = publicacao.genero;
      if (!generoContagem[genero]) {
        generoContagem[genero] = 0;
      }
      generoContagem[genero] += publicacao.gostos;
    }

    // Encontrar o gênero mais curtido
    let generoMaisGostado = "";
    let maxGostos = 0;
    for (const [genero, gostos] of Object.entries(generoContagem)) {
      if (gostos > maxGostos) {
        generoMaisGostado = genero;
        maxGostos = gostos;
      }
    }

    return generoMaisGostado;
  }
}
