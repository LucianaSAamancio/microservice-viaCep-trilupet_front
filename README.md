# Front-End da API  microservice-viaCep-trilupet_api

Este é o Front do pequeno projeto é o MVP da Sprint: Arquitetura de Software (40530010062_20260_01) da pós-graduação Engenharia de Software da PUC-RJ.

O objetivo é apresentar um sistema composto por três módulos que se comunicam, seguindo o padrão REST. O componente externo é o serviço ViaCEP . A persistência de dados é feita utilizando o SQLite. Cada componente desenvolvido possui o seu próprio repositório e, na raiz do repositório, existe um Dockerfile com as instruções que possam garantir a sua execução utilizando containers.
 
---
### Arquitetura do MVP 
<img width="827" height="477" alt="Arquitetura do MCP - Cenário 1" src="ArquiteturaMCP-Cenario1.png" />
 
Interface (Front-End) do Agendamento de Consultas do Trilupet Service que consulta o CEP  utilizando o serviço externo [ViaCEP](https://viacep.com.br/) e que tem um módulo de cadastro  API (Back-End) para efetuar o cadastro de agendamento de consultas e salvar as informações do endereço adquirido pelo CEP no banco de dados [SQLite](https://www.sqlite.org/index.html).
 
---
### Instalação

1 - Seguir os passos da instalação do Back-end desse projeto que se encontra em: https://github.com/LucianaSAamancio/microservice-viaCep-trilupet_api

2 - Certifique-se de ter o Docker instalado e em execução em sua máquina.

Navegue até o diretório que contém o Dockerfile e o requirements.txt no terminal. Por exemplo,

```
cd microservice-viaCep-trilupet_front
```

Execute como administrador o seguinte comando para construir a imagem Docker, por exemplo:

```
docker build -t trilupet-front .
docker run -d -p 8080:80 --name container_front trilupet-front
```

> Para informações sobre o Docker, veja a [documentação do docker](https://docs.docker.com/engine/reference/run/).

---
### Acesso no browser da API 

Abra o [http://localhost:8080/](http://localhost:8080) no navegador para visualizar o Front-end do sistema.

---
