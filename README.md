# Portfólio – Pedro Henrique Cabral Lyra

Site estático (HTML, CSS e JS puros), sem build. Abra `index.html` no navegador ou envie a pasta inteira para Netlify/qualquer hospedagem.

## Estrutura
```
index.html               Página inicial (usa /home)
home/                    home.css · home.js · home.i18n.js
projetos/                index.html · projetos.css · projetos.js · projetos.i18n.js
contato/                 index.html · contato.css · contato.js · contato.i18n.js
shared/css/              tokens (cores/fontes) · base · layout · components
shared/js/               i18n (PT/EN) · theme (claro/noturno) · ui (menu, animações) · main
shared/i18n/             textos comuns (menu, rodapé, link do WhatsApp)
assets/                  favicon e imagens (pedro.jpg, projects/ com os prints dos sites)
```

## Manutenção rápida
- Cores e fontes (claro e noturno): `shared/css/tokens.css`
- Textos PT/EN de cada página: `<pagina>/<pagina>.i18n.js`
- Número do WhatsApp: `shared/i18n/common.i18n.js` e `contato/` (botão copiar)
- Prints dos projetos: `assets/img/projects/` (qmassa-home.jpg, aquarela-home.jpg)
- Nova página: copie a pasta `contato/`, renomeie os arquivos e adicione o link no menu.
