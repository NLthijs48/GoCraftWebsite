import fetch from 'isomorphic-fetch'

// Deep get a value from an object
export function get(data: any, ...paths: string[]): any {
    let path = paths.shift()
    while(path) {
        if(typeof data !== 'object') {
            return undefined
        }
        data = data[path]
        path = paths.shift()
    }
    return data
}

const wordPressAPI = 'http://mc.go-craft.com/wordpress/wp-json'
export function getData(path: string): Promise<any> {
    return new Promise((resolve, reject) => {
        fetch(wordPressAPI+path)
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
    return name.toLowerCase().replace(' ', '-')
}