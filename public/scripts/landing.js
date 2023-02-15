// Animate menu button on smaller devices
const hamburgerBtn = document.querySelector('.nav-links-btn');
const hamburgerLine1 = document.querySelector('.hamburger-line1');
const hamburgerLine2 = document.querySelector('.hamburger-line2');
const hamburgerLine3 = document.querySelector('.hamburger-line3');

hamburgerBtn.addEventListener('click', function(){
    // check current state of menu
    let currState = getComputedStyle(hamburgerLine2)

    if(screen.width < 700){
        // menu closed
        if(currState.opacity == 1){
            hamburgerLine1.style.transitionDuration = '0.3s';
            hamburgerLine2.style.transitionDuration = '0.3s';
            hamburgerLine3.style.transitionDuration = '0.3s';

            hamburgerLine2.style.opacity = 0;
            hamburgerLine2.style.display = 'none';
            hamburgerLine1.style.transform = 'translate(0, 5px) rotate(45deg)';
            hamburgerLine3.style.transform = 'translate(0, -5px) rotate(-45deg)';

            navLinks.style.transitionDuration = '0.3s';
            navLinks.style.transform = 'translateY(0px)';
        }
        else{
            hamburgerLine1.style.transitionDuration = '0.3s';
            hamburgerLine2.style.transitionDuration = '0.3s';
            hamburgerLine3.style.transitionDuration = '0.3s';

            hamburgerLine2.style.opacity = 1;
            hamburgerLine2.style.display = 'block';
            hamburgerLine1.style.transform = 'translate(0, 0px) rotate(0deg)';
            hamburgerLine3.style.transform = 'translate(0, 0px) rotate(0deg)';

            navLinks.style.transitionDuration = '0.3s';
            navLinks.style.transform = 'translateY(2000px)';
        }
    }

    
})

const navLinks = document.querySelector('.nav-links');