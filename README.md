

# 💰 PayPal Payment

Demonstração de gateway de pagamento utilizando a API REST do PayPal

## ⚒️ Ferramentas utilizadas 
  
  - Node.js
  - Express
  - PayPal API REST

## 👨‍💻 Executando localmente 

Assegure-se de ter [Node.js](http://nodejs.org/) instalado

- 1º Clone o projeto:

```shell script
$ git https://github.com/brduarte/paypal-payment.git # ou clone seu próprio fork
```

- 2º Você precisa ativar uma conta **sendbox** em [**PayPal Developer**](https://developer.paypal.com/)
- 3º No diretório ```js script/src/config/```  mude o arquivo ```AcessServices.exemplo.js``` para ```AcessServices.js```

Ex: ```AcessServices.js```
```js script
    payPal: {
           urlPayPal: 'https://api.sandbox.paypal.com',
           username: 'CLIENT_ID',
           password: 'SECRET'
       }
```

- 4º depois é só executar o projeto

```shell script
$ npm install
$ npm start
```

Seu aplicativo agora deve estar sendo executado em [localhost:3000](http://localhost:3000/).

Você pode fazer um teste rápido em: [https://paypal-payment.herokuapp.com/](https://paypal-payment.herokuapp.com/)

## Rodando com container Docker

[Docker Container](https://github.com/PrenticeRoosevelt/Docker_Paypal)  
<p align="center">
  <img width="10%" src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fvertigo.com.br%2Fagile-logo-docker%2F&psig=AOvVaw0oPLCL4ZO0LhFLHlzKTjvb&ust=1594700543430000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMDwyMywyeoCFQAAAAAdAAAAABAI">
</p>

## 📝 Documentações 

Para obter mais informações das ferramentas utilizadas:

- [Node.js](https://nodejs.org/en/docs/)
- [Express](https://expressjs.com/pt-br/)
- [PayPal API REST](https://developer.paypal.com/docs/api/overview/)

## Autor

| [<img width="125px" src="https://avatars2.githubusercontent.com/u/29002558?v=4"><br><sub>@brduarte</sub>](https://github.com/brduarte)|
| :---: |

---
 <p align="center">
  <img width="50%" src="https://github.com/brduarte/paypal-payment/blob/master/public/images/1280px-PayPal.svg.png?raw=true">
</p>
