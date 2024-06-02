import fetchIntercept from 'fetch-intercept';
import { useAuth } from './AuthProvider';
export const  registerInterceptor = async(logout:any) => {
    fetchIntercept.clear();
     fetchIntercept.register({
        request: function (url, config) {
            const token = JSON.parse(localStorage.getItem("token") ?? '');
            const modifiedHeaders = new Headers();
            modifiedHeaders.append('Content-Type', 'application/json');
            if(url.includes("/api") || url.includes("/user")){
                modifiedHeaders.append('Authorization',  `Bearer ${token?.token}`);
            }
            config.headers = modifiedHeaders;
            return [url, config];
        },

        requestError: function (error) {
            return Promise.reject(error);
        },

        response: function (response) {
            if(response.status == 403){
                console.log("SALIR")
                logout();
            }
            return response;
        },

        responseError: function (error) {
            return Promise.reject(error);
        }
    })
};

