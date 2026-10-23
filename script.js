/**
 * ==============================================================================
 * SHAXSIY PORTFOLIO - SIROJIDDIN NARZULLAYEV (SIROJ)
 * Interaktiv JavaScript moduli
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ============================================================================
  // 1. DARK / LIGHT MAVZU (THEME CONTROLLER)
  // ============================================================================
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const htmlRoot = document.documentElement;

  // Saqlangan mavzuni olish yoki standart sifatida dark qo'llash
  const savedTheme = localStorage.getItem('siroj_portfolio_theme') || 'dark';
  setTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
      showToast(
        newTheme === 'dark' ? 'Qorong‘u rejim yoqildi' : 'Yorug‘ rejim yoqildi',
        'info'
      );
    });
  }

  function setTheme(theme) {
    htmlRoot.setAttribute('data-theme', theme);
    localStorage.setItem('siroj_portfolio_theme', theme);
  }

  // ============================================================================
  // 2. MOBIL MENYU (HAMBURGER DRAWER)
  // ============================================================================
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileMenuBtn.classList.toggle('active', isOpen);
      mobileMenuBtn.setAttribute('aria-expanded', isOpen);
    });

    // Menyu bandi bosilganda mobil menyuni yopish
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          mobileMenuBtn.classList.remove('active');
          mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Tashqariga bosilganda menyuni yopish
    document.addEventListener('click', (e) => {
      if (
        navMenu.classList.contains('open') &&
        !navMenu.contains(e.target) &&
        !mobileMenuBtn.contains(e.target)
      ) {
        navMenu.classList.remove('open');
        mobileMenuBtn.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ============================================================================
  // 3. NAVBAR SCROLL VA SCROLLSPY (ACTIVE LINK HIGHLIGHT)
  // ============================================================================
  const header = document.getElementById('header');
  const scrollToTopBtn = document.getElementById('scrollToTopBtn');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', handleScroll, { passive: true });

  function handleScroll() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Navbar fonini o'zgartirish
    if (header) {
      if (scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Scroll to top tugmasini ko'rsatish
    if (scrollToTopBtn) {
      if (scrollY > 350) {
        scrollToTopBtn.classList.add('visible');
      } else {
        scrollToTopBtn.classList.remove('visible');
      }
    }

    // ScrollSpy (Qaysi bo'limdaligini aniqlash)
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetNavLink = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);

      if (targetNavLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetNavLink.classList.add('active');
        } else {
          targetNavLink.classList.remove('active');
        }
      }
    });
  }

  // Yuqoriga silliq qaytish tugmasi
  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ============================================================================
  // 4. DINAMIK TYPEWRITER MATN ANIMATSIYASI
  // ============================================================================
  const typewriterElement = document.getElementById('typewriterText');
  const wordsToType = [
    'Junior Flutter Dasturchi',
    'Edu Play 365 Yaratuvchisi',
    'Junior Web & Mobile Dasturchi',
    'Boshlang‘ich / Junior Dasturchi',
    'Doimiy O‘rganuvchi'
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    if (!typewriterElement) return;

    const currentWord = wordsToType[wordIndex];

    if (isDeleting) {
      typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      // So'z to'liq yozilganda biroz kutish
      isDeleting = true;
      typingSpeed = 1600;
    } else if (isDeleting && charIndex === 0) {
      // So'z o'chirilgach, keyingi so'zga o'tish
      isDeleting = false;
      wordIndex = (wordIndex + 1) % wordsToType.length;
      typingSpeed = 400;
    }

    setTimeout(typeEffect, typingSpeed);
  }

  typeEffect();

  // ============================================================================
  // 5. LOYIHALARNI FILTRLASH (PROJECTS FILTER)
  // ============================================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.projects-grid .project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Faol tugmani almashtirish
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category') || '';
        
        if (filterValue === 'all' || cardCategory.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // ============================================================================
  // 6. MODAL OYNALAR (EDU PLAY 365 & REZYUME)
  // ============================================================================
  
  // Edu Play Modal
  const eduModal = document.getElementById('eduModal');
  const openEduModalBtn = document.getElementById('openEduModalBtn');
  const openEduModalBtn2 = document.getElementById('openEduModalBtn2');
  const closeEduModalBtn = document.getElementById('closeEduModalBtn');
  const closeEduModalBtn2 = document.getElementById('closeEduModalBtn2');
  const discussEduModalBtn = document.getElementById('discussEduModalBtn');

  function openEduModal() {
    if (eduModal) {
      eduModal.classList.add('show');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeEduModal() {
    if (eduModal) {
      eduModal.classList.remove('show');
      document.body.style.overflow = '';
    }
  }

  if (openEduModalBtn) openEduModalBtn.addEventListener('click', openEduModal);
  if (openEduModalBtn2) openEduModalBtn2.addEventListener('click', openEduModal);
  if (closeEduModalBtn) closeEduModalBtn.addEventListener('click', closeEduModal);
  if (closeEduModalBtn2) closeEduModalBtn2.addEventListener('click', closeEduModal);
  if (discussEduModalBtn) {
    discussEduModalBtn.addEventListener('click', () => {
      closeEduModal();
      // Aloqa mavzusiga avtomatik yozish
      const subjectInput = document.getElementById('messageSubject');
      if (subjectInput) {
        subjectInput.value = 'Edu Play 365 loyihasi haqida savol';
      }
    });
  }

  // Rezyume (CV) Modal
  const resumeModal = document.getElementById('resumeModal');
  const openResumeBtn = document.getElementById('openResumeBtn');
  const closeResumeModalBtn = document.getElementById('closeResumeModalBtn');
  const closeResumeModalBtn2 = document.getElementById('closeResumeModalBtn2');
  const printResumeBtn = document.getElementById('printResumeBtn');

  function openResumeModal() {
    if (resumeModal) {
      resumeModal.classList.add('show');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeResumeModal() {
    if (resumeModal) {
      resumeModal.classList.remove('show');
      document.body.style.overflow = '';
    }
  }

  if (openResumeBtn) openResumeBtn.addEventListener('click', openResumeModal);
  if (closeResumeModalBtn) closeResumeModalBtn.addEventListener('click', closeResumeModal);
  if (closeResumeModalBtn2) closeResumeModalBtn2.addEventListener('click', closeResumeModal);
  
  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Backdrop yoki ESC orqali modallarni yopish
  window.addEventListener('click', (e) => {
    if (e.target === eduModal) closeEduModal();
    if (e.target === resumeModal) closeResumeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeEduModal();
      closeResumeModal();
    }
  });

  // ============================================================================
  // 7. MATNNI NUSXALASH (COPY TO CLIPBOARD)
  // ============================================================================
  const copyButtons = document.querySelectorAll('.copy-btn');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      try {
        await navigator.clipboard.writeText(textToCopy);
        showToast(`Nusxalandi: "${textToCopy}"`, 'success');

        // Tugma ikonkasi vaqtinchalik o'zgarishi
        const originalHtml = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-check" style="color: #22c55e;"></i>';
        setTimeout(() => {
          btn.innerHTML = originalHtml;
        }, 2000);
      } catch (err) {
        // Fallback usul
        const tempInput = document.createElement('input');
        tempInput.value = textToCopy;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showToast(`Nusxalandi: "${textToCopy}"`, 'success');
      }
    });
  });

  // ============================================================================
  // 8. INTERAKTIV ALOQA FORMASI VA VALIDATSIYA
  // ============================================================================
  const contactForm = document.getElementById('contactForm');
  const userNameInput = document.getElementById('userName');
  const userContactInput = document.getElementById('userContact');
  const userMessageInput = document.getElementById('userMessage');
  const messageSubjectInput = document.getElementById('messageSubject');
  const sendViaTelegramBtn = document.getElementById('sendViaTelegramBtn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // 1. Ismni tekshirish
      if (!userNameInput.value.trim()) {
        setError(userNameInput, true);
        isValid = false;
      } else {
        setError(userNameInput, false);
      }

      // 2. Aloqa manzilini tekshirish
      if (!userContactInput.value.trim() || userContactInput.value.trim().length < 4) {
        setError(userContactInput, true);
        isValid = false;
      } else {
        setError(userContactInput, false);
      }

      // 3. Xabar matnini tekshirish (kamida 10 ta belgi)
      if (!userMessageInput.value.trim() || userMessageInput.value.trim().length < 10) {
        setError(userMessageInput, true);
        isValid = false;
      } else {
        setError(userMessageInput, false);
      }

      if (isValid) {
        const submitBtn = document.getElementById('submitFormBtn');
        const originalBtnText = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Yuborilmoqda...</span>';

        // Simulyatsiya qilingan yuborish (localStorage'da saqlanadi)
        setTimeout(() => {
          const messageData = {
            name: userNameInput.value.trim(),
            contact: userContactInput.value.trim(),
            subject: messageSubjectInput.value.trim() || 'Mavzusiz',
            message: userMessageInput.value.trim(),
            date: new Date().toISOString()
          };

          // Saqlash (demo / tarix uchun)
          try {
            const savedMessages = JSON.parse(localStorage.getItem('siroj_messages') || '[]');
            savedMessages.push(messageData);
            localStorage.setItem('siroj_messages', JSON.stringify(savedMessages));
          } catch (e) {
            console.warn('LocalStorage xatosi:', e);
          }

          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;

          // Muvaffaqiyat xabari
          showToast(`Rahmat, ${messageData.name}! Xabaringiz yuborildi. Tez orada javob qaytaraman.`, 'success');

          // Formani tozalash
          contactForm.reset();
        }, 900);
      }
    });

    // Real-time input xatosini yechish
    [userNameInput, userContactInput, userMessageInput].forEach(input => {
      if (input) {
        input.addEventListener('input', () => {
          if (input.value.trim()) {
            setError(input, false);
          }
        });
      }
    });
  }

  function setError(inputElement, hasError) {
    const parentGroup = inputElement.closest('.form-group');
    if (parentGroup) {
      if (hasError) {
        parentGroup.classList.add('has-error');
      } else {
        parentGroup.classList.remove('has-error');
      }
    }
  }

  // Telegram orqali yuborish yordamchisi
  if (sendViaTelegramBtn) {
    sendViaTelegramBtn.addEventListener('click', () => {
      const name = userNameInput.value.trim() || 'Mijoz';
      const msg = userMessageInput.value.trim() || 'Assalomu alaykum Siroj, portfolio saytingiz orqali yozyapman.';
      const telegramUsername = 'Narzullayev_w';
      
      const fullText = encodeURIComponent(`Salom Siroj! Mening ismim ${name}.\n\nXabar: ${msg}`);
      window.open(`https://t.me/${telegramUsername}?text=${fullText}`, '_blank');
    });
  }

  // ============================================================================
  // 9. TOAST BILDIRISHNOMA TIZIMI
  // ============================================================================
  function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let iconHtml = '<i class="fa-solid fa-circle-info"></i>';
    if (type === 'success') {
      iconHtml = '<i class="fa-solid fa-circle-check"></i>';
    } else if (type === 'error') {
      iconHtml = '<i class="fa-solid fa-triangle-exclamation"></i>';
    }

    toast.innerHTML = `${iconHtml} <span>${message}</span>`;
    container.appendChild(toast);

    // Animatsiya bilan ko'rsatish
    setTimeout(() => {
      toast.classList.add('show');
    }, 20);

    // 4 soniyadan so'ng o'chirish
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (container.contains(toast)) {
          container.removeChild(toast);
        }
      }, 400);
    }, 4000);
  }

  // ============================================================================
  // 10. JORIY YIL AVTOMATIK HISOBI
  // ============================================================================
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

});
