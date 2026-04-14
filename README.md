# FinTrack - Dashboard Financeiro

FinTrack é um MVP de Dashboard Financeiro construído com as melhores práticas de Front-End para o gerenciamento de finanças pessoais.

## Tecnologias e Stack
- **React 19** + **Vite**
- **TypeScript** (Modo estrito ativado)
- **Chakra UI v3**
- **Zustand** (State Management com localStorage persistence)
- **Recharts** (Gráficos Interativos)
- **React Router v6**
- **Lucide React** (Ícones)
- **i18next** (Internacionalização)

## Funcionalidades
- **Dashboard Analítico**: Visão geral de receitas, despesas e saldo atual.
- **Gráficos Avançados**:
  - Comparativo Mensal de Receitas vs Despesas.
  - Evolução de Saldo em Linha Temporal.
  - Distribuição de Despesas por Categoria.
- **Gestão de Transações**:
  - Tabela com filtros de tipo e busca de texto.
  - CRUD (Adicionar, remover listagem) com labels coloridas para categorias.
- **Exportação de Dados**: Capacidade de exportar os dados filtrados diretamente para `.csv`.
- **Modo Escuro Nativo**: Suporte para Light/Dark Mode via Chakra UI Next-Themes wrapper.

## Como Executar

```bash
# Instalar as dependências
npm install

# Rodar o servidor de desenvolvimento
npm run dev

# Fazer a build de produção local
npm run build
```

## Arquitetura
O projeto segue a padronização:
- `src/components/layout/`: App Shell, Sidebar.
- `src/pages/`: Views completas de cada funcionalidade.
- `src/store/`: Gerenciamento de estado global (Zustand).
- `src/types/`: Tipagens globais do sistema.

Desenvolvido para portfólio profissional focado em código limpo, componentização e performance de rendering em React.
