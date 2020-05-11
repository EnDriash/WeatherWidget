export const getUserGeolocation = () => {
    return new Promise((resolve, reject) => {
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        function error() {
            reject('Unable to retrieve your location');
        }

        function success(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            resolve({ lat, lon });
        }

        navigator.geolocation.getCurrentPosition(success, error, options);
    });
};
