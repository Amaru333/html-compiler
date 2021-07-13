import {useEffect, useState} from 'react'

export default function useLocalStorage(key, initialValue) {
    const key_name = 'html-compiler-' + key;
    const [value, setValue] = useState(() => {
        const json_value= localStorage.getItem(key_name)
        if (json_value != null) return JSON.parse(json_value)

        if (typeof initialValue === 'function') {
            return initialValue()
        } else {
            return initialValue
        }
    })

    useEffect(() => {
        localStorage.setItem(key_name, JSON.stringify(value))
    },[key_name, value])
    return [value, setValue]
}
