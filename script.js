document.querySelector("body").addEventListener("click", () => {
    document.querySelector(".overlay").classList.toggle("active");
})


gsap.registerPlugin(CustomEase, Flip);

CustomEase.create("ease-out-quad", "0.25,0.46,0.45,0.94");


function initAnimation() {
    const state = Flip.getState(".images__item:nth-last-child(8)");
    const offsetState = Flip.getState(".images__item.offset__image");

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

            const enter = document.querySelector(".images__item:nth-last-child(8)");

            gsap.set(offsetImages, { "grid-column": "7/8", "grid-row": "1", x: 20 })

            Flip.from(state, {
                duration: 2.6,
                ease: "power4.in",
                scale: true,
                onComplete: () => {

                    enter.addEventListener("mouseenter", () => {
                        let mouseXPosition;
                        let mouseYPosition;

                        window.addEventListener("mousemove", (e) => {
                            mouseXPosition = e.clientX;
                            mouseYPosition = e.clientY;

                            gsap.set(enter, { gridArea: "auto / 1 / auto / 2" })

                            gsap.to(enter, {
                                y: -`${mouseYPosition}`,
                                left: `${mouseXPosition}`,
                                ease: "ease-out-quad",
                                duration: 0.5
                            })
                        })
                    }) 

                }
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
            .to("#translate-y-text", { y: 0, ease: "power4.out", duration: 1.5 }, "+=0.5")
            .to("#translate-footer-text", { y: 25, ease: "power4.out", duration: 1.5 }, "<")
        }
    })
}

window.addEventListener("DOMContentLoaded", initAnimation);