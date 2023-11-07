import React, {
  forwardRef,
  useState,
  useImperativeHandle,
  useContext,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import {
  Alert,
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

export interface ModalCompRef {
  messageList: any;
}

const ModalComponent = forwardRef<ModalCompRef, PropsModalComponent>(
  (props, ref) => {
    const [inputData, setInputData] = useState<string>('');
    const changeInputData = (text: string) => setInputData(text);

    const [messageList, sendMessage, sendAudio] = useChat({
      url: props?.url,
      defaultConfiguration: props.defaultConfiguration,
      messages: [],
      sessionId: props.sessionId,
      client: props.client,
      rnfs: props.modules.RNFS,
    });

    useImperativeHandle(ref, () => ({
      messageList: messageList,
    }));

    const { appStyle, handleStyle, getCssIntegration } =
      useContext(StyleContext);

    useEffect(() => {
      (async () => {
        if (props.defaultConfiguration.integrationId) {
          const css = await getCssIntegration(
            '24943652-7235-d2ce-ff39-3a0af91ec61e',
            props.customizeConfiguration
          );
        } else {
          handleStyle(
            props.customizeConfiguration,
            props.defaultConfiguration.tenant,
            props.defaultConfiguration.projectName
          );
        }
      })();
    }, []);

    return (
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={props.visible && Object.keys(appStyle).length > 0}
        onRequestClose={() => {
          props.closeModal();
        }}
      >
        <CloseModal
          closeModal={props?.closedModalManagment?.closeModal}
          setCloseModal={props?.closedModalManagment?.setCloseModal}
          closeConversation={props?.closeConversation}
          closeModalSettings={props?.customizeConfiguration?.closeModalSettings}
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
              {...props}
              headerText={appStyle?.headerText || undefined}
              hideIcon={props.customizeConfiguration.hideIcon}
              closeIcon={props.customizeConfiguration.closeIcon}
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
                  modules={props.modules}
                  customizeConfiguration={props.customizeConfiguration}
                  messageList={messageList}
                  changeInputData={changeInputData}
                  sendMessage={sendMessage}
                />
              </ImageBackground>
            )}
            {appStyle?.chatBody?.type != 'image' && (
              <BodyComponent
                modules={props.modules}
                customizeConfiguration={props.customizeConfiguration}
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
