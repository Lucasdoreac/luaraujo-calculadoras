# Melhorias de Contraste nas Calculadoras Financeiras

Este documento descreve as melhorias implementadas para aumentar o contraste e a acessibilidade visual nas calculadoras financeiras.

## Problemas Identificados

1. **Tema Escuro**:
   - Textos secundários com contraste insuficiente (cinza muito escuro)
   - Bordas pouco perceptíveis entre elementos
   - Distinção insuficiente entre elementos interativos

2. **Tema Claro**:
   - Contraste insuficiente entre o texto e o fundo
   - Cores primárias muito claras para destacar elementos interativos
   - Diferenciação inadequada entre seções

## Soluções Implementadas

### Ambos os Temas

1. **Consistência de Contraste**:
   - Garantia de que todos os textos têm contraste adequado em relação aos fundos
   - Bordas mais visíveis para demarcar claramente os elementos da interface

2. **Legibilidade**:
   - Aumento do peso da fonte em elementos importantes
   - Garantia de que todos os botões têm textos brancos para melhor legibilidade
   - Elementos de ajuda mais visíveis

3. **Acessibilidade**:
   - Implementação de contornos de foco visíveis para navegação por teclado
   - Cores e indicadores para estados ativos e hover mais distintos

### Tema Escuro

1. **Cores de Texto**:
   - Textos secundários alterados de `#bbbbbb` para `#d4d4d4` (mais claro)
   - Bordas alteradas de `#333333` para `#454545` (mais visíveis)

2. **Elementos Interativos**:
   - Aumento do contraste em estados hover
   - Melhor definição visual de bordas e sombreamentos

### Tema Claro

1. **Cores de Fundo**:
   - Fundo primário alterado para `#f2f2f2` (um pouco mais escuro)
   - Elementos terciários com `#e2e2e2` (mais escuro que o original)

2. **Cores de Texto**:
   - Texto primário alterado para `#121212` (quase preto)
   - Texto secundário alterado para `#333333` (muito mais escuro que o original)

3. **Cores de Destaque**:
   - Cor primária alterada para `#0957c3` (azul mais escuro)
   - Cor de sucesso alterada para `#157f3d` (verde mais escuro)
   - Cor de alerta alterada para `#c42c2c` (vermelho mais escuro)

## Gráficos e Tabelas

- Melhoria no contraste das tabelas com cores de fundo alternadas
- Cabeçalhos de tabela mais distintos
- Adaptação específica para o tema claro nos elementos gráficos
- Indicadores de carregamento mais visíveis

## Elementos Interativos

- Garantia de que todos os botões têm texto branco para máxima legibilidade
- Estados de foco consistentes em todos os elementos interativos
- Melhor feedback visual para interações de hover e clique

## Compatibilidade

Estas melhorias são compatíveis com os padrões de acessibilidade WCAG 2.1 AA, garantindo que:

- O contraste de texto atenda à proporção mínima de 4.5:1
- Elementos interativos sejam claramente distinguíveis
- Feedback de foco esteja presente para navegação por teclado

## Arquivos Atualizados

- `assets/css/theme-switch.css`: Variáveis de tema e adaptações para tema claro/escuro
- `assets/css/styles.css`: Estilos principais do site
- `assets/css/enhanced-charts.css`: Melhorias para gráficos e tabelas
- `assets/css/integrated-styles.css`: Estilos complementares

## Teste

Recomenda-se testar o site com:
- Diferentes navegadores
- Ferramentas de contraste como WAVE ou Lighthouse
- Navegação exclusivamente por teclado
- Diferentes tamanhos de tela
