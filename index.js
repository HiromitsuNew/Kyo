// Leaf & Ladder demo interactions

(function () {
    const drawer = document.querySelector('[data-drawer]');
    const openButtons = document.querySelectorAll('[data-menu-open]');
    const closeButtons = document.querySelectorAll('[data-menu-close]');
    const overlayCloseTarget = drawer;

    const faqQs = document.querySelectorAll('[data-faq-q]');

    const setAriaCurrent = () => {
        const path = (window.location.pathname.split('/').pop() || 'index.html') || 'index.html';
        const links = document.querySelectorAll('.navlinks a, .drawer__links a');
        links.forEach(link => {
            const linkPath = link.getAttribute('href') || '';
            if (path === '' && linkPath === './index.html') { link.setAttribute('aria-current', 'page'); return; }
            if (linkPath.replace('./', '') === path || (path === '' && linkPath === 'index.html')) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    };

    const openDrawer = () => {
        if (!drawer) return;
        drawer.dataset.open = 'true';
        drawer.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };
    const closeDrawer = () => {
        if (!drawer) return;
        drawer.dataset.open = 'false';
        drawer.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    openButtons.forEach(btn => btn.addEventListener('click', openDrawer));
    closeButtons.forEach(btn => btn.addEventListener('click', closeDrawer));
    overlayCloseTarget?.addEventListener('click', (e) => {
        if (e.target === overlayCloseTarget) closeDrawer();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeDrawer();
    });

    faqQs.forEach(q => {
        q.addEventListener('click', () => {
            const item = q.closest('[data-faq-item]');
            const answer = item?.querySelector('[data-faq-a]');
            const open = item?.dataset.open === 'true';
            if (item && answer) {
                item.dataset.open = open ? 'false' : 'true';
                q.setAttribute('aria-expanded', open ? 'false' : 'true');
                if (open) {
                    answer.hidden = true;
                } else {
                    answer.hidden = false;
                }
            }
        });
    });

    setAriaCurrent();
})();

