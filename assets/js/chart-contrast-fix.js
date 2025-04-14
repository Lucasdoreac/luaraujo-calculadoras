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
            
            if (Chart.defaults.plugins && Chart.defaults.plugins.tooltip) {
                Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(0, 0, 0, 0.9)'; // Fundo preto
                Chart.defaults.plugins.tooltip.titleColor = '#ffffff'; // Texto branco
                Chart.defaults.plugins.tooltip.bodyColor = '#ffffff'; // Texto branco
            }
            
            if (Chart.defaults.plugins && Chart.defaults.plugins.legend && Chart.defaults.plugins.legend.labels) {
                Chart.defaults.plugins.legend.labels.color = '#000000'; // Texto preto
                Chart.defaults.plugins.legend.labels.font = { 
                    weight: 'bold', 
                    size: 13 
                }; // Fonte mais negrito
            }
            
            if (Chart.defaults.plugins && Chart.defaults.plugins.title) {
                Chart.defaults.plugins.title.color = '#000000'; // Título preto
                Chart.defaults.plugins.title.font = { 
                    weight: 'bold', 
                    size: 16 
                }; // Título mais destacado
            }
            
            // Melhorar a visibilidade das linhas de grade
            if (Chart.defaults.scale && Chart.defaults.scale.grid) {
                Chart.defaults.scale.grid.color = 'rgba(0, 0, 0, 0.2)'; // Linhas mais escuras
                Chart.defaults.scale.grid.lineWidth = 0.8; // Linha mais grossa
            }
            
            // Melhorar a visibilidade dos eixos
            if (Chart.defaults.scale && Chart.defaults.scale.ticks) {
                Chart.defaults.scale.ticks.color = '#000000'; // Texto preto
                Chart.defaults.scale.ticks.font = {
                    weight: 'bold',
                    size: 12
                }; // Fonte mais negrito
            }
        } else {
            // RESTAURAR configurações originais para tema escuro para preservar o visual original
            Chart.defaults.color = originalDarkThemeDefaults.color;
            Chart.defaults.borderColor = originalDarkThemeDefaults.borderColor;
            
            if (Chart.defaults.plugins && Chart.defaults.plugins.tooltip) {
                Chart.defaults.plugins.tooltip.backgroundColor = originalDarkThemeDefaults.tooltipBg;
                Chart.defaults.plugins.tooltip.titleColor = originalDarkThemeDefaults.tooltipTitleColor;
                Chart.defaults.plugins.tooltip.bodyColor = originalDarkThemeDefaults.tooltipBodyColor;
            }
            
            if (Chart.defaults.plugins && Chart.defaults.plugins.legend && Chart.defaults.plugins.legend.labels) {
                Chart.defaults.plugins.legend.labels.color = originalDarkThemeDefaults.legendColor;
                // Preservar tamanho e peso da fonte original
                if (Chart.defaults.plugins.legend.labels.font) {
                    Chart.defaults.plugins.legend.labels.font.weight = undefined;
                    Chart.defaults.plugins.legend.labels.font.size = undefined;
                }
            }
            
            if (Chart.defaults.plugins && Chart.defaults.plugins.title) {
                Chart.defaults.plugins.title.color = originalDarkThemeDefaults.titleColor;
                if (Chart.defaults.plugins.title.font) {
                    Chart.defaults.plugins.title.font.weight = undefined;
                    Chart.defaults.plugins.title.font.size = undefined;
                }
            }
            
            // Restaurar a visibilidade original das linhas de grade
            if (Chart.defaults.scale && Chart.defaults.scale.grid) {
                Chart.defaults.scale.grid.color = originalDarkThemeDefaults.gridColor;
                Chart.defaults.scale.grid.lineWidth = originalDarkThemeDefaults.gridWidth;
            }
            
            // Restaurar a visibilidade original dos eixos
            if (Chart.defaults.scale && Chart.defaults.scale.ticks) {
                Chart.defaults.scale.ticks.color = originalDarkThemeDefaults.ticksColor;
                if (Chart.defaults.scale.ticks.font) {
                    Chart.defaults.scale.ticks.font.weight = undefined;
                    Chart.defaults.scale.ticks.font.size = undefined;
                }
            }
        }
    }
    
    // Aplicar configurações iniciais
    applyThemeSettings();
    
    // Monitorar mudanças de tema e aplicar configurações adequadas
    const themeToggleBtn = document.querySelector('.theme-toggle-btn');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function() {
            // Aguardar um momento para o tema ser alterado
            setTimeout(() => {
                applyThemeSettings();
                
                // Atualizar todos os gráficos existentes
                if (Chart.instances) {
                    Chart.instances.forEach(chart => {
                        if (chart && chart.update) {
                            chart.update();
                        }
                    });
                }
                
                // Corrigir elementos SVG
                fixSvgElements();
            }, 300);
        });
    }
    
    // Função para corrigir elementos SVG (texto, linhas, etc)
    function fixSvgElements() {
        const isLightTheme = document.documentElement.hasAttribute('data-theme') && 
                        document.documentElement.getAttribute('data-theme') === 'light';
        
        if (isLightTheme) {
            // Corrigir textos SVG
            document.querySelectorAll('svg text').forEach(text => {
                text.setAttribute('fill', '#000000');
                text.setAttribute('stroke', 'none');
                text.style.fontWeight = 'bold';
            });
            
            // Corrigir pontos SVG
            document.querySelectorAll('svg circle').forEach(circle => {
                const r = parseFloat(circle.getAttribute('r') || '2');
                if (r < 4) circle.setAttribute('r', '4');
                
                const strokeWidth = parseFloat(circle.getAttribute('stroke-width') || '1');
                if (strokeWidth < 2) circle.setAttribute('stroke-width', '2');
            });
            
            // Corrigir linhas SVG
            document.querySelectorAll('svg path.line, svg line.line').forEach(line => {
                const strokeWidth = parseFloat(line.getAttribute('stroke-width') || '1');
                if (strokeWidth < 3) line.setAttribute('stroke-width', '3');
            });
        }
    }
    
    // Aplicar correções a elementos SVG após o carregamento da página
    setTimeout(fixSvgElements, 1000);
    
    // Observar mudanças no DOM para aplicar correções a novos elementos
    const observer = new MutationObserver((mutations) => {
        const isLightTheme = document.documentElement.hasAttribute('data-theme') && 
                        document.documentElement.getAttribute('data-theme') === 'light';
        
        if (isLightTheme) {
            let shouldFix = false;
            
            mutations.forEach(mutation => {
                if (mutation.addedNodes.length > 0) {
                    for (let i = 0; i < mutation.addedNodes.length; i++) {
                        const node = mutation.addedNodes[i];
                        if (node.nodeType === 1) { // Element node
                            if (node.nodeName === 'SVG' || 
                                node.querySelector('svg, .chart-container, canvas')) {
                                shouldFix = true;
                                break;
                            }
                        }
                    }
                }
            });
            
            if (shouldFix) {
                setTimeout(fixSvgElements, 300);
            }
        }
    });
    
    // Iniciar observação do DOM
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    // Carregamento de CSS para garantir contraste
    function loadContrastCSS() {
        if (!document.querySelector('link[href*="chart-theme-contrast.css"]')) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'assets/css/chart-theme-contrast.css';
            document.head.appendChild(link);
            console.log('CSS de contraste carregado dinamicamente');
        }
    }
    
    // Carregar CSS de contraste
    loadContrastCSS();
    
    console.log("Melhorias de contraste para gráficos aplicadas com sucesso!");
});
