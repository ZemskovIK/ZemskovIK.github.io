document.addEventListener('DOMContentLoaded', function () {

  const articles = document.querySelectorAll('#articles article');
  const articleCountText = document.querySelector('#article-count');
  const categoryFilter = document.querySelector('#category-filter');
  const searchInput = document.querySelector('#search-input');
  const scrollElements = document.querySelectorAll('.scroll-animate');
  const techItems = document.querySelectorAll('.tech-item');
  const descriptionBox = document.getElementById('tech-description');
  const header = document.querySelector('header');

  function showLastThreeArticles() {
    articles.forEach((article, index) => {
      article.style.display = index < 3 ? 'block' : 'none';
    });
    updateArticleCount(true); 
  }

  function updateArticleCount(showTotal = false) {
    if (showTotal) {
      articleCountText.textContent = `Всего статей: ${articles.length}`;
    } else {
      const visibleArticlesCount = Array.from(articles).filter(
        (article) => article.style.display === 'block'
      ).length;
      articleCountText.textContent = `Найдено статей: ${visibleArticlesCount}`;
    }
  }

  categoryFilter.addEventListener('change', function () {
    const selectedCategory = categoryFilter.value.toLowerCase();

    if (selectedCategory === '') {
      showLastThreeArticles();
    } else {
      articles.forEach((article) => {
        const articleCategory = article.dataset.category.toLowerCase();
        article.style.display =
          articleCategory === selectedCategory ? 'block' : 'none';
      });
      updateArticleCount();
    }
  });

  searchInput.addEventListener('input', function () {
    const query = searchInput.value.toLowerCase();

    articles.forEach((article) => {
      const title = article
        .querySelector('.article-title')
        .textContent.toLowerCase();
      const content = article.querySelector('p').textContent.toLowerCase();

      article.style.display = title.includes(query) || content.includes(query)
        ? 'block'
        : 'none';
    });

    updateArticleCount();
  });

  showLastThreeArticles();

  setTimeout(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    scrollElements.forEach((el) => observer.observe(el));
  }, 1500);

  window.addEventListener('scroll', function () {
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  techItems.forEach((item) => {
    item.addEventListener('mouseenter', () => {
      descriptionBox.textContent = item.dataset.description;
      descriptionBox.style.opacity = '1';
    });

    item.addEventListener('mouseleave', () => {
      descriptionBox.style.opacity = '0';
    });
  });

});

document.addEventListener("DOMContentLoaded", () => {
  const loadingScreen = document.getElementById("loading-screen");

  document.documentElement.classList.add("loading");
  document.body.classList.add("loading");

  setTimeout(() => {
    loadingScreen.classList.add("hidden");
    document.documentElement.classList.remove("loading");
    document.body.classList.remove("loading");
  }, 1500);
});

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobileMenu');
  const body = document.body;

  function toggleMenu() {
    menu.classList.toggle('active');
    body.classList.toggle('no-scroll'); 
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', toggleMenu);
  }

  const menuLinks = menu.querySelectorAll('a');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('active');
      body.classList.remove('no-scroll');
    });
  });
});
