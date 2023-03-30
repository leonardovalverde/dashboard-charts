# Dashboards-charts

## Disclaimer

Para produção do teste eu resolvi não usar os nomes da empresa, para manter a discrição do teste e evitar que outras pessoas pesquisem por ele na internet. Para logar no app você deve usar um dos e-mails providos pela fake-api, bastar [clicar aqui](https://my-json-server.typicode.com/tractian/fake-api/users).

O Link do app é este [aqui](https://dashboard-charts-52a34.web.app/)

## Descrição

O teste foi feito conforme instruído, utilizando inclusive o antd (apesar de não ter experiência com o mesmo já utilizei várias bibliotecas de UI ao longo da minha caminhada). As requisições (POST e PATCH) não surtem efeitos no front apesar de serem realizadas, como fiz uso da fake-api as requests não refletem no front e decidi não guardar estas mudanças em um estado para gerar uma falsa sensação de propagação pois seria uma "gambiarra". 

## Scripts

Sugiro que utilizem o `yarn` como gerenciador de pacotes.

`yarn start` -> inicia o projeto em ambiente de desenvolvimento.

`yarn build` -> Gera um bundle de produção da aplicação.

`yarn test` -> Roda os testes da aplicação **como não foi especificado no desafio eu não realizei testes, porém possuo experiência com os mesmos**

`yarn eslint` -> Faz com que o eslint procure incosistências no código da aplicação

## Configurações e decisões técnicas

Para auxiliar no projeto eu fiz a configuração do `eslint`, o deploy foi feito no `firebase` de forma automática com funcionalidades de entegra e continuação continua. Para isto fiz uso do `CircleCI`, a decisão pelo `firebase` e o `CircleCI` foi pelo fato de terem ótimos planos gratuitos que não pedem cartão de crédito, antes de cada deploy o `CircleCI` roda o `eslint` para ter certeza que nada que quebraria o código suba.

Para o compartilhamento de estados eu optei pelo `redux`, pois juntamente com ele eu poderia instalar o `redux-toolkit` e o `rtk-query`. O primeiro pacote traz uma série de hooks e funções que faciltam muito a configuração e utilização do `redux`, o segundo pacote traz hooks que lidam com todas as chamadas a api, já trazendo tratamentos de erros e de loading e também guardando os resultados em cache. Isso ajuda a realizar menos requisições ao servidor e ter uma aplicação mais fluída, diminuindo custos e melhorando a experiência do usuário. Outra extensão intalada foi o `redux-persist`, ele faz a reidratação do redux pegando os valores em cache e reeinserindo no estado compartilhado da aplicação, ele evita a necessidade de fazer isso acessando o localStorage manualmente e já é bem otimizado com o redux, assim podemos atualizar a página sem perder estes valores.

Para customizar os estilos do `antd` e fazer ajustes finos, optei pelo `styled-components`, é uma biblioteca poderosa que junta o `javascript` aos seletores e funcionalidades do `SCSS`.

A aplicação foi configurada para ser responsiva, ou seja, ela vai se adaptar a tela do dispositivo usado para acessá-la. Para me certificar eu testei a mesma em meu celular enquanto rodando localmente.

[meu LinkedIn](https://www.linkedin.com/in/leonardo-valverde-509274ab/)
