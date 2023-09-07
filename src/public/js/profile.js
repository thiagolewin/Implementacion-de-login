const a = document.querySelector("a")
a.addEventListener("click",(e)=> {
    e.preventDefault()
    fetch('../api/sessions/logout',{
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => {
        if(result.status ==  200) {
            window.location.replace("/users/login")
        }
    })
})
