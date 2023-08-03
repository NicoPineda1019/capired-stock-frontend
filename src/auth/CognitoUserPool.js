import { CognitoUserPool } from "amazon-cognito-identity-js"

const poolData = {
    UserPoolId: "us-east-1_LV9hUMc7B",
    ClientId: "35akop682iuauq3cq3irtdokgn"
}

export default new CognitoUserPool(poolData)