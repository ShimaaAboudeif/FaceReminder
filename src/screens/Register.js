import React from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Button from '../components/Button';
import InputText from '../components/InputText';
import BackIcon from '../components/BackIcon';
import Axios from '../Network/Axios';

const Register = () => {
  const [disable, setDisable] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [fullname, setfullname] = React.useState();
  const [email, setemail] = React.useState();
  const [password, setpassword] = React.useState();
  const [confirm_password, setconfirm_password] = React.useState();
  const [checkValidEmail, setCheckValidEmail] = React.useState('');

  const navigation = useNavigation();
  const handleEmail = text => {
    let re = /\S+@\S+\.\S+/;
    let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    setemail(text);
    if (re.test(text) || regex.test(text)) {
      setCheckValidEmail(false);
    } else {
      setCheckValidEmail(true);
    }
  };
  const onPress = async () => {
    setDisable(true);
    setLoading(true);
    const responce = await Axios.post('/register/', {
      fullname,
      email,
      password,
      confirm_password,
    });
    navigation.navigate('HomePage');
    console.log('response', responce);
  };
  return (
    <View style={styles.registerScreen}>
      <BackIcon />
      <Text style={styles.registerMessage}>Hello!Register to get started</Text>
      <InputText
        DefaultText="Full Name"
        onChangeText={value => setfullname(value)}
      />
      <InputText
        DefaultText="Email"
        onChangeText={text => handleEmail(text)}
        value={email}
      />
      {checkValidEmail ? (
        <Text style={styles.emailFailed}>Wrong Email Format</Text>
      ) : (
        <Text style={styles.emailFailed}> </Text>
      )}
      <InputText
        DefaultText="Password"
        onChangeText={value => setpassword(value)}
      />
      <InputText
        DefaultText="Confirm Password"
        onChangeText={value => setconfirm_password(value)}
      />

      <Button
        buttonText="Register"
        disable={disable}
        onPress={onPress}
        style={styles.registerButton}
        styleButton={styles.buttonText}
        loading={loading}
        backgroundColor={{backgroundColor: loading ? '#8391A1' : '#1E232C'}}
      />

      <View style={styles.haveAccount}>
        <Text style={styles.account}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginNow}>Login Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  registerScreen: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Urbanist',
    height: '100%',
  },
  registerMessage: {
    color: '#1E232C',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 30,
  },
  haveAccount: {
    color: '#1E232C',
    marginTop: 85,
    display: 'flex',
    flexDirection: 'row',
  },
  loginNow: {
    color: '#35C2C1',
  },
  registerButton: {
    marginVertical: 30,
  },
  account: {
    color: 'black',
  },
  buttonText: {
    fontSize: 15,
    display: 'flex',
    flexDirection: 'row',
  },
});

export default Register;

