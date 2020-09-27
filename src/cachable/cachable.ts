import { save, load, exists } from 'syncpathutils'

export class Cachable<T> {
    readonly path: string
    value?: T

    constructor(path: string, value?: T, defaultValue: T = null, saveIfNotExists: boolean = false) {
        this.path = path

        if (value) {
            this.value = value
        } else if (exists(path)) {
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

    load(fallbackValue: T = null, saveIfNotExists: boolean = false) {
        this.value = load(this.path, fallbackValue, saveIfNotExists)
    }
}