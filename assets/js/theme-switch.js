/**
 * Gerenciador de temas (claro/escuro) para o site
 * Permite alternar entre os temas e salva a preferência do usuário
 */

// Objeto principal para gerenciar o tema
const ThemeManager = {
    // Chave para armazenar a preferência no localStorage
    STORAGE_KEY: 'luaraujo_theme_preference',
    
    // Inicializar o gerenciador de temas
    init() {
        this.setupTheme();
        this.setupEventListeners();
    },
    
    // Configurar o tema com base na preferência salva ou do sistema
    setupTheme() {
        // Verificar se há uma preferência salva
        const savedTheme = localStorage.getItem(this.STORAGE_KEY);
        
        if (savedTheme) {
            // Usar preferência salva
            this.setTheme(savedTheme);
        } else {
            // Verificar preferência do sistema
            const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            this.setTheme(prefersDarkMode ? 'dark' : 'light');
        }
        
        // Mostrar o corpo após definir o tema para evitar flash de tema incorreto
        document.body.style.display = 'block';
    },
    
    // Configurar escutas de eventos
    setupEventListeners() {
        // Alternar tema quando clicado no botão
        document.addEventListener('click', (event) => {
            if (event.target.closest('.theme-toggle-btn')) {
                this.toggleTheme();
            }
        });
        
        // Responder a mudanças na preferência do sistema
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                if (!localStorage.getItem(this.STORAGE_KEY)) {
                    this.setTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
    },
    
    // Alternar entre os temas
    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        this.setTheme(newTheme);
        localStorage.setItem(this.STORAGE_KEY, newTheme);
    },
    
    // Definir um tema específico
    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        
        // Alternar entre as classes text-light e text-dark do Bootstrap
        if (theme === 'dark') {
            document.body.classList.add('text-light');
            document.body.classList.remove('text-dark');
        } else {
            document.body.classList.add('text-dark');
            document.body.classList.remove('text-light');
        }
        
        // Atualizar o ícone do botão
        const themeButtons = document.querySelectorAll('.theme-toggle-btn i');
        themeButtons.forEach(icon => {
            if (theme === 'dark') {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
                icon.classList.add('text-warning'); // Cor amarela para o sol
                icon.classList.remove('text-primary');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
                icon.classList.add('text-primary'); // Cor azul para a lua
                icon.classList.remove('text-warning');
            }
        });
        
        // MELHORIAS: Tratar elementos específicos para garantir contraste
        if (theme === 'light') {
            // Remover classes que definem texto branco em todos os elementos
            document.querySelectorAll('.text-white, .text-light').forEach(el => {
                if (el !== document.body && !el.closest('.alert') && !el.classList.contains('badge')) {
                    el.classList.add('theme-light-text');
                    // Não remove as classes originais para evitar problemas com volta ao tema escuro
                }
            });
            
            // Remover classes de fundo escuro que podem causar problemas
            document.querySelectorAll('.card.bg-dark').forEach(el => {
                el.classList.add('theme-light-bg');
                // Não remove o bg-dark original para poder restaurar depois
            });
            
            // Corrigir cores em cabeçalhos e texto de cards
            document.querySelectorAll('.card-title, .card-text, .card-body p, .card-body span').forEach(el => {
                if (el && !el.closest('.alert') && !el.classList.contains('badge')) {
                    el.style.color = 'var(--text-primary)';
                }
            });
            
            // Corrigir texto em elementos específicos
            document.querySelectorAll('.hero-section h1, .hero-section p, .section-title, .feature-item h3, .feature-item p').forEach(el => {
                if (el) el.style.color = 'var(--text-primary)';
            });
            
            // Corrigir a cor do texto no footer
            document.querySelectorAll('.footer-custom').forEach(el => {
                if (el) el.classList.remove('text-white');
            });
            
            // Corrigir spans com resultados em calculadoras
            document.querySelectorAll('[id^="result"], [id^="valor"], [id^="pgbl"], [id^="cdb"], [id^="analise"], [id^="taxa"], [id^="total"], [id^="ganho"], [id^="diferenca"], [id^="rentabilidade"], [id^="comparacao"], [id^="laudo"]').forEach(el => {
                if (el) el.style.color = 'var(--text-primary)';
            });
            
            // Corrigir spans dentro de tabelas
            document.querySelectorAll('.valorFuturo, .taxaMensal, .meses').forEach(el => {
                if (el) el.style.color = 'var(--text-primary)';
            });
        } else {
            // Restaurar classes originais ao voltar para tema escuro
            document.querySelectorAll('.theme-light-text').forEach(el => {
                el.classList.remove('theme-light-text');
                // As classes originais já estão presentes, não precisamos adicioná-las de volta
            });
            
            document.querySelectorAll('.theme-light-bg').forEach(el => {
                el.classList.remove('theme-light-bg');
                // A classe bg-dark original ainda está presente
            });
            
            // Remover estilos inline adicionados no tema claro
            document.querySelectorAll('.hero-section h1, .hero-section p, .section-title, .feature-item h3, .feature-item p, .card-title, .card-text, .card-body p, .card-body span, [id^="result"], [id^="valor"], [id^="pgbl"], [id^="cdb"], [id^="analise"], [id^="taxa"], [id^="total"], [id^="ganho"], [id^="diferenca"], [id^="rentabilidade"], [id^="comparacao"], [id^="laudo"], .valorFuturo, .taxaMensal, .meses').forEach(el => {
                if (el) el.style.color = '';
            });
            
            // Restaurar cor do texto no footer
            document.querySelectorAll('.footer-custom').forEach(el => {
                if (el) el.classList.add('text-white');
            });
        }
        
        // Adicionar classe de transição para suavizar a mudança
        document.body.classList.add('theme-transition');
        
        // Atualizar meta tag de tema para dispositivos móveis
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', theme === 'dark' ? '#121212' : '#f8f9fa');
        }
    }
};

// Inicializar o gerenciador de temas quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.init();
});
