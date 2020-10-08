import {Injectable,Inject} from "@nestjs/common"
import {cryptoProvider,Crypto} from "./crypto.provider"


@Injectable()
export class CryptoService {
     constructor(@Inject(Crypto) private crypto){
     }
}