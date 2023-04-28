import { CognitoUserPool } from "amazon-cognito-identity-js"

const poolData = {
    UserPoolId: "us-east-1_9stDi9ES3",
    ClientId: "264ofp490bbm50l2g9u4ld9e0"
}

export default new CognitoUserPool(poolData)