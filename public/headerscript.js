document.addEventListener("DOMContentLoaded", function () {
    // Referera till header-element
    const header = document.querySelector(".quiz-header");
    const title = document.querySelector("h1");
    const startBtn = document.querySelector(".start-btn");
    const infoBtn = document.querySelector(".info-btn");
    
    // Hover-effekter för rubriken (behåller din ursprungliga kod)
    title.addEventListener("mouseover", function () {
        title.style.color = "#ffcc00";
        title.style.textShadow = "0 0 15px rgba(255, 204, 0, 0.8)";
    });
    
    title.addEventListener("mouseleave", function () {
        title.style.color = "white";
        title.style.textShadow = "0 0 10px rgba(255, 255, 255, 0.8)";
    });
    
    // Lägg till interaktivitet för Start-knappen
    startBtn.addEventListener("click", function() {
        // Animation för att starta quizet
        header.style.transform = "scale(0.95) rotateX(0deg)";
        setTimeout(() => {
            header.style.transform = "scale(1) rotateX(5deg)";
            alert("Quizet startar!"); // Ersätt med faktisk funktionalitet
        }, 300);
    });
    
    // Lägg till interaktivitet för Info-knappen
    infoBtn.addEventListener("click", function() {
        const infoText = document.querySelector("p");
        
        // Växla mellan original text och info-text
        if (infoText.dataset.showingInfo !== "true") {
            infoText.dataset.originalText = infoText.textContent;
            infoText.textContent = "Detta quiz innehåller 10 frågor. Du får 30 sekunder per fråga. Lycka till!";
            infoText.dataset.showingInfo = "true";
            infoBtn.textContent = "Tillbaka";
        } else {
            infoText.textContent = infoText.dataset.originalText;
            infoText.dataset.showingInfo = "false";
            infoBtn.textContent = "Information";
        }
    });
    
    // Lägg till some particle/confetti-effekt för mer interaktivitet
    function createParticle() {
        const particles = 5;
        
        for (let i = 0; i < particles; i++) {
            const particle = document.createElement("div");
            particle.classList.add("particle");
            
            // Slumpmässig styling för partiklar
            particle.style.width = Math.random() * 15 + 5 + "px";
            particle.style.height = particle.style.width;
            particle.style.background = `hsl(${Math.random() * 60 + 40}, 100%, 65%)`;
            particle.style.borderRadius = "50%";
            particle.style.position = "absolute";
            particle.style.top = Math.random() * header.offsetHeight + header.offsetTop + "px";
            particle.style.left = Math.random() * header.offsetWidth + header.offsetLeft + "px";
            particle.style.opacity = Math.random() * 0.5 + 0.5;
            particle.style.pointerEvents = "none";
            
            document.body.appendChild(particle);
            
            // Animation och sedan borttagning
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 3 + 1;
            const tx = Math.cos(angle) * 100 * velocity;
            const ty = Math.sin(angle) * 100 * velocity;
            
            particle.animate([
                { transform: "translate(0, 0) scale(1)", opacity: particle.style.opacity },
                { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
            ], {
                duration: Math.random() * 1000 + 500, 
                easing: "cubic-bezier(0,0,0.2,1)"
            });
            
            setTimeout(() => {
                document.body.removeChild(particle);
            }, 1500);
        }
    }
    
    // Lägg till particles vid klick på header
    header.addEventListener("click", createParticle);
    
    // Väl-komstanimation
    setTimeout(() => {
        createParticle();
    }, 1000);
});
