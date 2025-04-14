/**
 * Correções específicas para o gráfico em calc-2
 * Este script foca em resolver problemas de contraste no tema claro para elementos específicos
 */

document.addEventListener('DOMContentLoaded', function() {
    // Verificar se estamos na página correta (contém o elemento calc-2)
    const calc2Container = document.getElementById('calc-2');
    if (!calc2Container) return;
    
    console.log("Aplicando correções específicas para elementos em calc-2");
    
    // Carregar CSS específico para as seções de análise
    const loadAnalysisCSS = () => {
        if (!document.querySelector('link[href*="analysis-sections-fix.css"]')) {
            const analysisCssLink = document.createElement('link');
            analysisCssLink.rel = 'stylesheet';
            analysisCssLink.href = 'assets/css/analysis-sections-fix.css';
            document.head.appendChild(analysisCssLink);
            console.log('Carregado CSS para correções das seções de análise');
        }
    };
    
    // Aplicar a correção inicial
    loadAnalysisCSS();
    
    // Função para corrigir elementos específicos de calc-2
    const fixCalc2Elements = () => {
        // Verificar se estamos no tema claro
        const isLightTheme = document.documentElement.hasAttribute('data-theme') && 
                            document.documentElement.getAttribute('data-theme') === 'light';
        
        if (!isLightTheme) return; // Não aplicar nada se for tema escuro
        
        // Encontrar e corrigir elementos específicos dentro de calc-2
        const graphContainer = calc2Container.querySelector('.chart-container');
        if (graphContainer) {
            // Forçar estilos para todos os textos do gráfico
            const graphTexts = graphContainer.querySelectorAll('text');
            graphTexts.forEach(text => {
                text.setAttribute('fill', '#000000');
                text.style.fill = '#000000';
                text.style.color = '#000000';
                text.style.fontWeight = 'bold';
                text.style.fontSize = '12px';
                text.style.fontFamily = "'Roboto Mono', monospace";
            });
            
            // Forçar estilos para todas as linhas do gráfico
            const graphLines = graphContainer.querySelectorAll('path[stroke]:not([fill]), line[stroke]');
            graphLines.forEach(line => {
                // Verificar se é uma linha de dados (não grade)
                const stroke = line.getAttribute('stroke');
                if (stroke && !stroke.includes('rgb(90, 90, 90)') && !stroke.includes('#5a5a5a')) {
                    line.setAttribute('stroke-width', '3');
                    line.style.strokeWidth = '3px';
                }
            });
            
            // Forçar estilos para os pontos do gráfico
            const graphPoints = graphContainer.querySelectorAll('circle');
            graphPoints.forEach(point => {
                point.setAttribute('r', '4');
                point.setAttribute('stroke-width', '2');
                point.style.strokeWidth = '2px';
            });
            
            // Corrigir legendas
            const legendItems = calc2Container.querySelectorAll('.chart-legend-item, .legend-item');
            legendItems.forEach(item => {
                const legendTexts = item.querySelectorAll('text, span');
                legendTexts.forEach(text => {
                    text.style.color = '#000000';
                    text.style.fill = '#000000';
                    text.style.fontWeight = 'bold';
                });
                
                const legendMarkers = item.querySelectorAll('rect, circle, path');
                legendMarkers.forEach(marker => {
                    marker.style.strokeWidth = '2px';
                    marker.setAttribute('stroke-width', '2');
                });
            });
        }
        
        // Corrigir elementos das seções de análise
        const analysisBlocks = calc2Container.querySelectorAll('[class*="analise"], [id*="analise"]');
        analysisBlocks.forEach(block => {
            // Garantir que cabeçalhos tenham bom contraste
            const headers = block.querySelectorAll('.card-header, h3, h4, h5');
            headers.forEach(header => {
                if (header.textContent && (
                    header.textContent.includes('Análise') || 
                    header.textContent.includes('Comparativa') || 
                    header.textContent.includes('Retorno')
                )) {
                    header.style.backgroundColor = '#0957c3';
                    header.style.color = '#ffffff';
                    header.style.fontWeight = 'bold';
                    header.style.padding = '8px';
                    header.style.borderRadius = '4px';
                }
            });
            
            // Corrigir valores específicos
            const valueElements = block.querySelectorAll('[class*="valor"], [id*="valor"], span:not([class]):not([id])');
            valueElements.forEach(element => {
                // Manter texto branco se estiver em fundo azul
                if (getComputedStyle(element).backgroundColor === 'rgb(9, 87, 195)' || 
                    getComputedStyle(element.parentElement).backgroundColor === 'rgb(9, 87, 195)') {
                    element.style.color = '#ffffff';
                } else {
                    element.style.color = '#000000';
                }
                element.style.fontWeight = 'bold';
            });
        });
        
        // Corrigir elementos com fundo azul
        const blueBackgrounds = calc2Container.querySelectorAll('.bg-primary, .blue-bg, [style*="background-color: rgb(9, 87, 195)"]');
        blueBackgrounds.forEach(element => {
            element.style.color = '#ffffff';
            element.style.fontWeight = 'bold';
            
            // Filhos de elementos com fundo azul
            const children = element.querySelectorAll('*');
            children.forEach(child => {
                child.style.color = '#ffffff';
                child.style.fontWeight = 'bold';
            });
        });
    };
    
    // Aplicar a correção quando o tema mudar
    const observeThemeChanges = () => {
        // Observador para mudanças no atributo data-theme
        const observer = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                if (mutation.attributeName === 'data-theme') {
                    // Verificar se o tema mudou para claro
                    const isLightTheme = document.documentElement.hasAttribute('data-theme') && 
                                      document.documentElement.getAttribute('data-theme') === 'light';
                    
                    if (isLightTheme) {
                        // Aplicar correções
                        setTimeout(fixCalc2Elements, 300);
                    }
                }
            });
        });
        
        // Iniciar observação do elemento HTML
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });
        
        // Também verificar quando o botão de tema for clicado
        const themeButton = document.querySelector('.theme-toggle-btn');
        if (themeButton) {
            themeButton.addEventListener('click', () => {
                setTimeout(() => {
                    // Verificar o tema após a mudança
                    const isLightTheme = document.documentElement.hasAttribute('data-theme') && 
                                      document.documentElement.getAttribute('data-theme') === 'light';
                    
                    if (isLightTheme) {
                        // Aplicar correções
                        fixCalc2Elements();
                    }
                }, 300);
            });
        }
    };
    
    // Verificar se estamos no tema claro e aplicar correções
    const isLightTheme = document.documentElement.hasAttribute('data-theme') && 
                       document.documentElement.getAttribute('data-theme') === 'light';
    
    if (isLightTheme) {
        // Aplicar correções iniciais
        setTimeout(fixCalc2Elements, 500);
        // Reforçar após algum tempo para garantir que todos os elementos foram carregados
        setTimeout(fixCalc2Elements, 1500);
    }
    
    // Configurar observador para mudanças de tema
    observeThemeChanges();
    
    // Observar mudanças no DOM para corrigir novos elementos
    const domObserver = new MutationObserver((mutations) => {
        // Verificar se estamos no tema claro
        const isLightTheme = document.documentElement.hasAttribute('data-theme') && 
                          document.documentElement.getAttribute('data-theme') === 'light';
        
        if (!isLightTheme) return;
        
        let shouldApplyFix = false;
        
        // Verificar se alguma mudança ocorreu em elementos relevantes
        mutations.forEach(mutation => {
            if (mutation.type === 'childList') {
                if (mutation.addedNodes.length > 0) {
                    shouldApplyFix = true;
                }
            } else if (mutation.type === 'attributes') {
                shouldApplyFix = true;
            }
        });
        
        // Aplicar correções se necessário
        if (shouldApplyFix) {
            setTimeout(fixCalc2Elements, 300);
        }
    });
    
    // Iniciar observação do conteúdo de calc-2
    domObserver.observe(calc2Container, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class']
    });
    
    console.log("Correções específicas para calc-2 configuradas com sucesso!");
});
