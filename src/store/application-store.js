import {defineStore} from "pinia";
import { useCookies } from "vue3-cookies";
import apiClient from "@/api/api-client.js";

export const useApplicationStore = defineStore('application', {
    state: () => ({
        user: {},
        api: {
            loading: false
        }
    }),
    getters: {
        isRequestExecuting: (state) => state.api.loading,

        userId: (state) => state.user.id,
        userFirstName: (state) => state.user.first_name,
        userLastName: (state) => state.user.last_name,

        userFullName: (state) => {
            const firstName = state.user.first_name;
            const lastName = state.user.last_name;

            let resultFullName = '';

            if (firstName) {
                resultFullName += firstName;
            }
            if (lastName) {
                resultFullName += ' ' + lastName;
            }

            return resultFullName;
        },

        userEmail: (state) => state.user.email,
        loggedIn: (state) => !!state.user.id,
        getBloodStations: (state) => state.bloodStations
    },
    actions: {
        setBloodStations(newBloodStations) {
            this.bloodStations = {...this.bloodStations, ...newBloodStations};
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

        async refreshUserState() {

            await apiClient.get('/auth/me')
                .then((response) => {
                    if (!response.data) {
                        this.setUser({});
                    } else {
                        this.setUser(response.data);
                    }
                })
                .catch(err => {
                    this.logout();
                });
        },

        async logout() {
             const { cookies } = useCookies();
             cookies.remove('token');
             delete apiClient.defaults.headers.common['cookie'];
             this.setUser({});
        }
    }
});
