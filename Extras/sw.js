self.addEventListener('install', (e) => {
    e.waitUntil(self.skipWaiting()) 
    console.log("Installed")
})
    
if (self.indexedDB) {
    console.log("Your browser supports a stable version of IndexedDB.")
}

self.addEventListener('sync',(e)=> {
    if(e.tag === "sendData"){
        console.log("inside sync event")
        // read()
    }   
    var request = self.indexedDB.open("newDatabase", 1)
    var db;

    request.onerror = function(event){
        console.log("error")
    }
    
    request.onsuccess = function(event) {
        db = event.target.result;
        var transaction = db.transaction(["employee"], "readwrite");
        var store = transaction.objectStore("employee")
        var data = store.get(1)
        data.onsuccess = function(event){
            console.log(data.result.name)
        }
        data.onerror = function() {
            console.log("erron on fetching data")
        }
    }


    // console.log("ui")
})




// function read() {
//     var db;
//     var request = self.indexedDB.open("newDatabase", 1);
    
    
//     request.onerror = function(event) {
//        console.log("Unable to retrieve daa from database!");
//     };

//     request.onsuccess = function(event) {
//         db = event.target.result
//         var transaction = db.transaction(["employee"]);
//         var objectStore = transaction.objectStore("employee");
//         var request = objectStore.get(1);
//         console.log(request.result.data1)
//     }
    
//     // request.onsuccess = function(event) {
//     //    // Do something with the request.result!
//     //    if(request.result) {
//     //       alert("Name: " + request.result.name + ", 
//     //          Age: " + request.result.age + ", Email: " + request.result.email");
//     //    } else {
//     //       alert("Kenny couldn't be found in your database!");
//     //    }
//     // };
//  }







// function storetoIndexDB() {
//     var db;
//     var request = self.indexedDB.open("newDatabase", 1);
//     request.onerror = function(event) {
//         console.log("error: ");
//     };
//     request.onsuccess = function(event) {
//         // db = request.result;
//         // console.log("success: "+ db);
//         db = event.target.result;
//         var transaction = db.transaction(['employee'], 'readwrite');
//         var store = transaction.objectStore('employee');
//         var data = {
//             id: 2,
//             name:"Logesh",
//             age:21
//         };
//         var addRequest = store.add(data);
//         addRequest.onsuccess = function() {
//             console.log("Data added to the store");
//         };
//         addRequest.onerror = function() {
//             console.log("Error adding data to the store");
//         };
    
//     };
//     request.onupgradeneeded = function(event) {
//         var db = event.target.result;
//         var objectStore = db.createObjectStore("employee",{keyPath: 'id'});
//     }
// }



// self.addEventListener('install', function(event) {
//     self.skipWaiting();
// });
  
// self.addEventListener('sync', function(event) {

//     self.registration.showNotification("Sync event fired!");
// });
  


 




