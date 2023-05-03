if('serviceWorker' in navigator){
    window.addEventListener('load', () => {
        navigator.serviceWorker
           .register('../sw.js')
            .then(reg => console.log('Service Worker: Registred'))
           .catch(err => console.log('Service Worker: Error: ${err}'))
    })
}

navigator.serviceWorker.ready.then(function(registration){
    return registration.sync.register('sendData')
})

 
if (!window.indexedDB) {
   window.alert("Your browser doesn't support a stable version of IndexedDB.")
}

function indexDB(data) {
    if(data == true){
        var db;
        var request = window.indexedDB.open("newDatabase", 1);

        request.onerror = function(event) {
            console.log("error: ");
        };
        request.onsuccess = function(event) {
            // db = request.result;
            // console.log("success: "+ db);
            db = event.target.result;
            var transaction = db.transaction(['employee'], 'readwrite');
            var store = transaction.objectStore('employee');
            var data1 = {
                id: 1,
                value:"User clicked button on offline"
            };
            var addRequest = store.add(data1);
            addRequest.onsuccess = function() {
                console.log("Data added to the store");
            };
            addRequest.onerror = function() {
                console.log("Error adding data to the store");
            };
        };
        request.onupgradeneeded = function(event) {
            var db = event.target.result;
            var objectStore = db.createObjectStore("Clicker", {keyPath: "id"});
        }
    }
}

function clicked() {
    var db;
    var request = self.indexedDB.open("newDatabase", 1);
    request.onerror = function(event) {
        console.log("error: ");
    };
    request.onsuccess = function(event) {
        // db = request.result;
        // console.log("success: "+ db);
        db = event.target.result;
        var transaction = db.transaction(['employee'], 'readwrite');
        var store = transaction.objectStore('employee');
        var data = {
            id: 3,
            name:"Krishna",
            age:21
        };
        var addRequest = store.add(data);
        addRequest.onsuccess = function() {
            console.log("Data added to the store");
        };
        addRequest.onerror = function() {
            console.log("Error adding data to the store");
        };
    
    };
    request.onupgradeneeded = function(event) {
        var db = event.target.result;
        var objectStore = db.createObjectStore("employee",{keyPath: 'id'});
    }
}




// const employeeData = [
//     { id: "01", name: "Gopal K Varma", age: 35, email: "contact@tutorialspoint.com" },
//     { id: "02", name: "Prasad", age: 24, email: "prasad@tutorialspoint.com" }
// ];

// var db;
// var request = window.indexedDB.open("newDatabase", 1);

// request.onerror = function(event) {
//     console.log("error: ");
// };
 
// request.onsuccess = function(event) {
//     db = request.result;
//     console.log("success: "+ db);
// };
 
// request.onupgradeneeded = function(event) {
//     var db = event.target.result;
//     var objectStore = db.createObjectStore("employee", {keyPath: "id"});
// }