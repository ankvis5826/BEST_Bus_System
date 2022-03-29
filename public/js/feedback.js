//geting all dom data to js file 
let fname = document.querySelector('#Feedback #fullName')
let email_Phone = document.querySelector('#Feedback #mailPhone')
let messages = document.querySelector('#Feedback #message')
//btn
let submitBtn = document.querySelector('#Feedback .Sendbtn .submitBtn')

submitBtn.addEventListener('click', ()=>{
    if(messages.value.trim() =="" ||messages.value.trim() ==" "){
        alert("Enter you message")
        return;
    }
    let data = {
        fullName:fname.value,
        emailPhone:email_Phone.value,
        message:messages.value
    }

    const res =  fetch('/feedback',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
     }).then((res)=>{
             if(res.status==201){
                 fname.value = " ";
                 email_Phone.value = " ";
                 messages.value = " ";
                 alert("Thank you for your feedback")
             }else{
                alert("Server Down we will Back in some time")

             }
     })
})