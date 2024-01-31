# rn-sestek-webchat

![Screen Recording 2024-01-31 at 14 59 20](https://github.com/sestek/rn-sestek-webchat/assets/54579230/24bb21fa-9492-4cc8-8b0b-5065a6f15523)


https://github.com/sestek/rn-sestek-webchat/assets/54579230/31406b39-6d70-492b-a0b8-b5f1b1d70e39



![ezgif com-gif-maker (1)](https://user-images.githubusercontent.com/52356400/165738752-cd7f55a2-0c90-47b5-bad0-ad7b56cc2103.gif)

## Install

```
npm install rn-sestek-webchat --save
```

#### Step 1: If you want to send audio you have to follow the steps below

```
npm install react-native-audio-recorder-player@3.4.0
```

To record and send audio, you need to install the package above and [click this link](https://www.npmjs.com/package/react-native-audio-recorder-player) to make the necessary integrations.

#### Step 2: Install react-native-fetch-blob and react-native-audio-record

```
npm i --save react-native-fetch-blob@0.10.8
```

```
npm i --save  react-native-audio-record@0.2.2
```

If you want to send audio, you must also install the "react-native-fetch-blob" package. Because it is needed to keep the recorded audio in the cache and listen again.
You can follow the [link](https://www.npmjs.com/package/react-native-fetch-blob) below to integrate

## Usage

You may have a general understanding of how it works with the following snippet.

```javascript
import { ChatModal, ChatModalRef } from 'rn-sestek-webchat';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFetchBlob from 'react-native-fetch-blob'; //Required package to listen to audio files
import AudioRecord from 'react-native-audio-record'; //Required package to send audio files as waw

const modalRef = useRef < ChatModalRef > null;
const customActionDataEx = {
  tel: '1111111111111',
};
const [responseData, setResponseData] = useState < any > {};
const setResponse = (value: any) => {
  setResponseData(value);
};
useEffect(() => {
  console.log(responseData);
}, [responseData]);
<ChatModal
  url={`https://eu.va.knovvu.com/webchat/chathub`}
  modules={{
    AudioRecorderPlayer: AudioRecorderPlayer,
    RNFS: RNFetchBlob,
    RNSlider: Slider,
    RNWebView: null,
    Record: AudioRecord,
  }}
  ref={modalRef}
  defaultConfiguration={{
    sendConversationStart: true,
    tenant: 'Demo',
    projectName: 'MasterBankingDemo_1_0',
    integrationId: integrationId, //It allows you to get automatic CSS from the eu.va environment when the integrationId prop is sent.
    channel: 'Mobil',
    clientId: 'mobile-testing',
    enableNdUi: false,
    getResponseData: setResponse,
    customActionData: JSON.stringify(customActionDataEx), //To send the desired customActionData
  }}
  customizeConfiguration={{
    // Header
    headerColor: '#7f81ae',
    headerText: 'Knovvu',
    // Bottom
    bottomColor: '#7f81ae',
    bottomInputText: 'Bottom input text..',
    // User MessageBox
    userMessageBoxBackground: 'red',
    userMessageBoxTextColor: 'black',
    userMessageBoxIcon: {
      type: 'uri',
      value:
        'https://upload.wikimedia.org/wikipedia/commons/7/70/User_icon_BLACK-01.png',
    },
    userMessageBoxHeaderName: '',
    userMessageBoxHeaderNameColor: 'white',
    // ChatBot MessageBox
    chatBotMessageBoxBackground: '#FCFBF7',
    chatBotMessageBoxTextColor: 'black',
    chatBotMessageIcon: {
      type: 'component',
      value: require('./src/images/knovvu_logo.png'),
    },
    chatBotMessageBoxHeaderName: 'Knovvu',
    chatBotMessageBoxHeaderNameColor: '#7f81ae',
    chatBotMessageBoxButtonBackground: '#7f81ae',
    chatBotMessageBoxButtonTextColor: 'white',
    // Chat Body
    chatBody: { type: 'color', value: '#7f81ae' },
    // Chat Start Button
    chatStartButton: {
      type: 'component',
      value: require('./src/images/knovvu_logo.png'),
    },
    chatStartButtonBackground: 'white',
    chatStartButtonBackgroundSize: 70,
    chatStartButtonHide: false,
    // Slider
    sliderMaximumTrackTintColor: 'gray',
    sliderThumbTintColor: 'blue',
    sliderMinimumTrackTintColor: 'pink',
    sliderPauseImage: {
      type: 'image',
      value: require('../src/image/pause2.png'),
    },
    sliderPlayImage: {
      type: 'image',
      value: require('../src/image/play2.png'),
    },
    // Before Func
    beforeAudioClick: beforeAudioFunc,
    // Close Modal
    closeModalSettings: {
      use: true,
      text: "Chat'ten çıkmak istediğinize emin misiniz ?",
      textColor: 'black',
      background: 'white',
      buttons: {
        yesButton: {
          text: 'Evet',
          textColor: 'white',
          background: '#7f81ae',
          borderColor: 'transparent',
        },
        noButton: {
          text: 'Hayır',
          textColor: 'black',
          background: 'transparent',
          borderColor: 'black',
        },
      },
    },
    //bottomVoiceIcon: "<Cmp />",
    //bottomSendIcon: "<Cmp />",
  }}
/>;
```

If you want to do customized operations such as opening and closing the window, message data, you can do more detailed work with **useRef**.
You can see a small piece of code for example usage below.

```javascript
const modalRef = useRef < ChatModalRef > null;

const pressAnotherButton1 = () => {
  const data = modalRef.current?.messageList;
  console.log(JSON.stringify(data));
};
const pressAnotherButton2 = () => {
  modalRef.current?.startConversation();
};
```

For other additional information, we have created a document that you can use in the table below.

| props              | type    | description                                                                                                                  |
| ------------------ | ------- | ---------------------------------------------------------------------------------------------------------------------------- |
| startConversation  | void    | Function that starts the chat for the user and automatically triggers the modal screen.                                      |
| endConversation    | void    | Function that ends the chat for the user and automatically closes the modal screen.                                          |
| triggerVisible     | void    | Function that opens and closes the modal screen after the chat starts and continues the conversation from where it left off. |
| messageList        | any     | Returns the active chat history.                                                                                             |
| conversationStatus | boolean | Indicates whether there is an active conversation or not.                                                                    |
| getResponseData    | void    | It is used to get customAction and customActionData in each incoming message.                                                |


When you use integrationId as props, the following values are automatically prepared in the customizeConfiguration field.

```javascript
	customizeConfiguration: {
      headerText,
      bottomColor,
      headerColor,
      chatBody,
      chatBotMessageBoxTextColor,
      chatBotMessageIcon,
      chatBotMessageBoxBackground,
      userMessageBoxTextColor,
      userMessageBoxIcon,
      userMessageBoxBackground,
      chatStartButtonBackground,
      bottomInputText,
      closeModalSettings,
      chatBotMessageBoxButtonBackground,
      chatBotMessageBoxButtonTextColor,
    }
```
