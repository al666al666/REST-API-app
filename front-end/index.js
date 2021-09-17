

const addButton = document.querySelector('#add_button')
const contain = document.querySelector('.posts-list');
const name_value = document.querySelector('#name_value');
const chanel_value = document.querySelector('#chanel_value');
const apiURL = 'http://localhost:3000/api/'

//render function 
let render_output = ' '
const renderPost = (data) => {
    data.forEach(post => {
        render_output += ` 
        <div class="card" >
  <div class="card-body" data-id="${post._id}" >
    <h5 class="card-title">${post.name}</h5>
    <h6 class="card-subtitle mb-2">${post.chanel}</h6>
   
    <button class="card-link btn btn-danger" id="edit_button">Edit</button>
    <button class="card-link btn btn-primary" id="delete_button" >Delete</button>
  </div>
</div>
        
        `
        contain.innerHTML = render_output
    })
}


// GET method
fetch(apiURL + 'getAll')
    .then(res => res.json())
    .then(data => renderPost(data))


//INSERT method 

addButton.addEventListener('click', (e) => {
    e.preventDefault() ; 

    fetch("http://localhost:3000/api/postOne" ,  {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            name :name_value.value,
            chanel :chanel_value.value
        })
    })

    .then(res=>res.json()) 
    .then(data=>{
        const postArr = [] ; 
        postArr.push(data) ; 
        renderPost(postArr) 
    })

    name_value.value=" " ; 
    chanel_value.value =" " ;
})



//Delete
contain.addEventListener('click',(e)=>{
    e.preventDefault() 
    let id = e.target.parentElement.dataset.id 
    let editButton = e.target.id=="edit_button"
    let deleteButton = e.target.id =="delete_button" ; 
    let thiscard = contain.querySelector('.card')

    if(deleteButton) {
        contain.removeChild(thiscard)
        fetch(apiURL+`deleteOne/${id}`,{
            method:"DELETE" ,
        })
            .then(res=>res.json()) 
            .then(()=>location.reload()) 
    }


    if(editButton){
        let parent = e.target.parentElement; 
        let name_content = parent.querySelector('.card-title').textContent ;
        let body_content = parent.querySelector('.card-subtitle').textContent ;
        

        name_value.value = name_content ; 
        chanel_value.value = body_content ; 
       
    }

    addButton.addEventListener('click' , (e)=>{
        e.preventDefault() 
        fetch(apiURL+`updateOne/${id}`,{
            method:'PATCH' ,
            headers:{
                "Content-Type":"application/json" 
            },
            body:JSON.stringify({
                name:name_value.value , 
                chanel:chanel_value.value 
            })
        })

        .then(res=>res.json()) 
        .then(()=>location.reload()) 
    })
  
})

