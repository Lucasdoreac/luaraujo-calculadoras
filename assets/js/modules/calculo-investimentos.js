/**
 * Módulo específico para cálculos de investimentos
 * Complementa o módulo calculadora.js com funções mais específicas
 */

const CalculoInvestimentos = {
    /**
     * Calcula retorno de investimentos específicos
     * @param {string} tipo - Tipo de investimento (poupanca, cdb, lci_lca)
     * @param {number} valorInicial - Valor inicial investido
     * @param {number} aporteMensal - Aporte mensal
     * @param {number} prazo - Prazo em meses
     * @param {number} cdi - Taxa CDI anual (ex: 0.1 para 10%)
     * @return {object} - Objeto com resultados
     */
    calcularRetornoInvestimento(tipo, valorInicial, aporteMensal, prazo, cdi) {
        let taxaMensal;
        
        switch(tipo) {
            case 'poupanca':
                taxaMensal = 0.005; // 0.5% ao mês (aproximadamente)
                break;
            case 'cdb':
                // CDB com 100% do CDI, após IR
                const cdiMensal = Math.pow(1 + cdi, 1/12) - 1;
                let aliquotaIR;
                
                if (prazo <= 6) {
                    aliquotaIR = 0.225; // 22.5%
                } else if (prazo <= 12) {
                    aliquotaIR = 0.20; // 20%
                } else if (prazo <= 24) {
                    aliquotaIR = 0.175; // 17.5%
                } else {
                    aliquotaIR = 0.15; // 15%
                }
                
                taxaMensal = cdiMensal;
                break;
            case 'lci_lca':
                // LCI/LCA com 90% do CDI, isento de IR
                taxaMensal = (Math.pow(1 + cdi, 1/12) - 1) * 0.9;
                break;
            default:
                taxaMensal = 0.005; // Valor padrão
        }
        
        let montante = valorInicial;
        let totalAportes = valorInicial;
        const evolucaoMensal = [valorInicial];
        const aportesMensais = [0]; // O primeiro mês não tem aporte mensal adicional
        
        for (let i = 0; i < prazo; i++) {
            const rendimentoMes = montante * taxaMensal;
            montante = montante + rendimentoMes + (i > 0 ? aporteMensal : 0);
            
            if (i > 0) {
                totalAportes += aporteMensal;
                aportesMensais.push(aporteMensal);
            }
            
            evolucaoMensal.push(montante);
        }
        
        // Para CDB, aplicar IR sobre o rendimento no resgate
        let impostoRenda = 0;
        let valorLiquido = montante;
        
        if (tipo === 'cdb') {
            const rendimento = montante - totalAportes;
            let aliquotaIR;
            
            if (prazo <= 6) {
                aliquotaIR = 0.225; // 22.5%
            } else if (prazo <= 12) {
                aliquotaIR = 0.20; // 20%
            } else if (prazo <= 24) {
                aliquotaIR = 0.175; // 17.5%
            } else {
                aliquotaIR = 0.15; // 15%
            }
            
            impostoRenda = rendimento * aliquotaIR;
            valorLiquido = montante - impostoRenda;
        }
        
        return {
            montanteBruto: montante,
            valorLiquido: valorLiquido,
            totalAportes: totalAportes,
            rendimento: montante - totalAportes,
            impostoRenda: impostoRenda,
            evolucaoMensal: evolucaoMensal,
            aportesMensais: aportesMensais,
            taxaMensalEfetiva: taxaMensal
        };
    },
    
    /**
     * Calcula comparativo entre PGBL e CDB
     * @param {number} rendaTributavel - Renda anual tributável
     * @param {number} aporteInicial - Valor inicial (opcional)
     * @param {number} anos - Período em anos
     * @param {number} cdi - Taxa CDI anual (decimal)
     * @param {number} taxaAdministracao - Taxa administração PGBL (decimal)
     * @return {object} - Objeto com resultados comparativos
     */
    compararPGBL_CDB(rendaTributavel, aporteInicial, anos, cdi, taxaAdministracao) {
        // Constantes
        const aliquotaIRmax = 0.275; // 27,5% (alíquota máxima IR para dedução)
        const aporteAnual = rendaTributavel * 0.12; // 12% da renda tributável (limite PGBL)
        
        // Inicializar variáveis
        let pgblSaldo = aporteInicial || 0;
        let pgblDesembolso = aporteInicial || 0;
        let cdbSaldo = aporteInicial || 0;
        let cdbDesembolso = aporteInicial || 0;
        let totalTaxaAdministracao = 0;
        
        // Arrays para detalhamento
        const detalhamentoAnual = [];
        
        // Calcular acumulação ao longo dos anos
        for (let i = 1; i <= anos; i++) {
            // PGBL: No primeiro ano, não há restituição
            const restituicao = i === 1 ? 0 : aporteAnual * aliquotaIRmax;
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
            
            // Adicionar detalhamento anual
            detalhamentoAnual.push({
                ano: i,
                pgblAporte: aporteEfetivo,
                pgblRestituicao: restituicao,
                pgblSaldo: pgblSaldo,
                cdbAporte: aporteAnual,
                cdbSaldo: cdbSaldo
            });
        }
        
        // Calcular IR no resgate
        const aliquotaIR_PGBL = anos <= 2 ? 0.35 : 
                                 anos <= 4 ? 0.30 :
                                 anos <= 6 ? 0.25 :
                                 anos <= 8 ? 0.20 :
                                 0.10; // Acima de 8 anos
        
        const pgblIR = pgblSaldo * aliquotaIR_PGBL;
        const pgblLiquido = pgblSaldo - pgblIR;
        
        const aliquotaIR_CDB = anos <= 0.5 ? 0.225 : 
                               anos <= 1 ? 0.20 :
                               anos <= 2 ? 0.175 :
                               0.15; // Acima de 2 anos
        
        const cdbRendimentos = cdbSaldo - cdbDesembolso;
        const cdbIR = cdbRendimentos * aliquotaIR_CDB;
        const cdbLiquido = cdbSaldo - cdbIR;
        
        // Análise comparativa
        const diferencaLiquida = pgblLiquido - cdbLiquido;
        const totalRestituido = pgblDesembolso - (aporteInicial || 0) - (aporteAnual * anos);
        const rentabilidadePGBL = ((pgblLiquido / pgblDesembolso) - 1) * 100;
        const rentabilidadeCDB = ((cdbLiquido / cdbDesembolso) - 1) * 100;
        
        return {
            pgbl: {
                saldoBruto: pgblSaldo,
                desembolsoEfetivo: pgblDesembolso,
                impostoRenda: pgblIR,
                valorLiquido: pgblLiquido,
                taxaAdministracaoTotal: totalTaxaAdministracao,
                rentabilidade: rentabilidadePGBL
            },
            cdb: {
                saldoBruto: cdbSaldo,
                desembolsoEfetivo: cdbDesembolso,
                impostoRenda: cdbIR,
                valorLiquido: cdbLiquido,
                rentabilidade: rentabilidadeCDB
            },
            comparativo: {
                diferencaLiquida: diferencaLiquida,
                totalRestituido: Math.abs(totalRestituido),
                maisVantajoso: diferencaLiquida > 0 ? 'PGBL' : 'CDB'
            },
            detalhamentoAnual: detalhamentoAnual
        };
    },
    
    /**
     * Calcula a projeção de patrimônio com aportes mensais
     * @param {number} aporteMensal - Valor do aporte mensal
     * @param {number} taxaMensal - Taxa mensal (decimal)
     * @param {number} quantidadeMeses - Quantidade de meses
     * @return {object} - Objeto com resultados e projeção
     */
    calcularProjecaoPatrimonio(aporteMensal, taxaMensal, quantidadeMeses) {
        // Arrays para o gráfico
        const labels = [];
        const valoresAcumulados = [];
        const aportesAcumulados = [];
        
        // Calcular o valor futuro somando os fluxos de caixa
        let valorFuturo = 0;
        let aporteTotal = 0;
        
        for (let t = 1; t <= quantidadeMeses; t++) {
            labels.push(`Mês ${t}`);
            
            // Cálculo do valor futuro com juros compostos
            // VF = P * (1 + i)^n
            valorFuturo += aporteMensal * Math.pow(1 + taxaMensal, quantidadeMeses - t);
            aporteTotal += aporteMensal;
            
            valoresAcumulados.push(valorFuturo);
            aportesAcumulados.push(aporteTotal);
        }
        
        // Cálculos finais
        const jurosAcumulados = valorFuturo - aporteTotal;
        const roi = (jurosAcumulados / aporteTotal) * 100;
        
        return {
            valorFuturo: valorFuturo,
            totalInvestido: aporteTotal,
            jurosAcumulados: jurosAcumulados,
            roi: roi,
            labels: labels,
            valoresAcumulados: valoresAcumulados,
            aportesAcumulados: aportesAcumulados
        };
    },
    
    /**
     * Calcula o aporte necessário para atingir uma meta financeira
     * @param {number} valorMeta - Valor da meta financeira
     * @param {number} prazoMeses - Prazo em meses
     * @param {number} taxaMensal - Taxa mensal de rendimento (decimal)
     * @param {number} inflacaoAnual - Taxa de inflação anual (decimal)
     * @return {object} - Objeto com valor do aporte necessário e detalhes
     */
    calcularAporteParaMeta(valorMeta, prazoMeses, taxaMensal, inflacaoAnual) {
        // Ajuste da meta considerando a inflação
        const inflacaoMensal = Math.pow(1 + inflacaoAnual, 1/12) - 1;
        const valorMetaAjustado = valorMeta * Math.pow(1 + inflacaoMensal, prazoMeses);
        
        // PMT = VF / ((1 + i)^n - 1) / i × (1 + i)
        const aporteNecessario = valorMetaAjustado * 
            taxaMensal / ((Math.pow(1 + taxaMensal, prazoMeses) - 1) * (1 + taxaMensal));
        
        return {
            aporteNecessario: aporteNecessario,
            valorMetaOriginal: valorMeta,
            valorMetaAjustado: valorMetaAjustado,
            prazoMeses: prazoMeses,
            taxaMensal: taxaMensal,
            inflacaoAnual: inflacaoAnual
        };
    }
};

// Exportar o módulo como global para uso em outros scripts
window.CalculoInvestimentos = CalculoInvestimentos;