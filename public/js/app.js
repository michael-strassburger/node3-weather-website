console.log('Message from javascript file')


const weatherForm =  document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')
const message3 = document.querySelector('#message-3')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    fetch('/weather?address=' + location.toString()).then((response)=>{
        response.json().then((data)=>{
            if (!data.error) {
                message1.textContent = data.location
                message2.textContent = data.forecast
                message3.textContent = 'Current air pressure: ' + data.pressure + ' hpa'
            } else {
                message1.textContent = data.error
                message2.textContent = ''
                message3.textContent = ''
            }
        })
    })
    console.log('Testing!')
})