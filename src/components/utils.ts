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
