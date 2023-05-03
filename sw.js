
var db;

let getDataFromIDB = (key) => {
    return new Promise((resolve, reject) => {
        try {
            let openRequest = indexedDB.open("MyDatabase", 1);
            openRequest.onsuccess = () => {
                try {
                    try {
                        db = openRequest.result;
                        if(!db.objectStoreNames.contains("Users")) {
                            db.createObjectStore("Users", {keyPath: 'key'});
                        }
                    } catch (error) {};
                    let dbTransaction = db.transaction(["Users"], "readwrite");
                    let objectStore = dbTransaction.objectStore("Users");
                    let objectStoreRequest = objectStore.get(btoa(key));
                    objectStoreRequest.onsuccess = () => {
                        let res = objectStoreRequest.result;
                        if(!!res && res.value) {
                            try {
                                res.value = JSON.parse(atob(atob(res.value)));
                                resolve(res.value);
                            } catch (err) {
                                reject(err);
                            }
                        } else {
                            reject('Not found');
                        }
                    };
                    objectStoreRequest.onerror = (error) => {
                        reject(error);
                    }
                } catch (error) {reject(error);};
            };
        } catch (error) {};
    });
};


let lookForData = () => {

};

self.addEventListener('install', (e) => {
    self.skipWaiting();
    console.log("SW Installed");
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
    // setInterval(getDataFromIDB, 5000);
});