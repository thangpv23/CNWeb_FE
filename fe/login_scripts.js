console.clear();

const loginBtn = document.getElementById('login');
const signupBtn = document.getElementById('signup');

signupBtn.addEventListener('click', (e) => {
    let parent = e.target.parentNode;
    Array.from(e.target.parentNode.classList).find((element) => {
        if (element !== "slide-up") {
            parent.classList.add('slide-up')
        } else {
            loginBtn.parentNode.parentNode.classList.add('slide-up')
            parent.classList.remove('slide-up')
        }
    });
});

loginBtn.addEventListener('click', (e) => {
    let parent = e.target.parentNode.parentNode;
    Array.from(e.target.parentNode.parentNode.classList).find((element) => {
        if (element !== "slide-up") {
            parent.classList.add('slide-up')
        } else {
            signupBtn.parentNode.classList.add('slide-up')
            parent.classList.remove('slide-up')
        }
    });
});



 function reg(event){
    event.preventDefault();

    var myHeaders = {'Content-Type': 'application/json'}


    var raw = JSON.stringify({"Username":document.querySelector('.email').value,
                            "Password":document.querySelector('.password').value,
                            "Name":document.querySelector('.name').value});

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };


    fetch("http://localhost:5000/users/regis", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result)
            showSuccess();
        })
        .catch(error => console.log(error));
}

async function login(event){
    event.preventDefault();
    var myHeaders = {'Content-Type': 'application/json'}

    var raw = JSON.stringify({"Username":(document.querySelectorAll('.email')[1]).value,
                            "Password":(document.querySelectorAll('.password')[1]).value});
    console.log((document.querySelectorAll('.email')[1]).value);
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    try {
        const response = await  fetch("http://localhost:5000/users/authen", requestOptions);
        if(response.ok) {
            const result = await response.json();
            console.log(result);
            sessionStorage.setItem("token", result.token);
            sessionStorage.setItem("uid", result.id);
            console.log(sessionStorage.getItem("uid"));
            console.log(sessionStorage.getItem("token"));
            window.location.href ='index.html';

        } else {
            showAlert()
        }


    } catch (error){
        showAlert();
    }

    // fetch("http://localhost:5000/users/authen", requestOptions)
    //     .then(response => {console.log(response.json())})
    //     .then(result => console.log(result))
    //     .catch(error => {console.log('alo')});

}

function showAlert(){

    let element = document.getElementById("alert");
    element.style.visibility = 'unset';
    element.style.display = 'unset';


}
function showSuccess(){

    let element = document.getElementById("success");
    element.style.visibility = 'unset';
    element.style.display = 'unset';

}

