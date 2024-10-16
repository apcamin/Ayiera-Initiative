export async function createCookie(key: string, value) {
  sessionStorage.setItem(key, value);
}

export async function fetchCookie(key: string) {
  return sessionStorage.getItem(key);
}

export async function removeCookie(key: string) {
    if (sessionStorage.exists(key)){
        sessionStorage.removeItem(key);
    }else{
        throw new Error('Key not found in session storage');
    }
}