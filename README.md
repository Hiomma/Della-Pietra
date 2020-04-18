# Amigo Concurseiro

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.

## Documentação

Primeiramente para criar uma nova página basta gerar com o Angular CLI. 

Para fazer essa página entrar na estrutura do projeto é necessário a criação de um service que herde de Inheritance Service.
Esse service basicamente gera o ReactiveForms daquela tela e também seta valores padrões/desabilitados.

Após a criação do Service é necessário colocar a herança no .components.ts da sua página para o InheritanceComponent (Caso for CRUD) e InheritanceAction (caso for uma ação).
Essa herança tem o objetivo de automatizar o carregamento do ReactiveForms em cada Input da tela e preence-los com os dados de acordo com a opção escolhida (Create, Update, Delete).

O HTML dessa nova página também é padronizado com alguns itens como Footer e o componente de Janela que já atribuem a formatação da página e a inserção dos dados.

## Principais Diretórios

Inheritance
/misc/inheritance

Componentes
/components

Serviços
/services

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
