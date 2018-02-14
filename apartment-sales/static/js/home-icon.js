function scrollFunction() {

    const logo = document.getElementById('my-home-logo');
    if (scrollY > 115) {
        logo.style.display = 'inline-block';
    } else {
        logo.style.display = 'none';
    }
}

window.onscroll = scrollFunction;
