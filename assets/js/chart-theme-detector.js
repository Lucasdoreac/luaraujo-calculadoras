/**
 * Detector de tema para aplicação correta de estilos em gráficos
 * Garante que os estilos de contraste sejam aplicados APENAS ao tema claro
 */

document.addEventListener('DOMContentLoaded', function() {
    const ChartThemeDetector = {
        // Inicializar o detector
        init() {
            // Verificar se a folha de estilo específica já está carregada
            this.ensureStyleSheet();
            
            // Aplicar classes iniciais com base no tema atual
            this.applyThemeClasses();
            
            // Observar mudanças de tema
            this.observeThemeChanges();
            
            // Verificar Chart.js e aplicar configurações apenas no tema claro
            this.setupChartJs();
            
            console.log('Chart Theme Detector inicializado com sucesso');
        },
        
        // Garantir que a folha de estilo específica esteja carregada
        ensureStyleSheet() {
            // Verificar se o CSS de temas para gráficos já está incluído
            let chartThemeCSS = document.querySelector('link[href*="chart-theme-contrast.css"]');
            
            if (!chartThemeCSS) {
                // Criar e adicionar a folha de estilo se não existir
                chartThemeCSS = document.createElement('link');
                chartThemeCSS.rel = 'stylesheet';
                chartThemeCSS.href = 'assets/css/chart-theme-contrast.css';
                document.head.appendChild(chartThemeCSS);
                console.log('Folha de estilo chart-theme-contrast.css carregada dinamicamente');
            }
        },
        
        // Verificar se o tema atual é claro
        isLightTheme() {
            return document.documentElement.hasAttribute('data-theme') && 
                   document.documentElement.getAttribute('data-theme') === 'light';
        },
        
        // Aplicar classes específicas com base no tema atual
        applyThemeClasses() {
            const isLightTheme = this.isLightTheme();
            
            // Adicionar classe específica ao body somente se for tema claro
            if (isLightTheme) {
                document.body.classList.add('light-theme-charts');
                document.body.classList.remove('dark-theme-charts');
                
                // Aplicar classes a todos os containers de gráficos
                const chartContainers = document.querySelectorAll('.chart-container');
                chartContainers.forEach(container => {
                    container.classList.add('light-theme-chart');
                    container.classList.remove('dark-theme-chart');
                });
            } else {
                // Para o tema escuro, apenas remover as classes de tema claro
                document.body.classList.remove('light-theme-charts');
                document.body.classList.add('dark-theme-charts');
                
                const chartContainers = document.querySelectorAll('.chart-container');
                chartContainers.forEach(container => {
                    container.classList.remove('light-theme-chart');
                    container.classList.add('dark-theme-chart');
                });
            }
        },
        
        // Observar mudanças no tema
        observeThemeChanges() {
            // Monitorar cliques no botão de alternância de tema
            const themeToggleBtn = document.querySelector('.theme-toggle-btn');
            if (themeToggleBtn) {
                themeToggleBtn.addEventListener('click', () => {
                    // Aguardar a mudança de tema ser aplicada
                    setTimeout(() => {
                        this.applyThemeClasses();
                        // Atualizar gráficos somente se mudar para tema claro
                        if (this.isLightTheme()) {
                            this.updateChartStyles();
                        } else {
                            // Se for tema escuro, restaurar configurações originais
                            this.restoreOriginalCharts();
                        }
                    }, 300);
                });
            }
            
            // Observar mudanças no atributo data-theme do html
            const observerConfig = { attributes: true, attributeFilter: ['data-theme'] };
            const htmlObserver = new MutationObserver((mutations) => {
                mutations.forEach(() => {
                    this.applyThemeClasses();
                    // Atualizar gráficos somente se mudar para tema claro
                    if (this.isLightTheme()) {
                        this.updateChartStyles();
                    } else {
                        // Se for tema escuro, restaurar configurações originais
                        this.restoreOriginalCharts();
                    }
                });
            });
            
            htmlObserver.observe(document.documentElement, observerConfig);
        },
        
        // Configurar Chart.js se disponível (apenas para tema claro)
        setupChartJs() {
            setTimeout(() => {
                if (typeof Chart !== 'undefined' && this.isLightTheme()) {
                    // Definir funções de plugin global para Chart.js apenas para tema claro
                    if (!Chart.plugins || !Chart.plugins.getAll().find(p => p.id === 'themeDetectorPlugin')) {
                        const themeDetectorPlugin = {
                            id: 'themeDetectorPlugin',
                            beforeDraw: (chart) => {
                                // Aplicar apenas se for tema claro
                                if (!this.isLightTheme()) return;
                                
                                const ctx = chart.ctx;
                                
                                // Forçar opacidade alta para todos os elementos
                                chart.data.datasets.forEach(dataset => {
                                    // Aumentar opacidade no tema claro
                                    if (dataset.backgroundColor && typeof dataset.backgroundColor === 'string' && 
                                        dataset.backgroundColor.includes('rgba')) {
                                        // Encontrar e substituir valores rgba com baixa opacidade
                                        dataset.backgroundColor = dataset.backgroundColor.replace(
                                            /rgba\((\d+,\s*\d+,\s*\d+),\s*[\d\.]+\)/g, 
                                            'rgba($1, 0.8)'
                                        );
                                    }
                                    
                                    if (dataset.borderColor && typeof dataset.borderColor === 'string') {
                                        // Garantir borda escura
                                        if (dataset.borderColor.includes('rgba')) {
                                            dataset.borderColor = dataset.borderColor.replace(
                                                /rgba\((\d+,\s*\d+,\s*\d+),\s*[\d\.]+\)/g, 
                                                'rgba($1, 1)'
                                            );
                                        }
                                    }
                                });
                            }
                        };
                        
                        // Registrar o plugin
                        if (Chart.register) {
                            Chart.register(themeDetectorPlugin);
                        } else if (Chart.plugins && Chart.plugins.register) {
                            Chart.plugins.register(themeDetectorPlugin);
                        }
                        
                        console.log('Plugin de detecção de tema registrado no Chart.js');
                    }
                }
            }, 500);
        },
        
        // Atualizar estilos de todos os gráficos na página (apenas no tema claro)
        updateChartStyles() {
            // Aplicar apenas se for tema claro
            if (!this.isLightTheme()) return;
            
            if (typeof Chart !== 'undefined' && Chart.instances) {
                // Atualizar todos os gráficos existentes
                Chart.instances.forEach(chart => {
                    if (chart && chart.update) {
                        // Forçar atualização completa
                        chart.update('none');
                    }
                });
                
                console.log('Estilos de gráficos atualizados para o tema claro');
            }
            
            // Atualizar também qualquer SVG ou elementos não-Chart.js
            this.updateSvgElements();
        },
        
        // Restaurar configurações originais dos gráficos para tema escuro
        restoreOriginalCharts() {
            if (typeof Chart !== 'undefined' && Chart.instances) {
                // Atualizar todos os gráficos existentes para remover modificações
                Chart.instances.forEach(chart => {
                    if (chart && chart.update) {
                        // Forçar atualização completa
                        chart.update('none');
                    }
                });
                
                console.log('Gráficos restaurados para o tema escuro original');
            }
            
            // Remover quaisquer atributos de estilo inline adicionados a elementos SVG
            document.querySelectorAll('svg text[data-theme-fixed="true"]').forEach(text => {
                text.style.fill = '';
                text.style.color = '';
                text.setAttribute('fill', '');
                text.removeAttribute('data-theme-fixed');
            });
            
            document.querySelectorAll('svg line[data-theme-fixed="true"], svg path[data-theme-fixed="true"]').forEach(element => {
                element.style.stroke = '';
                element.setAttribute('stroke', '');
                element.removeAttribute('data-theme-fixed');
            });
        },
        
        // Atualizar elementos SVG para garantir contraste adequado (apenas no tema claro)
        updateSvgElements() {
            // Aplicar apenas se for tema claro
            if (!this.isLightTheme()) return;
            
            // Encontrar todos os textos SVG na página
            document.querySelectorAll('svg text').forEach(text => {
                // Evitar sobrescrever textos que já têm classes específicas
                if (!text.hasAttribute('data-theme-fixed')) {
                    text.setAttribute('fill', '#000000');
                    text.style.fill = '#000000';
                    text.style.color = '#000000';
                    
                    // Marcar como fixado
                    text.setAttribute('data-theme-fixed', 'true');
                }
            });
            
            // Correção para linhas SVG
            document.querySelectorAll('svg line, svg path').forEach(element => {
                // Evitar sobrescrever elementos que já têm classes específicas
                if (!element.hasAttribute('data-theme-fixed')) {
                    // No tema claro, linhas mais escuras para maior contraste
                    if (element.getAttribute('stroke') && 
                        element.getAttribute('stroke').includes('rgba') && 
                        element.getAttribute('stroke').includes('0.1')) {
                        element.setAttribute('stroke', 'rgba(0, 0, 0, 0.3)');
                    }
                    
                    // Marcar como fixado
                    element.setAttribute('data-theme-fixed', 'true');
                }
            });
        }
    };
    
    // Inicializar o detector apenas se for tema claro
    if (document.documentElement.hasAttribute('data-theme') && 
        document.documentElement.getAttribute('data-theme') === 'light') {
        ChartThemeDetector.init();
    } else {
        // Para tema escuro, apenas garantir que o sistema esteja pronto para alternar
        // sem modificar nenhuma configuração
        ChartThemeDetector.observeThemeChanges();
    }
    
    // Exportar para uso global
    window.ChartThemeDetector = ChartThemeDetector;
});
