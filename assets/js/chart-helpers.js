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
     * Verifica se o tema atual é o tema claro
     * @return {boolean} - Verdadeiro se o tema atual for claro
     */
    isLightTheme() {
        return document.documentElement.hasAttribute('data-theme') && 
               document.documentElement.getAttribute('data-theme') === 'light';
    },
    
    /**
     * Configuração padrão para gráficos com tema escuro - Preservada sem modificações
     * para manter a aparência original do tema escuro
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
    },
    
    /**
     * Configuração padrão para gráficos com tema claro
     * @return {object} - Objeto de configuração para Chart.js
     */
    lightThemeConfig() {
        return {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#000000', // Texto preto para máximo contraste
                        font: {
                            family: "'Roboto Mono', monospace",
                            size: 12,
                            weight: 'bold' // Texto em negrito para melhor legibilidade
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.9)', // Fundo preto para máximo contraste
                    titleColor: '#ffffff', // Texto branco
                    bodyColor: '#ffffff', // Texto branco
                    borderColor: '#000000', // Borda preta
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
                        color: 'rgba(0, 0, 0, 0.2)', // Linhas de grade mais escuras
                        drawBorder: false
                    },
                    ticks: {
                        color: '#000000', // Texto preto
                        font: {
                            family: "'Roboto Mono', monospace",
                            size: 12,
                            weight: 'bold' // Negrito para melhor legibilidade
                        },
                        padding: 10
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(0, 0, 0, 0.2)', // Linhas de grade mais escuras
                        drawBorder: false
                    },
                    ticks: {
                        color: '#000000', // Texto preto
                        font: {
                            family: "'Roboto Mono', monospace",
                            size: 12,
                            weight: 'bold' // Negrito para melhor legibilidade
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
    },
    
    /**
     * Retorna a configuração adequada com base no tema atual
     * @return {object} - Objeto de configuração para Chart.js
     */
    getThemeConfig() {
        return this.isLightTheme() ? this.lightThemeConfig() : this.darkThemeConfig();
    },
    
    /**
     * Cores para os gráficos adaptadas ao tema
     * @param {boolean} isLightTheme - Indica se o tema atual é claro
     * @return {object} - Objeto com conjuntos de cores
     */
    getChartColors(isLightTheme = null) {
        if (isLightTheme === null) {
            isLightTheme = this.isLightTheme();
        }
        
        if (isLightTheme) {
            return {
                // Cores mais escuras para fundo branco/claro
                primary: '#0957c3', // Azul escuro
                secondary: '#083a7a', // Azul ainda mais escuro
                success: '#157f3d', // Verde escuro
                danger: '#c42c2c', // Vermelho escuro
                warning: '#b06000', // Laranja escuro
                info: '#0c6a7a', // Ciano escuro
                background: 'rgba(9, 87, 195, 0.15)', // Azul com baixa opacidade
                border: '#000000',
                text: '#000000'
            };
        } else {
            return {
                // Cores ORIGINAIS do tema escuro - não modificadas
                primary: '#3498db', // Azul claro
                secondary: '#5dade2', // Azul mais claro
                success: '#2ecc71', // Verde claro
                danger: '#e74c3c', // Vermelho claro
                warning: '#f39c12', // Laranja claro
                info: '#3498db', // Ciano claro
                background: 'rgba(52, 152, 219, 0.2)', // Azul com baixa opacidade
                border: '#ffffff',
                text: '#ffffff'
            };
        }
    }
};

// Exportar para uso global
window.ChartHelpers = ChartHelpers;
