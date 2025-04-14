/**
 * Correções diretas para gráficos no modo claro
 * Este script aplica correções específicas direto nos elementos SVG dos gráficos
 */

// Executar depois que o documento estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    console.log("Aplicando correções diretas aos gráficos...");
    
    // Função para verificar se o tema é claro
    function isLightTheme() {
        return document.documentElement.hasAttribute('data-theme') && 
               document.documentElement.getAttribute('data-theme') === 'light';
    }
    
    // Função principal para corrigir contraste nos gráficos
    function fixGraphContrast() {
        // Não fazer nada se estiver no tema escuro
        if (!isLightTheme()) return;
        
        console.log("Aplicando correções de contraste para tema claro...");
        
        // 1. Corrigir textos em SVGs
        document.querySelectorAll('svg text').forEach(function(text) {
            text.setAttribute('fill', '#000000');
            text.style.fill = '#000000';
            text.style.color = '#000000';
            text.style.fontWeight = 'bold';
            text.style.textShadow = 'none';
            text.style.stroke = 'none';
            text.style.opacity = '1';
        });
        
        // 2. Corrigir pontos em gráficos de linha
        document.querySelectorAll('svg circle').forEach(function(circle) {
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
        });
        
        // 3. Corrigir linhas em gráficos
        document.querySelectorAll('svg path.line, svg path[stroke]:not([fill]), svg line').forEach(function(line) {
            // Aumentar espessura de linhas para melhor visibilidade
            if (parseFloat(line.getAttribute('stroke-width') || '1') < 3) {
                line.setAttribute('stroke-width', '3');
                line.style.strokeWidth = '3px';
            }
            
            // Garantir opacidade total
            line.style.opacity = '1';
        });
        
        // 4. Corrigir linhas de grade (mais suaves, mas visíveis)
        document.querySelectorAll('svg path.domain, svg .grid line, svg .grid path').forEach(function(grid) {
            grid.setAttribute('stroke', 'rgba(0, 0, 0, 0.3)');
            grid.style.stroke = 'rgba(0, 0, 0, 0.3)';
            grid.setAttribute('stroke-width', '0.8');
            grid.style.strokeWidth = '0.8px';
        });
        
        // 5. Corrigir legendas
        document.querySelectorAll('.chart-legend text, .chart-legend span, .legend text, .legend span').forEach(function(legend) {
            legend.style.color = '#000000';
            legend.style.fill = '#000000';
            legend.style.fontWeight = 'bold';
            legend.style.opacity = '1';
        });
        
        // 6. Corrigir elementos de texto específicos do calc-2
        document.querySelectorAll('#calc-2 .chart-container text, [id*="calc-2"] .chart-container text').forEach(function(text) {
            text.setAttribute('fill', '#000000');
            text.style.fill = '#000000';
            text.style.color = '#000000';
            text.style.fontWeight = 'bold';
            text.style.fontSize = '12px';
            text.style.opacity = '1';
        });
        
        // 7. Corrigir barras em gráficos de barras
        document.querySelectorAll('rect.bar, .bar rect').forEach(function(bar) {
            bar.style.stroke = '#083a7a';
            bar.style.strokeWidth = '1px';
            bar.style.opacity = '1';
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
