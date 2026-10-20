# Projeto Korban

## 1. Resumo estratégico

Consumidor final que quer presentear, decorar ou personalizar objetos cotidianos. A Korban se apresenta como uma oficina de ideias com origem em João Pessoa e alcance nacional, sem alegar liderança de mercado ou desempenho de produção não comprovado.

Metáfora: linhas de camada. O padrão nasce do processo de fabricação e acompanha a superfície dos objetos, divisores, marca gráfica e roteiro da página. A composição mantém sua identidade sem depender de animação. Três princípios: peça protagonista; personalização compreensível; oficina humana e precisa.

## 2. Design tokens

Os tokens executáveis estão em `style.css`.

| Papel | Valor |
| --- | --- |
| Primária e texto principal | #173b57 |
| Acento dourado | #b58b45 |
| Superfícies | #faf8f3 / #eeeae0 / #e1e8e6 |
| Texto secundário | #5e696e |
| Linhas | #d7d8cf |
| Sucesso / erro | #39614c / #a23d36 |
| Display | Bricolage Grotesque, local |
| Texto | Manrope, local |
| Dados técnicos | Consolas, fallback monospace |
| Easing | cubic-bezier(.22,1,.36,1) |
| Espaçamento | 4, 8, 12, 16, 24, 32, 48, 64, 88 px |
| Cantos | Retos em conteúdo; círculos em amostras e pequenos controles |
| Sombra | Reservada às janelas e ao indicador de demonstração |

Bricolage dá personalidade às formas arredondadas sem perder legibilidade. Manrope mantém a leitura de compra estável. O azul amarra a proposta ao logo observado; dourado atua como detalhe. O marfim remete a bancada e papel. O logo em texto e símbolo de camadas é uma proposta de evolução, sujeita a aprovação da marca.

## 3. Mapa e wireframes

O protótipo concentra a arquitetura em uma página com navegação por âncoras e janelas. Produto tem endereço `#produto/id`. Não há páginas indexáveis independentes.

Home: faixa regional → cabeçalho → hero dividido, texto à esquerda e peça 3D à direita → faixa tipográfica → coleção e filtros → personalização em composição assimétrica → processo de seis etapas → história em azul → dúvidas → briefing sob medida → rodapé.

Produto: prévia à esquerda / informações à direita → nome e descrição → preço → amostras de cor → tamanho/material → nome → confirmação → adicionar → CEP → ficha da peça. Mobile: prévia acima, controles em uma coluna.

Checkout: 1) revisar nome, cor, tamanho, quantidade e subtotal; 2) validar formato do CEP; 3) mostrar resumo e concluir simulação sem pagamento. Fluxo real deverá acrescentar endereço, contato, cotação e pagamento.

Corporativo, materiais, privacidade, termos e rastreio são janelas informativas. Portfólio de cases reais fica pendente de conteúdo da oficina; não há cases inventados.

## 4. Storyboard de motion

| Elemento | Implementação demonstrativa | Duração / comportamento |
| --- | --- | --- |
| Hero | Vaso 3D com rotação suave e resposta ao ponteiro | Loop leve, pausa por visibilidade; sem loop em reduced motion |
| Processo | Seis estados selecionáveis; desenho em camadas muda de posição | 700 ms, easing principal |
| Configurador | Re-render do nome e cor a partir da configuração | Input com 100 ms de debounce |
| Produto | Entrada de janela com fade e deslocamento | 300 ms |
| Miniaturas | Pequena ampliação e rotação no hover | 700 ms |
| Sacola | Entrada do drawer e atualização do total | 300 ms |
| Botões | Mudança de fundo e elevação de 2 px | 300 ms |

O hero também revela a peça de baixo para cima com clipping plane e um anel dourado no plano de impressão, em 900 ms. O botão “Ver impressão” repete a animação. Rotação automática, parallax de ponteiro e resposta sutil ao scroll completam o objeto. No produto, controles acessíveis giram e aproximam a prévia; um arrasto horizontal atualiza o ângulo ao soltar.

Não implementados nesta demonstração: storytelling pinado, transição shared-element e animação de objeto caindo na sacola. O fluxo usa estados explícitos para facilitar a apresentação e manter o mobile utilizável. Cursor nativo preservado.

## 5. Modelos

