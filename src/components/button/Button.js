import { Button as ButtonRNP } from "react-native-paper"

const Button = (props) => {
    const {style, children, ...rest} = props
    return (
        <ButtonRNP style={{borderRadius: 8, fontFamily: 'Lato-Regular', ...style}} {...rest}>
            {children}
        </ButtonRNP>
    )
}

export default Button;
