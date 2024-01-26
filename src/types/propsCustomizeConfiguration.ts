export default interface PropsCustomizeConfiguration {
  headerColor?: string;
  headerText?: string;
  headerTextColor?: string;
  headerHideIcon?: IconType;
  headerCloseIcon?: IconType;
  bottomColor?: string;
  bottomInputText?: string;
  bottomInputBorderColor?: string;
  bottomVoiceIcon?: IconType;
  bottomSendIcon?: IconType;
  bottomInputSendButtonColor?: string;
  userMessageBoxIcon?: IconType;
  userMessageBoxTextColor?: string;
  userMessageBoxHeaderName?: string;
  userMessageBoxHeaderNameColor?: string;
  chatBotMessageIcon?: IconType;
  chatBotMessageBoxTextColor?: string;
  chatBotMessageBoxHeaderName?: string;
  chatBotMessageBoxHeaderNameColor?: string;
  chatBotMessageBoxBackground?: string;
  chatBotMessageBoxButtonBackground?: string;
  chatBotMessageBoxButtonBorderColor?: string;
  chatBotMessageBoxButtonTextColor?: string;
  chatBody?: BodyColorOrImageType;
  chatStartButtonHide?: boolean;
  chatStartButton?: IconType;
  chatStartButtonBackground?: string;
  chatStartButtonBackgroundSize?: number;
  userMessageBoxBackground?: string;
  sliderMinimumTrackTintColor?: string;
  sliderMaximumTrackTintColor?: string;
  sliderThumbTintColor?: string;
  sliderPlayImage?: BodyColorOrImageType;
  sliderPauseImage?: BodyColorOrImageType;
  closeModalSettings: object;
  beforeAudioClick?: () => Promise<void>;
}

interface BodyColorOrImageType {
  type: 'image' | 'color';
  value: any;
}

export interface IconType {
  type: 'uri' | 'component';
  value: any;
}
