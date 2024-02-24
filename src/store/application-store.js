import {defineStore} from "pinia";

export const useApplicationStore = defineStore('application', {
    state: () => ({
        user: {
            id: 500,
            firstName: 'Игорь',
            lastName: 'Петров',
            email: 'igor@gmail.com'
        },
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

        isRequestExecuting: (state) => state.api.loading,

        userId: (state) => state.user.id,
        userFirstName: (state) => state.user.firstName,
        userLastName: (state) => state.user.lastName,
        userFullName: (state) => state.user.firstName + ' ' + state.user.lastName,
        userEmail: (state) => state.user.email,
    },
    actions: {
        setCity(newCity) {
            this.city = {...this.city, ...newCity};
            this.saveToLocalStorage();
        },
        setUser(user) {
            this.user = {...this.user, ...user};
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
