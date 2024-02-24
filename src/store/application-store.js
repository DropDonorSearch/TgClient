import {defineStore} from "pinia";

export const useApplicationStore = defineStore('application', {
    state: () => ({
        api: {
            loading: false
        },
        city: {
            id: 1,
            title: 'г. Санкт-Петербург',
            regionTitle: 'Санкт-Петербург'
        }
    }),
    getters: {
        cityId: (state) => state.city.id,
        cityTitle: (state) => state.city.title,
        cityRegionTitle: (state) => state.city.regionTitle,

        isRequestExecuting: (state) => state.api.loading
    },
    actions: {
        setCity(newCity) {
            this.city = {...this.city, ...newCity};
            this.saveToLocalStorage();
        },

        setRequestExecuting() {
            this.api.loading = true;
        },
        setRequestFinished() {
            this.api.loading = false;
        },

        loadFromLocalStorage() {
            const city = localStorage.getItem('city');
            if (city) {
                this.city = JSON.parse(city);
            }
        },

        saveToLocalStorage() {
            localStorage.setItem('city', JSON.stringify(this.city));
        }
    }
});
