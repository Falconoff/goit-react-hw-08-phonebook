# goit-react-hw-08-phonebook

- Public & Private Routes

- { "name": "Falconoff", "email": "sokolov@meta.ua", "password": "123123123" }
- { "name": "sss", "email": "sss@sss.ua", "password": "1234567" }
- { "name": "fff", "email": "fff@fff.ua", "password": "1234567" }

## заметки

Запись в стейт при регистрации/логине пользователя происходит в 2 этапа
(например, при регистрации в RegisterView - ф-ция registerAndSaveToState):

- при сабмите формы, в асинхронный экшен registerUser (сохраняет данные
  пользователя на сервере; находится в authApi файла authApi.js) передаём данные
  из формы и настройку selectFromResult, которая вернёт нам данные после
  запроса;
- полученные данные отправляются в синхронный экшен authAction (находится в
  authSlice файла authApi.js), который заносит их в стейт.

Запись токена в заголовок запроса - prepareHeaders в authApi.
