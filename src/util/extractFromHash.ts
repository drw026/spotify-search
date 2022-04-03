const extractFromHash = (hash: string, key: string): string => {
    return (hash.substring(1)
        .split('&')
        .find(elem => elem.startsWith(key)) || '')
        .split('=')[1]
}

export default extractFromHash;
