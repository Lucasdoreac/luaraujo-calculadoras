/**
 * Correções diretas para gráficos no modo claro
 * Este script aplica correções específicas direto nos elementos SVG dos gráficos
 * Foco especial nos calculadores calc-1 e calc-2 que apresentam problemas
 */

// Executar depois que o documento estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    console.log("Aplicando correções diretas aos gráficos...");
    
    // Função para verificar se o tema é claro
    function isLightTheme() {
        return document.documentElement.hasAttribute('data-theme') && 
               document.documentElement.getAttribute('data-theme') === 'light';
    }
    
    // Função para aplicar estilo agressivo em todos os textos de um elemento
    function forceTextContrast(container) {
        if (!container) return;
        
        // Aplicar em todos os elementos de texto dentro do contêiner
        container.querySelectorAll('text').forEach(function(text) {
            text.setAttribute('fill', '#000000');
            text.style.fill = '#000000';
            text.style.color = '#000000';
            text.style.fontWeight = '900'; // Ultra-bold
            text.style.textShadow = '0 0 3px white, 0 0 3px white'; // Sombra branca dupla
            text.style.stroke = 'none';
            text.style.opacity = '1';
            
            // Aumentar texto se for muito pequeno
            const fontSize = parseFloat(window.getComputedStyle(text).fontSize);
            if (fontSize < 12) {
                text.style.fontSize = '12px';
            }
        });
    }
    
    // Função específica para corrigir o calc-1 e calc-2
    function fixCalc1And2() {
        // Verificar se estamos no tema claro
        if (!isLightTheme()) return;
        
        console.log("Aplicando correções específicas para calc-1 e calc-2...");
        
        // Corrigir calc-1
        const calc1Containers = document.querySelectorAll('#calc-1, [id^="calc-1"]');
        calc1Containers.forEach(function(calc) {
            // Corrigir todos os textos
            forceTextContrast(calc);
            
            // Corrigir especificamente legendas
            const legends = calc.querySelectorAll('.chart-legend, .legend, [class*="legend"]');
            legends.forEach(function(legend) {
                legend.querySelectorAll('*').forEach(function(el) {
                    if (el.tagName === 'TEXT' || el.tagName === 'SPAN' || el.tagName === 'DIV') {
                        el.style.color = '#000000';
                        el.style.fill = '#000000';
                        el.style.fontWeight = '900';
                        el.style.textShadow = '0 0 3px white, 0 0 3px white';
                    }
                });
            });
            
            // Corrigir linhas
            calc.querySelectorAll('path[stroke], line').forEach(function(line) {
                line.setAttribute('stroke-width', '3');
                line.style.strokeWidth = '3px';
                line.style.opacity = '1';
            });
            
            // Corrigir pontos
            calc.querySelectorAll('circle').forEach(function(circle) {
                circle.setAttribute('r', '5');
                circle.style.r = '5px';
                circle.setAttribute('stroke-width', '2');
                circle.style.strokeWidth = '2px';
                circle.style.opacity = '1';
            });
        });
        
        // Corrigir calc-2
        const calc2Containers = document.querySelectorAll('#calc-2, [id^="calc-2"]');
        calc2Containers.forEach(function(calc) {
            // Corrigir todos os textos
            forceTextContrast(calc);
            
            // Corrigir especificamente legendas
            const legends = calc.querySelectorAll('.chart-legend, .legend, [class*="legend"]');
            legends.forEach(function(legend) {
                legend.querySelectorAll('*').forEach(function(el) {
                    if (el.tagName === 'TEXT' || el.tagName === 'SPAN' || el.tagName === 'DIV') {
                        el.style.color = '#000000';
                        el.style.fill = '#000000';
                        el.style.fontWeight = '900';
                        el.style.textShadow = '0 0 3px white, 0 0 3px white';
                    }
                });
            });
            
            // Corrigir linhas
            calc.querySelectorAll('path[stroke], line').forEach(function(line) {
                line.setAttribute('stroke-width', '3');
                line.style.strokeWidth = '3px';
                line.style.opacity = '1';
            });
            
            // Corrigir pontos
            calc.querySelectorAll('circle').forEach(function(circle) {
                circle.setAttribute('r', '5');
                circle.style.r = '5px';
                circle.setAttribute('stroke-width', '2');
                circle.style.strokeWidth = '2px';
                circle.style.opacity = '1';
            });
        });
    }
    
    // Função principal para corrigir contraste nos gráficos
    function fixGraphContrast() {
        // Não fazer nada se estiver no tema escuro
        if (!isLightTheme()) return;
        
        console.log("Aplicando correções de contraste para tema claro...");
        
        // Primeiro aplicamos correções específicas para calc-1 e calc-2
        fixCalc1And2();
        
        // 1. Corrigir textos em SVGs genéricos (que não estejam em calc-1 ou calc-2)
        document.querySelectorAll('svg text:not([data-fixed="true"])').forEach(function(text) {
            // Verificar se este elemento não está dentro de calc-1 ou calc-2
            if (!text.closest('#calc-1') && !text.closest('#calc-2') && 
                !text.closest('[id^="calc-1"]') && !text.closest('[id^="calc-2"]')) {
                text.setAttribute('fill', '#000000');
                text.style.fill = '#000000';
                text.style.color = '#000000';
                text.style.fontWeight = 'bold';
                text.style.textShadow = 'none';
                text.style.stroke = 'none';
                text.style.opacity = '1';
                text.setAttribute('data-fixed', 'true');
            }
        });
        
        // 2. Corrigir pontos em gráficos de linha
        document.querySelectorAll('svg circle:not([data-fixed="true"])').forEach(function(circle) {
            // Verificar se este elemento não está dentro de calc-1 ou calc-2
            if (!circle.closest('#calc-1') && !circle.closest('#calc-2') && 
                !circle.closest('[id^="calc-1"]') && !circle.closest('[id^="calc-2"]')) {
                // Aumentar o tamanho dos pontos
                if (parseFloat(circle.getAttribute('r') || '2') < 4) {
                    circle.setAttribute('r', '4');
                    circle.style.r = '4px';
                }
                
                // Garantir borda visível
                if (parseFloat(circle.getAttribute('stroke-width') || '1') < 2) {
                    circle.setAttribute('stroke-width', '2');
                    circle.style.strokeWidth = '2px';
                }
                
                // Garantir opacidade total
                circle.style.opacity = '1';
                circle.setAttribute('data-fixed', 'true');
            }
        });
        
        // 3. Corrigir linhas em gráficos
        document.querySelectorAll('svg path.line:not([data-fixed="true"]), svg path[stroke]:not([fill]):not([data-fixed="true"]), svg line:not([data-fixed="true"])').forEach(function(line) {
            // Verificar se este elemento não está dentro de calc-1 ou calc-2
            if (!line.closest('#calc-1') && !line.closest('#calc-2') && 
                !line.closest('[id^="calc-1"]') && !line.closest('[id^="calc-2"]')) {
                // Aumentar espessura de linhas para melhor visibilidade
                if (parseFloat(line.getAttribute('stroke-width') || '1') < 3) {
                    line.setAttribute('stroke-width', '3');
                    line.style.strokeWidth = '3px';
                }
                
                // Garantir opacidade total
                line.style.opacity = '1';
                line.setAttribute('data-fixed', 'true');
            }
        });
        
        // 7. Corrigir barras em gráficos de barras
        document.querySelectorAll('rect.bar:not([data-fixed="true"]), .bar rect:not([data-fixed="true"])').forEach(function(bar) {
            // Verificar se este elemento não está dentro de calc-1 ou calc-2
            if (!bar.closest('#calc-1') && !bar.closest('#calc-2') && 
                !bar.closest('[id^="calc-1"]') && !bar.closest('[id^="calc-2"]')) {
                bar.style.stroke = '#083a7a';
                bar.style.strokeWidth = '1px';
                bar.style.opacity = '1';
                bar.setAttribute('data-fixed', 'true');
            }
        });
        
        // 8. Corrigir seções de análise
        document.querySelectorAll('.analise-retorno, .analise-comparativa, [class*="analise"], [id*="analise"]').forEach(function(section) {
            // Tratar texto nos elementos da seção
            section.querySelectorAll('span, div, p').forEach(function(element) {
                // Se não estiver dentro de um fundo azul, tornar preto
                if (!element.closest('.bg-primary') && 
                    !element.closest('.blue-background') && 
                    getComputedStyle(element).backgroundColor !== 'rgb(9, 87, 195)') {
                    element.style.color = '#000000';
                    element.style.textShadow = 'none';
                    element.style.fontWeight = 'bold';
                }
            });
            
            // Tratar cabeçalhos azuis
            section.querySelectorAll('.card-header, h3, h4, h5').forEach(function(header) {
                if (header.textContent && (
                    header.textContent.includes('Análise') || 
                    header.textContent.includes('Retorno') || 
                    header.textContent.includes('Comparativa'))) {
                    header.style.backgroundColor = '#0957c3';
                    header.style.color = '#ffffff';
                    header.style.fontWeight = 'bold';
                    header.style.padding = '8px';
                    header.style.borderRadius = '4px';
                }
            });
        });
    }
    
    // Aplicar correções iniciais
    setTimeout(fixGraphContrast, 500);
    
    // Reforçar as correções após algum tempo para garantir que todos os elementos foram carregados
    setTimeout(fixGraphContrast, 1500);
    
    // Aplicar correções novamente depois de 3 segundos (para elementos dinâmicos)
    setTimeout(fixGraphContrast, 3000);
    
    // Observar mudanças no DOM para corrigir novos elementos
    const observer = new MutationObserver(function(mutations) {
        // Verificar se estamos no tema claro
        if (!isLightTheme()) return;
        
        let shouldFix = false;
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                shouldFix = true;
            } else if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                shouldFix = true;
            }
        });
        
        // Aplicar correções se necessário
        if (shouldFix) {
            setTimeout(fixGraphContrast, 300);
        }
    });
    
    // Iniciar observação do DOM
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['data-theme', 'style', 'class']
    });
    
    // Observar diretamente a mudança de tema
    const themeObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'data-theme') {
                // Tema foi alterado, aplicar ou remover correções
                if (isLightTheme()) {
                    setTimeout(fixGraphContrast, 300);
                }
            }
        });
    });
    
    // Iniciar observação de mudanças no tema
    themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
    });
    
    // Tratar clique no botão de tema
    const themeToggleBtn = document.querySelector('.theme-toggle-btn');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function() {
            // Aguardar a mudança de tema e aplicar ou remover correções
            setTimeout(function() {
                if (isLightTheme()) {
                    fixGraphContrast();
                }
            }, 300);
        });
    }
    
    console.log("Correções diretas para gráficos configuradas com sucesso!");
});
