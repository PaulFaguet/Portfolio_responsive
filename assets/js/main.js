const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    })
}

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    })
}

const navLink = document.querySelectorAll('.nav_link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/* accordion skills */
const skillsContent = document.getElementsByClassName('skills_content'),
      skillsheader = document.querySelectorAll('.skills_header');

function toggleSkills() {
    let itemClass = this.parentNode.className;

    for (i = 0; i < skillsContent.length; i++) {
        skillsContent[i].className = 'skills_content skills_close';
    }

    if (itemClass === 'skills_content skills_close') {
        this.parentNode.className = 'skills_content skills_open'
    }
}

skillsheader.forEach((el) => {
    el.addEventListener('click', toggleSkills)
})

// qualification tabs

const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.target);

        tabContents.forEach(tabContent => {
            tabContent.classList.remove('qualification_active')
        })
        target.classList.add('qualification_active')

        tab.forEach(tab => {
            tab.classList.remove('qualification_active')
        })
        tab.classList.add('qualification_active')

    })
})

// active modal

const modalViews = document.querySelectorAll('.services_modal'),
      modalBtns = document.querySelectorAll('.services_button'),
      modalCloses = document.querySelectorAll('.services_modal-close');

let modal = function(modalClick) {
    modalViews[modalClick].classList.add('active-modal')
}

modalBtns.forEach((modalBtn, i) => {
    modalBtn.addEventListener('click', () => {
        modal(i)
    })
})

modalCloses.forEach((modalClose) => {
    modalClose.addEventListener('click', () => {
        modalViews.forEach((modalView) => {
            modalView.classList.remove('active-modal')
        })
    })
})

// swiper

let swiper = new Swiper(".portfolio_container", {
    cssMode: true,
    loop: true,

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
});

// scroll section active link

const sections = document.querySelectorAll('section[id]')

function scrollActive() {
    const scrollY = window.pageYOffset
 
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav_menu a[href*=' + sectionId + ']').classList.add('active-link')
        } else {
            document.querySelector('.nav_menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

// change background header

function scrollHeader() {
    const nav = document.getElementById('header')
    // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader);

// show scroll top

function scrollUp() {
    const scrollUp= document.getElementById('scroll-up');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if (this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollUp);

// dark light theme

const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'uil-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

// Send email
// VÉRIFIER SI LES INPUT SONT VIDES OU NON 
const sendMailButton = document.getElementById('sendMail');

const formName = document.getElementById('form_name');
const formEmail = document.getElementById('form_email');
const formProject = document.getElementById('form_project');
const formContent = document.getElementById('form_content');
const formTel = document.getElementById('form_tel');

const alertDiv = document.getElementById('alert_good_message');
const badMessageAlertDiv = document.getElementById('alert_bad_message');

const emailErrorMessage = document.getElementById('email_error_message');
const nameErrorMessage = document.getElementById('name_error_message');
const telErrorMessage = document.getElementById('tel_error_message');
const projectErrorMessage = document.getElementById('project_error_message');
const contentErrorMessage = document.getElementById('content_error_message');

function loadThenVanishAlerts(element, duration) {
    element.classList.add("alert_load");
        setTimeout(() => {
            element.classList.add("alert_vanish");
            element.classList.remove("alert_load");
        }, duration);
}

const inputDictionnary = [
    {
        inputName: formName,
        errorMessage: nameErrorMessage
    },
    {
        inputName: formEmail,
        errorMessage: emailErrorMessage
    },
    {
        inputName: formTel,
        errorMessage: telErrorMessage
    },
    {
        inputName: formProject,
        errorMessage: projectErrorMessage
    },
    {
        inputName: formContent,
        errorMessage: contentErrorMessage
    }
]

function sendMail() {
    if (formName.value != "" && formEmail.value != "" && formProject.value != "" && formContent.value != "" && formTel.value != "") {

        var tempParams = {
            from_name: formName.value,
            from_email: formEmail.value,
            from_tel: formTel.value,
            to_name: 'Paul',
            object: formProject.value,
            message: formContent.value
        };

        emailjs.send('service_avzdjev', 'template_rm6zn8w', tempParams)
        .then(() => {
            for (i = 0; i < inputDictionnary.length; i++) {
                inputDictionnary[i].inputName.value = "";
            }
        
            loadThenVanishAlerts(alertDiv, 10000)
        });
    } else {
        for (i = 0; i < inputDictionnary.length; i++) {
            if (inputDictionnary[i].inputName.value === "") {
                loadThenVanishAlerts(inputDictionnary[i].errorMessage, 10000);
            }
        }

        loadThenVanishAlerts(badMessageAlertDiv, 10000)
    }
}

sendMailButton.addEventListener('click', () => {
    sendMail();
})