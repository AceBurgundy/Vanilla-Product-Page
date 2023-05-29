export default function makeToast(message) {

    const container = document.getElementById("flashes")
    const child = document.createElement("p")
    child.className = "message"
    child.textContent = message

    container.appendChild(child)

    setTimeout(() => {
        child.style.right = "100%"
        setTimeout(() => {
            child.remove()
        }, 200);
    }, 1000);

}