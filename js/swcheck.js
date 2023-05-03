if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../sw.js')
        .then(res => console.log("Service worker registered"))
        .catch(err = console.log("Service worker not registered"));
}

let db;
let addDataToIDB = (key, value) => {
    return new Promise((resolve, reject) => {
        try {
            let openRequest = indexedDB.open("MyDatabase", 1);
            openRequest.onupgradeneeded = () => {
                db = openRequest.result;
                if(!db.objectStoreNames.contains("Users")) {
                    db.createObjectStore("Users", {keyPath: 'key'});
                }
            };
            openRequest.onsuccess = () => {
                try {
                    db = openRequest.result;
                    if(!db.objectStoreNames.contains("Users")) {
                        db.createObjectStore("Users", {keyPath: 'key'});
                    }
                } catch (error) {};
                let dbTransaction = db.transaction(["Users"], "readwrite");
                let request = dbTransaction.objectStore("Users").put({
                        key: btoa(key),
                        value: btoa(JSON.stringify(value))
                    });

                request.onsuccess = (event) => {
                    resolve("Added to Database");
                };
                request.onerror = (event) => {
                    reject("Rejected: "+ event);
                };
            };
        } catch (error) {};
    });
}

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


document.getElementById("setData").addEventListener('click', (e) => {
    console.log("Button Clicked");
    let data = {
        name : "Krishna",
        age : 21
    }
    addDataToIDB("Employees", data);
});