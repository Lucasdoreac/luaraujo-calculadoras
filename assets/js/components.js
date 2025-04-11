/**
 * Componentes compartilhados que substituem os antigos includes PHP
 */

function loadComponents() {
    // Carregar Navbar
    document.getElementById('navbar-container').innerHTML = `
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark navbar-custom">
            <div class="container">
                <a class="navbar-brand" href="index.html">Luciana Araujo</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav me-auto">
                        <li class="nav-item">
                            <a class="nav-link" href="calculadoras/calc-1.html">Planejamento Financeiro</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="calculadoras/calc-2.html">PGBL vs CDB</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="calculadoras/calc-3.html">Investimentos</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="contato.html">Contato</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="https://www.linkedin.com/in/luciana-g-araujo-cea-cnpi-p-pqo-06a858b8/" target="_blank">
                                <i class="fab fa-linkedin"></i>
                            </a>
                        </li>
                        <!-- WhatsApp CTA Button -->
                        <li class="nav-item">
                            <a class="btn btn-success btn-sm" href="https://wa.me/5561983426774?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20consulta." target="_blank">
                                <i class="fab fa-whatsapp"></i> Agende sua consulta
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    `;

    // Carregar Footer
    document.getElementById('footer-container').innerHTML = `
        <footer class="bg-dark text-white py-4">
            <div class="container">
                <div class="row">
                    <div class="col-md-4">
                        <h5>Luciana Araujo</h5>
                        <p><i class="fas fa-phone"></i> (61) 98342-6774</p>
                        <p><i class="fas fa-envelope"></i> <a href="mailto:contato@luaraujo.com">contato@luaraujo.com</a></p>
                    </div>
                    <div class="col-md-4">
                        <h5>Links Rápidos</h5>
                        <ul class="list-unstyled">
                            <li><a href="index.html">Calculadora Principal</a></li>
                            <li><a href="calculadoras/calc-2.html">Simulador PGBL vs CDB</a></li>
                            <li><a href="calculadoras/calc-3.html">Simulador de Investimentos</a></li>
                        </ul>
                    </div>
                    <div class="col-md-4">
                        <h5>Redes Sociais</h5>
                        <div class="social-links">
                            <a href="https://www.linkedin.com/in/luciana-g-araujo-cea-cnpi-p-pqo-06a858b8/" class="text-white" target="_blank">
                                <i class="fab fa-linkedin"></i>
                            </a>
                            <!-- Adicionando o link do WhatsApp -->
                            <a href="https://wa.me/5561983426774" class="text-white" target="_blank">
                                <i class="fab fa-whatsapp"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-md-12 text-center">
                        <p class="mb-0">© 2025 Luciana Araujo. Todos os direitos reservados.</p>
                    </div>
                </div>
            </div>
        </footer>
    `;
}

// Função para corrigir links relativos em páginas de subdiretório
function adjustRelativePaths() {
    // Verificar se estamos em um subdiretório
    const isSubdirectory = window.location.pathname.includes('/calculadoras/') || 
                           window.location.pathname.includes('/includes/');
    
    if (isSubdirectory) {
        // Ajustar links no navbar
        document.querySelectorAll('#navbar-container .nav-link, #navbar-container .navbar-brand').forEach(link => {
            if (link.getAttribute('href') && !link.getAttribute('href').startsWith('http') && !link.getAttribute('href').startsWith('#')) {
                // Adicionar ../ para subir um nível
                if (!link.getAttribute('href').startsWith('../')) {
                    link.setAttribute('href', '../' + link.getAttribute('href'));
                }
            }
        });
        
        // Ajustar links no footer
        document.querySelectorAll('#footer-container a').forEach(link => {
            if (link.getAttribute('href') && !link.getAttribute('href').startsWith('http') && 
                !link.getAttribute('href').startsWith('mailto') && !link.getAttribute('href').startsWith('#')) {
                // Adicionar ../ para subir um nível
                if (!link.getAttribute('href').startsWith('../')) {
                    link.setAttribute('href', '../' + link.getAttribute('href'));
                }
            }
        });
        
        // Ajustar links para CSS e JS
        document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
            if (link.getAttribute('href') && link.getAttribute('href').startsWith('assets/')) {
                link.setAttribute('href', '../' + link.getAttribute('href'));
            }
        });
        
        document.querySelectorAll('script').forEach(script => {
            if (script.getAttribute('src') && script.getAttribute('src').startsWith('assets/')) {
                script.setAttribute('src', '../' + script.getAttribute('src'));
            }
        });
    }
}

// Função para determinar a página atual e destacar no menu
function highlightCurrentPage() {
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll('#navbar-container .nav-link');
    
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href) {
            // Extrair o final do caminho atual
            const pathEnd = currentPath.split('/').pop();
            // Extrair o final do href 
            const hrefEnd = href.split('/').pop();
            
            if (pathEnd === hrefEnd) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            }
        }
    });
}

// Executar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    loadComponents();
    setTimeout(() => {
        adjustRelativePaths();
        highlightCurrentPage();
    }, 50); // Pequeno delay para garantir que os componentes foram carregados
});
