import {Module} from "@nestjs/common"
import {cryptoProvider} from "./crypto.provider"
import {CryptoService} from "./crypto.service"

@Module({
    providers:[cryptoProvider,CryptoService],
    exports:[cryptoProvider]
})

export class CryptoModule{}