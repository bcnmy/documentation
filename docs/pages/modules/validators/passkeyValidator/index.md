# Passkey Validator Module Overview

The `PasskeyValidator` is a WebAuthn-based validator module for ERC-7579 compliant smart accounts that enables passwordless authentication using the FIDO2 standard. It validates signatures generated through browser or device-based authenticators for ERC-4337 user operations.

## Key Features

- WebAuthn-based signature validation for user operations
- Supports both registration and authentication flows
- Device-bound cryptographic key management
- Phishing-resistant authentication
- Compatible with hardware security tokens

## Core Functionality

- Installation and uninstallation as a module
- Passwordless authentication for user operations using biometrics

### Authentication Operations
```typescript
// Create new passkey
const webAuthnKey = await toWebAuthnKey({
    passkeyName: "accountName",
    mode: WebAuthnMode.Register
})

// Login with existing passkey
const webAuthnKey = await toWebAuthnKey({
    mode: WebAuthnMode.Login
})
```

### Signature Format
```typescript
type WebAuthnSignature = {
    authenticatorData: bytes,
    clientDataJSON: string,
    responseTypeLocation: uint256,
    r: uint256,
    s: uint256,
    usePrecompiled: bool
}
```

## Security Features

- Domain-bound credentials preventing phishing attacks
- No exportable private keys
- Optional hardware token support
- Biometric authentication support
- Challenge-response based authentication

## Limitations

- Requires WebAuthn-compatible environment (browser/device)
- Device-specific authentication
- Needs backup/recovery mechanism
- Limited to client-side implementations

## Security Considerations

- Store passkey data securely using the device's secure storage
- Implement proper error handling for failed authentications
- Consider implementing multiple passkeys for backup
- Regular validation of installed passkeys
- Proper cleanup during uninstallation

The `PasskeyValidator` provides a secure, user-friendly authentication mechanism for ERC-7579 compliant smart accounts, leveraging modern WebAuthn standards while maintaining the security requirements of blockchain operations.
