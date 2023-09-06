const form = document.getElementById("registerForm")
form.addEventListener('submit',e=> {
    e.preventDefault()
    const obj = {}
    const data = new FormData(form)
    data.forEach((value,key)=> {
        obj[key] = value
    })
    fetch("../api/sessions/login",{
        method:"POST",
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": 'application/json'
        }
    }).then(res => {
        if(res.status == 200) {
            window.location.replace("/users")
        }
    })
})