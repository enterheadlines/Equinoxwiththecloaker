const searchInput = document.getElementById("search");

window.addEventListener("DOMContentLoaded", () => {
    const link = btoa(window.location.hash.slice(1));
    if (link) go(link);

    function updateText() {
        const creationInfo = document.getElementById("creation-info");
        const facts = [
            "Equinox was created in January 2024.",
            "Want more links? Checkout our Patreon (patreon.com/wrnd)",
            "Join our Discord (dsc.gg/unblockstuff)",
            "Experienced downtime? Look at our Discord server for status updates.",
            "Customize your experience in settings",
            "We have a lot of popular games and apps to choose from.",
            "Follow us on TikTok (@unblockstuff)",
            "Equinox was made by WRND",
            "Host Equinox yourself on GitHub (github.com/wrndxyz)"
        ];
        creationInfo.textContent = facts[Math.floor(Math.random() * facts.length)];
    }

    updateText();
    setInterval(updateText, 10000);

    console.log(`
        ███████╗░██████╗░██╗░░░██╗██╗███╗░░██╗░█████╗░██╗░░██╗
        ██╔════╝██╔═══██╗██║░░░██║██║████╗░██║██╔══██╗╚██╗██╔╝
        █████╗░░██║██╗██║██║░░░██║██║██╔██╗██║██║░░██║░╚███╔╝░
        ██╔══╝░░╚██████╔╝██║░░░██║██║██║╚████║██║░░██║░██╔██╗░
        ███████╗░╚═██╔═╝░╚██████╔╝██║██║░╚███║╚█████╔╝██╔╝╚██╗
        ╚══════╝░░░╚═╝░░░░╚═════╝░╚═╝╚═╝░░╚══╝░╚════╝░╚═╝░░╚═╝
        Version 2.0`);
});

document.getElementById("form").addEventListener("submit", (event) => {
    event.preventDefault();
    go(searchInput.value);
});

document.querySelectorAll(".game-container").forEach(container => {
    container.addEventListener("click", (event) => {
        event.preventDefault();
        const link = container.getAttribute("data-href");
        go(link);
        searchInput.placeholder = link;
    });
});