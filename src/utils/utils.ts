import fetch from 'isomorphic-fetch'

// Deep get a value from an object
export function get(data: any, ...paths: Array<string|number>): any {
    let path = paths.shift()
    while(path !== undefined && path !== null) {
        // Move into object/array
        if(typeof data === 'object') {
            data = data[path]
            path = paths.shift()
        } else {
            return undefined
        }
    }
    return data
}

const wordPressAPI = 'http://mc.go-craft.com/wordpress/wp-json'
export function getData(path: string): Promise<any> {
    if(path.substr(0, 4) !== 'http') {
        path = wordPressAPI + path
    }

    return new Promise((resolve, reject) => {
        fetch(path, {method: 'GET'})
            .then((response) => response.json())
            .catch((error) => {
                console.log('Fetch of', path, 'failed:', error)
                reject()
            })
            .then((data) => resolve(data))
            .catch((error) => {
                console.log('using server fetch result failed:', error)
                reject()
            })
    })
}

/**
 * Translate a name to a path suitable for the url bar
 * @param name The name to translate
 * @returns {string} Converted name
 */
export function nameToPath(name: string): string {
    return name.toLowerCase().replace(/[ :[\]()]/, '-')
}

export function isLocalhost(): boolean {
    return window && window.location && window.location.hostname==='localhost'
}

export const isAdmin = !!localStorage.getItem('admin')