Oito geometrias conceituais: vaso Órbita, placa com nome, escultura Elo, luminária Afeto, chaveiro Essencial, suporte Pausa, organizador Trio e cachepô Casulo. Não representam desenhos de fabricação e não devem ser vendidos antes de validação.

Uma instância de renderer gera miniaturas WebP e as prévias, além da cena hero. DPR máximo de 1,5 na cena. No lançamento comercial, substituir por modelos da oficina, otimizar meshes e exportar GLB com Meshopt/Draco abaixo de 1,5 MB por arquivo; preparar imagens estáticas locais de fallback e evitar carregar WebGL em dispositivos fracos. Não há GPU tier detection nesta versão.

## 6. Copy

A copy completa está implementada em `index.html` e no catálogo em `app.js`, evitando duplicação divergente. Hero: “Feito em camadas. Pensado para você.” Apoio: “Um nome, uma cor, um jeito só seu.” Seção de coleção: “Qual é a sua próxima boa ideia?” Personalização: “Não é só um nome. É o seu.” História baseada apenas no relato recebido.

Produto exemplo: Seu nome, em 3D — “Na mesa, na estante ou na porta de entrada. Um nome ganha presença com uma base de linhas simples e a cor que você escolher.” Preço base demonstrativo R$ 59,90; grande +35%; PETG +20%, multiplicativos. Confirmação: “Conferi a cor, o tamanho e o texto da minha peça.”

## 7. Componentes e arquitetura

Equivalentes funcionais: Hero3D e ProductViewer em `models.js`; Configurator em `openProduct`, `updateConfig` e controles finais de `app.js`; CartDrawer em `renderCart`; PageTransition em animação de `dialog[open]` no CSS. São JavaScript modular e elementos HTML, não componentes React.

O protótipo é independente de plataforma de commerce. Para o planejamento da implantação, a opção proposta é Nuvemshop com tema customizado, priorizando operação simples para uma marca ainda montando sua estrutura. A adequação do configurador e integrações depende de prova técnica na plataforma e dos planos disponíveis na contratação; não se pressupõe API, preço ou suporte de um plano específico. Não há assinatura ou integração contratada neste projeto.

## 8. Performance, acessibilidade e SEO

Metas de homologação futura: Lighthouse mobile ≥85, LCP <2,5 s, CLS <0,1, interações fluidas em Android intermediário. Não são resultados medidos deste protótipo.

Acessibilidade aplicada: idioma pt-BR, estrutura de headings, labels, foco visível, botões nomeados, dialogs nativos com Escape e foco contido, status de formulário, controles de rotação por botão, suporte CSS a movimento reduzido. Revisar alvos de toque e contraste de todos os estados com auditoria automatizada antes do lançamento.

SEO desta demonstração: título, descrição, favicon e noindex. Não publicar Product/Offer fictícios em JSON-LD. Após confirmar domínio e catálogo real: rotas dedicadas, canonical, sitemap, Open Graph com fotos reais, Product/Offer, Organization e conteúdo regional. Analytics e pixels só após definir bases e preferências de privacidade.

## 9. Checklist visual

- [x] Paleta azul/marfim/dourado; sem gradiente roxo-azul ou blobs.
- [x] Tipografia escolhida, hospedada localmente.
- [x] Hero assimétrico com objeto protagonista.
- [x] Ritmo variado entre grade, bloco editorial, processo e formulário.
- [x] Modelos conceituais próprios; sem fotos de banco apresentadas como reais.
- [x] Nenhum depoimento, cliente, contador ou prêmio fictício.
- [x] Conteúdo demonstrativo sinalizado na vitrine e na compra.
- [x] História limitada aos fatos informados.
- [ ] Logo oficial em alta resolução e catálogo real: aguardam arquivos.
- [ ] Testes de fabricação, dados comerciais, integração e políticas: etapa operacional futura.

## Roteiro de apresentação

1. Abrir a home e mostrar a composição e o vaso interativo.
2. Filtrar presentes e abrir a placa de nome.
3. Escrever o nome do participante, mudar a cor e girar a prévia.
4. Mostrar a atualização de preço e a confirmação da personalização.
5. Adicionar à sacola e concluir a simulação de checkout.
6. Mostrar processo, história e briefing de encomenda.
7. Explicar que a implantação operacional conectará a vitrine aos dados e serviços reais.
