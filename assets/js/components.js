/**
 * Componentes compartilhados que substituem os antigos includes PHP
 */

function loadComponents() {
    // Carregar Navbar
    document.getElementById('navbar-container').innerHTML = `
        <nav class="navbar navbar-expand-lg navbar-dark navbar-custom">
            <div class="container">
                <a class="navbar-brand" href="index.html">
                    <i class="fas fa-chart-line me-2"></i>Luciana Araujo
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav me-auto">
                        <li class="nav-item">
                            <a class="nav-link" href="calculadoras/calc-1.html">
                                <i class="fas fa-calculator me-1"></i>Planejamento Financeiro
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="calculadoras/calc-2.html">
                                <i class="fas fa-piggy-bank me-1"></i>PGBL vs CDB
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="calculadoras/calc-3.html">
                                <i class="fas fa-coins me-1"></i>Investimentos
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="contato.html">
                                <i class="fas fa-envelope me-1"></i>Contato
                            </a>
                        </li>
                    </ul>
                    <div class="d-flex align-items-center">
                        <a href="https://www.linkedin.com/in/luciana-g-araujo-cea-cnpi-p-pqo-06a858b8/" class="social-link me-3" target="_blank" aria-label="LinkedIn">
                            <i class="fab fa-linkedin"></i>
                        </a>
                        <a href="https://wa.me/5561983426774?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20consulta." class="btn btn-success btn-sm" target="_blank">
                            <i class="fab fa-whatsapp me-1"></i> Agendar Consulta
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    `;

    // Carregar Footer
    document.getElementById('footer-container').innerHTML = `
        <footer class="footer-custom text-white py-5">
            <div class="container footer-container">
                <div class="row g-4">
                    <div class="col-lg-4 col-md-6">
                        <div class="footer-section">
                            <h5 class="footer-heading"><i class="fas fa-user-tie me-2"></i>Luciana Araujo</h5>
                            <ul class="footer-contact list-unstyled">
                                <li><i class="fas fa-phone-alt me-2 icon-primary"></i>(61) 98342-6774</li>
                                <li><i class="fas fa-envelope me-2 icon-primary"></i><a href="mailto:contato@luaraujo.com">contato@luaraujo.com</a></li>
                                <li><i class="fas fa-map-marker-alt me-2 icon-primary"></i>Brasília, DF</li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6">
                        <div class="footer-section">
                            <h5 class="footer-heading"><i class="fas fa-link me-2"></i>Links Rápidos</h5>
                            <ul class="footer-links list-unstyled">
                                <li><a href="index.html"><i class="fas fa-home me-2 icon-primary"></i>Página Inicial</a></li>
                                <li><a href="calculadoras/calc-1.html"><i class="fas fa-calculator me-2 icon-primary"></i>Simulador Educacional</a></li>
                                <li><a href="calculadoras/calc-2.html"><i class="fas fa-piggy-bank me-2 icon-primary"></i>PGBL vs CDB</a></li>
                                <li><a href="calculadoras/calc-3.html"><i class="fas fa-coins me-2 icon-primary"></i>Simulador de Investimentos</a></li>
                                <li><a href="contato.html"><i class="fas fa-envelope me-2 icon-primary"></i>Contato</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-12">
                        <div class="footer-section">
                            <h5 class="footer-heading"><i class="fas fa-globe me-2"></i>Redes Sociais</h5>
                            <div class="footer-social mb-3">
                                <a href="https://www.linkedin.com/in/luciana-g-araujo-cea-cnpi-p-pqo-06a858b8/" class="footer-social-icon" target="_blank" aria-label="LinkedIn">
                                    <i class="fab fa-linkedin"></i>
                                </a>
                                <a href="https://wa.me/5561983426774" class="footer-social-icon" target="_blank" aria-label="WhatsApp">
                                    <i class="fab fa-whatsapp"></i>
                                </a>
                            </div>
                            <div class="footer-cta mt-3">
                                <a href="https://wa.me/5561983426774?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20consulta." class="btn btn-outline-primary btn-sm" target="_blank">
                                    <i class="fab fa-whatsapp me-1"></i> Agende sua consultoria
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <hr class="footer-divider">
                <div class="row">
                    <div class="col-md-12 text-center">
                        <p class="copyright mb-0">© 2025 Luciana Araujo. Todos os direitos reservados.</p>
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
        document.querySelectorAll('#navbar-container .nav-link, #navbar-container .navbar-brand, #navbar-container .social-link, #navbar-container .btn').forEach(link => {
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