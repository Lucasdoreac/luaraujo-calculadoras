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
│   │   └── enhanced-charts.css   # Estilos específicos para gráficos
│   ├── js/
│   │   ├── components.js         # Componentes reutilizáveis (navbar, footer)
│   │   ├── chart-helpers.js      # Funções auxiliares para gráficos
│   │   └── pgbl-cdb-fix.js       # Correções para o simulador PGBL vs CDB
│   └── img/                      # Imagens do site
├── calculadoras/
│   ├── calc-1.html               # Simulador Educacional
│   ├── calc-2.html               # Simulador PGBL vs CDB
│   └── calc-3.html               # Simulador de Investimentos
├── index.html                    # Página inicial
├── contato.html                  # Página de contato
└── README.md                     # Este arquivo
```

## Tecnologias Utilizadas

- HTML5, CSS3, JavaScript
- Bootstrap 5 para o layout responsivo
- Chart.js para visualização de dados
- Font Awesome para ícones

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

## Uso em Produção

Ao implantar o site em produção, é recomendável:

1. Concatenar e minificar arquivos CSS e JavaScript para melhor performance
2. Otimizar imagens para carregamento mais rápido  
3. Configurar cache adequado para os recursos estáticos

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
