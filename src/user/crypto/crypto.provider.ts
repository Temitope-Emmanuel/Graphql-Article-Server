import { Provider } from "@nestjs/common"
import * as CryptoLib from "crypto"

export const Crypto = 'lib:crypto';

export const cryptoProvider: Provider = {
    provide:Crypto,
    useValue:CryptoLib
}