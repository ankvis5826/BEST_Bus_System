const fname =  document.querySelector('#Signup .formMain #fname');
const email =  document.querySelector('#Signup .formMain #email');
const password =  document.querySelector('#Signup .formMain #pass');
const confpassword =  document.querySelector('#Signup .formMain #confPass');
const subBtn =  document.querySelector('#Signup .formMain .submitBtn');

subBtn.addEventListener('click',async ()=>{
   //email check
   let emailCheck = email.value.search('.com');
   if(emailCheck==-1){
       alert("Check email");
       return;
   }
   //password check
   if(password.value.length<8){
      alert('Password is less then 8');
      return;
   }
   if(password.value!==confpassword.value){
      alert('password not match');
      return;
   }
   
   //making request to signup router
   const  res = await requestPost(fname.value,email.value,password.value);
   if(res.status==='Success'){
     alert('You Success Register')
     //empty value in ui
     fname.value = "";
     email.value = "";
     password.value = "";
     confpassword.value = "";
   }else{
      alert('This email is already in use')
      
   }

})


//post fetch request
async function requestPost(fname,email,pass){
   const data = {
    "fullName":fname,
    "email":email.toLowerCase(),
    "pass":pass
   } 
   
     const res = await fetch('/signup',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
     })
     const jsonRes = await res.json();
     return jsonRes;
}