const signUpInputs = document.querySelectorAll('.front input')
const loginInputs = document.querySelectorAll('.back input')
const signUpBtn = document.querySelector('.signUp')
const logBtn = document.querySelector('.login')
const loglink = document.querySelector('.go-log')
const signlink = document.querySelector('.go-sign')
let path = window.location.pathname
let storage = []
let usersName = []
emailRegex = /^[a-z0-9_]+(@gmail.com)$/i


let r = ['m', 'h']
if (r.includes("h")){
  console.log('y');
  
}else{
  console.log('n');
  
}

if (window.location.pathname.includes('index.html') || path === '/index'){

// function prevent repeat my code
function makeValidation(num, classAdded, classRemoved, classSelected, replace1, replace2) {
      signUpInputs[num].classList.add(classAdded)
      signUpInputs[num].classList.remove(classRemoved)
      document.querySelector(classSelected).classList.replace(replace1, replace2)
}
// function remove valid class in signup form
function removeMark(num, classSelected){
  if (signUpInputs[num].value === '') {
    signUpInputs[num].classList.remove('is-valid')
    signUpInputs[num].classList.remove('is-invalid')
    document.querySelector(classSelected).classList.replace('d-block', 'd-none')
  }
}

  // some validations
  signUpInputs[0].addEventListener('input', function(){
    let usersName = JSON.parse(localStorage.getItem('names'))
    if (usersName){

        if (usersName.includes(signUpInputs[0].value)){
            makeValidation(0, 'is-invalid', 'is-valid', '.name-error', 'd-none', 'd-block')
    
        }else {
            makeValidation(0, 'is-valid', 'is-invalid', '.name-error', 'd-block', 'd-none')
    
        }
    }else{
       makeValidation(0, 'is-valid', 'is-invalid', '.name-error', 'd-block', 'd-none')
    }
    removeMark(0, '.name-error')
  })


  signUpInputs[1].addEventListener('input', function() {

    if (!emailRegex.test(signUpInputs[1].value)){

          makeValidation(1, 'is-invalid', 'is-valid', '.e-error', 'd-none', 'd-block')
    
    }else {
          makeValidation(1, 'is-valid', 'is-invalid', '.e-error', 'd-block', 'd-none')
    }
    removeMark(1, '.e-error')
  })

  signUpInputs[3].addEventListener('input', function(){

    if (signUpInputs[3].value !== signUpInputs[2].value){
          makeValidation(3, 'is-invalid', 'is-valid', '.pass-error', 'd-none', 'd-block')
    
    }else {
          makeValidation(3, 'is-valid', 'is-invalid', '.pass-error', 'd-block', 'd-none')
    }
    removeMark(3, '.pass-error')
  })


  //click on sign up button
  signUpBtn.addEventListener('click', function(e){
    e.preventDefault()

    if(!signUpInputs[0].classList.contains('is-valid') || !signUpInputs[1].classList.contains('is-valid') || !signUpInputs[3].classList.contains('is-valid')){

      return
    } 
    setInfo()
    
    reset()

    rotate()

    signUpInputs.forEach(inputs =>{
      inputs.classList.remove('is-valid')
    })
  })

  // click on login button
  logBtn.addEventListener('click', function(e){
    e.preventDefault()

    let email = document.querySelector('.back input[name="email"]').value.trim()
    let pass = document.querySelector('.back input[name="password"]').value.trim()
    
    let getData = localStorage.getItem('userInfo')
    let Users = JSON.parse(getData)

    let isOurUser = Users.find(user => {
      return user.email === email && user.pass === pass
    })
    
    if (!isOurUser){
      let umail = Users.find(e => e.email === email)
      let upass = Users.find(p => p.pass === pass)
    
      if (!umail){
        document.querySelector('.E-error').classList.replace('d-none', 'd-block')
        loginInputs[0].classList.add('is-invalid')
      }else if (!upass) {
        document.querySelector('.P-error').classList.replace('d-none', 'd-block')
        loginInputs[1].classList.add('is-invalid')
      }
      return
    }

    currentUser = isOurUser.name
    localStorage.setItem('currentUser', JSON.stringify(currentUser))

    reset()
    window.location.href = 'home.html'
  })


  // reset inputs
  function reset() {
    signUpInputs.forEach(input => {
      input.value = ''
    })

    loginInputs.forEach(input => {
      input.value = ''
    })
  }

  // set in storage
  function setInfo(){
    const userData = {
      name: signUpInputs[0].value,
      email: signUpInputs[1].value,
      pass: signUpInputs[2].value
    }
    storage.push(userData)
    usersName.push(userData.name)

    localStorage.setItem('userInfo', JSON.stringify(storage))
    localStorage.setItem('names', JSON.stringify(usersName))
  }

  // rotate card func
  function rotate(){
    document.querySelector('.card').classList.toggle('rotate')
  }

  // if you have an acc
  loglink.addEventListener('click', function(e) {
    e.preventDefault()
    rotate()
  })

  // if you do not have an acc
  signlink.addEventListener('click', function(e) {
    e.preventDefault()
    rotate()
  })

  // remove error when change in input
  loginInputs.forEach(input => {
    input.addEventListener('input', function(){
      input.classList.remove('is-invalid')
      input.nextElementSibling.classList.replace('d-block', 'd-none')
    })
  })

}//end of if location path

if (window.location.pathname.includes('home.html')) {
  window.addEventListener('DOMContentLoaded', function () {
    
    let user = JSON.parse(localStorage.getItem('currentUser'))
    let container = document.querySelector('.welcome')

    if (container && user) {
      container.innerHTML = `<h1>Welcome ${user}</h1>`
    } else {
      console.warn('container or user not found:', { container, user });
    }

  })
  
  // toggle icon
  document.querySelector('.inner i').addEventListener('click', function() {
      document.querySelector('.custom-dropdown').classList.toggle('show')
  })

  //logout btn
  document.querySelectorAll('.out').forEach(out => {
    console.log(out);
    out.addEventListener('click', function(){
        localStorage.removeItem('currentUser')
        window.location.href = 'index.html'
    })
    
  })
}


