1. Visão Geral do Projeto

    Este projeto é um Jogo da Velha (Tic Tac Toe) desenvolvido em React (JavaScript), com foco em boas práticas
de organização de código, composição, arquitetura orientada a domínio e controle de estado. Ele simula partidas
entre dois jogadores (X e O) com controle de tempo por turno, painel de pontuação, personalização visual e
lógica de vitória integrada.

2. Estrutura de Pastas
    src/
    components/ – Componentes de UI (Board, Square, Scoreboard, FloatingMenu)
    hooks/ – Hooks personalizados (useTicTacToe, useTurnTimer, useTheme)
    lib/ – Regras puras do jogo (checkWinner, isDraw, autoMove)
    tests/ – Testes unitários
    App.jsx – Composição principal da aplicação
    index.css – Estilos globais com CSS Variables
    main.jsx – Entrada da aplicação (bootstrap)
    README.md – Documentação do projeto


3. Decisões técnicas & Arquitetura

    Utilização de hooks personalizados para encapsular a lógica de domínio (useTicTacToe), temporizador
    (useTurnTimer) e tema (useTheme). 
    Isso promove separação de responsabilidades e testabilidade.

    Aplicação de princípios como Inversão de Dependência, Composição sobre Herança e SRP (Single
    Responsibility Principle). 
    Componentes visuais desacoplados da regra de negócio, com contratos simples via
    props e callbacks. 

    Regras puras separadas em src/lib/, o que permite evolução sem impacto na UI (ex: trocar
    autoMove por Minimax). 

    Timer reativo e determinístico, isolado da lógica do jogo.
    Tipagem via JSDoc (@typedef, @param, @returns) para suporte a autocomplete e verificação estática leve.

Acessibilidade
    role="grid" no tabuleiro.
    aria-label descritivo por célula.
    aria-live no temporizador.

Foco visível com :focus-visible.

Testes
    Implementei testes unitários para validar os componentes críticos da aplicação, cobrindo três camadas principais:

    Hook de Timer (useTurnTimer)

    Controle de countdown por turno com fake timers
    Comportamento assíncrono e cleanup de recursos
    Reset automático baseado em mudanças de dependências
    Execução de callback quando tempo expira

    Lógica do Jogo (useTicTacToe via App)

    Alternância correta entre jogadores X e O
    Bloqueio de jogadas em casas ocupadas ou após fim de partida
    Reset de tabuleiro via botão "Próxima partida"
    Estados visuais (indicador de turno, mensagens de vitória)

    Regras Puras (gameUtils)

    Detecção de vitória em linhas, colunas e diagonais
    Identificação de empate quando tabuleiro completo
    Algoritmo de jogada automática priorizando centro

    Embora não fosse requisito do desafio, considerei importante demonstrar práticas de qualidade e prevenção de bugs que poderiam ocorrer em cenários como navegação durante timer ativo ou tentativas de jogada em estados inválidos.

Gerenciamento de Estado
    Optei por utilizar sessionStorage para persistir o placar entre partidas, seguindo as restrições do desafio que não permitiam bibliotecas externas.

    Por que sessionStorage:

    Simplicidade: Solução nativa do browser, sem dependências adicionais
    Escopo adequado: Dados persistem apenas durante a sessão, sendo limpos ao fechar o navegador
    Performance: Acesso síncrono e rápido aos dados do placar
    Compatibilidade: Suporte universal em navegadores modernos

Resumo 
    Arquitetura com regras fora da UI, hooks com API clara e composição no App.
    Inversão de dependências: UI e serviços se comunicam por contratos mínimos.
    Código testável, extensível e pronto para escalar.

4. Instruções para Build e Execução

    Clone o repositório: git clone https://github.com/jpmuniz/desafio-deal.git
    Instale as dependências: npm install
    Execute a aplicação em modo desenvolvimento: npm run dev 
    Execute os testes: npm run test 
    Build para produção: npm run build A aplicação será servida em http://localhost:5173 (por padrão).

5. Link netlify: https://desafio-deal.netlify.app/