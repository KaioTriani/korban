# Korban — site 3D pronto para Hostinger

Site demonstrativo da Personalizados Korban. Os arquivos publicados estão na **raiz deste repositório**, prontos para hospedagem estática: `index.html`, `style.css`, `app.js`, `models.js` e `assets/`.

**Não precisa instalar dependências, executar build ou manter Node.js na hospedagem.** O Node é opcional, somente para a prévia local e verificações.

## Implantar pela integração Git da Hostinger

1. No hPanel, abra o painel do site escolhido e procure **Avançado → Git**. É necessário um site de hospedagem compatível com arquivos HTML personalizados; o Website/AI Builder é outro produto.
2. Configure o repositório `https://github.com/KaioTriani/korban.git` e a branch **main**.
3. Para o domínio principal, implante em **public_html**. Na interface que oferece campo de caminho opcional, deixá-lo vazio corresponde a essa raiz. Se a interface mostrar o diretório explicitamente, use `public_html`.
4. Use uma pasta de destino vazia. Se já existir um site, faça backup antes de alterar seu conteúdo.
5. Conclua a criação do repositório no painel e execute **Deploy/Implantar**.
6. Abra o domínio com HTTPS. Ative o certificado e o redirecionamento HTTPS no hPanel, se ainda não estiverem ativos.

Se o repositório for privado, configure a chave de implantação de leitura conforme as instruções do hPanel. Nenhuma senha ou token precisa ser colocado no código.

Referência oficial: https://www.hostinger.com/br/support/1583302-como-implantar-fazer-o-deploy-de-um-repositorio-git-hostinger/

## Alternativa: enviar arquivos

Envie `index.html`, `style.css`, `app.js`, `models.js`, `robots.txt`, `.htaccess` e a pasta `assets/` para `public_html`. O arquivo `index.html` deve ficar diretamente dentro de `public_html`, sem uma subpasta `korban` intermediária.

Não é necessário enviar `.git/`, `docs/`, `scripts/`, `package.json`, `server.mjs` ou este README. A configuração `.htaccess` impede listagem de diretórios e acesso HTTP aos arquivos de desenvolvimento quando o repositório inteiro é implantado.

## Prévia local

Com Node.js 18 ou superior:

```sh
node server.mjs
```

Abra http://127.0.0.1:4174. Não abra o HTML diretamente com `file://`, pois o navegador precisa servir os módulos JavaScript por HTTP.

Verificações opcionais: `npm run check`. Empacotamento opcional: `npm run build` gera `dist/`, com apenas os arquivos públicos, para hospedagens que pedem uma pasta de saída. Não execute `npm install`: não há dependências a instalar.

## Experiência entregue

- Hero com vaso 3D, rotação, resposta ao ponteiro e animação de impressão em camadas, repetível pelo botão “Ver impressão”.
- Oito produtos conceituais com modelos próprios, busca, categorias e ordenação.
- Configurador de nome, cor, tamanho e material, com preço ilustrativo atualizado.
- Rotação e zoom da prévia por controles, além de arrasto horizontal.
- Sacola persistente neste navegador e checkout demonstrativo em três etapas.
- Processo interativo, história, FAQ e formulário de briefing com validação de arquivo.
- Links para Instagram e WhatsApp da marca; nenhuma mensagem é enviada automaticamente.
- Layout responsivo, fontes locais e suporte a movimento reduzido.

## Estado comercial

**Esta versão está pronta para hospedar e apresentar; não está habilitada para realizar vendas reais.** Produtos e preços são fictícios autorizados para a reunião. Pagamentos, cotação de frete, estoque, pedidos e envio de arquivos não estão conectados. A sacola fica no navegador e o formulário produz um resumo para download local.

A história usa apenas o relato recebido: o pastor Itamar começou a empreender na pandemia; a marca está em João Pessoa e envia para todo o Brasil. O logo tipográfico é uma proposta digital inspirada nas cores observadas, não o arquivo oficial da marca. Não há depoimentos, clientes ou números de vendas inventados.

O site está com `noindex` e `robots.txt` bloqueando indexação por conter ofertas ilustrativas. Remova essas restrições somente ao substituir o catálogo por dados reais e preparar a operação.

## Manutenção

Conteúdo da página: `index.html`. Produtos, preços e interações: `app.js`. Tokens e responsividade: `style.css`. Geometria e animações: `models.js`. Planejamento e validação: `docs/`.

Tecnologia: HTML, CSS, JavaScript modular e Three.js 0.170.0 incluído localmente, sob licença MIT. Fontes Bricolage Grotesque e Manrope, com licenças em `assets/`. Sem serviços externos necessários para renderizar o site.
