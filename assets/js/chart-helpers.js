/**
 * Módulo para auxiliar na criação e exibição de gráficos
 * Contém funções para corrigir problemas comuns de renderização
 */

const ChartHelpers = {
    /**
     * Prepara o container do gráfico para garantir renderização adequada
     * @param {string} canvasId - ID do elemento canvas
     */
    prepareChartContainer(canvasId) {
        const container = document.getElementById(canvasId).parentElement;
        
        // Adicionar classe de loading se ainda não existir
        if (!container.querySelector('.chart-loading')) {
            const loadingDiv = document.createElement('div');
            loadingDiv.className = 'chart-loading';
            loadingDiv.innerHTML = '<div class="spinner"></div>';
            container.appendChild(loadingDiv);
        }
        
        // Garantir que o container tem altura mínima
        if (getComputedStyle(container).height === '0px') {
            container.style.minHeight = '400px';
        }
    },
    
    /**
     * Remove o indicador de loading do gráfico
     * @param {string} canvasId - ID do elemento canvas
     */
    removeLoading(canvasId) {
        const container = document.getElementById(canvasId).parentElement;
        const loadingDiv = container.querySelector('.chart-loading');
        
        if (loadingDiv) {
            // Usar timeout para permitir que a animação de fade in do gráfico execute
            setTimeout(() => {
                loadingDiv.style.opacity = '0';
                setTimeout(() => {
                    if (loadingDiv.parentElement) {
                        loadingDiv.parentElement.removeChild(loadingDiv);
                    }
                }, 300);
            }, 500);
        }
    },
    
    /**
     * Formata valores monetários para o formato brasileiro
     * @param {number} valor - Valor a ser formatado
     * @return {string} - Valor formatado no padrão brasileiro
     */
    formatarMoeda(valor) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(valor);
    },
    
    /**
     * Formata valores percentuais para o formato brasileiro
     * @param {number} valor - Valor decimal (ex: 0.05 para 5%)
     * @return {string} - Valor formatado como percentual (ex: 5,00%)
     */
    formatarPorcentagem(valor) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'percent',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(valor);
    },
    
    /**
     * Configuração padrão para gráficos com tema escuro
     * @return {object} - Objeto de configuração para Chart.js
     */
    darkThemeConfig() {
        return {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#ffffff',
                        font: {
                            family: "'Roboto Mono', monospace",
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(30, 30, 30, 0.9)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    borderColor: '#333333',
                    borderWidth: 1,
                    padding: 10,
                    displayColors: true,
                    bodyFont: {
                        family: "'Roboto Mono', monospace",
                        size: 12
                    },
                    titleFont: {
                        family: "'Roboto Mono', monospace",
                        size: 14,
                        weight: 'bold'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#ffffff',
                        font: {
                            family: "'Roboto Mono', monospace",
                            size: 12
                        },
                        padding: 10
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#ffffff',
                        font: {
                            family: "'Roboto Mono', monospace",
                            size: 12
                        },
                        padding: 10
                    }
                }
            },
            animation: {
                duration: 1000,
                easing: 'easeOutQuart'
            }
        };
    }
};

// Exportar para uso global
window.ChartHelpers = ChartHelpers;
