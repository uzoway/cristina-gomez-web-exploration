document.querySelector("body").addEventListener("click", () => {
    document.querySelector(".overlay").classList.toggle("active");
})


gsap.registerPlugin(CustomEase, Flip);

CustomEase.create("ease-out-quad", "0.25,0.46,0.45,0.94");
CustomEase.create("ease-out-quart", "0.165,0.84,0.44,1");
CustomEase.create("ease-out-cubic", "0.215,0.61,0.355,1");
CustomEase.create("ease-in-cubic", "0.55,0.055,0.675,0.19");


function initAnimation() {
    const state = Flip.getState(".images__item:nth-last-child(8)");
    const offsetState = Flip.getState(".images__item.offset__image");


    function scaledImageMouseMoveAnimation() {
        const centerImage = document.querySelector(".images__item:nth-last-child(8)");

        const movingImageItem = centerImage.querySelector("img");

        const imagePaths = [
            './assets/images/1 (10).webp',
            './assets/images/1 (24).webp',
            './assets/images/1 (9).webp',
        ];

        const movingTl = gsap.timeline({
            paused: true
        });

        imagePaths.forEach((imagePath, index) => {
            movingTl.to(movingImageItem, {
                opacity: 0.95,
                duration: 0.25,
                ease: 'power3.in', 
            }).set(movingImageItem, {
                attr: { src: imagePath },
            }, "-=0.2").to(movingImageItem, {
                ease: 'power3.in', 
                opacity: 1,
                duration: 0.25
            }, "-=0.1");
        });
        
        centerImage.addEventListener("mouseenter", () => {
            let mouseXPosition; 
            let mouseYPosition;

            window.addEventListener("mousemove", (e) => {
                mouseXPosition = e.pageX - centerImage.offsetWidth * 9.5;
                mouseYPosition = e.pageY - centerImage.offsetHeight * 3.5;

                gsap.to(centerImage, {
                    top: `${mouseYPosition}`,
                    left: `${mouseXPosition}`,
                    ease: "power4.out",
                    duration: 1.5
                })

                movingTl.restart().play();
            })
        }) 
    }


    gsap.to(".images__item", {
        "--y-percent": "110%",
        ease: "ease-out-quad",
        duration: 1.12,
        stagger: {
            each: 0.065,
            from: "edges"
        },
        delay: 1,
        onComplete: () => {
            gsap.set(".images__item:nth-last-child(8)", { 
                scale: 2.9, 
                zIndex: 3, 
                x: 40, 
                "grid-column": "7/8", 
                "grid-row": "1" 
            })

            const offsetImages = gsap.utils.toArray(".images__item.offset__image");

            gsap.set(offsetImages, { "grid-column": "7/8", "grid-row": "1", x: 20 })

            Flip.from(state, {
                duration: 2.6,
                ease: "power4.in",
                scale: true,
                onComplete: scaledImageMouseMoveAnimation()
            })

            Flip.from(offsetState, {
                delay: 0.6,
                ease: "power4.in",
                duration: 1.12,
                stagger: {
                    from: "center",
                    each: 0.06
                },
                onComplete: () => {
                    gsap.set(offsetImages, { display: "none" })
                }
            })
            .to("#translate-y-text", { y: 0, ease: "ease-out-quad", duration: 1 }, "+=0.5")
            .to("#translate-footer-text", { y: 25, ease: "ease-out-quad", duration: 1 }, "<")
        }
    })
}

window.addEventListener("DOMContentLoaded", initAnimation);