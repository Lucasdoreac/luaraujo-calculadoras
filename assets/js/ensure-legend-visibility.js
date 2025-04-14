/**
 * Script específico para garantir a visibilidade das legendas nos gráficos
 * Foco especial nos calculadores calc-1 e calc-2
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log("Iniciando correções específicas para legendas de gráficos...");
    
    // Função para verificar se o tema é claro
    function isLightTheme() {
        return document.documentElement.hasAttribute('data-theme') && 
               document.documentElement.getAttribute('data-theme') === 'light';
    }
    
    // Função para aplicar correções extremas a legendas em calc-1 e calc-2
    function fixLegends() {
        if (!isLightTheme()) return;
        
        console.log("Aplicando correções agressivas às legendas...");
        
        // Lista de calculadoras a corrigir (excluindo calc-3 que já funciona)
        const calculators = ['calc-1', 'calc-2'];
        
        calculators.forEach(function(calcId) {
            // Obter todos os contêineres de gráficos desta calculadora
            const containers = document.querySelectorAll(`#${calcId} .chart-container, [id^="${calcId}"] .chart-container`);
            
            containers.forEach(function(container) {
                // 1. Tentar encontrar legendas específicas por classe
                const legends = container.querySelectorAll('.chart-legend, .legend, [class*="legend"]');
                
                if (legends.length > 0) {
                    legends.forEach(function(legend) {
                        // Aplicar estilo em todos os elementos dentro da legenda
                        applyLegendStyles(legend);
                    });
                } else {
                    // 2. Se não encontrar legendas específicas, procurar outros padrões
                    
                    // Procurar elementos de texto com termos comuns de legenda
                    const textElements = container.querySelectorAll('text');
                    
                    textElements.forEach(function(text) {
                        const textContent = text.textContent.toLowerCase();
                        
                        // Verificar se o texto parece ser uma legenda
                        if (textContent.includes('valor') || 
                            textContent.includes('total') || 
                            textContent.includes('investido') || 
                            textContent.includes('retorno') || 
                            textContent.includes('projeção') ||
                            textContent.includes('real')) {
                            
                            // Aplicar estilos extremos
                            text.setAttribute('fill', '#000000');
                            text.style.fill = '#000000';
                            text.style.color = '#000000';
                            text.style.fontWeight = '900'; // Ultra-bold
                            text.style.textShadow = '0 0 4px white, 0 0 4px white, 0 0 4px white'; // Sombra tripla
                            text.style.stroke = 'none';
                            text.style.opacity = '1';
                            
                            // Aumentar o tamanho da fonte
                            const fontSize = parseFloat(window.getComputedStyle(text).fontSize);
                            if (fontSize < 13) {
                                text.style.fontSize = '13px';
                            }
                            
                            // Tentar encontrar e estilizar o elemento pai para garantir
                            const parent = text.parentElement;
                            if (parent) {
                                parent.style.opacity = '1';
                                
                                // Se o pai for um grupo, pode conter um retângulo ou linha
                                const siblings = parent.querySelectorAll('rect, path, circle');
                                siblings.forEach(function(sibling) {
                                    sibling.style.opacity = '1';
                                    
                                    // Aumentar tamanho de retângulos/círculos para maior visibilidade
                                    if (sibling.tagName === 'RECT') {
                                        sibling.style.strokeWidth = '2px';
                                        sibling.style.stroke = '#000000';
                                    }
                                    
                                    if (sibling.tagName === 'CIRCLE') {
                                        sibling.setAttribute('r', '6');
                                        sibling.style.r = '6px';
                                    }
                                });
                            }
                        }
                    });
                    
                    // 3. Procurar outros padrões de legenda
                    // Grupos com retângulos e texto são muitas vezes legendas
                    const groups = container.querySelectorAll('g');
                    
                    groups.forEach(function(group) {
                        const hasRect = group.querySelector('rect') !== null;
                        const hasText = group.querySelector('text') !== null;
                        
                        if (hasRect && hasText) {
                            // Provavelmente é um item de legenda
                            applyLegendStyles(group);
                        }
                    });
                }
            });
        });
    }
    
    // Função auxiliar para aplicar estilos a uma legenda e seus elementos
    function applyLegendStyles(legend) {
        // Estilizar o contêiner da legenda
        legend.style.opacity = '1';
        
        // Estilizar todos os textos dentro da legenda
        legend.querySelectorAll('text, span, div, label').forEach(function(textElement) {
            textElement.style.color = '#000000';
            textElement.style.fill = '#000000';
            textElement.style.fontWeight = '900'; // Ultra-bold
            textElement.style.textShadow = '0 0 4px white, 0 0 4px white, 0 0 4px white'; // Sombra tripla
            textElement.style.stroke = 'none';
            textElement.style.opacity = '1';
            
            // Aumentar o tamanho da fonte
            const fontSize = parseFloat(window.getComputedStyle(textElement).fontSize);
            if (fontSize < 13) {
                textElement.style.fontSize = '13px';
            }
        });
        
        // Estilizar retângulos e círculos dentro da legenda
        legend.querySelectorAll('rect, circle').forEach(function(shape) {
            shape.style.opacity = '1';
            
            if (shape.tagName === 'RECT') {
                shape.style.strokeWidth = '2px';
                shape.style.stroke = '#000000';
            }
            
            if (shape.tagName === 'CIRCLE') {
                shape.setAttribute('r', '6');
                shape.style.r = '6px';
            }
        });
    }
    
    // Carregar CSS adicional para garantir contraste das legendas
    function loadLegendCSS() {
        const style = document.createElement('style');
        style.textContent = `
            /* Estilo específico para garantir visibilidade das legendas no tema claro */
            [data-theme="light"] #calc-1 .chart-legend *, 
            [data-theme="light"] #calc-2 .chart-legend *,
            [data-theme="light"] #calc-1 .legend *, 
            [data-theme="light"] #calc-2 .legend *,
            [data-theme="light"] #calc-1 [class*="legend"] *, 
            [data-theme="light"] #calc-2 [class*="legend"] * {
                color: #000000 !important;
                fill: #000000 !important;
                font-weight: 900 !important; /* Ultra-bold */
                text-shadow: 0 0 4px white, 0 0 4px white, 0 0 4px white !important; /* Sombra tripla */
                stroke: none !important;
                opacity: 1 !important;
            }
            
            /* Estilo para textos que podem ser legendas */
            [data-theme="light"] #calc-1 text, 
            [data-theme="light"] #calc-2 text {
                color: #000000 !important;
                fill: #000000 !important;
                font-weight: 900 !important;
                text-shadow: 0 0 4px white, 0 0 4px white !important;
                stroke: none !important;
                opacity: 1 !important;
                font-size: 13px !important;
            }
            
            /* Estilo para shapes nas legendas */
            [data-theme="light"] #calc-1 .legend rect,
            [data-theme="light"] #calc-2 .legend rect,
            [data-theme="light"] #calc-1 .chart-legend rect,
            [data-theme="light"] #calc-2 .chart-legend rect {
                stroke: #000000 !important;
                stroke-width: 2px !important;
                opacity: 1 !important;
            }
            
            /* Estilo para gráficos de linha */
            [data-theme="light"] #calc-1 path.line,
            [data-theme="light"] #calc-2 path.line,
            [data-theme="light"] #calc-1 .line path,
            [data-theme="light"] #calc-2 .line path {
                stroke-width: 3px !important;
                opacity: 1 !important;
            }
            
            /* Estilo para pontos */
            [data-theme="light"] #calc-1 circle,
            [data-theme="light"] #calc-2 circle {
                r: 5px !important;
                stroke-width: 2px !important;
                opacity: 1 !important;
            }
        `;
        
        document.head.appendChild(style);
        console.log("CSS adicional para legendas carregado");
    }
    
    // Carregar CSS inicial
    loadLegendCSS();
    
    // Aplicar correções iniciais após um pequeno intervalo
    setTimeout(fixLegends, 500);
    
    // Reforçar as correções após intervalos maiores para garantir que tudo seja corrigido
    setTimeout(fixLegends, 1500);
    setTimeout(fixLegends, 3000);
    
    // Observar mudanças no tema
    const themeObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'data-theme') {
                if (isLightTheme()) {
                    setTimeout(fixLegends, 300);
                }
            }
        });
    });
    
    // Iniciar observação de mudanças de tema
    themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
    });
    
    // Observar mudanças em calc-1 e calc-2 para aplicar correções a novos elementos
    const calculators = ['calc-1', 'calc-2'];
    
    calculators.forEach(function(calcId) {
        const calculator = document.getElementById(calcId);
        
        if (calculator) {
            const calcObserver = new MutationObserver(function(mutations) {
                if (isLightTheme()) {
                    setTimeout(fixLegends, 300);
                }
            });
            
            calcObserver.observe(calculator, {
                childList: true,
                subtree: true,
                attributes: true
            });
        }
    });
    
    // Adicionar manipulador de eventos para o botão de tema
    const themeToggleBtn = document.querySelector('.theme-toggle-btn');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function() {
            setTimeout(function() {
                if (isLightTheme()) {
                    fixLegends();
                }
            }, 300);
        });
    }
    
    console.log("Sistema de correção de legendas configurado com sucesso!");
});
