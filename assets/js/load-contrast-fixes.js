/**
 * Carregador automático de todas as correções de contraste
 * Garantindo que todos os arquivos CSS e JS de correção sejam carregados corretamente
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log("Iniciando carregamento de correções de contraste...");
    
    // Arquivos CSS a serem carregados
    const cssFiles = [
        'assets/css/chart-theme-contrast.css',
        'assets/css/analysis-sections-fix.css'
    ];
    
    // Arquivos JS a serem carregados
    const jsFiles = [
        'assets/js/chart-contrast-fix.js',
        'assets/js/chart-theme-detector.js',
        'assets/js/calc-2-specific-fix.js'
    ];
    
    // Função para carregar um arquivo CSS
    const loadCSS = (href) => {
        // Verificar se o arquivo já está carregado
        if (document.querySelector(`link[href="${href}"]`)) {
            console.log(`CSS já carregado: ${href}`);
            return;
        }
        
        // Criar e adicionar um novo link de folha de estilo
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        
        // Adicionar ao head
        document.head.appendChild(link);
        console.log(`CSS carregado: ${href}`);
    };
    
    // Função para carregar um arquivo JavaScript
    const loadJS = (src) => {
        // Verificar se o arquivo já está carregado
        if (document.querySelector(`script[src="${src}"]`)) {
            console.log(`JS já carregado: ${src}`);
            return;
        }
        
        // Criar e adicionar um novo script
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        
        // Adicionar ao body
        document.body.appendChild(script);
        console.log(`JS carregado: ${src}`);
    };
    
    // Carregar todos os arquivos CSS
    cssFiles.forEach(loadCSS);
    
    // Carregar todos os arquivos JavaScript
    jsFiles.forEach(loadJS);
    
    // Aplicar correções específicas para elementos presentes na página atual
    const applySpecificFixes = () => {
        // Detectar e corrigir elementos específicos por ID
        const specificElements = {
            'calc-2': () => {
                console.log('Aplicando correções específicas para calc-2');
                // Esta parte é tratada pelo arquivo calc-2-specific-fix.js
            },
            'analise-retorno': () => {
                console.log('Aplicando correções específicas para análise de retorno');
                // Buscar todos os elementos com classe ou ID que contenha "analise-retorno"
                document.querySelectorAll('[id*="analise-retorno"], [class*="analise-retorno"]').forEach(element => {
                    // Já tratado pelo CSS, mas podemos reforçar aqui
                    if (document.documentElement.getAttribute('data-theme') === 'light') {
                        element.classList.add('corrected-analysis');
                    }
                });
            },
            'analise-comparativa': () => {
                console.log('Aplicando correções específicas para análise comparativa');
                // Buscar todos os elementos com classe ou ID que contenha "analise-comparativa"
                document.querySelectorAll('[id*="analise-comparativa"], [class*="analise-comparativa"]').forEach(element => {
                    // Já tratado pelo CSS, mas podemos reforçar aqui
                    if (document.documentElement.getAttribute('data-theme') === 'light') {
                        element.classList.add('corrected-analysis');
                    }
                });
            }
        };
        
        // Verificar e aplicar correções para elementos específicos
        Object.keys(specificElements).forEach(id => {
            if (document.getElementById(id) || document.querySelector(`[class*="${id}"]`)) {
                specificElements[id]();
            }
        });
        
        // Verificar e aplicar correções para texto azul sobre fundo claro
        if (document.documentElement.getAttribute('data-theme') === 'light') {
            document.querySelectorAll('.text-primary, .text-info, [style*="color: rgb(9, 87, 195)"]').forEach(element => {
                // Se o elemento estiver sobre fundo claro, escurecer o azul
                const backgroundColor = window.getComputedStyle(element.parentElement).backgroundColor;
                if (backgroundColor === 'rgb(255, 255, 255)' || backgroundColor === 'rgba(0, 0, 0, 0)' || backgroundColor.startsWith('rgb(2')) {
                    element.style.color = '#0745a0'; // Azul mais escuro
                    element.style.fontWeight = 'bold';
                }
            });
        }
    };
    
    // Aplicar correções específicas
    setTimeout(applySpecificFixes, 500);
    // Reforçar as correções após algum tempo para garantir que tudo foi carregado
    setTimeout(applySpecificFixes, 1500);
    
    // Observar mudanças no tema
    const themeObserver = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                // Tema foi alterado, reaplicar correções específicas
                console.log('Tema alterado, reaplicando correções específicas');
                setTimeout(applySpecificFixes, 300);
            }
        });
    });
    
    // Iniciar observação do elemento HTML
    themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
    });
    
    console.log("Carregamento de correções de contraste concluído!");
});
