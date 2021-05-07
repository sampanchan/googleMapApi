class GoogleMapApi{

    // same as localhost:8888
    // API_BASE_URL = 'twitter-proxy.php'
    API_KEY = 'AIzaSyBN8YgsGRhmpj0vSQlLl5EViZa3MGbrjr8'

    init(){
        console.log('google map init')
        const form = document.querySelector('form[name="place_search"]')
        form.addEventListener('submit', this.handlePlaceSearch)
    }

    handlePlaceSearch = (evt) => {
        console.log('handle place search ok')
        var placeName = document.querySelector('#place').value

        var placeRequest = {
            location: this.map.getCenter(),
            radius: 50,
            query: placeName,
        }
        this.service = new google.maps.places.PlacesService(this.map)
        this.service.textSearch(placeRequest, this.handlePlaceResults)
    }

    handlePlaceResults = (results, status) => {
        evt.preventDefault()

        if (status == google.maps.places.PlacesServiceStatus.OK){
            console.log('got results', results)
        }
    }

    ready(){
        console.log('map is ready')

        const theCircus = { lat: 33.81328, lng: -84.36175 }
        const mapOptions = {
            center: theCircus,
            zoom:18,
        }

        this.map = new google.maps.Map(document.getElementById('map'), mapOptions)


        const marker = new google.maps.Marker({
            position: theCircus,
            map: this.map,
            title: 'the circus',
            // label: 'the creative circus',
            // draggable: true,
        })

        const infoWindowContent = `<div><h2>Hi Circus</h2><p> I am at a place in the boonies</p></div>`
        const infoWindow = new google.maps.InfoWindow({
            content: infoWindowContent,
        })
        marker.addListener('click', () => {
            infoWindow.open(this.map, marker)
        })
    }


}
window.gMap = new GoogleMapApi()
window.gMap.init()