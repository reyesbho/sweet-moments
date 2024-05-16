import fetchIntercept from 'fetch-intercept';
export const  registerInterceptor = async() => { 
    console.log("registred")
    fetchIntercept.clear();
     fetchIntercept.register({
        request: function (url, config) {
            console.log(url)
            const user = JSON.parse(localStorage.getItem("user") ?? '');
            console.log(user)
            if(url.includes("/api") && !url.includes("/private")){
                const modifiedHeaders = new Headers();
                modifiedHeaders.append('Content-Type', 'application/json');
                modifiedHeaders.append('Authorization',  `Bearer ${user?.token}`);
                config.headers = modifiedHeaders;
            }
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

