export default {
  translation: {
    header: {
      title: 'Hexlet Chat',
      exitButton: 'Выйти',
    },
    loginPage: {
      validation: {
        required: 'Обязательное поле',
      },
      title: 'Войти',
      nameLabel: 'Ваш ник',
      passwordLabel: 'Пароль',
      entranceButton: 'Войти',
      failedAuthFeedback: 'Неверные имя пользователя или пароль',
      questionNoAcc: 'Нет аккаунта?',
      registrationLink: 'Регистрация',
    },
    registrationPage: {
      validation: {
        required: 'Обязательное поле',
        nameLength: 'От 3 до 20 символов',
        passwordLength: 'Не менее 6 символов',
        passwordMatch: 'Пароли должны совпадать',
      },
      title: 'Регистрация',
      nameLabel: 'Имя пользователя',
      passwordLabel: 'Пароль',
      confirmationLabel: 'Подтвердите пароль',
      failedRegustrationFeedback: 'Такой пользователь уже существует',
      entranceButton: 'Зарегистрироваться',
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
      cancelButton: 'Отменить',
      sendButton: 'Отправить',
    },
    modalRemoveChannel: {
      title: 'Удалить канал',
      confirmation: 'Уверены?',
      cancelButton: 'Отменить',
      sendButton: 'Отправить',
    },
    modalRenameChannel: {
      validation: {
        noMatchName: 'Должно быть уникальным',
      },
      title: 'Переименовать канал',
      cancelButton: 'Отменить',
      sendButton: 'Отправить',
    },
    chatWindow: {
      title: '# {{channelName}}',
      messageCount: {
        counter_0: '{{count}} сообщение',
        counter_1: '{{count}} сообщения',
        counter_2: '{{count}} сообщений',
      },
      messagePlaceholder: 'Введите сообщение',
      sendMessageButton: 'Отправить',
    },
    networkError: 'Произошла ошибка подключения:',
  },
};
