// Espera o DOM carregar completamente antes de executar o script
document.addEventListener('DOMContentLoaded', () => {

  // Seleção de elementos principais
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const header = document.querySelector('.header');
  const sections = document.querySelectorAll('section[id]');
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  // --- 1. LÓGICA DO MENU MOBILE (HAMBURGER) ---
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }

  // --- 2. FECHAR MENU AO CLICAR EM UM LINK E ATUALIZAR LINK ATIVO ---
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      hamburger.classList.remove('active');
      navMenu.classList.remove('active');

      navLinks.forEach(nav => nav.classList.remove('active'));
      this.classList.add('active');

      // Scroll suave para a seção
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerHeight = header.offsetHeight;
        const targetPosition = target.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- 3. ESTILO DO HEADER E LINK ATIVO AO ROLAR A PÁGINA ---
  const handleScroll = () => {
    if (header) {
      const currentTheme = body.getAttribute('data-theme');
      if (window.scrollY > 100) {
        header.style.background = currentTheme === 'dark'
          ? 'rgba(31, 41, 55, 0.98)'
          : 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
      } else {
        header.style.background = currentTheme === 'dark'
          ? 'rgba(31, 41, 55, 0.95)'
          : 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
      }
    }
    updateActiveNavOnScroll();
  };

  const updateActiveNavOnScroll = () => {
    let currentSectionId = '';
    const scrollPosition = window.scrollY + header.offsetHeight + 50;

    sections.forEach(section => {
      if (scrollPosition >= section.offsetTop) {
        currentSectionId = section.getAttribute('id');
      }
    });

    // Se estivermos no topo da página, destacar o Home
    if (window.scrollY < 100) {
      currentSectionId = 'home';
    }

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', handleScroll);

  // --- 4. SISTEMA DE TEMA (DARK/LIGHT MODE) ---
  if (themeToggle && body) {
    const updateThemeIcon = (theme) => {
      const icon = themeToggle.querySelector('i');
      if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
      }
    };

    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
      const currentTheme = body.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      body.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);

      // Atualizar header imediatamente
      handleScroll();
    });
  }

  // --- 5. ANIMAÇÃO DAS BARRAS DE HABILIDADE (SKILLS) ---
  const skillsSection = document.querySelector('.skills');
  if (skillsSection) {
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const skillBars = entry.target.querySelectorAll('.skill-progress');
          skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
              bar.style.width = width;
            }, 200);
          });
          skillObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    skillObserver.observe(skillsSection);
  }

  // --- 6. FORMULÁRIO DE CONTATO ---
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      submitBtn.textContent = 'Enviando...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.textContent = 'Mensagem Enviada!';
        submitBtn.style.background = '#10b981';

        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          submitBtn.style.background = '';
          contactForm.reset();
        }, 2000);
      }, 1500);
    });
  }

  // Inicializar navegação ativa
  updateActiveNavOnScroll();
});