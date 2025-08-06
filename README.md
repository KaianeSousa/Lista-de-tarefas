# 📋 Lista de Tarefas - To-Do List

Uma aplicação moderna de gerenciamento de tarefas desenvolvida com **Angular 19** e **TypeScript**, oferecendo uma experiência completa de organização de atividades com interface Kanban.

## 🎯 Justificativa da Linguagem/Framework

### **Por que Angular + TypeScript?**

**Angular foi escolhido pelos seguintes motivos:**

- ✅ **Arquitetura Robusta:** Framework completo com estrutura bem definida
- ✅ **TypeScript Nativo:** Tipagem estática que previne erros em tempo de desenvolvimento
- ✅ **Componentes Reutilizáveis:** Arquitetura modular e escalável
- ✅ **Dependency Injection:** Gerenciamento eficiente de dependências
- ✅ **Observables:** Sistema reativo para atualizações em tempo real
- ✅ **CLI Poderoso:** Ferramentas de desenvolvimento integradas
- ✅ **Documentação Excelente:** Comunidade ativa e recursos abundantes

**TypeScript oferece:**

- 🛡️ **Segurança de Tipos:** Detecção de erros em tempo de compilação
- 📝 **IntelliSense:** Autocompletar e sugestões inteligentes
- 🔧 **Refatoração Segura:** Mudanças de código com confiança
- 🏗️ **Código Mais Limpo:** Interfaces e tipos bem definidos

## ✨ Funcionalidades Implementadas

### **Funcionalidades Obrigatórias:**

- ✅ **Adicionar tarefa com descrição**
- ✅ **Marcar tarefa como concluída**
- ✅ **Remover tarefa**
- ✅ **Contador de tarefas pendentes**

### **Funcionalidades Extras:**

- 🎨 **Interface Kanban:** 3 colunas (Pendentes, Em andamento, Concluídas)
- 🏷️ **Sistema de Prioridades:** Baixa, Média, Alta, Urgente
- 📅 **Datas de Início e Prazo:** Controle completo de cronograma
- 🔄 **Edição Completa:** Modal para editar todas as propriedades
- 📊 **Ordenação Automática:** Por prioridade e data de criação
- 🎯 **Validação em Tempo Real:** Feedback visual imediato
- 📱 **Interface Responsiva:** Funciona em diferentes dispositivos

## 🛠️ Tecnologias Utilizadas

- **Frontend:** Angular 19 + TypeScript
- **Estilização:** CSS3 com Flexbox e Grid
- **Ícones:** Material Icons
- **Estado:** RxJS Observables
- **Validação:** Angular Forms

## 🚀 Como Executar

### **Pré-requisitos:**

- Node.js (versão 18 ou superior)
- npm ou yarn

### **Instalação:**

```bash
# Clone o repositório
git clone [URL_DO_REPOSITORIO]

# Entre na pasta do projeto
cd Lista-de-tarefas

# Instale as dependências
npm install

# Execute a aplicação
npm start
```

### **Acesso:**

- Abra o navegador em: `http://localhost:4200`

## 📊 Pontos Positivos

### **Arquitetura:**

- ✅ **Componentes Modulares:** Código organizado e reutilizável
- ✅ **Separação de Responsabilidades:** Service, Components, Models bem definidos
- ✅ **Injeção de Dependência:** Gerenciamento eficiente de estado
- ✅ **Observables:** Sistema reativo para atualizações automáticas

### **Experiência do Usuário:**

- 🎨 **Interface Intuitiva:** Design limpo e moderno
- ⚡ **Performance Otimizada:** Carregamento rápido e responsivo
- 🔄 **Feedback Visual:** Estados claros e feedback imediato
- 📱 **Responsividade:** Funciona em desktop e mobile

### **Desenvolvimento:**

- 🛡️ **TypeScript:** Código mais seguro e manutenível
- 🔧 **CLI Angular:** Ferramentas de desenvolvimento integradas
- 📝 **Código Limpo:** Padrões consistentes e bem documentados
- 🧪 **Testabilidade:** Estrutura preparada para testes

## 🎯 Dificuldades Encontradas

### **Durante o Desenvolvimento:**

- 🔄 **Gerenciamento de Estado:** Implementar sistema reativo com Observables
- 🎨 **CSS Responsivo:** Garantir funcionamento em diferentes telas
- ⚡ **Performance:** Otimizar re-renderizações e atualizações
- 🧪 **Validação:** Implementar validação em tempo real sem afetar UX

### **Soluções Implementadas:**

- 📊 **BehaviorSubject:** Para gerenciamento eficiente de estado
- 🎯 **CSS Grid/Flexbox:** Layout responsivo e moderno
- 🔄 **OnPush Strategy:** Otimização de performance
- ⚡ **Debounce:** Validação otimizada sem sobrecarga

## 🎨 Demonstração

### **Screenshots da Aplicação:**

#### **Interface Principal:**

- **Kanban Board:** 3 colunas organizadas por status
- **Cards de Tarefas:** Informações completas com prioridades
- **Contadores:** Número de tarefas em cada coluna
- **Botões de Ação:** Iniciar, Concluir, Editar, Excluir

#### **Modal de Adição:**

- **Formulário Completo:** Título, descrição, prioridade, datas
- **Validação Visual:** Feedback imediato de erros
- **Interface Limpa:** Design moderno e intuitivo

#### **Modal de Edição:**

- **Edição Completa:** Todos os campos editáveis
- **Validação Avançada:** Verificação de datas e campos obrigatórios
- **Controle de Estado:** Preservação de dados originais

### **Funcionalidades Demonstradas:**

1. **Adicionar Tarefa:**

   - Clique em "Adicionar Tarefa"
   - Preencha título, descrição, prioridade e datas
   - Visualize a tarefa aparecer na coluna "Pendentes"

2. **Mover Tarefas:**

   - Clique nos botões de ação para mover entre colunas
   - Observe os contadores atualizarem automaticamente
   - Veja a ordenação por prioridade funcionando

3. **Editar Tarefas:**

   - Clique em qualquer tarefa para abrir modal de detalhes
   - Clique em "Editar" para modificar dados
   - Salve as alterações e veja a atualização em tempo real

4. **Excluir Tarefas:**
   - Clique no ícone de lixeira
   - Confirme a exclusão
   - Veja a tarefa ser removida e contador atualizado

## 🔧 Estrutura do Projeto

```
src/
├── app/
│   ├── components/
│   │   ├── kanban-board/          # Quadro principal
│   │   ├── task-form/             # Formulário de adição
│   │   ├── task-details/          # Modal de edição
│   │   └── sidebar/               # Menu lateral
│   ├── models/
│   │   └── task.model.ts          # Interface da tarefa
│   ├── services/
│   │   └── task.service.ts        # Lógica de negócio
│   └── app.component.*            # Componente raiz
├── styles.css                     # Estilos globais
└── main.ts                       # Ponto de entrada
```

## 🎯 Conclusão

Esta aplicação demonstra o **poder do Angular + TypeScript** para criar aplicações web modernas, reativas e escaláveis. A combinação oferece:

- 🚀 **Desenvolvimento Rápido:** Ferramentas integradas
- 🛡️ **Código Seguro:** TypeScript previne erros
- 🎨 **UX Excelente:** Interface moderna e responsiva
- 📈 **Escalabilidade:** Arquitetura preparada para crescimento

A aplicação atende completamente aos requisitos especificados e ainda oferece funcionalidades extras que melhoram significativamente a experiência do usuário.

---

**Desenvolvido com ❤️ usando Angular 19 + TypeScript**
