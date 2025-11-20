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

- Não está permitindo deixar em branco a senha ao gerenciar funcionário
- Dados da manutenção não aparecem na visualização da solicitação e só aparece o mesmo funcionário para todas as etapas. Adicionar
no histórico caso haja redirecionamento, informando origem e destino.
- Botão de enviar solicitação tá ficando branco na hora de enviar
- Não sei porque, mas toda vez que edita algo nos dados de um funcionário, reduz um dia da data de aniversário
- Tela de cadastro não ta puxando os dados do endereço com o CEP
- Tela de finalizar solicitação não é necessária, apenas um botão de confirmar finalização, com data e hora e quem finalizou
- Ao iniciar a aplicação, deve aparecer apenas a tela home na navbar

## requisitos
- RF001 - Autocadastro:

- RF002 - Login: OK

- RF003 - Página Inicial de Cliente: ordenamento

- RF004 - Solicitação de Manutenção: OK

- RF005 - Mostrar orçamento: OK

- RF006 - Aprovar Serviço: OK

- RF007 - Rejeitar Serviço: OK

- RF008 - Visualizar Serviço: alguns ajustes

- RF009 - Resgatar Serviço: Deve ser armazenado no histórico da solicitação que ela passou de rejeitada para aprovada em determinada data/hora (RF008)

- RF010 - Pagar Serviço: OK

- RF011 - Página Inicial de Funcionário: OK

- RF012 - Efetuar Orçamento: OK

- RF013 - Visualização de Solicitações: OK

- RF014 - Efetuar Manutenção: OK

- RF015 - Redirecionar Manutenção: OK

- RF016 - Finalizar Solicitação: OK

- RF017 - CRUD de Categoria de Equipamento: OK

- RF018 - CRUD de Funcionários: alguns ajustes

- RF019 - Relatório de Receitas em PDF:

- RF020 - Relatório de Receitas por Categoria em PDF:

Requisitos mínimos:

- RF001
- RF002 OK
- RF003 OK
- RF004 OK
- RF005 OK
- RF006 OK
- RF011 OK
- RF012 OK
- RF017 OK 
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
