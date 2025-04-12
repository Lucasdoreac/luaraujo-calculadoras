/**
 * Correção para problemas com gráficos nas calculadoras
 * Este script corrige problemas de inicialização e destruição de gráficos
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log("Aplicando correções para os gráficos...");
    
    // Sobrescrever as funções que lidam com gráficos para garantir
    // que a destruição de gráficos anteriores seja feita corretamente
    
    // Verificar se a variável global Chart existe
    if (typeof Chart === 'undefined') {
        console.error("Biblioteca Chart.js não encontrada.");
        return;
    }
    
    // Correção para a função calcularRentabilidade
    if (typeof window.calcularRentabilidade === 'function') {
        const originalFunction = window.calcularRentabilidade;
        
        window.calcularRentabilidade = function() {
            // Corrigir destruição dos gráficos antes de chamar a função original
            if (window.chartSimulacao && typeof window.chartSimulacao.destroy === 'function') {
                console.log("Destruindo gráfico de simulação existente");
                window.chartSimulacao.destroy();
            } else {
                window.chartSimulacao = null;
            }
            
            if (window.chartComparacoes && typeof window.chartComparacoes.destroy === 'function') {
                console.log("Destruindo gráfico de comparações existente");
                window.chartComparacoes.destroy();
            } else {
                window.chartComparacoes = null;
            }
            
            // Chamar a função original
            return originalFunction.apply(this, arguments);
        };
        
        console.log("Função calcularRentabilidade corrigida");
    }
    
    // Correção para a função calcularPGBLCDB
    if (typeof window.calcularPGBLCDB === 'function') {
        const originalFunction = window.calcularPGBLCDB;
        
        window.calcularPGBLCDB = function() {
            // Corrigir destruição do gráfico PGBL vs CDB
            if (window.chartPgblCdb && typeof window.chartPgblCdb.destroy === 'function') {
                console.log("Destruindo gráfico PGBL vs CDB existente");
                window.chartPgblCdb.destroy();
            } else {
                window.chartPgblCdb = null;
            }
            
            // Chamar a função original
            return originalFunction.apply(this, arguments);
        };
        
        console.log("Função calcularPGBLCDB corrigida");
    }
    
    console.log("Correções de gráficos aplicadas com sucesso");
});
