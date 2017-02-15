import * as Relay from "react-relay"

export const metaphysicsURL = "https://metaphysics-staging.artsy.net"

export function artsyNetworkLayer() {
  return new Relay.DefaultNetworkLayer(metaphysicsURL, {
    headers: {
      // 'X-USER-ID': Emission.userID,
      // 'X-ACCESS-TOKEN': Emission.authenticationToken,
    },
  })
}

// TODO: Send to definitely typed?
declare module "react-relay" {
  class Environment {
    injectNetworkLayer(networkLayer: RelayNetworkLayer): void
  }
}

/*
 * For the client.
 */
export function artsyRelayEnvironment() {
  const env: any = new Relay.Environment()
  env.injectNetworkLayer(artsyNetworkLayer())
  return env
}
