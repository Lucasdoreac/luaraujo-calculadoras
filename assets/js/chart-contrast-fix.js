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
    
    // Detectar o tema atual
    const isLightTheme = document.documentElement.hasAttribute('data-theme') && 
                        document.documentElement.getAttribute('data-theme') === 'light';
    
    // Modificar as opções padrão do Chart.js de acordo com o tema
    if (isLightTheme) {
        // Configurações de contraste para tema claro
        Chart.defaults.color = '#1a202c'; // Texto escuro para tema claro
        Chart.defaults.borderColor = '#718096'; // Bordas mais visíveis
        Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(26, 32, 44, 0.9)';
        Chart.defaults.plugins.tooltip.titleColor = '#ffffff';
        Chart.defaults.plugins.tooltip.bodyColor = '#ffffff';
        Chart.defaults.plugins.legend.labels.color = '#1a202c';
        Chart.defaults.plugins.title.color = '#1a202c';
    } else {
        // Configurações de contraste para tema escuro
        Chart.defaults.color = '#e0e0e0'; // Texto claro para tema escuro
        Chart.defaults.borderColor = '#5a5a5a'; // Bordas mais visíveis
        Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(52, 152, 219, 0.9)';
        Chart.defaults.plugins.tooltip.titleColor = '#ffffff';
        Chart.defaults.plugins.tooltip.bodyColor = '#ffffff';
        Chart.defaults.plugins.legend.labels.color = '#e0e0e0';
        Chart.defaults.plugins.title.color = '#e0e0e0';
    }
    
    // Melhorar a visibilidade das linhas de grade
    Chart.defaults.scale.grid.color = isLightTheme ? 'rgba(113, 128, 150, 0.2)' : 'rgba(90, 90, 90, 0.5)';
    Chart.defaults.scale.grid.lineWidth = 0.5;
    
    // Melhorar a visibilidade dos eixos
    Chart.defaults.scale.ticks.color = isLightTheme ? '#2d3748' : '#e0e0e0';
    Chart.defaults.scale.ticks.font.weight = '500';
    
    // Aumentar o peso da fonte para legendas
    Chart.defaults.plugins.legend.labels.font = {
        weight: 'bold'
    };
    
    // Estender as funções padrão do Chart.js para melhorar o contraste das legendas
    const originalLegendItemRender = Chart.Legend.prototype.legendItems;
    if (originalLegendItemRender) {
        Chart.Legend.prototype.legendItems = function() {
            const items = originalLegendItemRender.apply(this, arguments);
            
            // Aumentar o contraste das legendas
            if (isLightTheme) {
                items.forEach(item => {
                    item.fillStyle = item.fillStyle.replace(/rgba\((.*),\s*[\d\.]+\)/, 'rgba($1, 0.8)');
                    item.strokeStyle = item.strokeStyle.replace(/rgba\((.*),\s*[\d\.]+\)/, 'rgba($1, 1)');
                    item.fontColor = '#1a202c';
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
                const isLightTheme = document.documentElement.hasAttribute('data-theme') && 
                                   document.documentElement.getAttribute('data-theme') === 'light';
                
                // Atualizar configurações de acordo com o novo tema
                Chart.defaults.color = isLightTheme ? '#1a202c' : '#e0e0e0';
                Chart.defaults.borderColor = isLightTheme ? '#718096' : '#5a5a5a';
                Chart.defaults.scale.grid.color = isLightTheme ? 'rgba(113, 128, 150, 0.2)' : 'rgba(90, 90, 90, 0.5)';
                Chart.defaults.scale.ticks.color = isLightTheme ? '#2d3748' : '#e0e0e0';
                
                // Atualizar todos os gráficos existentes
                Chart.instances.forEach(chart => {
                    if (chart && chart.update) {
                        chart.update();
                    }
                });
            }, 300);
        });
    }
    
    // Configurações específicas para problemas identificados nas imagens
    const fixProjecaoLegends = () => {
        // Encontrar todos os textos do SVG que contêm "Projeção"
        const svgTexts = document.querySelectorAll('text');
        
        svgTexts.forEach(text => {
            if (text.textContent && text.textContent.includes('Projeção')) {
                if (isLightTheme) {
                    text.setAttribute('fill', '#1a202c');
                    text.setAttribute('stroke', 'none');
                    text.style.fontWeight = 'bold';
                }
            }
        });
        
        // Corrigir legendas em elementos canvas
        const canvasElements = document.querySelectorAll('canvas');
        canvasElements.forEach(canvas => {
            const parentDiv = canvas.parentElement;
            if (parentDiv && parentDiv.classList.contains('chart-container')) {
                // Aplicar estilo à div que contém a legenda
                const legendElements = parentDiv.querySelectorAll('.chartjs-legend, .chart-legend');
                legendElements.forEach(legend => {
                    if (isLightTheme) {
                        legend.style.color = '#1a202c';
                        legend.style.fontWeight = 'bold';
                    }
                });
            }
        });
    };
    
    // Aplicar as correções de legenda quando a página estiver pronta
    setTimeout(fixProjecaoLegends, 1000);
    
    // Também aplicar quando novos gráficos forem criados
    const originalAcquireContext = Chart.helpers.acquireContext;
    if (originalAcquireContext) {
        Chart.helpers.acquireContext = function() {
            const result = originalAcquireContext.apply(this, arguments);
            setTimeout(fixProjecaoLegends, 500);
            return result;
        };
    }
    
    console.log("Melhorias de contraste para gráficos aplicadas com sucesso!");
});
