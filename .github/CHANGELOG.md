# 📜 Changelog

Todas as mudanças importantes deste projeto serão documentadas aqui.

O formato segue o padrão [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/)  
e a versão do projeto é gerenciada com [Semantic Versioning](https://semver.org/lang/pt-BR/).

---
## [v1.0.0] - 2025-02-20 (upcoming)
### Added
- Botão para voltar a data atual | https://github.com/jpmoncao/biblify/pull/15
### Changed
- Correção e melhorias do editor de devocional | https://github.com/jpmoncao/biblify/pull/15
- Correção e melhorias do calendário de devocional | https://github.com/jpmoncao/biblify/pull/15
### Fixed
- Fix: Textos em negrito não aparecem nos temas _dark_ | https://github.com/jpmoncao/biblify/pull/15
### Removed
- Função de alterar cor do texto no editor de devocional | https://github.com/jpmoncao/biblify/pull/15
  - Seria necessário implementar uma lógica que salvasse as cores como um código e realizar uma conversão para hexadecimal quando viesse do banco. Por isso, a função foi temporariamente removida.
---

##  2025-02-20
### Changed
- Bloqueando rotas e ações não autorizadas | https://github.com/jpmoncao/biblify/pull/11
### Fixed
- Fix: Erro de duplicidade ao salvar anotações | https://github.com/jpmoncao/biblify/pull/12
- Fix: Upsert do MongoDB passando apenas o `content` | https://github.com/jpmoncao/biblify/pull/13

---

##  2025-01-24
### Added
- Cadastro e login de usuários | https://github.com/jpmoncao/biblify/pull/9
- Salvar anotações e marcações | https://github.com/jpmoncao/biblify/pull/10
  
---

##  2025-01-09
### Primeira Versão
- Lançamento inicial do projeto.
