// Register the ScrollTrigger plugin with GSAP (GreenSock Animation Platform)
gsap.registerPlugin(ScrollTrigger);

// Function to clone and append the first 'total' children of 'parentEl' to itself
const repeatItems = (parentEl, total = 0) => {
    // Get all children of 'parentEl'
    const items = [...parentEl.children];
    // Loop over the first 'total' children
    for (let i = 0; i <= total-1; ++i) {
        // Clone the child
        var cln = items[i].cloneNode(true);
        // Append the cloned child to 'parentEl'
        parentEl.appendChild(cln);
    }
};

// Create a new instance of Lenis with smooth scrolling and infinite scrolling enabled
const lenis = new Lenis({
    smooth: true,
    infinite: true
});

// Update ScrollTrigger on scroll events
lenis.on('scroll',()=>{
  ScrollTrigger.update()
})

// Function to request animation frames
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

// Wait for all images in '.grid__item' elements to load
imagesLoaded( document.querySelectorAll('.grid__item'), { background: true }, () => {

    // Remove the 'loading' class from the body
    document.body.classList.remove('loading');

    // Repeat the first item in '.grid'
    repeatItems(document.querySelector('.grid'), 1);

    // Get all '.grid__item' elements
    const items = [...document.querySelectorAll('.grid__item')];

    // Animate the first item
    const firtsItem = items[0];
    gsap.set(firtsItem, {transformOrigin: '50% 100%'})
    gsap.to(firtsItem, {
        ease: 'none',
        startAt: {scaleY: 1},
        scaleY: 0,
        scrollTrigger: {
            trigger: firtsItem,
            start: 'center center',
            end: 'bottom top',
            scrub: true,
            fastScrollEnd: true,
            onLeave: () => {
                gsap.set(firtsItem, {scaleY: 1,})
            },
        }
    });

    // Animate the last item
    const lastItem = items[2];
    gsap.set(lastItem, {transformOrigin: '50% 0%', scaleY: 0})
    gsap.to(lastItem, {
        ease: 'none',
        startAt: {scaleY: 0},
        scaleY: 1,
        scrollTrigger: {
            trigger: lastItem,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            fastScrollEnd: true,
            onLeaveBack: () => {
                gsap.set(lastItem, {scaleY: 1})
            }
        }
    });
    
    // Animate the middle item
    let ft;
    let st;
    const middleItem = items[1];
        
    ft = gsap.timeline()
    .to(middleItem, {
        ease: 'none',
        onStart: () => {
            if (st) st.kill()
        },
        startAt: {scale: 0},
        scale: 1,
        scrollTrigger: {
            trigger: middleItem,
            start: 'top bottom',
            end: 'center center',
            scrub: true,
            onEnter: () => gsap.set(middleItem, {transformOrigin: '50% 0%'}),
            onEnterBack: () => gsap.set(middleItem, {transformOrigin: '50% 0%'}),
            onLeave: () => gsap.set(middleItem, {transformOrigin: '50% 100%'}),
            onLeaveBack: () => gsap.set(middleItem, {transformOrigin: '50% 100%'}),
        },
    });

    st = gsap.timeline()
    .to(middleItem, {
        ease: 'none',
        onStart: () => {
            if (ft) ft.kill()
        },
        startAt: {scale: 1},
        scale: 0,
        scrollTrigger: {
            trigger: middleItem,
            start: 'center center',
            end: 'bottom top',
            scrub: true,
            onEnter: () => gsap.set(middleItem, {transformOrigin: '50% 100%'}),
            onEnterBack: () => gsap.set(middleItem, {transformOrigin: '50% 100%'}),
            onLeave: () => gsap.set(middleItem, {transformOrigin: '50% 0%'}),
            onLeaveBack: () => gsap.set(middleItem, {transformOrigin: '50% 0%'}),
        },
    });
    
    // Request the first animation frame
    requestAnimationFrame(raf);
    
    // Function to refresh ScrollTrigger
    const refresh = () => {
        ScrollTrigger.clearScrollMemory();
        window.history.scrollRestoration = 'manual';
        ScrollTrigger.refresh(true);
    }

    // Refresh ScrollTrigger and add a resize event listener to refresh it on window resize
    refresh();
    window.addEventListener('resize', refresh);

});
