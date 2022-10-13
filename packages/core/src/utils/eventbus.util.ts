export const EventBusUtils = {
    _map: new Map<string, Function[]>(),
    addObserve(key: string, action: Function) {
        let actions = this._map.get(key);
        if (actions) {
            actions.push(action);
        } else {
            actions = [action];
        }
        this._map.set(key, actions);
    },
    removeObserve(key: string) {
        if (this._map.has(key)) {
            this._map.delete(key);
        }
    },
    post(key: string, params?: any) {
        if (this._map.has(key)) {
            let actions = this._map.get(key);
            actions?.forEach((action) => {
                action(params);
            });
        }
    },
};
