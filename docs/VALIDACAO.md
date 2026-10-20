# Verificação — 19 de outubro de 2026

- Servidor HTTP local respondeu 200.
- Sintaxe de app.js, models.js e server.mjs aprovada por `node --check`.
- Oito miniaturas 3D geradas como WebP no navegador, sem imagens quebradas no teste.
- Composição desktop inspecionada em viewport de 1440 × 1000.
- Viewport móvel de 390 × 844: largura do documento de 375 px, sem transbordamento horizontal.
- Configurador: placa de nome, Oliva, Grande e PETG, texto Matheus. Resultado esperado e observado: R$ 97,04 (59,90 × 1,35 × 1,20, arredondado).
- Configuração e subtotal preservados na sacola e na revisão do checkout.
- Não foram observados erros de console no teste móvel.
- Interface mantém avisos de catálogo/preços demonstrativos.

Limites: não foi executado Lighthouse nem medido desempenho em celular físico. Não há garantia de metas de Core Web Vitals. Renderização inicial ainda depende de WebGL para os modelos detalhados; fallback vetorial simplificado existe. Reduced motion interrompe animações, mas não elimina o render inicial. Frete, checkout, produção, materiais e catálogo são demonstrativos. Não há gateway, CMS, integração de entrega, envio de arquivos ou pedidos reais.
