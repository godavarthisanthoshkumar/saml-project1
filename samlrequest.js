const { create } = require('xmlbuilder2');

// Construct the SAML authentication request XML
const samlRequest = create({
    'samlp:AuthnRequest': {
        '@xmlns:samlp': 'urn:oasis:names:tc:SAML:2.0:protocol',
        '@xmlns:saml': 'urn:oasis:names:tc:SAML:2.0:assertion',
        '@ID': '_' + Math.random().toString(36).substr(2, 9),
        '@Version': '2.0',
        '@IssueInstant': new Date().toISOString(),
        '@Destination': 'https://dev-60700936.okta.com/app/dev-60700936_cafekl_1/exkgbgbfp3sToWpQz5d7/sso/saml',
        '@AssertionConsumerServiceURL': 'YOUR_ASSERTION_CONSUMER_SERVICE_URL',
        '@ProtocolBinding': 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST',
        'saml:Issuer': 'http://www.okta.com/${org.externalKey}',
    }
}).end({ prettyPrint: true });

console.log(samlRequest);