/**
 * Módulo para exibição e renderização de resultados gráficos
 * Complementa os outros módulos com funções de visualização
 */

const ExibicaoResultados = {
    /**
     * Cria ou atualiza um gráfico de linha para mostrar a evolução do investimento
     * @param {string} canvasId - ID do elemento canvas para o gráfico
     * @param {Array} labels - Array de labels para o eixo X (meses)
     * @param {Array} valores - Array de valores para o eixo Y (montante)
     * @param {Array} aportes - Array opcional com valores acumulados de aportes
     * @param {string} titulo - Título do gráfico
     * @return {object} - Referência ao objeto Chart.js criado
     */
    criarGraficoEvolucao(canvasId, labels, valores, aportes = null, titulo = 'Evolução do Investimento') {
        const ctx = document.getElementById(canvasId).getContext('2d');
        
        // Verificar se há um gráfico anterior e destruí-lo
        if (window[`chart_${canvasId}`]) {
            window[`chart_${canvasId}`].destroy();
        }
        
        // Dataset principal
        const datasets = [{
            label: 'Valor Acumulado',
            data: valores,
            borderColor: '#3498db',
            backgroundColor: 'rgba(52, 152, 219, 0.1)',
            borderWidth: 2,
            fill: true
        }];
        
        // Adicionar dataset de aportes se existir
        if (aportes) {
            datasets.push({
                label: 'Total Investido',
                data: aportes,
                borderColor: '#2ecc71',
                backgroundColor: 'rgba(46, 204, 113, 0.1)',
                borderWidth: 2,
                fill: true
            });
        }
        
        // Criar gráfico
        window[`chart_${canvasId}`] = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: titulo,
                    fontColor: '#ffffff'
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#ffffff',
                            callback: function(value) {
                                return new Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL'
                                }).format(value);
                            }
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#ffffff'
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: '#ffffff'
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + new Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL'
                                }).format(context.raw);
                            }
                        }
                    }
                },
                animations: {
                    tension: {
                        duration: 1000,
                        easing: 'linear',
                        from: 0.8,
                        to: 0.2,
                        loop: false
                    }
                }
            }
        });
        
        return window[`chart_${canvasId}`];
    },
    
    /**
     * Cria ou atualiza um gráfico de barras para comparar diferentes investimentos
     * @param {string} canvasId - ID do elemento canvas para o gráfico
     * @param {Array} labels - Array de labels (nomes dos investimentos)
     * @param {Array} valores - Array de valores para comparação
     * @param {string} titulo - Título do gráfico
     * @return {object} - Referência ao objeto Chart.js criado
     */
    criarGraficoComparativo(canvasId, labels, valores, titulo = 'Comparação de Investimentos') {
        const ctx = document.getElementById(canvasId).getContext('2d');
        
        // Verificar se há um gráfico anterior e destruí-lo
        if (window[`chart_${canvasId}`]) {
            window[`chart_${canvasId}`].destroy();
        }
        
        // Cores para as barras
        const cores = [
            '#2ecc71', // verde
            '#3498db', // azul
            '#e74c3c', // vermelho
            '#f39c12', // laranja
            '#9b59b6'  // roxo
        ];
        
        // Criar gráfico
        window[`chart_${canvasId}`] = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Valor Final',
                    data: valores,
                    backgroundColor: cores.slice(0, valores.length)
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: titulo,
                    fontColor: '#ffffff'
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#ffffff',
                            callback: function(value) {
                                return new Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL'
                                }).format(value);
                            }
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#ffffff'
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: '#ffffff'
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + new Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL'
                                }).format(context.raw);
                            }
                        }
                    }
                },
                animation: {
                    duration: 1000,
                    easing: 'easeOutQuart'
                }
            }
        });
        
        return window[`chart_${canvasId}`];
    },
    
    /**
     * Exibe os resultados de uma simulação na interface
     * @param {object} resultados - Objeto com os resultados da simulação
     * @param {string} containerId - ID do elemento que contém os resultados
     */
    exibirResultadosSimulacao(resultados, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        // Mostrar o container
        container.style.display = 'block';
        
        // Preencher os valores
        Object.keys(resultados).forEach(key => {
            const elem = container.querySelector(`#result${key.charAt(0).toUpperCase() + key.slice(1)}`);
            if (elem) {
                // Formatar valores conforme o tipo
                if (typeof resultados[key] === 'number') {
                    if (key.toLowerCase().includes('valor') || key.toLowerCase().includes('ganho')) {
                        elem.textContent = new Intl.NumberFormat('pt-BR', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        }).format(resultados[key]);
                    } else if (key.toLowerCase().includes('taxa') || key.toLowerCase().includes('inflacao')) {
                        elem.textContent = new Intl.NumberFormat('pt-BR', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        }).format(resultados[key]);
                    } else {
                        elem.textContent = resultados[key];
                    }
                } else {
                    elem.textContent = resultados[key];
                }
            }
        });
        
        // Verificar se precisa fazer scroll para os resultados
        setTimeout(() => {
            container.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
    },
    
    /**
     * Cria um gráfico de pizza para visualização de alocação
     * @param {string} canvasId - ID do elemento canvas para o gráfico
     * @param {Array} labels - Array de labels (categorias)
     * @param {Array} valores - Array de valores para cada categoria
     * @param {string} titulo - Título do gráfico
     * @return {object} - Referência ao objeto Chart.js criado
     */
    criarGraficoPizza(canvasId, labels, valores, titulo = 'Alocação') {
        const ctx = document.getElementById(canvasId).getContext('2d');
        
        // Verificar se há um gráfico anterior e destruí-lo
        if (window[`chart_${canvasId}`]) {
            window[`chart_${canvasId}`].destroy();
        }
        
        // Cores para as fatias
        const cores = [
            'rgba(52, 152, 219, 0.7)',  // azul
            'rgba(46, 204, 113, 0.7)',  // verde
            'rgba(231, 76, 60, 0.7)',   // vermelho
            'rgba(241, 196, 15, 0.7)',  // amarelo
            'rgba(155, 89, 182, 0.7)',  // roxo
            'rgba(52, 73, 94, 0.7)',    // azul escuro
            'rgba(230, 126, 34, 0.7)'   // laranja
        ];
        
        // Criar gráfico
        window[`chart_${canvasId}`] = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: valores,
                    backgroundColor: cores.slice(0, valores.length),
                    borderColor: 'rgba(30, 30, 30, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: titulo,
                    fontColor: '#ffffff'
                },
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            color: '#ffffff'
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const valor = context.raw;
                                const porcentagem = (valor / valores.reduce((a, b) => a + b, 0) * 100).toFixed(1);
                                return `${context.label}: ${porcentagem}%`;
                            }
                        }
                    }
                },
                animation: {
                    animateRotate: true,
                    animateScale: true
                }
            }
        });
        
        return window[`chart_${canvasId}`];
    }
};

// Exportar o módulo para uso global
window.ExibicaoResultados = ExibicaoResultados;