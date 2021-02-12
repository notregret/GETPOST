const authenticate_user = (method, data) => {
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, 'url', true);

        xhr.responseType = 'json';  //ответ будет возвращен в формате json

        if (data) {
            xhr.setRequestHeader('Content-Type', 'application/json'); //устанавливаем заголовки чтобы
            }                                                                    //сервер понимал с какими данными работает

        xhr.onload = () => {
            if (xhr.status >= 400) {
                reject(xhr.response);
            } else {
                resolve(xhr.response);
            }
        };

        xhr.onerror = () => {
            reject('Something went wrong!');
            };

        xhr.send(JSON.stringify(data)); //преобразует значения в json
    });
    return promise;
};

$(function (){
    const btn = document.getElementById('submit'); //создаем объект для кнопки

    var $data = {}; //создаем пустой объект для данных

    const UserData = () =>{
        $('#login').find('input').each(function (){   //проходим по содержимому формы и для
            $data[this.name] = $(this).val();        //каждого инпута записываем его имя и значение в data
        });

        var res = authenticate_user('POST',
            $data).then(responseServer => {   //обработчик на хороший исход
                console.log(responseServer);
        })
            .catch(err => {   //обработчик на ошибку
                console.log(err);
            });
    };
    btn.addEventListener('click', UserData);}); //регестрируем событие над объектом кнопки
