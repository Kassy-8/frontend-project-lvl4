export default {
  translation: {
    header: {
      title: 'Hexlet Chat',
      exitButton: 'Выйти',
    },
    auth: {
      passwordLabel: 'Пароль',
      validation: {
        required: 'Обязательное поле',
        nameLength: 'От 3 до 20 символов',
        passwordLength: 'Не менее 6 символов',
        passwordMatch: 'Пароли должны совпадать',
      },
      loginPage: {
        title: 'Войти',
        nameLabel: 'Ваш ник',
        entranceButton: 'Войти',
        failedAuthFeedback: 'Неверные имя пользователя или пароль',
        questionNoAcc: 'Нет аккаунта?',
        registrationLink: 'Регистрация',
      },
      registrationPage: {
        title: 'Регистрация',
        nameLabel: 'Имя пользователя',
        confirmationLabel: 'Подтвердите пароль',
        failedRegustrationFeedback: 'Такой пользователь уже существует',
        entranceButton: 'Зарегистрироваться',
      },
    },
    channelsMenu: {
      addButton: '+',
      deleteButton: 'Удалить',
      renameButton: 'Переименовать',
      title: 'Каналы',
      channelsName: '# {{channel}}',
    },
    modalAddChannel: {
      validation: {
        noMatchName: 'Такой канал уже существует',
      },
      title: 'Добавить канал',
    },
    modalRemoveChannel: {
      title: 'Удалить канал',
      confirmation: 'Уверены?',
    },
    modalRenameChannel: {
      validation: {
        noMatchName: 'Должно быть уникальным',
      },
      title: 'Переименовать канал',
    },
    chatBox: {
      title: '# {{channelName}}',
      messageCount: {
        counter_0: '{{count}} сообщение',
        counter_1: '{{count}} сообщения',
        counter_2: '{{count}} сообщений',
      },
      messagePlaceholder: 'Введите сообщение',
    },
    page404: {
      message: 'Увы, такой страницы не существует, но вы можете вернуться обратно на ',
      link: 'главную страницу',
    },

    sendingButton: 'Отправить',
    cancelButton: 'Отменить',
    loadingSpinner: 'Загружаются данные чата',
    networkError: 'Произошла ошибка подключения ',
  },
};
