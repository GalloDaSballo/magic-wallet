import {utils} from "ethers"
import { getMaxEthAfterGas } from "./transactions";

// TODO Use this: https://etherscan.io/tx/0xd22963060250bafcc22b0cf169824b5db89f1a84b7dae2dbc1c641f7fe340676
//To write tests

const WALLET_BALANCE = utils.parseEther("0.11");
const SOME_ETHER = utils.parseEther("0.01");
const GAS_PRICE = utils.parseUnits("67", "gwei");

// See Token List schema: https://uniswap.org/tokenlist.schema.json
describe("getMaxEthAfterGas", () => {
    it("If you send all, send max - gas so you can afford it", async () => {
        expect(getMaxEthAfterGas(WALLET_BALANCE, WALLET_BALANCE, GAS_PRICE)).toMatchObject(utils.parseEther("0.108593"))
    });

    it("If you send some, send it", async () => {
        expect(getMaxEthAfterGas(SOME_ETHER, WALLET_BALANCE, GAS_PRICE)).toBe(SOME_ETHER)
    });
});
