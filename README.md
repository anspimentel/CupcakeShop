# Cupcake Shop

Seja bem-vindo ao **Cupcake Shop**, está é uma aplicação que replica uma loja de cupcakes, onde é possivel se cadastrar, e fazer compras. A aplicação conta com uma vitrine de produtos, podendo ser selecionado a quantidade desejada e enviar ao seu carrinho, onde, após isso, você pode finalizar a sua compra com sucesso. Ao finalizar a compra, ela é salva em uma tabela de pedidos, onde é possível visualizar todos os produtos adquiridos. <br /> <br/>

A aplicação também conta com um painel administrativo, onde há uma dashboard simples onde você pode acompanhar a quantidade de produtos existentes na loja e também é o local onde você pode cadastrar, editar, deletar e visualizar seus produtos. <br /> <br />

A aplicação foi contruída de forma separada, contendo a parte do front-end e também do back-end. <br />
As linguagens utilizadas no projeto foram: <br /> <br />
• **Front-End**: *React e TypeScript.* <br />
• **Back-End**: *Laravel.* <br /> <br />

# Instruções para rodar o projeto
O projeto foi dividido em duas branches, a _main_ e a _develop_. A branch _main_ é onde está a aplicação que se encontra hospedada, contendo uma configuração com o **Firebase** que está sendo utilizado para armazenar as imagens. <br />
Já a branch _develop_ é onde se encontra aplicação pronta para ser rodada localmente, onde as imagens não são armazenadas no firebase, mas sim na própria _api_. <br /> <br />

**Rodando a API** <br />

**1. Clone o repositório (link abaixo)**:
```
git clone https://github.com/anspimentel/CupcakeShop.git
```

**2. Entre na pasta clonada e execute o seguinte comando:**
```
composer i
```

**3. Procure pelo arquivo .env.example**
```
Renomear ele para >>> .env
```

**4. Altere as configurações do banco de dados para a sua configuração**
```
DB_CONNECTION=sqlite
DB_HOST=
DB_PORT=
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=
```

**6. Logo em seguida, execute esses 3 comandos, nesta mesma ordem**
```
php artisan db:seed
php artisan migrate
php artisan key:generate
php artisan serve
```
<br /> <br />

**Rodando o projeto Web** <br />

**1. Entre na pasta clonada e execute o seguinte comando:**
```
npm i
```

**6. Logo em seguida, execute esse comando:**
```
npm run dev
```
<br /> <br />
Como foi mecionado, o projeto está hospedado! Tanto a API como a parte web foram hospedadas na vercel, já o banco de dados está hospedado no Railway. <br />
Link do site: https://cupcake-shop-lime.vercel.app <br /> <br />

**Obs: Para acessar o painel administrativo, é necessário entrar na rota /admin, mas apenas o usuário ADMIN poderá acessar. Com isso, o e-mail e a senha do admin são:** <br /> <br />
Email: admin@admin.com <br />
Senha: Confidencial
