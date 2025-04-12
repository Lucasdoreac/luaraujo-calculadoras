/**
 * Arquivo de correção para o simulador PGBL vs CDB
 * Este arquivo contém uma versão alternativa da função de cálculo do simulador
 * para garantir que os resultados sejam exibidos corretamente.
 */

// Verificar se a biblioteca Chart.js está disponível
function verificarBibliotecas() {
    if (typeof Chart === 'undefined') {
        console.error("Erro: Chart.js não está carregado. Verifique as dependências.");
        alert("Não foi possível carregar as bibliotecas necessárias. Tente recarregar a página.");
        return false;
    }
    
    if (typeof ChartHelpers === 'undefined') {
        console.error("Erro: ChartHelpers não está carregado. Verifique as dependências.");
        alert("Não foi possível carregar as bibliotecas auxiliares. Tente recarregar a página.");
        return false;
    }
    
    return true;
}

// Função para garantir que os elementos DOM estão disponíveis
function verificarElementos() {
    const elementosRequeridos = [
        'rendaTributavel', 'aporteInicial', 'anos', 'cdi', 'taxaAdministracao', 
        'aliquotaIR_PGBL', 'resultados', 'chartComparativo', 'tabelaDetalhes'
    ];
    
    for (const id of elementosRequeridos) {
        if (!document.getElementById(id)) {
            console.error(`Erro: Elemento com ID '${id}' não encontrado.`);
            return false;
        }
    }
    
    return true;
}

