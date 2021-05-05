export default async function postFetch(url, data, token = false) {
    if (token) token = localStorage.getItem("TOKEN")
    const requestOptions = {
        crossDomain: true,
        headers: {
            "Content-type": "application/json",
            TOKEN: token,
        },
        method: "POST",
        body: JSON.stringify(data),
    }

    const res = await fetch(url, requestOptions)
    const ans = await res.json()
    return ans
}

export async function getFetch(url, params = {}, token = false) {
    const query = Object.entries(params)
        .map((param) => {
            return `${param[0]}=${param[1]}`
        })
        .join("&")
    if (token) token = localStorage.getItem("TOKEN")
    const requestOptions = {
        crossDomain: true,
        headers: {
            TOKEN: token,
        },
        method: "GET",
    }
    const res = await fetch(`${url}?${query}`, requestOptions)
    const ans = await res.json()
    return ans
}
