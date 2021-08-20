import {v4 as id} from 'uuid';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';

const poolDetails = {
  AppClientId: '2ac3ij97dhtkag9fljdsuo1203',
  IdentityPool:	'us-east-1:de5287fc-3a2d-4cad-a685-b9d5bfe936e6',
  PoolArm: 'arn:aws:cognito-idp:us-east-1:842200175734:userpool/us-east-1_tRcA2uwF6',
  PoolId:	'us-east-1_tRcA2uwF6'
}

let authDetails = null;
let Pool = new AmazonCognitoIdentity.CognitoUserPool ({UserPoolId: poolDetails.PoolId, ClientId: poolDetails.AppClientId});
let cognitoUser = null;
let accessToken = null;
let refreshToken = null;
let headers = {
  get get () {
    return new Headers ({
      'x-amz-access-token': accessToken
    });
  },
  get post () {
    return new Headers ({
      'x-amz-access-token': accessToken,
      'Content-Type': 'application/json'
    });
  }
}
export const login = (Username) => new Promise ((resolve, reject) => {
  try {
    authDetails = new AmazonCognitoIdentity.AuthenticationDetails ({Username, ClientMetadata: {phoneNumber: Username}});
    cognitoUser = new AmazonCognitoIdentity.CognitoUser ({Username, Pool});
    resolve ();
  } catch (e) {
    console.log (e);
    reject (e);
  }
});

export const getCurrentUser = () => new Promise ((resolve, reject) => {
  try {
    cognitoUser = Pool.getCurrentUser ();
    resolve ();
  } catch (e) {
    reject (e);
  }
});

export const retrieveAccessToken = () => new Promise ((resolve, reject) => {
  try {
    if (!cognitoUser) throw 'Cognito user must be defined to get access token';
    cognitoUser.getSession ((e, session) => {
      if (e) return reject (e);
      accessToken = session.getAccessToken ().getJwtToken ();
      refreshToken = new AmazonCognitoIdentity.CognitoRefreshToken ({RefreshToken: session.getRefreshToken ().getToken ()});
      resolve ();
    });
  } catch (e) {
    reject (e);
  }
});

export const refreshSession = () => new Promise ((resolve, reject) => {
  try {
    if (!cognitoUser) throw 'Cannot refresh empty cognito user';
    if (!refreshToken) throw 'Cannot refresh empty refresh token';
    cognitoUser.refreshSession (refreshToken, (err, session) => {
      if (err) return reject (err);
      accessToken = session.getAccessToken ().getJwtToken ();
      refreshToken = new AmazonCognitoIdentity.CognitoRefreshToken ({RefreshToken: session.getRefreshToken ().getToken ()});
      resolve ();
    });
  } catch (e) {
    reject (e);
  }
});

export const signOut = async () => new Promise (async (resolve, reject) => {
  try {
    await cognitoUser.signOut();
    resolve ();
  } catch (e) {
    reject (e);
  }
});

export const register = async (phoneNumber) => new Promise (async (resolve, reject) => {
  const attributePhoneNumber = new AmazonCognitoIdentity.CognitoUserAttribute ({Name: 'phone_number', Value: phoneNumber});
  const customAttributeId = new AmazonCognitoIdentity.CognitoUserAttribute ({Name: 'custom:custom:id', Value: id ()})
  const attributeList = [attributePhoneNumber, customAttributeId];
  Pool.signUp (phoneNumber, id (), attributeList, null, (err, result) => {
    if (err) return reject (err);
    cognitoUser = result.user;
    resolve ();
  })
});

export const customFlow = (phoneNumber, cb, onCodeSent, onSuccess) => new Promise (async (resolve, reject) => {
  try {
    await login (phoneNumber);
  } catch (e) {
    return reject (e);
  }
  cognitoUser.setAuthenticationFlowType ('CUSTOM_CHALLENGE');
  cognitoUser.initiateAuth (authDetails, {
    onSuccess: r => onSuccess (r),
    onFailure: e => reject (e),
    customChallenge: function (challengeParameters) {
      onCodeSent ();
      cb (answer => cognitoUser.sendCustomChallengeAnswer (answer, this))
      resolve ();
    }
  });
});

export const entries = {
  get get () {
    return userId => fetch ('https://akqxdqgf7l.execute-api.us-east-1.amazonaws.com/Prod/entries' + (userId ? '?userId=' + userId : ''), {
      method: 'get',
      headers: headers.get
    });
  },
  get post () {
    return body => fetch ('https://akqxdqgf7l.execute-api.us-east-1.amazonaws.com/Prod/entries', {
      method: 'post',
      headers: headers.post,
      body: JSON.stringify (body)
    });
  }, 
  get hide () {
    return id => fetch (`https://akqxdqgf7l.execute-api.us-east-1.amazonaws.com/Prod/entries/${id}`, {
      method: 'delete',
      headers: headers.get
    })
  }
}
export const skills = {
  get get () {
    return userId => fetch (`https://akqxdqgf7l.execute-api.us-east-1.amazonaws.com/Prod/skills${userId ? '?userId=' + userId : ''}`, {
      method: 'get',
      headers: headers.get
    });
  },
  get post () {
    return body => fetch ('https://akqxdqgf7l.execute-api.us-east-1.amazonaws.com/Prod/skills', {
      method: 'post',
      headers: headers.get,
      body: JSON.stringify (body)
    });
  },
  get del () {
    return id => fetch (`https://akqxdqgf7l.execute-api.us-east-1.amazonaws.com/Prod/skills/${id}`, {
      method: 'delete',
      headers: headers.get
    })
  }
}

