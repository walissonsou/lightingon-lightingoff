import React, {useState, useEffect} from 'react'
import { View, StyleSheet,Image, TouchableOpacity, Alert } from 'react-native'
import Torch from 'react-native-torch'
import RNShake from 'react-native-shake'

import off from './assets/off.png'
import onfire from './assets/onfire.png'
import logoblack from './assets/logoblack.png'
import logoblue from './assets/logoblue.png'


const App = () => {
  const [toggle, setToggle ] = useState(false)

  const handleChangeToggle = () => setToggle(oldToggle => !oldToggle);

  useEffect(() => {
    // Liga flash do celular 
    Torch.switchState(toggle)
    },[toggle]);

    useEffect(() => {

      // Quando o celular for chocoalhado, mudaremos o toggle // 
      const subscription = RNShake.addListener(() => {
        setToggle(oldToggle => !oldToggle);
      });

      // Essa func vai ser chamada quando o componente
      // For ser desmontado

      return () => subscription.remove();
    }, []);

  return <View style={toggle ? style.containerLight : style.container}>
            <TouchableOpacity
              onPress={handleChangeToggle}>
              <Image 
              style={toggle ? style.lightingOn : style.lightingOff} 
              source={toggle ? onfire : off } />
              <Image 
              style={toggle ? style.lightingOn : style.lightingOff} 
              source={toggle ? logoblue : logoblack } /> 
    
            </TouchableOpacity>
          </View>
}

export default App


const style = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLight: {
    flex:1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightingOn:{
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150,
  },
  lightingOff:{
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: 'white',
    width: 150,
    height: 150,
  },

})