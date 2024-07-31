// const url = window.location.href;
window.onload = function () {
    const form =  document.querySelector('form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const xhr = new XMLHttpRequest();

        xhr.open('POST', '/userlogin', true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let jsondata = JSON.parse(xhr.responseText);
                window.postMessage(jsondata, "*");
            } else {
                alert(xhr.responseText);
            }
        }
        };

        const formData = new FormData(form);
        const data = JSON.stringify(Object.fromEntries(formData.entries()));

        xhr.send(data);
    });
    
}
