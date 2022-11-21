class Utils {
  static getAddressShortHand(address: string) {
    return `${address.slice(0, 5)}...${address.substring(address.length - 4)}`
  }
}

export default Utils
