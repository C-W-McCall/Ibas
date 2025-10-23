// Jira-style JavaScript for Support Ticket System

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeJiraFeatures();
});

// Initialize all Jira-style features
function initializeJiraFeatures() {
    addSmoothScrolling();
    addFormEnhancements();
    addBoardInteractions();
    addModalEnhancements();
    addKeyboardShortcuts();
}

// Smooth scrolling for anchor links
function addSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Form enhancements
function addFormEnhancements() {
    // Floating label animations
    const floatingInputs = document.querySelectorAll('.form-floating input, .form-floating textarea, .form-floating select');
    
    floatingInputs.forEach(input => {
        // Add focus/blur effects
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Check if input has value on load
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });

    // Form validation feedback
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.classList.add('loading');
                submitBtn.disabled = true;
            }
        });
    });
}

// Board interactions
function addBoardInteractions() {
    // Add drag and drop functionality to board cards
    const boardCards = document.querySelectorAll('.board-card');
    
    boardCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 12px rgba(9, 30, 66, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 1px 3px rgba(9, 30, 66, 0.15)';
        });
    });

    // Add click handlers for board cards
    boardCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from all cards
            boardCards.forEach(c => c.classList.remove('active'));
            // Add active class to clicked card
            this.classList.add('active');
        });
    });
}

// Modal enhancements
function addModalEnhancements() {
    const modals = document.querySelectorAll('.modal');
    
    modals.forEach(modal => {
        // Add entrance animation
        modal.addEventListener('show.bs.modal', function() {
            this.querySelector('.modal-dialog').style.transform = 'scale(0.9)';
            this.querySelector('.modal-dialog').style.opacity = '0';
            
            setTimeout(() => {
                this.querySelector('.modal-dialog').style.transform = 'scale(1)';
                this.querySelector('.modal-dialog').style.opacity = '1';
            }, 10);
        });
        
        // Add exit animation
        modal.addEventListener('hide.bs.modal', function() {
            this.querySelector('.modal-dialog').style.transform = 'scale(0.9)';
            this.querySelector('.modal-dialog').style.opacity = '0';
        });
    });
}

// Keyboard shortcuts
function addKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K to focus search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.querySelector('input[type="search"], input[placeholder*="search" i]');
            if (searchInput) {
                searchInput.focus();
            }
        }
        
        // Escape to close modals
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal.show');
            if (openModal) {
                const closeBtn = openModal.querySelector('.btn-close');
                if (closeBtn) {
                    closeBtn.click();
                }
            }
        }
        
        // Ctrl/Cmd + N to create new ticket
        if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
            e.preventDefault();
            window.location.href = '/create-support';
        }
    });
}

// Utility functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="bi bi-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'} me-2"></i>
            ${message}
            <button type="button" class="btn-close ms-auto" onclick="this.parentElement.parentElement.remove()"></button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Add custom CSS for JavaScript enhancements
const style = document.createElement('style');
style.textContent = `
    .form-floating.focused label {
        color: #0052cc;
        transform: scale(0.85) translateY(-0.5rem) translateX(0.15rem);
    }
    
    .btn.loading {
        position: relative;
        pointer-events: none;
    }
    
    .btn.loading::after {
        content: '';
        position: absolute;
        width: 16px;
        height: 16px;
        top: 50%;
        left: 50%;
        margin-left: -8px;
        margin-top: -8px;
        border: 2px solid transparent;
        border-top-color: #ffffff;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .board-card {
        transition: all 0.2s ease;
        cursor: pointer;
    }
    
    .board-card.active {
        border-color: #0052cc;
        box-shadow: 0 0 0 2px rgba(0, 82, 204, 0.2);
    }
    
    .modal-dialog {
        transition: all 0.2s ease;
    }
    
    .card:hover {
        box-shadow: 0 2px 8px rgba(9, 30, 66, 0.15);
    }
    
    .nav-link:hover {
        background-color: #deebff;
        color: #0052cc;
    }
    
    .nav-link.active {
        background-color: #deebff;
        color: #0052cc;
    }
`;
document.head.appendChild(style);

// Export functions for global use
window.SupportTicketApp = {
    showNotification,
    initializeJiraFeatures
};