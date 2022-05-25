# goit-react-hw-08-phonebook

- React Router DOM
- React Redux
- Redux Persist
- RTK Query
- Public & Private Routes
- Styled Components
- Использован
  [шаблон React-проекта](https://github.com/goitacademy/react-homework-template#readme)

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

При наличии токена в localStorage, происходит автоматический рефреш данных
пользователя и его логинизация.
