function init() {
    fetch('/api/students')
        .then( response => {
            if (response.ok){
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then( responseJSON => {
            //console.log(responseJSON)
            for (let i = 0; i< responseJSON.length; i++){
                $('#studentList').append(`<li> ${responseJSON[i].name} </li>`)
            }
        })
        .catch( err => {
            console.log(err)
        })

        
}

init();//of init(); for native js