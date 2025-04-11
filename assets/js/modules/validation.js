/**
 * Módulo de validação para formulários
 * Oferece funções para validar e sanitizar entradas dos usuários
 */

const Validation = {
    /**
     * Verifica se o valor é um número válido
     * @param {string|number} valor - Valor a ser validado
     * @param {object} opcoes - Opções de validação (min, max)
     * @return {boolean} - True se for válido, false caso contrário
     */
    isNumeroValido(valor, opcoes = {}) {
        const numeroLimpo = this.limparNumero(valor);
        
        if (isNaN(numeroLimpo) || numeroLimpo === '') {
            return false;
        }
        
        const num = parseFloat(numeroLimpo);
        
        if (opcoes.min !== undefined && num < opcoes.min) {
            return false;
        }
        
        if (opcoes.max !== undefined && num > opcoes.max) {
            return false;
        }
        
        return true;
    },
    
    /**
     * Limpa um valor numérico removendo caracteres não-numéricos
     * @param {string|number} valor - Valor a ser limpo
     * @return {string} - Valor limpo
     */
    limparNumero(valor) {
        if (valor === undefined || valor === null) {
            return '';
        }
        
        // Converter para string e substituir vírgula por ponto
        let valorString = String(valor).replace(',', '.');
        
        // Remover caracteres não numéricos, exceto ponto
        valorString = valorString.replace(/[^\d.-]/g, '');
        
        // Garantir que há apenas um ponto decimal
        const partes = valorString.split('.');
        if (partes.length > 2) {
            valorString = partes[0] + '.' + partes.slice(1).join('');
        }
        
        return valorString;
    },
    
    /**
     * Formata um valor de porcentagem para exibição
     * @param {string|number} valor - Valor a ser formatado 
     * @return {string} - Valor formatado (ex: '5,00%')
     */
    formatarPorcentagem(valor) {
        const numeroLimpo = this.limparNumero(valor);
        
        if (isNaN(numeroLimpo) || numeroLimpo === '') {
            return '0,00%';
        }
        
        const num = parseFloat(numeroLimpo);
        
        return new Intl.NumberFormat('pt-BR', {
            style: 'percent',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(num / 100);
    },
    
    /**
     * Formata um valor monetário para exibição
     * @param {string|number} valor - Valor a ser formatado
     * @return {string} - Valor formatado (ex: 'R$ 1.000,00')
     */
    formatarMoeda(valor) {
        const numeroLimpo = this.limparNumero(valor);
        
        if (isNaN(numeroLimpo) || numeroLimpo === '') {
            return 'R$ 0,00';
        }
        
        const num = parseFloat(numeroLimpo);
        
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2
        }).format(num);
    },
    
    /**
     * Sanitiza um input para evitar XSS
     * @param {string} valor - Valor a ser sanitizado
     * @return {string} - Valor sanitizado
     */
    sanitizarInput(valor) {
        if (typeof valor !== 'string') {
            return valor;
        }
        
        // Remover tags HTML e caracteres especiais
        return valor
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/\//g, '&#x2F;');
    },
    
    /**
     * Valida um formulário completo
     * @param {string} formId - ID do formulário
     * @param {object} regras - Regras de validação para cada campo
     * @return {boolean} - True se todos os campos forem válidos
     */
    validarFormulario(formId, regras) {
        const form = document.getElementById(formId);
        
        if (!form) {
            console.error(`Formulário com ID "${formId}" não encontrado`);
            return false;
        }
        
        let isValido = true;
        
        // Limpar mensagens de erro anteriores
        form.querySelectorAll('.validation-error').forEach(el => el.remove());
        
        // Verificar cada campo de acordo com as regras
        for (const campo in regras) {
            const elemento = form.querySelector(`[name="${campo}"]`);
            
            if (!elemento) {
                console.warn(`Campo "${campo}" não encontrado no formulário`);
                continue;
            }
            
            let valorCampo = elemento.value;
            const regra = regras[campo];
            
            // Sanitizar input
            if (regra.sanitize !== false) {
                valorCampo = this.sanitizarInput(valorCampo);
                elemento.value = valorCampo;
            }
            
            // Validar campo
            let campoValido = true;
            let mensagemErro = '';
            
            if (regra.obrigatorio && !valorCampo.trim()) {
                campoValido = false;
                mensagemErro = regra.mensagens?.obrigatorio || 'Este campo é obrigatório';
            } else if (regra.tipo === 'numero' && valorCampo.trim() !== '') {
                if (!this.isNumeroValido(valorCampo, { min: regra.min, max: regra.max })) {
                    campoValido = false;
                    mensagemErro = regra.mensagens?.invalido || 'Este valor não é válido';
                    
                    if (regra.min !== undefined && parseFloat(this.limparNumero(valorCampo)) < regra.min) {
                        mensagemErro = regra.mensagens?.min || `O valor mínimo é ${regra.min}`;
                    }
                    
                    if (regra.max !== undefined && parseFloat(this.limparNumero(valorCampo)) > regra.max) {
                        mensagemErro = regra.mensagens?.max || `O valor máximo é ${regra.max}`;
                    }
                }
            } else if (regra.tipo === 'email' && valorCampo.trim() !== '') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(valorCampo)) {
                    campoValido = false;
                    mensagemErro = regra.mensagens?.invalido || 'E-mail inválido';
                }
            }
            
            // Validação personalizada
            if (campoValido && regra.validacao && typeof regra.validacao === 'function') {
                const resultadoValidacao = regra.validacao(valorCampo, form);
                if (resultadoValidacao !== true) {
                    campoValido = false;
                    mensagemErro = resultadoValidacao || regra.mensagens?.personalizado || 'Valor inválido';
                }
            }
            
            // Mostrar erro se o campo for inválido
            if (!campoValido) {
                isValido = false;
                this.mostrarErro(elemento, mensagemErro);
            }
        }
        
        return isValido;
    },
    
    /**
     * Mostra uma mensagem de erro para um campo
     * @param {HTMLElement} elemento - Elemento do campo
     * @param {string} mensagem - Mensagem de erro
     */
    mostrarErro(elemento, mensagem) {
        // Adicionar classe de erro ao elemento
        elemento.classList.add('is-invalid');
        
        // Criar elemento de mensagem de erro
        const errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback validation-error';
        errorDiv.textContent = mensagem;
        
        // Inserir após o elemento
        elemento.parentNode.insertBefore(errorDiv, elemento.nextSibling);
        
        // Adicionar evento para remover o erro ao editar o campo
        elemento.addEventListener('input', function() {
            this.classList.remove('is-invalid');
            const next = this.nextElementSibling;
            if (next && next.classList.contains('validation-error')) {
                next.remove();
            }
        }, { once: true });
    }
};

// Exportar o módulo como global para uso em outros scripts
window.Validation = Validation;