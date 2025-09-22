// Smooth animations and interactions for the link page

document.addEventListener('DOMContentLoaded', function() {
    // Track page view with additional metadata
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view_enhanced', {
            'event_category': 'engagement',
            'page_title': document.title,
            'page_location': window.location.href,
            'referrer': document.referrer || 'direct',
            'user_agent': navigator.userAgent,
            'screen_resolution': `${screen.width}x${screen.height}`,
            'viewport_size': `${window.innerWidth}x${window.innerHeight}`
        });
    }

    // Add click tracking for analytics
    const linkButtons = document.querySelectorAll('.link-button');

    linkButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            // Add a subtle click animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);

            // Analytics tracking
            const platform = this.className.split(' ').find(cls => cls !== 'link-button');
            const linkText = this.textContent.trim();

            // Google Analytics event tracking
            if (typeof gtag !== 'undefined') {
                gtag('event', 'link_click', {
                    'event_category': 'engagement',
                    'event_label': platform || linkText,
                    'custom_parameter_1': platform || 'unknown',
                    'link_platform': platform || 'unknown'
                });
            }

            console.log(`Link clicked: ${linkText} (${platform})`);
        });

        // Add hover sound effect (visual feedback)
        button.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 12px 24px rgba(102, 126, 234, 0.4)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });

    // Profile picture placeholder handler
    const profilePic = document.getElementById('profile-pic');
    if (profilePic) {
        profilePic.addEventListener('error', function() {
            // Fallback if image fails to load
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iMzUiIHI9IjE1IiBmaWxsPSIjQzRDNEM0Ii8+CjxwYXRoIGQ9Ik0yMCA3NWMwLTE1IDEyLTI3IDI3LTI3czI3IDEyIDI3IDI3djE1SDIwVjc1eiIgZmlsbD0iI0M0QzREMCIvPgo8L3N2Zz4=';
        });
    }

    // Add loading animation for the page
    const container = document.querySelector('.container');
    container.style.opacity = '0';
    container.style.transform = 'translateY(30px) scale(0.95)';

    setTimeout(() => {
        container.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
        container.style.opacity = '1';
        container.style.transform = 'translateY(0) scale(1)';
    }, 200);

    // Add staggered animation for link buttons
    linkButtons.forEach((button, index) => {
        button.style.opacity = '0';
        button.style.transform = 'translateY(20px)';

        setTimeout(() => {
            button.style.transition = 'all 0.5s ease-out';
            button.style.opacity = '1';
            button.style.transform = 'translateY(0)';
        }, 400 + (index * 100));
    });
});