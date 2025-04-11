/**
 * Script principal para o site de calculadoras financeiras
 * Inicializa componentes e configura eventos globais
 */

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar tooltips do Bootstrap (se houver)
    if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
    
    // Detectar e aplicar tema escuro (já é o padrão, mas para possível expansão futura)
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('theme-dark');
    }
    
    // Verificar se há parâmetros na URL para acionar simulações diretas
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('simular') && typeof iniciarSimulacao === 'function') {
        iniciarSimulacao(urlParams.get('simular'));
    }
    
    // Configurar eventos para explicações de conceitos financeiros
    document.querySelectorAll('.help-icon').forEach(icon => {
        if (!icon.hasAttribute('onclick')) {
            icon.addEventListener('click', function() {
                const conceptId = this.getAttribute('data-concept');
                if (conceptId) {
                    toggleConcept(conceptId);
                }
            });
        }
    });
});

/**
 * Função para alternar a visibilidade de explicações de conceitos
 * @param {string} conceptId - ID do elemento de explicação
 */
function toggleConcept(conceptId) {
    const conceptElement = document.getElementById(conceptId + 'Concept');
    if (conceptElement) {
        conceptElement.style.display = conceptElement.style.display === 'block' ? 'none' : 'block';
    }
}

/**
 * Formata um valor numérico para moeda brasileira
 * @param {number} valor - Valor a ser formatado
 * @return {string} - Valor formatado como moeda (ex: R$ 1.000,00)
 */
function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor);
}

/**
 * Formata um valor como percentual
 * @param {number} valor - Valor a ser formatado (ex: 0.05 para 5%)
 * @return {string} - Valor formatado como percentual (ex: 5,00%)
 */
function formatarPorcentagem(valor) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'percent',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(valor);
}

// Exportar funções úteis para uso global
window.formatarMoeda = formatarMoeda;
window.formatarPorcentagem = formatarPorcentagem;
window.toggleConcept = toggleConcept;