/**
 * Script simplificado para aplicar configurações de contraste aos gráficos
 * Abordagem minimalista para evitar conflitos
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log("Aplicando configurações básicas de contraste...");
    
    // Verificar se a biblioteca Chart.js está disponível
    if (typeof Chart === 'undefined') {
        console.error("Biblioteca Chart.js não encontrada.");
        return;
    }
    
    // Configurações originais para tema escuro
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
    
    // Função para verificar se o tema é claro
    function isLightTheme() {
        return document.documentElement.hasAttribute('data-theme') && 
               document.documentElement.getAttribute('data-theme') === 'light';
    }
    
    // Função para aplicar configurações básicas ao Chart.js
    function applyChartSettings() {
        if (isLightTheme()) {
            // Configurações para tema claro
            Chart.defaults.color = '#000000';
            Chart.defaults.borderColor = '#444444';
            
            // Configurar tooltips
            if (Chart.defaults.plugins && Chart.defaults.plugins.tooltip) {
                Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(0, 0, 0, 0.9)';
                Chart.defaults.plugins.tooltip.titleColor = '#ffffff';
                Chart.defaults.plugins.tooltip.bodyColor = '#ffffff';
            }
            
            // Configurar legendas
            if (Chart.defaults.plugins && Chart.defaults.plugins.legend && Chart.defaults.plugins.legend.labels) {
                Chart.defaults.plugins.legend.labels.color = '#000000';
            }
            
            // Configurar título
            if (Chart.defaults.plugins && Chart.defaults.plugins.title) {
                Chart.defaults.plugins.title.color = '#000000';
            }
            
            // Configurar grade
            if (Chart.defaults.scale && Chart.defaults.scale.grid) {
                Chart.defaults.scale.grid.color = 'rgba(0, 0, 0, 0.2)';
            }
            
            // Configurar eixos
            if (Chart.defaults.scale && Chart.defaults.scale.ticks) {
                Chart.defaults.scale.ticks.color = '#000000';
            }
        } else {
            // Restaurar configurações para tema escuro
            Chart.defaults.color = originalDarkThemeDefaults.color;
            Chart.defaults.borderColor = originalDarkThemeDefaults.borderColor;
            
            if (Chart.defaults.plugins && Chart.defaults.plugins.tooltip) {
                Chart.defaults.plugins.tooltip.backgroundColor = originalDarkThemeDefaults.tooltipBg;
                Chart.defaults.plugins.tooltip.titleColor = originalDarkThemeDefaults.tooltipTitleColor;
                Chart.defaults.plugins.tooltip.bodyColor = originalDarkThemeDefaults.tooltipBodyColor;
            }
            
            if (Chart.defaults.plugins && Chart.defaults.plugins.legend && Chart.defaults.plugins.legend.labels) {
                Chart.defaults.plugins.legend.labels.color = originalDarkThemeDefaults.legendColor;
            }
            
            if (Chart.defaults.plugins && Chart.defaults.plugins.title) {
                Chart.defaults.plugins.title.color = originalDarkThemeDefaults.titleColor;
            }
            
            if (Chart.defaults.scale && Chart.defaults.scale.grid) {
                Chart.defaults.scale.grid.color = originalDarkThemeDefaults.gridColor;
            }
            
            if (Chart.defaults.scale && Chart.defaults.scale.ticks) {
                Chart.defaults.scale.ticks.color = originalDarkThemeDefaults.ticksColor;
            }
        }
    }
    
    // Adicionar o CSS básico para contraste
    function addBasicCSS() {
        // Verificar se o CSS já está carregado
        if (!document.querySelector('link[href*="chart-theme-contrast.css"]')) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'assets/css/chart-theme-contrast.css';
            document.head.appendChild(link);
            console.log('CSS de contraste carregado');
        }
    }
    
    // Aplicar configurações iniciais
    applyChartSettings();
    addBasicCSS();
    
    // Atualizar gráficos existentes quando as configurações forem aplicadas
    function updateCharts() {
        if (Chart.instances) {
            Chart.instances.forEach(chart => {
                if (chart && chart.update) {
                    chart.update();
                }
            });
        }
    }
    
    // Observar mudanças de tema
    const themeObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'data-theme') {
                applyChartSettings();
                updateCharts();
            }
        });
    });
    
    // Iniciar observação para mudanças de tema
    themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
    });
    
    // Monitorar clique no botão de tema
    const themeButton = document.querySelector('.theme-toggle-btn');
    if (themeButton) {
        themeButton.addEventListener('click', function() {
            setTimeout(function() {
                applyChartSettings();
                updateCharts();
            }, 300);
        });
    }
    
    console.log("Configurações básicas de contraste aplicadas com sucesso!");
});
