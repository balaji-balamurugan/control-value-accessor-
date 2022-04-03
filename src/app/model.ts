export const integrationType = [
  {
    id: 'msg91',
    label: 'Msg91',
  },
  {
    id: 'twilio',
    label: 'Twilio',
  }
];

export const integrationTypeJson = [
  {
    integrationType: 'msg91',
    integrationTypeLabel: 'Msg91',
    integrationConfig: [
      {
        id: 'api',
        validations: ['required'],
        title: 'API',
        type: 'inputText',
      },
      {
        id: 'senderID',
        validations: ['required'],
        title: 'Sender ID',
        type: 'inputText',
      }
    ]
  },
  {
    integrationType: 'twilio',
    integrationTypeLabel: 'Twilio',
    integrationConfig: [
      {
        id: 'accountSid',
        title: 'Account SID',
        type: 'inputText',
        validations: ['required'],
      },
      {
        id: 'authToken',
        title: 'Auth Token',
        type: 'inputText',
        validations: ['required'],
      },
      {
        id: 'from',
        title: 'From',
        type: 'inputText',
        validations: ['required'],
      },
      {
        id: 'enableFeatures',
        title: 'Enable Features',
        type: 'multiSelect',
        validations: ['required'],
        options: [
          {
            id: 'sms',
            value: 'SMS'
          },
          {
            id: 'whatsapp',
            value: 'Whatsapp'
          },
          {
            id: 'call',
            value: 'Call'
          }
        ]
      },
      {
        id: 'autoCall',
        title: 'Automated Call In',
        type: 'inputNumber',
        validations: ['required'],
      },
      {
        id: 'url',
        title: 'URL',
        type: 'inputText',
        validations: ['required', 'url'],
      },
      {
        id: 'imageUpload',
        title: 'Image',
        type: 'image',
      },
    ]
  },

];
