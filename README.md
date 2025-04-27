# Luaraujo Calculadoras Financeiras

Este repositório contém as calculadoras financeiras educativas do site luaraujo.com. As calculadoras fornecem simulações e análises financeiras para ajudar os visitantes a tomar decisões de investimento mais informadas.

## Calculadoras Disponíveis

1. **Simulador Educacional** (`calculadoras/calc-1.html`)
   - Simulador básico de investimentos com cálculos de juros compostos
   - Inclui ajuste para inflação e comparações entre produtos financeiros

2. **PGBL vs CDB** (`calculadoras/calc-2.html`)
   - Comparativo entre investimentos em PGBL e CDB
   - Incorpora benefícios fiscais e análise de longo prazo

3. **Simulador de Investimentos** (`calculadoras/calc-3.html`)
   - Simulação mais detalhada com análise mensal
   - Permite personalizar aportes e taxas por mês

## Estrutura do Projeto

```
├── assets/
│   ├── css/
│   │   ├── styles.css            # Estilos gerais do site
│   │   ├── theme-switch.css      # Gerenciamento de temas claro/escuro
│   │   ├── enhanced-charts.css   # Estilos específicos para gráficos
│   │   └── integrated-styles.css # Estilos complementares
│   ├── js/
│   │   ├── components.js         # Componentes reutilizáveis (navbar, footer)
│   │   ├── chart-helpers.js      # Funções auxiliares para gráficos
│   │   ├── theme-switch.js       # Gerenciamento de temas claro/escuro
│   │   └── pgbl-cdb-fix.js       # Correções para o simulador PGBL vs CDB
│   └── img/                      # Imagens do site
├── calculadoras/
│   ├── calc-1.html               # Simulador Educacional
│   ├── calc-2.html               # Simulador PGBL vs CDB
│   └── calc-3.html               # Simulador de Investimentos
├── index.html                    # Página inicial
├── contato.html                  # Página de contato
├── CONTRASTE.md                  # Documentação sobre melhorias de contraste
└── README.md                     # Este arquivo
```

## Tecnologias Utilizadas

- HTML5, CSS3, JavaScript
- Bootstrap 5 para o layout responsivo
- Chart.js para visualização de dados
- Font Awesome para ícones
- Sistema de temas claro/escuro

## Requisitos para Desenvolvimento

- Conhecimento básico de HTML, CSS e JavaScript
- Familiaridade com Bootstrap 5
- Compreensão de conceitos financeiros (juros compostos, produtos de investimento)

## Solução de Problemas

### Simulador PGBL vs CDB

O simulador PGBL vs CDB (calc-2.html) teve problemas em exibir resultados corretamente devido a:

1. Inconsistências na lógica de cálculo 
2. Problemas de renderização do gráfico comparativo
3. Falhas na exibição da seção de resultados

Uma solução alternativa foi implementada através do arquivo `pgbl-cdb-fix.js`, que:

- Adiciona verificação robusta de erros
- Corrige os cálculos de restituição e rendimentos
- Garante a exibição da seção de resultados
- Melhora o tratamento de erros de renderização de gráficos

### Melhorias de Contraste e Acessibilidade

Foram implementadas melhorias significativas no contraste visual para ambos os temas (claro e escuro):

1. **Tema Escuro**:
   - Cores de texto secundárias mais claras para melhor visibilidade
   - Bordas mais distintas para demarcar elementos
   - Melhoria na identificação de elementos interativos

2. **Tema Claro**:
   - Cores de fundo ajustadas para evitar ofuscamento
   - Cores de texto mais escuras para garantir legibilidade
   - Elementos interativos com cores mais pronunciadas

Para detalhes completos, consulte o arquivo [CONTRASTE.md](./CONTRASTE.md).

## Acessibilidade

Este projeto implementa as seguintes características de acessibilidade:

- Suporte a temas claro e escuro
- Contraste adequado para todos os elementos (WCAG 2.1 AA)
- Navegação por teclado com indicadores visuais de foco
- Estrutura semântica adequada
- Textos alternativos para elementos visuais

