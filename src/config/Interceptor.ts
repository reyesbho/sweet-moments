import fetchIntercept from 'fetch-intercept';
export const  registerInterceptor = async(logout:any) => {
    fetchIntercept.clear();
     fetchIntercept.register({
        request: function (url, config) {
            const modifiedHeaders = new Headers(config.headers || {});
            modifiedHeaders.set('Content-Type', 'application/json');

            return [
                url,
                {
                    ...config,
                    headers: modifiedHeaders,
                    credentials: 'include',
                },
            ];
        },

        requestError: function (error) {
            return Promise.reject(error);
        },

        response: function (response) {
            if(response.status == 401){
                logout();
            }
            return response;
        },

        responseError: function (error) {
            return Promise.reject(error);
        }
    })
};

