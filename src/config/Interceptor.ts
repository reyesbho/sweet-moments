import fetchIntercept from 'fetch-intercept';
export const  registerInterceptor = async() => { 
    fetchIntercept.clear();
     fetchIntercept.register({
        request: function (url, config) {
            const token = JSON.parse(localStorage.getItem("token") ?? '');
            const modifiedHeaders = new Headers();
            modifiedHeaders.append('Content-Type', 'application/json');
            console.log(token)
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
            /*console.log(response)
            if(response.status == 401){
                logout();
            }*/
            return response;
        },

        responseError: function (error) {
            return Promise.reject(error);
        }
    })
};

