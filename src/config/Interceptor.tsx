import fetchIntercept from 'fetch-intercept';
import { useAuth } from './AuthProvider';

export const registerInterceptor = () => { 
    const {user, logout} = useAuth(); 
    fetchIntercept.register({
    request: function (url, config) {
        const withDefaults = Object.assign({}, config);
        if(url.includes("/api")){
            withDefaults.headers = withDefaults.headers || new Headers({
                'AUTHORIZATION': `Bearer ${user?.token}`
            });
        }
        return [url, withDefaults];
    },

    requestError: function (error) {
        // Called when an error occured during another 'request' interceptor call
        return Promise.reject(error);
    },

    response: function (response) {
        return response;
    },

    responseError: function (error) {
        console.log(error)
        if(error.status == 401){
            logout();
        }
        return Promise.reject(error);
    }
})
};
