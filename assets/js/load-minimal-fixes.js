/**
 * Carrega as correções mínimas necessárias para o contraste no tema claro
 * Abordagem centralizada e simples, evitando conflitos
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log("Inicializando carregador de correções mínimas...");
    
    // Carregar CSS básico para contraste
    function loadContrastCSS() {
        if (!document.querySelector('link[href*="chart-theme-contrast.css"]')) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'assets/css/chart-theme-contrast.css';
            document.head.appendChild(link);
            console.log('CSS de contraste carregado');
        }
    }
    
    // Carregar scripts mínimos necessários
    function loadScripts() {
        // Lista dos scripts essenciais
        const scripts = [
            'assets/js/chart-contrast-fix.js', // Configurações básicas do Chart.js
            'assets/js/simple-legend-fix.js'   // Correção simples para legendas
        ];
        
        scripts.forEach(function(src) {
            if (!document.querySelector(`script[src="${src}"]`)) {
                const script = document.createElement('script');
                script.src = src;
                document.body.appendChild(script);
                console.log(`Script ${src} carregado`);
            }
        });
    }
    
    // Carregar recursos necessários
    loadContrastCSS();
    loadScripts();
    
    console.log("Carregador de correções mínimas inicializado com sucesso!");
});
