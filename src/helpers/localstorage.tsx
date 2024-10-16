export async function addToLocalStorage(key: string, value: string){
    localStorage.setItem(key, value);
}

export async function fetchLocalStorage(key: string){
    return localStorage.getItem(key)
}