// Alternativa para a função calcular
function calcularPGBLvsCDB() {
    // Verificar dependências
    if (!verificarBibliotecas() || !verificarElementos()) {
        return false;
    }
    
    console.log("Iniciando cálculos PGBL vs CDB...");
    
    try {
        // Preparar container do gráfico
        ChartHelpers.prepareChartContainer('chartComparativo');
        
        // Obter valores dos inputs com tratamento de erro
        const rendaTributavel = parseFloat(document.getElementById('rendaTributavel').value) || 0;
        const aporteInicial = parseFloat(document.getElementById('aporteInicial').value) || 0;
        const anos = parseInt(document.getElementById('anos').value) || 0;
        const cdi = parseFloat(document.getElementById('cdi').value) / 100 || 0;
        const taxaAdministracao = parseFloat(document.getElementById('taxaAdministracao').value) / 100 || 0;
        const aliquotaIRPGBL = parseFloat(document.getElementById('aliquotaIR_PGBL').value) / 100 || 0;
        
        console.log("Valores obtidos:", { rendaTributavel, aporteInicial, anos, cdi, taxaAdministracao, aliquotaIRPGBL });
        
        // Validar entradas
        if (rendaTributavel <= 0) {
            alert("Por favor, insira uma renda anual tributável válida.");
            ChartHelpers.removeLoading('chartComparativo');
            return false;
        }
        if (anos <= 0) {
            alert("Por favor, insira um período de investimento válido.");
            ChartHelpers.removeLoading('chartComparativo');
            return false;
        }
        if (cdi <= 0) {
            alert("Por favor, insira uma taxa do CDI válida.");
            ChartHelpers.removeLoading('chartComparativo');
            return false;
        }
        
        // Constantes
        const aliquotaIR = 0.275; // 27,5% (alíquota máxima IR para dedução)
        const aporteAnual = rendaTributavel * 0.12; // 12% da renda tributável (limite PGBL)
        
        // Inicializar variáveis
        let pgblSaldo = aporteInicial;
        let pgblDesembolso = aporteInicial;
        let cdbSaldo = aporteInicial;
        let cdbDesembolso = aporteInicial;
        let totalTaxaAdministracao = 0;
        
        // Limpar tabela de detalhes
        const tabelaDetalhes = document.getElementById('tabelaDetalhes').getElementsByTagName('tbody')[0];
        tabelaDetalhes.innerHTML = "";
        
        // Arrays para o gráfico
        const anosLabels = ['Inicial'];
        const pgblData = [aporteInicial];
        const cdbData = [aporteInicial];
        
        // Calcular acumulação ao longo dos anos
        for (let i = 1; i <= anos; i++) {
            anosLabels.push(`Ano ${i}`);
            
            // PGBL: No primeiro ano, não há restituição
            const restituicao = i === 1 ? 0 : aporteAnual * aliquotaIR;
            const aporteEfetivo = i === 1 ? aporteAnual : aporteAnual - restituicao;
            pgblDesembolso += aporteEfetivo;
            
            // Calcular rendimento PGBL (descontando taxa de administração)
            const rendimentoBruto = pgblSaldo * cdi;
            const taxaAdmValor = (pgblSaldo + aporteAnual) * taxaAdministracao;
            totalTaxaAdministracao += taxaAdmValor;
            const rendimentoLiquido = rendimentoBruto - taxaAdmValor;
            pgblSaldo = pgblSaldo + rendimentoLiquido + aporteAnual;
            
            // CDB: Aporte fixo anual (não há restituição)
            cdbDesembolso += aporteAnual;
            cdbSaldo = (cdbSaldo + aporteAnual) * (1 + cdi);
            
            // Dados para o gráfico
            pgblData.push(pgblSaldo);
            cdbData.push(cdbSaldo);
            
            // Adicionar linha na tabela de detalhes
            const row = tabelaDetalhes.insertRow();
            row.insertCell().innerText = i;
            row.insertCell().innerText = ChartHelpers.formatarMoeda(aporteAnual);
            row.insertCell().innerText = ChartHelpers.formatarMoeda(restituicao);
            row.insertCell().innerText = ChartHelpers.formatarMoeda(pgblSaldo);
            row.insertCell().innerText = ChartHelpers.formatarMoeda(aporteAnual);
            row.insertCell().innerText = ChartHelpers.formatarMoeda(cdbSaldo);
        }
        
        // Adicionar linha de totalização na tabela
        const rowTotal = tabelaDetalhes.insertRow();
        rowTotal.classList.add('total');
        rowTotal.insertCell().innerText = "Total";
        rowTotal.insertCell().innerText = ChartHelpers.formatarMoeda(aporteAnual * anos);
        rowTotal.insertCell().innerText = ChartHelpers.formatarMoeda(aporteAnual * aliquotaIR * (anos - 1));
        rowTotal.insertCell().innerText = ""; // Saldo PGBL não é somado
        rowTotal.insertCell().innerText = ChartHelpers.formatarMoeda(aporteAnual * anos);
        rowTotal.insertCell().innerText = ""; // Saldo CDB não é somado
        
        // Calcular IR no resgate
        const pgblIR = pgblSaldo * aliquotaIRPGBL;
        const pgblLiquido = pgblSaldo - pgblIR;
        
        // Função para calcular a alíquota de IR do CDB com base no período
        function calcularAliquotaIRCDB(meses) {
            if (meses <= 6) return 0.225; // 22,5%
            if (meses <= 12) return 0.20; // 20%
            if (meses <= 24) return 0.175; // 17,5%
            return 0.15; // 15% (acima de 24 meses)
        }
        
        const meses = anos * 12; // Converter anos em meses
        const aliquotaCDB = calcularAliquotaIRCDB(meses);
        const cdbRendimentos = cdbSaldo - cdbDesembolso; // Rendimentos = Saldo - Aportes
        const cdbIR = cdbRendimentos * aliquotaCDB; // IR sobre os rendimentos
        const cdbLiquido = cdbSaldo - cdbIR; // Valor líquido após IR
        
        // Verificar se os elementos de resultado existem antes de tentar atualizá-los
        const updateElement = (id, value) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = value;
            } else {
                console.error(`Elemento não encontrado: ${id}`);
            }
        };
        
        // Exibir resultados
        updateElement('pgblAcumulado', ChartHelpers.formatarMoeda(pgblSaldo));
        updateElement('pgblDesembolso', ChartHelpers.formatarMoeda(pgblDesembolso));
        updateElement('pgblIR', ChartHelpers.formatarMoeda(pgblIR));
        updateElement('pgblLiquido', ChartHelpers.formatarMoeda(pgblLiquido));
        updateElement('pgblTaxaAdm', ChartHelpers.formatarMoeda(totalTaxaAdministracao));
        
        updateElement('cdbAcumulado', ChartHelpers.formatarMoeda(cdbSaldo));
        updateElement('cdbDesembolso', ChartHelpers.formatarMoeda(cdbDesembolso));
        updateElement('cdbIR', ChartHelpers.formatarMoeda(cdbIR));
        updateElement('cdbLiquido', ChartHelpers.formatarMoeda(cdbLiquido));
        
        // Análise comparativa
        const diferencaLiquida = pgblLiquido - cdbLiquido;
        const totalRestituido = aporteAnual * aliquotaIR * (anos - 1);
        const rentabilidadePGBL = ((pgblLiquido - pgblDesembolso) / pgblDesembolso) * 100;
        const rentabilidadeCDB = ((cdbLiquido - cdbDesembolso) / cdbDesembolso) * 100;
        
        updateElement('diferencaLiquida', ChartHelpers.formatarMoeda(diferencaLiquida));
        updateElement('totalRestituido', ChartHelpers.formatarMoeda(Math.abs(totalRestituido)));
        updateElement('rentabilidadePGBL', rentabilidadePGBL.toFixed(2) + "%");
        updateElement('rentabilidadeCDB', rentabilidadeCDB.toFixed(2) + "%");
        
        // Recomendação
        const recomendacao = document.getElementById('recomendacao');
        const recomendacaoAlert = document.getElementById('recomendacaoAlert');
        
        if (recomendacao && recomendacaoAlert) {
            if (diferencaLiquida > 0) {
                recomendacao.textContent = `O PGBL é mais vantajoso neste cenário, apresentando uma diferença de ${ChartHelpers.formatarMoeda(diferencaLiquida)} a favor.`;
                recomendacaoAlert.className = 'alert alert-primary mt-3';
            } else {
                recomendacao.textContent = `O CDB é mais vantajoso neste cenário, apresentando uma diferença de ${ChartHelpers.formatarMoeda(Math.abs(diferencaLiquida))} a favor.`;
                recomendacaoAlert.className = 'alert alert-success mt-3';
            }
        }
        
        // Gráfico comparativo
        const ctxChart = document.getElementById('chartComparativo');
        if (!ctxChart) {
            console.error("Elemento canvas para o gráfico não encontrado");
            return false;
        }
        
        const ctx = ctxChart.getContext('2d');
        
        // Destruir gráfico anterior se existir
        if (window.chartComparativo && typeof window.chartComparativo.destroy === 'function') {
            window.chartComparativo.destroy();
        }
        
        // Configuração do gráfico com tema escuro
        const configGrafico = {
            type: 'line',
            data: {
                labels: anosLabels,
                datasets: [
                    {
                        label: 'PGBL',
                        data: pgblData,
                        borderColor: '#3498db',
                        backgroundColor: 'rgba(52, 152, 219, 0.1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'CDB',
                        data: cdbData,
                        borderColor: '#2ecc71',
                        backgroundColor: 'rgba(46, 204, 113, 0.1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4
                    }
                ]
            },
            options: {
                ...ChartHelpers.darkThemeConfig(),
                plugins: {
                    ...ChartHelpers.darkThemeConfig().plugins,
                    tooltip: {
                        ...ChartHelpers.darkThemeConfig().plugins.tooltip,
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + ChartHelpers.formatarMoeda(context.raw);
                            }
                        }
                    }
                }
            }
        };
        
        // Criar gráfico
        window.chartComparativo = new Chart(ctx, configGrafico);
        
        // Remover indicador de loading
        ChartHelpers.removeLoading('chartComparativo');
        
        // Mostrar resultados - forçar exibição do container de resultados
        const resultadosContainer = document.getElementById('resultados');
        if (resultadosContainer) {
            // Força a exibição do container de resultados alterando diretamente o estilo
            resultadosContainer.style.display = 'block';
            console.log("Container de resultados exibido");
            
            // Scroll para resultados
            setTimeout(() => {
                resultadosContainer.scrollIntoView({behavior: 'smooth'});
            }, 500);
        } else {
            console.error("Container de resultados não encontrado");
        }
        
        return true;
    } catch (error) {
        console.error("Erro ao calcular PGBL vs CDB:", error);
        alert("Ocorreu um erro ao realizar a simulação. Por favor, tente novamente.");
        ChartHelpers.removeLoading('chartComparativo');
        return false;
    }
}

// Definir a função calcular diretamente para evitar problemas de substituição
window.calcular = calcularPGBLvsCDB;

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    console.log("Inicializando correções para PGBL vs CDB");
    
    // Garantir que a função calcular está configurada corretamente
    window.calcular = calcularPGBLvsCDB;
    
    // Adicionar listener ao botão de simulação para garantir
    const botaoSimular = document.querySelector('button[onclick="calcular()"]');
    if (botaoSimular) {
        console.log("Adicionando listener adicional ao botão Simular");
        botaoSimular.addEventListener('click', function(event) {
            // Prevenir comportamento padrão e chamar a função
            event.preventDefault();
            calcularPGBLvsCDB();
        });
    } else {
        console.warn("Botão de simulação não encontrado");
    }
    
    // Verificar se há um parâmetro na URL que indique simulação automática
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('simular')) {
        console.log("Simulação automática detectada na URL");
        setTimeout(() => {
            calcularPGBLvsCDB();
        }, 1000);
    }
});
