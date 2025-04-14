/**
 * Solução simples para garantir visibilidade das legendas de gráficos
 * Implementação minimalista para evitar conflitos
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log("Aplicando correção simples para legendas...");
    
    // Verificar se estamos no tema claro
    function isLightTheme() {
        return document.documentElement.hasAttribute('data-theme') && 
               document.documentElement.getAttribute('data-theme') === 'light';
    }
    
    // Função para adicionar estilos inline básicos para texto preto
    function ensureDarkText(element) {
        if (!element) return;
        
        element.style.color = '#000000';
        element.style.fill = '#000000';
        element.style.fontWeight = 'bold';
        element.style.opacity = '1';
    }
    
    // Função para garantir visibilidade das legendas
    function fixLegends() {
        // Não fazer nada se estiver no tema escuro
        if (!isLightTheme()) return;
        
        // Selecionar todos os elementos de legenda pelo nome da classe
        document.querySelectorAll('.legend, .chart-legend, [class*="legend"]').forEach(function(legend) {
            // Aplicar estilo ao contêiner da legenda
            legend.style.opacity = '1';
            
            // Aplicar estilo a todos os textos dentro da legenda
            legend.querySelectorAll('text, span, div, label').forEach(ensureDarkText);
        });
        
        // Garantir que textos em SVG sejam visíveis
        document.querySelectorAll('svg text').forEach(function(text) {
            if (isLightTheme()) {
                text.setAttribute('fill', '#000000');
                text.style.fill = '#000000';
            }
        });
    }
    
    // Aplicar correções iniciais
    setTimeout(fixLegends, 500);
    
    // Aplicar novamente após carregamento completo
    window.addEventListener('load', function() {
        setTimeout(fixLegends, 300);
    });
    
    // Observar mudanças no tema
    const themeObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'data-theme') {
                setTimeout(fixLegends, 300);
            }
        });
    });
    
    // Iniciar observação de mudanças no tema
    themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
    });
    
    // Monitorar clique no botão de tema
    const themeButton = document.querySelector('.theme-toggle-btn');
    if (themeButton) {
        themeButton.addEventListener('click', function() {
            setTimeout(fixLegends, 300);
        });
    }
    
    console.log("Correção simples para legendas aplicada com sucesso!");
});