## Uso em Produção

Ao implantar o site em produção, é recomendável:

1. Concatenar e minificar arquivos CSS e JavaScript para melhor performance
2. Otimizar imagens para carregamento mais rápido  
3. Configurar cache adequado para os recursos estáticos
4. Testar em diferentes navegadores e dispositivos
5. Validar a acessibilidade com ferramentas como WAVE ou Lighthouse

## Estado de Continuidade do Projeto

### Último Estado Atualizado: 27/04/2025

#### Migração para Servidor Compartilhado Hostinger

O projeto está atualmente em fase de migração de PHP para JavaScript (Node.js) com otimização para servidor compartilhado da Hostinger. Principais considerações:

1. **Limites de Recursos**:
   - Otimização para operar dentro das restrições de memória e CPU
   - Configuração de PM2 para gerenciamento de processos Node.js
   - Implementação de estratégias de cache para reduzir carga

2. **Configuração do Ambiente**:
   - Uso de .htaccess para proxy de requisições para o processo Node.js
   - Pool de conexões MySQL com limites adequados para ambiente compartilhado
   - Sistema de login com consumo mínimo de recursos

#### Arquivos Críticos
- `calculadoras/calc-2.html` - Requer atenção especial devido aos bugs históricos
- `assets/js/pgbl-cdb-fix.js` - Arquivo de correção crucial para funcionamento
- `assets/css/*` - Múltiplos arquivos CSS redundantes que precisam ser consolidados

#### Dependências
- Bootstrap 5.3.0
- Chart.js 3.9.1
- Font Awesome 6.0.0
- Node.js 20.x (para backend)
- Express.js 4.x
- MySQL 8.0
- JWT para autenticação
- PDFKit para geração de relatórios
- PM2 para gerenciamento de processos Node.js

#### Pontos de Atenção
1. A calculadora PGBL vs CDB ainda depende do arquivo fix para funcionar corretamente
2. Existem 7 arquivos CSS redundantes que precisam ser consolidados
3. Configurações específicas são necessárias para operação em servidor compartilhado
4. Otimização de assets é crítica para performance adequada

#### Próximos Passos Sugeridos
1. Refatorar `calc-2.html` para incorporar correções do pgbl-cdb-fix.js permanentemente
2. Consolidar os 7 arquivos CSS redundantes em um único stylesheet otimizado
3. Configurar ambiente Node.js otimizado para servidor compartilhado da Hostinger
4. Implementar sistema de login com consumo mínimo de recursos
5. Otimizar pool de conexões MySQL para ambiente compartilhado

#### Para Retomar o Desenvolvimento
1. Clone o repositório
2. Verifique a branch `migracao-hostinger` para obter a versão mais recente do código
3. Consulte o arquivo `HOSTINGER.md` para instruções específicas de configuração
4. Execute `npm install` para instalar as dependências do backend
5. Configure o `.env` conforme o template fornecido em `.env.example`
6. Inicie o servidor com `npm run dev` para ambiente de desenvolvimento

## Novas Funcionalidades Planejadas

1. **Sistema de Login Compartilhado**:
   - Autenticação JWT com sessões persistentes
   - Login único para todas as calculadoras
   - Painel administrativo simplificado

2. **Armazenamento de Histórico**:
   - Banco de dados MySQL para histórico de cálculos
   - Vinculação de cálculos a usuários
   - Exportação de histórico

3. **Geração de Relatórios PDF**:
   - Relatórios personalizados por tipo de calculadora
   - Formatação profissional com logo e dados do usuário
   - Opções de compartilhamento e download

## Contribuição

Para contribuir com o projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-calculadora`)
3. Faça commit das alterações (`git commit -m 'Adiciona nova calculadora'`)
4. Faça push para a branch (`git push origin feature/nova-calculadora`)
5. Abra um Pull Request

## Contato

Para mais informações sobre o desenvolvimento deste projeto, entre em contato através do GitHub.

## Licença

Todos os direitos reservados © Luciana Araujo.