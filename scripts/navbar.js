const navLinks = document.querySelectorAll("nav ul:first-child a")
const navElement = document.querySelector("nav")
const menuBtn = document.querySelector(".menu-btn")
const mobileNav = document.querySelector(".mobile-nav")

const sections = [
    document.querySelector("#skills"),
    document.querySelector("#projects"),
    document.querySelector("#education"),
    document.querySelector("#certificates"),
    document.querySelector("#about-me")
]
let sectionPositions = []

navLinks.forEach(link => {
    link.addEventListener("mouseover", (event) => {
        event.target.nextSibling.style.width = "100%"
    })

    link.addEventListener("mouseout", (event) => {
        event.target.nextSibling.style.width = "0"
        setLinkUnderline()
    })
})

const curLocation = window.location.href.split("/")[3]

if (curLocation !== "blog") {
    window.addEventListener("scroll", () => {
        if(window.scrollY > 40) {
            navElement.classList.add("scrolled")
        } else {
            if (!isMenuOpened) {
                navElement.classList.remove("scrolled")
            }
        }
    })
}

const remainingLinks = Array.from(navLinks).slice(1)

if (window.innerWidth > 880 && curLocation !== "blog") {
    document.addEventListener("scroll", () => {

        if (sectionPositions.length === 0) {
            sections.forEach(section => {
                sectionPositions.push([section.offsetTop - window.innerHeight / 4, section.offsetTop + section.offsetHeight])
            })
        }

        if (window.scrollY < sectionPositions[0][0]) {
            remainingLinks.forEach((link, index) => {
                link.nextElementSibling.style.width = "0"
            })
        } else {
            setLinkUnderline()
        }

    })
}

const setLinkUnderline = () => {
    for (let i = 0; i < sectionPositions.length; i++) {
        if (window.scrollY >= sectionPositions[i][0] && window.scrollY <= sectionPositions[i][1]) {
            remainingLinks.forEach((link, index) => {
                if (index !== i) {
                    link.nextElementSibling.style.width = "0"
                } else {
                    link.nextElementSibling.style.width = "100%"
                }
            })
        }
    }
}

let isMenuOpened = false

const darkOverlay = document.querySelector(".dark-overlay")

darkOverlay.addEventListener("click", () => {
    if (isMenuOpened) {
        switchMenu()
    }
})

menuBtn.addEventListener("click", () => {
    switchMenu()
})

const switchMenu = () => {
    isMenuOpened = !isMenuOpened
    const menuState = ["none", "block"]
    
    darkOverlay.style.display = menuState[+isMenuOpened]

    mobileNav.classList.toggle("active")
    menuBtn.firstElementChild.classList.toggle("fa-bars")
    menuBtn.firstElementChild.classList.toggle("fa-xmark")

    if (window.scrollY <= 40) {
        navElement.classList.toggle("scrolled")
    }
}