import React, {
  forwardRef,
  useState,
  useImperativeHandle,
  useContext,
  useEffect,
} from 'react';
import {
  Modal,
  View,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useChat } from '../plugin/useChat';
import type { PropsModalComponent } from '../types';
import BodyComponent from './body';
import FooterComponent from './footer';
import HeaderComponent from './header';
import { styles } from './modal-style';
import CloseModal from './closeModal';
import { StyleContext } from '../context/StyleContext';
import { ModalCompRef } from '../types/components/ModalComponent';

const ModalComponent = forwardRef<ModalCompRef, PropsModalComponent>(
  (props, ref) => {
    const {
      url,
      defaultConfiguration,
      sessionId,
      client,
      modules,
      customizeConfiguration,
      closeConversation,
      closedModalManagment,
      closeModal,
      visible,
      clickClosedConversationModalFunc,
    } = props;

    const [inputData, setInputData] = useState<string>('');
    const changeInputData = (text: string) => setInputData(text);

    const [messageList, sendMessage, sendAudio] = useChat({
      url: url,
      defaultConfiguration: defaultConfiguration,
      sessionId: sessionId,
      client: client,
      rnfs: modules.RNFS,
    });

    useImperativeHandle(ref, () => ({
      messageList: messageList,
    }));

    const { appStyle, handleStyle, getCssIntegration } =
      useContext(StyleContext);

    useEffect(() => {
      (async () => {
        if (defaultConfiguration.integrationId) {
          await getCssIntegration(
            defaultConfiguration.integrationId,
            customizeConfiguration
          );
        } else {
          handleStyle(
            customizeConfiguration,
            defaultConfiguration.tenant,
            defaultConfiguration.projectName
          );
        }
      })();
    }, []);

    return (
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={visible && Object.keys(appStyle).length > 0}
        onRequestClose={() => {
          closeModal();
        }}
      >
        <CloseModal
          closeModal={closedModalManagment?.closeModal}
          setCloseModal={closedModalManagment?.setCloseModal}
          closeConversation={closeConversation}
          closeModalSettings={customizeConfiguration?.closeModalSettings}
        />

        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          pointerEvents="box-none"
        >
          <View
            style={[
              styles.header,
              appStyle?.headerColor
                ? { backgroundColor: appStyle?.headerColor }
                : {},
            ]}
          >
            <HeaderComponent
              closeModal={closeModal}
              clickClosedConversationModalFunc={
                clickClosedConversationModalFunc
              }
              headerText={appStyle?.headerText || undefined}
              hideIcon={customizeConfiguration.hideIcon}
              closeIcon={customizeConfiguration.closeIcon}
            />
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor:
                appStyle?.chatBody?.type == 'color'
                  ? appStyle?.chatBody?.value
                  : '#fff',
            }}
          >
            {appStyle?.chatBody?.type == 'image' && (
              <ImageBackground
                source={{ uri: appStyle?.chatBody?.value }}
                style={{ width: '100%', height: '100%' }}
                resizeMode="stretch"
              >
                <BodyComponent
                  modules={modules}
                  customizeConfiguration={customizeConfiguration}
                  messageList={messageList}
                  changeInputData={changeInputData}
                  sendMessage={sendMessage}
                />
              </ImageBackground>
            )}
            {appStyle?.chatBody?.type != 'image' && (
              <BodyComponent
                modules={modules}
                customizeConfiguration={customizeConfiguration}
                messageList={messageList}
                changeInputData={changeInputData}
                sendMessage={sendMessage}
              />
            )}
          </View>
          <View
            style={[
              styles.footer,
              appStyle?.bottomColor
                ? { backgroundColor: appStyle?.bottomColor }
                : {},
            ]}
          >
            <FooterComponent
              {...props}
              inputData={inputData}
              changeInputData={changeInputData}
              sendMessage={sendMessage}
              sendAudio={sendAudio}
              placeholderText={appStyle?.bottomInputText}
            />
          </View>
        </KeyboardAvoidingView>
      </Modal>
    );
  }
);

export default ModalComponent;
