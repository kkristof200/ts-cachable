import * as spu from 'syncpathutils'
import * as apu from 'asyncpathutils'
import { SuccessErrorCallback } from 'successerror'

export type CachableOptions<T> = {
    value?: T
    defaultValue?: T
    saveIfNotExists?: boolean
}

export class Cachable<T> {
    readonly path: string
    async: boolean
    value?: T

    private constructor(path: string, value?: T, defaultValue: T = null, saveIfNotExists = false, async = false) {
        this.path = path
    }

    static sync<T>(path: string, options?: CachableOptions<T>) {
        const cachable = new Cachable<T>(path)
        cachable.setupSync(options)

        return cachable
    }

    private setupSync<T>(options?: CachableOptions<T>) {
        options = options ?? defaultOptions()

        if (options.value) {
            this.value = options.value
        } else if (exists(this.path)) {
            this.load()
        }

        if (!this.value && defaultValue) {
            this.value = defaultValue
        }

        if (this.value && !exists && saveIfNotExists) {
            this.save()
        }
    }

    save() {
        save(this.path, this.value)
    }
    saveSync() {
        spu.save(this.path, this.value)
    }
    saveAsync(...callbacks: SuccessErrorCallback[]) {
        apu.save(this.path, this.value, ...callbacks)
    }

    load(fallbackValue: T = null, saveIfNotExists: boolean = false) {
        this.value = load(this.path, fallbackValue, saveIfNotExists)
    }
}

function defaultOptions<T>(): CachableOptions<T> {
    return {
        value: null,
        defaultValue: null,
        saveIfNotExists: false
    }
}