const ApiService = {
    getFood: function() {
        return fetch('food.json').then(e => e.json())
    }
}

export default ApiService;