const StorageService = {
    get: function<T>(name: string): T | undefined {
        return localStorage.getItem(name) ? (JSON.parse(localStorage.getItem(name)!) as T) : undefined;
    },
    set: function(name: string, value: any) {
        localStorage.setItem(name, JSON.stringify(value));
    },
    update: function(name: string, value: any) {
        localStorage.setItem(name, JSON.stringify({...JSON.parse(localStorage.getItem(name) || '{}'), value}));
    }
}

export default StorageService;