export const shares = {
  get get () {
    return () => fetch ('https://akqxdqgf7l.execute-api.us-east-1.amazonaws.com/Prod/shares', {
      method: 'get',
      headers: headers.get
    });
  },
  get getById () {
    return id => fetch (`https://akqxdqgf7l.execute-api.us-east-1.amazonaws.com/Prod/entries/${id}`, {
      method: 'get',
      headers: headers.get
    });
  },
  get post () {
    return body => fetch ('https://akqxdqgf7l.execute-api.us-east-1.amazonaws.com/Prod/shares', {
      method: 'post',
      headers: new Headers ({
        'x-amz-access-token': accessToken,
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify (body)
    });
  },
  get toggleFreeze () {
    return id => fetch (`https://akqxdqgf7l.execute-api.us-east-1.amazonaws.com/Prod/shares/${id}`, {
      method: 'put',
      headers: new Headers ({
        'x-amz-access-token': accessToken
      })
    });
  }
}

export const questions = {
  get get () {
    return () => fetch ('https://akqxdqgf7l.execute-api.us-east-1.amazonaws.com/Prod/questions', {
      method: 'get',
      headers: headers.get
    });
  },
  get post () {
    return body => fetch ('https://akqxdqgf7l.execute-api.us-east-1.amazonaws.com/Prod/questions', {
      method: 'post',
      headers: new Headers ({
        'x-amz-access-token': accessToken,
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify (body)
    });
  },
  get del () {
    return id => fetch (`https://akqxdqgf7l.execute-api.us-east-1.amazonaws.com/Prod/questions/${id}`, {
      method: 'DELETE',
      headers: new Headers ({
        'x-amz-access-token': accessToken
      })
    })
  }
}
export const audios = {
  get post () {
    return body => fetch ('https://akqxdqgf7l.execute-api.us-east-1.amazonaws.com/Prod/audios', {
      method: 'post',
      headers: new Headers ({
        'x-amz-access-token': accessToken,
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify (body)
    })
  }
}

export const notifications = {
  get get () {
    return () => fetch ('https://akqxdqgf7l.execute-api.us-east-1.amazonaws.com/Prod/notifications', {
      headers: new Headers ({
        'x-amz-access-token': accessToken
      })
    })
  },
  get post () {
    return body => fetch ('https://akqxdqgf7l.execute-api.us-east-1.amazonaws.com/Prod/notifications', {
      method: 'post',
      headers: new Headers ({
        'x-amz-access-token': accessToken,
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify (body)
    })
  },
  get del () {
    return id => fetch (`https://akqxdqgf7l.execute-api.us-east-1.amazonaws.com/Prod/notifications/${id}`, {
      method: 'DELETE',
      headers: new Headers ({
        'x-amz-access-token': accessToken
      })
    })
  }
}

export const metrix = {
  get get () {
    return userId => fetch (`https://akqxdqgf7l.execute-api.us-east-1.amazonaws.com/Prod/metrix${userId ? '?userId=' + userId : ''}`, {
      headers: new Headers ({
        'x-amz-access-token': accessToken
      })
    })
  },
  get post () {
    return body => fetch ('https://akqxdqgf7l.execute-api.us-east-1.amazonaws.com/Prod/metrix', {
      method: 'post',
      headers: new Headers ({
        'x-amz-access-token': accessToken,
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify (body)
    })
  },
  get del () {
    return id => fetch (`https://akqxdqgf7l.execute-api.us-east-1.amazonaws.com/Prod/metrix/${id}`, {
      method: 'DELETE',
      headers: new Headers ({
        'x-amz-access-token': accessToken
      })
    })
  }
}

export const measurements = {
  get get () {
    return userId => fetch (`https://akqxdqgf7l.execute-api.us-east-1.amazonaws.com/Prod/measurements/${userId ? '?userId=' + userId : ''}`, {
      headers: new Headers ({
        'x-amz-access-token': accessToken
      })
    })
  },
  get post () {
    return (metric, body) => {
      fetch (`https://akqxdqgf7l.execute-api.us-east-1.amazonaws.com/Prod/metrix/${metric}`, {
        method: 'post',
        headers: new Headers ({
          'x-amz-access-token': accessToken,
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify (body)
      })
    }
  },
  get put () {
    return (id, value) => fetch (`https://akqxdqgf7l.execute-api.us-east-1.amazonaws.com/Prod/measurements/${id}`, {
      method: 'put',
      headers: new Headers ({
        'x-amz-access-token': accessToken,
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify ({value})
    })
  },
}