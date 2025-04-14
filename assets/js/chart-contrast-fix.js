/**
 * Melhorias de contraste para gráficos Chart.js
 * Este script aplica correções de contraste para textos e elementos gráficos 
 * de acordo com o tema ativo (claro/escuro)
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log("Aplicando melhorias de contraste para gráficos...");
    
    // Verificar se a biblioteca Chart.js está disponível
    if (typeof Chart === 'undefined') {
        console.error("Biblioteca Chart.js não encontrada.");
        return;
    }
    
    // Configurações originais para tema escuro - preservadas para não afetar a visualização
    const originalDarkThemeDefaults = {
        color: '#e0e0e0',
        borderColor: '#5a5a5a',
        tooltipBg: 'rgba(52, 152, 219, 0.9)',
        tooltipTitleColor: '#ffffff',
        tooltipBodyColor: '#ffffff',
        legendColor: '#e0e0e0',
        titleColor: '#e0e0e0',
        gridColor: 'rgba(90, 90, 90, 0.5)',
        gridWidth: 0.5,
        ticksColor: '#e0e0e0'
    };
    
    // Salvar as configurações originais de Chart.js antes de modificar
    let originalDefaults = {};
    if (Chart.defaults) {
        originalDefaults = {
            color: Chart.defaults.color,
            borderColor: Chart.defaults.borderColor,
            tooltipBg: Chart.defaults.plugins?.tooltip?.backgroundColor,
            tooltipTitleColor: Chart.defaults.plugins?.tooltip?.titleColor,
            tooltipBodyColor: Chart.defaults.plugins?.tooltip?.bodyColor,
            legendColor: Chart.defaults.plugins?.legend?.labels?.color,
            titleColor: Chart.defaults.plugins?.title?.color,
            gridColor: Chart.defaults.scale?.grid?.color,
            gridWidth: Chart.defaults.scale?.grid?.lineWidth,
            ticksColor: Chart.defaults.scale?.ticks?.color
        };
    }
    
    // Função para aplicar as configurações de acordo com o tema
    function applyThemeSettings() {
        // Detectar o tema atual
        const isLightTheme = document.documentElement.hasAttribute('data-theme') && 
                        document.documentElement.getAttribute('data-theme') === 'light';
        
        // Modificar as opções padrão do Chart.js de acordo com o tema
        if (isLightTheme) {
            // Configurações de contraste MELHORADAS para tema claro
            Chart.defaults.color = '#000000'; // Texto preto para máximo contraste
            Chart.defaults.borderColor = '#444444'; // Bordas mais escuras
            Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(0, 0, 0, 0.9)'; // Fundo preto
            Chart.defaults.plugins.tooltip.titleColor = '#ffffff'; // Texto branco
            Chart.defaults.plugins.tooltip.bodyColor = '#ffffff'; // Texto branco
            Chart.defaults.plugins.legend.labels.color = '#000000'; // Texto preto
            Chart.defaults.plugins.legend.labels.font = { 
                weight: 'bold', 
                size: 13 
            }; // Fonte mais negrito
            Chart.defaults.plugins.title.color = '#000000'; // Título preto
            Chart.defaults.plugins.title.font = { 
                weight: 'bold', 
                size: 16 
            }; // Título mais destacado
            
            // Melhorar a visibilidade das linhas de grade
            Chart.defaults.scale.grid.color = 'rgba(0, 0, 0, 0.2)'; // Linhas mais escuras
            Chart.defaults.scale.grid.lineWidth = 0.8; // Linha mais grossa
            
            // Melhorar a visibilidade dos eixos
            Chart.defaults.scale.ticks.color = '#000000'; // Texto preto
            Chart.defaults.scale.ticks.font = {
                weight: 'bold',
                size: 12
            }; // Fonte mais negrito
        } else {
            // RESTAURAR configurações originais para tema escuro para preservar o visual original
            Chart.defaults.color = originalDarkThemeDefaults.color;
            Chart.defaults.borderColor = originalDarkThemeDefaults.borderColor;
            Chart.defaults.plugins.tooltip.backgroundColor = originalDarkThemeDefaults.tooltipBg;
            Chart.defaults.plugins.tooltip.titleColor = originalDarkThemeDefaults.tooltipTitleColor;
            Chart.defaults.plugins.tooltip.bodyColor = originalDarkThemeDefaults.tooltipBodyColor;
            Chart.defaults.plugins.legend.labels.color = originalDarkThemeDefaults.legendColor;
            // Preservar tamanho e peso da fonte original
            if (Chart.defaults.plugins.legend.labels.font) {
                Chart.defaults.plugins.legend.labels.font.weight = undefined;
                Chart.defaults.plugins.legend.labels.font.size = undefined;
            }
            
            Chart.defaults.plugins.title.color = originalDarkThemeDefaults.titleColor;
            if (Chart.defaults.plugins.title.font) {
                Chart.defaults.plugins.title.font.weight = undefined;
                Chart.defaults.plugins.title.font.size = undefined;
            }
            
            // Restaurar a visibilidade original das linhas de grade
            Chart.defaults.scale.grid.color = originalDarkThemeDefaults.gridColor;
            Chart.defaults.scale.grid.lineWidth = originalDarkThemeDefaults.gridWidth;
            
            // Restaurar a visibilidade original dos eixos
            Chart.defaults.scale.ticks.color = originalDarkThemeDefaults.ticksColor;
            if (Chart.defaults.scale.ticks.font) {
                Chart.defaults.scale.ticks.font.weight = undefined;
                Chart.defaults.scale.ticks.font.size = undefined;
            }
        }
    }
    
    // Aplicar configurações iniciais
    applyThemeSettings();
    
    // Estender as funções padrão do Chart.js para melhorar o contraste das legendas - apenas para tema claro
    const originalLegendItemRender = Chart.Legend.prototype.legendItems;
    if (originalLegendItemRender) {
        Chart.Legend.prototype.legendItems = function() {
            const items = originalLegendItemRender.apply(this, arguments);
            const isLightTheme = document.documentElement.hasAttribute('data-theme') && 
                        document.documentElement.getAttribute('data-theme') === 'light';
            
            // Aumentar o contraste das legendas APENAS no tema claro
            if (isLightTheme) {
                items.forEach(item => {
                    // Garantir opacidade alta para maior contraste
                    item.fillStyle = item.fillStyle.replace(/rgba\\((.*),\\s*[\\d\\.]+\\)/, 'rgba($1, 1)');
                    item.strokeStyle = item.strokeStyle.replace(/rgba\\((.*),\\s*[\\d\\.]+\\)/, 'rgba($1, 1)');
                    // Texto em preto
                    item.fontColor = '#000000';
                    // Aumentar linha
                    if (item.lineWidth) item.lineWidth = 2;
                });
            }
            
            return items;
        };
    }
    
    // Monitorar mudanças de tema e aplicar configurações adequadas
    const themeToggleBtn = document.querySelector('.theme-toggle-btn');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function() {
            // Aguardar um momento para o tema ser alterado
            setTimeout(() => {
                applyThemeSettings();
                
                // Atualizar todos os gráficos existentes
                Chart.instances.forEach(chart => {
                    if (chart && chart.update) {
                        chart.update();
                    }
                });
            }, 300);
        });
    }
    
    // Configurações específicas para elementos SVG e textos de projeção - apenas para tema claro
    const fixChartElements = () => {
        const isLightTheme = document.documentElement.hasAttribute('data-theme') && 
                        document.documentElement.getAttribute('data-theme') === 'light';
        
        // Aplicar apenas se o tema for claro
        if (!isLightTheme) return;
                        
        // Encontrar todos os textos SVG relacionados a projeções
        const svgTexts = document.querySelectorAll('text');
        
        svgTexts.forEach(text => {
            const textContent = text.textContent || '';
            if (textContent.includes('Projeção') || 
                textContent.includes('projeção') ||
                textContent.includes('Valor') ||
                textContent.includes('valor') ||
                textContent.includes('Taxa') ||
                textContent.includes('taxa') ||
                textContent.includes('Total') ||
                textContent.includes('total') ||
                textContent.includes('Retorno') ||
                textContent.includes('retorno')) {
                
                text.setAttribute('fill', '#000000');
                text.setAttribute('stroke', 'none');
                text.style.fontWeight = 'bold';
                // Adicionar classe para facilitar seleção futura
                text.classList.add('projecao-text');
            }
        });
        
        // Corrigir elementos de legenda em canvas
        const chartContainers = document.querySelectorAll('.chart-container');
        chartContainers.forEach(container => {
            // Aplicar estilo a qualquer elemento de legenda
            const legendElements = container.querySelectorAll(
                '.chartjs-legend, .chart-legend, [class*="legend"], .legend-item'
            );
            
            legendElements.forEach(legend => {
                legend.style.color = '#000000';
                legend.style.fontWeight = 'bold';
                
                // Corrigir spans dentro das legendas
                const spans = legend.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.color = '#000000';
                    span.style.fontWeight = 'bold';
                });
            });
            
            // Corrigir labels específicos que possam existir
            const labels = container.querySelectorAll('.chart-label, .axis-label, .value-label');
            labels.forEach(label => {
                label.style.color = '#000000';
                label.style.fill = '#000000';
                label.style.fontWeight = 'bold';
            });
        });
    };
    
    // Aplicar as correções de elementos quando a página estiver pronta e o tema for claro
    setTimeout(() => {
        const isLightTheme = document.documentElement.hasAttribute('data-theme') && 
                        document.documentElement.getAttribute('data-theme') === 'light';
        if (isLightTheme) {
            fixChartElements();
        }
    }, 1000);
    
    // Também aplicar quando novos gráficos forem criados
    const originalAcquireContext = Chart.helpers.acquireContext;
    if (originalAcquireContext) {
        Chart.helpers.acquireContext = function() {
            const result = originalAcquireContext.apply(this, arguments);
            
            // Verificar tema antes de aplicar
            const isLightTheme = document.documentElement.hasAttribute('data-theme') && 
                            document.documentElement.getAttribute('data-theme') === 'light';
            if (isLightTheme) {
                setTimeout(fixChartElements, 500);
            }
            
            return result;
        };
    }
    
    // Adicionar um observador de mutações para detectar quando novos elementos são adicionados ao DOM
    const observer = new MutationObserver((mutations) => {
        // Verificar tema antes de processar mutações
        const isLightTheme = document.documentElement.hasAttribute('data-theme') && 
                        document.documentElement.getAttribute('data-theme') === 'light';
        if (!isLightTheme) return;
        
        let shouldFix = false;
        
        mutations.forEach(mutation => {
            if (mutation.addedNodes.length > 0) {
                // Verificar se algum dos nós adicionados é um elemento de gráfico
                for (let i = 0; i < mutation.addedNodes.length; i++) {
                    const node = mutation.addedNodes[i];
                    if (node.nodeType === 1) { // Element node
                        if (node.classList && 
                            (node.classList.contains('chart-container') || 
                             node.querySelector('.chart-container, canvas'))) {
                            shouldFix = true;
                            break;
                        }
                    }
                }
            }
        });
        
        if (shouldFix) {
            // Aguardar um momento para que os gráficos sejam renderizados completamente
            setTimeout(fixChartElements, 300);
        }
    });
    
    // Observar todo o documento para mudanças
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    console.log("Melhorias de contraste para gráficos aplicadas com sucesso!");
});
