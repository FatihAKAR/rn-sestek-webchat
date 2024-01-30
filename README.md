# rn-sestek-webchat

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

#### Step 2: Install react-native-fetch-blob

```
npm i --save react-native-fetch-blob@0.10.8
```

If you want to send audio, you must also install the "react-native-fetch-blob" package. Because it is needed to keep the recorded audio in the cache and listen again.
You can follow the [link](https://www.npmjs.com/package/react-native-fetch-blob) below to integrate

## Usage

You may have a general understanding of how it works with the following snippet.

```javascript
import { ChatModal, ChatModalRef } from 'rn-sestek-webchat';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFetchBlob from 'react-native-fetch-blob';
import AudioRecord from 'react-native-audio-record';

const modalRef = useRef < ChatModalRef > null;

/////////// use of getResponseData
const [responseData, setResponseData] = useState < any > {};
const setResponse = (value: any) => {
  setResponseData(value);
};
useEffect(() => {
  console.log(responseData);
}, [responseData]);
/////////// use of getResponseData

/////////// example customActionData
const customActionData = {
  tel: '0000000000',
};
/////////// example customActionData

<ChatModal
  modules={{ AudioRecorderPlayer: AudioRecorderPlayer, RNFS: RNFetchBlob,RNSlider: Slider, RNWebView:WebView , Record:AudioRecord }}
  ref={modalRef}
  url={`http://${
    Platform.OS !== 'ios' ? '10.0.2.2' : '192.168.52.51'
  }:55020/chathub`}
  defaultConfiguration={{
    sendConversationStart: true,
    tenant: 'TenantName',
    projectName: 'ProjectName',
    channel: 'Mobil',
    clientId: 'mobile-testing',
    enableNdUi: true,
    getResponseData: setResponse,
    customActionData: JSON.stringify(customActionData),
  }}
  customizeConfiguration={{
    headerColor: '#7f81ae',
    headerText: 'Knovvu',
    bottomColor: '#7f81ae',
    bottomInputText: 'Bottom input text..',
    //bottomVoiceIcon: "<Cmp />",
    //bottomSendIcon: "<Cmp />",
    incomingIcon: {
      type: 'uri',
      value: 'another_link',
    },
    incomingText: '',
    incomingTextColor: 'black',
    outgoingIcon: {
      type: 'component',
      value: require('../image_link'),,
    },
    outgoingText: 'Knovvu',
    outgoingTextColor: '#7f81ae',
    messageColor: '#FCFBF7',
    messageBoxColor: '#7f81ae',
    bodyColorOrImage: {
      type: 'color',
      value: '#7f81ae',
    },
    firsIcon: {
      type: 'component',
      value: require('../image_link'),,
    },
    firstColor: 'white',
    firstSize: 70,

    leftMessageBoxColor: 'white',
    sliderMaximumTrackTintColor: 'gray',
    sliderThumbTintColor: 'blue',
    sliderMinimumTrackTintColor: 'pink',
    sliderPauseImage: {
      type: 'image',
      value: require('../image_link'),
    },
    sliderPlayImage: {
      type: 'image',
      value: require('../image_link'),
    },
    beforeAudioClick: beforeAudioFunc,
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

AudioRecorderPlayer, RNFetchBlob and Record modules are used to send voice messages to Webchat and listen to these voice messages. These modules are interconnected modules. 


For other additional information, we have created a document that you can use in the table below.

| props              | type    | description                                                                                                                  |
| ------------------ | ------- | ---------------------------------------------------------------------------------------------------------------------------- |
| startConversation  | void    | Function that starts the chat for the user and automatically triggers the modal screen.                                      |
| endConversation    | void    | Function that ends the chat for the user and automatically closes the modal screen.                                          |
| triggerVisible     | void    | Function that opens and closes the modal screen after the chat starts and continues the conversation from where it left off. |
| messageList        | any     | Returns the active chat history.                                                                                             |
| conversationStatus | boolean | Indicates whether there is an active conversation or not.                                                                    |
| customActionData | string | Used for sending custom data to Webchat                                                                   |
| getResponseData | void | Used to receive private data from Webchat                                                                   |

