# Sistema de Manutenção de Equipamentos

Esse projeto refere-se à matéria de Desenvolvimento Web II, da Universidade Federal do Paraná (UFPR),
ensinado pelo professor Dr. Razer A N R Montaño, no setor do SEPT.

Como avaliação, será feita a entrega, apresentação e defesa de um sistema de manutenção de equipamentos,  
baseado em solicitações de serviços com o histórico de alteração de estado sendo mantido mantido. 

# Autores:

#### Bruno Kussen
GRR: 20240622
email: kussenbruno@gmail.com

#### Bruno Pedron Rupaner
GRR: 20241976
email: brunopedron@ufpr.br

#### c
GRR
email:

#### d
GRR
email:

#### Pedro Novak Wosch
GRR: 20242441
email: pedrowosch@ufpr.br

# Softwares usados:

- angular 20.1.5

- node 22.18.0

- npm 10.9.3

- docker para rodar o compose e construir a imagem do contâiner do banco de dados

- SGBD PostgresSQL

# TODO LIST (REMOVER ANTES DA ENTREGA FINAL)

```
Se algo já estiver implementado, coloque um OK
Se estiver faltando alguma coisa, coloque em parênteses oque falta
Se não quiser que os outros toquem, coloque o seu nome
```
## requisitos
- RF001 - Autocadastro:

- RF002 - Login:

- RF003 - Página Inicial de Cliente: OK

- RF004 - Solicitação de Manutenção: (implementação com o local storage)

- RF005 - Mostrar orçamento: (implementação com o local storage)

- RF006 - Aprovar Serviço: (implementação com o local storage)

- RF007 - Rejeitar Serviço: (implementação com o local storage)

- RF008 - Visualizar Serviço: (implementação com o local storage)

- RF009 - Resgatar Serviço: (implementação com o local storage)

- RF010 - Pagar Serviço: OK

- RF011 - Página Inicial de Funcionário:

- RF012 - Efetuar Orçamento:

- RF013 - Visualização de Solicitações: OK Parcial (falta integração com RF016)

- RF014 - Efetuar Manutenção:

- RF015 - Redirecionar Manutenção: OK

- RF016 - Finalizar Solicitação:

- RF017 - CRUD de Categoria de Equipamento: OK

- RF018 - CRUD de Funcionários:

- RF019 - Relatório de Receitas em PDF:

- RF020 - Relatório de Receitas por Categoria em PDF:

Requisitos mínimos:

- RF001
- RF002
- RF003 OK
- RF004
- RF005
- RF006
- RF011
- RF012
- RF017
- RF018

## requisitos não funcionais

- Layout de telas deve ser bem elaborado;
- Deve ser usado DHTML (html/xhtml, css, dom e javascript);
- Deve-se usar as tecnologias vistas em aula: Angular, REST, Spring Boot. Bem como as boas práticas de programação: Padrões de Projeto, - - Repository, Serviços, etc;
- Usar um banco de dados RELACIONAL: PostgreSQL ou MySQL;
- Usar padrão standalone do Angular v17, para criação de componentes;
- Deve-se seguir boas práticas de programação e orientação a objetos: ocultamento de informações, baixo acoplamento, nomeação de atributos, classes e métodos, etc;
- Deve-se usar um framework para desenvolvimento das telas. Sugere-se o Bootstrap, Material ou Tailwind. Também deve-se usar um conjunto de bibliotecas Javascript para alterar o comportamento de telas, de forma dinâmica, quando necessário. Sugere-se o jQuery;
- Todos os campos devem possuir validação tanto no front-end (Angular) como no back-end (Spring);
- Todas as senhas devem ser criptografadas usando Hash SHA-256 + SALT (pesquisar o que é isso :-);
- Todas as tabelas no banco de dados (exceto a de endereço com cidade/estado) devem estar normalizadas (3FN) e devem seguir um padrão de codificação, inclusive as que não possuem cadastro e devem estar previamente preenchidas;
- O preenchimento do endereço do Cliente deve ser feito de forma automática consultando o CEP com a API Viacep (https://viacep.com.br/);
- No banco de dados deve ser armazenado o endereço completo, mas não há necessidade de normalizar Cidade e Estado;
- Queries no banco de dados devem favorecer o desempenho por meio de JOINS e boas práticas de consultas;
- No caso da entrega do protótipo, todas as funcionalidades devem ser implementadas  e todos os dados devem ser fictícios;
- Todas as datas e valores monetários devem ser entrados e mostrados no formato brasileiro;
- Todos os campos que tiverem formatação devem possuir máscara;
- Todas as datas poderão ser entradas através de calendários;
- Qualquer tipo de remoção deve ser confirmada antes de ocorrer;
- Remoções devem usar um mecanismo de desativação dos registros para evitar problemas de integridade referencial;
- O sistema será testado usando o navegador FIREFOX, versão mais recente.
