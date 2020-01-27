const form = document.querySelector('form')

const clearAll = () => {
    document.querySelector('#summary').textContent = ''
    document.querySelector('#temp').textContent = ''
    const precipType = document.querySelector('#precipType').textContent = '' 
    document.querySelector('#precipPossibility').textContent = ''
    document.querySelector('#location').textContent = ''
}

form.addEventListener('submit',(event) => {
    event.preventDefault()
    const loc = document.querySelector('#input').value

    clearAll()
    
    if(!loc){
        document.querySelector('#summary').textContent = 'Please enter a location :('
        return
    }

    document.querySelector('#location').textContent = 'Loading....'
    fetch(`/weather?addr=${loc}`).then((res) => {
        res.json().then((data) => {
            console.log(data)
            if(data.err){
                document.querySelector('#summary').textContent = 'Error'
                document.querySelector('#temp').textContent = data.err
            }
            else{
                document.querySelector('#summary').textContent = 'Status : ' + data.summary
                document.querySelector('#temp').textContent = 'Temperature(F) : ' + data.temperature
                const precipType = document.querySelector('#precipType').textContent = 'Precipitation Type : ' +  data.precipType 
                document.querySelector('#precipPossibility').textContent = precipType + ' possibility : ' + (data.precipPossibility * 100) + '%'
                document.querySelector('#location').textContent ='Location : ' + data.location
            }    
        })
    })
})